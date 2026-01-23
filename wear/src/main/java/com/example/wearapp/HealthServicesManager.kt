package com.example.wearapp

import android.content.Context
import android.util.Log
import androidx.health.services.client.HealthServices
import androidx.health.services.client.MeasureCallback
import androidx.health.services.client.data.Availability
import androidx.health.services.client.data.DataPointContainer
import androidx.health.services.client.data.DataType
import androidx.health.services.client.data.DataTypeAvailability
import androidx.health.services.client.data.DeltaDataType
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.guava.await

data class HealthData(
    val heartRate: Double? = null,
    val hrv: Double? = null,
    val steps: Long? = null,
    val heartRateAvailability: DataTypeAvailability = DataTypeAvailability.UNKNOWN,
    val stepsAvailability: DataTypeAvailability = DataTypeAvailability.UNKNOWN
)

data class HRVMetrics(
    val sdnn: Double,        // Standard Deviation of NN intervals (ms)
    val rmssd: Double,       // Root Mean Square of Successive Differences (ms)
    val pnn50: Double,       // Percentage of NN intervals that differ by more than 50ms
    val rrIntervals: List<Long> // RR intervals in milliseconds
)

class HealthServicesManager(context: Context) {
    private val healthServicesClient = HealthServices.getClient(context)
    private val measureClient = healthServicesClient.measureClient

    companion object {
        private const val TAG = "HealthServicesManager"
    }

    // Store recent heart rate samples with timestamps for HRV calculation
    private val heartRateSamples = mutableListOf<HeartRateSample>()
    private val maxSamples = 60 // Keep last 60 samples (approximately 1 minute at 1Hz)

    data class HeartRateSample(
        val bpm: Double,
        val timestampMillis: Long
    )

    suspend fun hasHeartRateCapability(): Boolean {
        val capabilities = measureClient.getCapabilitiesAsync().await()
        val hasCapability = DataType.HEART_RATE_BPM in capabilities.supportedDataTypesMeasure
        Log.d(TAG, "hasHeartRateCapability: $hasCapability")
        return hasCapability
    }

    suspend fun hasHRVCapability(): Boolean {
        // Check if device supports RR interval data for HRV calculation
        return try {
            val capabilities = measureClient.getCapabilitiesAsync().await()
            // Some devices provide RR intervals through HEART_RATE_BPM data type
            DataType.HEART_RATE_BPM in capabilities.supportedDataTypesMeasure
        } catch (e: Exception) {
            false
        }
    }


    private fun addHeartRateSample(bpm: Double) {
        heartRateSamples.add(HeartRateSample(bpm, System.currentTimeMillis()))
        if (heartRateSamples.size > maxSamples) {
            heartRateSamples.removeAt(0)
        }
    }

    private fun estimateRRIntervalsFromHeartRate(): List<Long> {
        if (heartRateSamples.size < 2) return emptyList()

        // Estimate RR intervals from heart rate
        // RR interval (ms) ≈ 60000 / heart_rate_bpm
        return heartRateSamples.map { sample ->
            if (sample.bpm > 0) {
                (60000.0 / sample.bpm).toLong()
            } else {
                800L // Default ~75 bpm
            }
        }
    }

    fun calculateHRV(): HRVMetrics? {
        val rrIntervals = estimateRRIntervalsFromHeartRate()
        if (rrIntervals.size < 10) return null // Need at least 10 samples for meaningful HRV

        // Calculate SDNN (Standard Deviation of NN intervals)
        val mean = rrIntervals.average()
        val variance = rrIntervals.map { (it - mean).let { diff -> diff * diff } }.average()
        val sdnn = kotlin.math.sqrt(variance)

        // Calculate RMSSD (Root Mean Square of Successive Differences)
        val successiveDifferences = rrIntervals.zipWithNext { a, b -> (b - a).toDouble() }
        val squaredDifferences = successiveDifferences.map { it * it }
        val rmssd = if (squaredDifferences.isNotEmpty()) {
            kotlin.math.sqrt(squaredDifferences.average())
        } else {
            0.0
        }

        // Calculate pNN50 (percentage of intervals differing by more than 50ms)
        val nn50Count = successiveDifferences.count { kotlin.math.abs(it) > 50 }
        val pnn50 = if (successiveDifferences.isNotEmpty()) {
            (nn50Count.toDouble() / successiveDifferences.size) * 100
        } else {
            0.0
        }

        return HRVMetrics(
            sdnn = sdnn,
            rmssd = rmssd,
            pnn50 = pnn50,
            rrIntervals = rrIntervals
        )
    }


    suspend fun hasStepsCapability(): Boolean {
        val capabilities = measureClient.getCapabilitiesAsync().await()
        Log.d(TAG, "Available measure data types: ${capabilities.supportedDataTypesMeasure}")
        // Check both STEPS_DAILY and STEPS data types
        val hasStepsDaily = DataType.STEPS_DAILY in capabilities.supportedDataTypesMeasure
        val hasSteps = DataType.STEPS in capabilities.supportedDataTypesMeasure
        Log.d(TAG, "hasStepsCapability - STEPS_DAILY: $hasStepsDaily, STEPS: $hasSteps")
        return hasStepsDaily || hasSteps
    }


    fun heartRateMeasureFlow(): Flow<MeasureMessage> = callbackFlow {
        Log.d(TAG, "heartRateMeasureFlow: Starting heart rate measurement")
        val callback = object : MeasureCallback {
            override fun onAvailabilityChanged(
                dataType: DeltaDataType<*, *>,
                availability: Availability
            ) {
                Log.d(TAG, "onAvailabilityChanged: dataType=$dataType, availability=${availability.id}")
                // Convert Availability to DataTypeAvailability based on ordinal
                // Availability class has a similar structure to DataTypeAvailability
                val dataTypeAvailability = try {
                    when (availability.id) {
                        1 -> DataTypeAvailability.ACQUIRING
                        2, 3 -> DataTypeAvailability.UNAVAILABLE
                        else -> DataTypeAvailability.AVAILABLE
                    }
                } catch (e: Exception) {
                    Log.e(TAG, "Error converting availability", e)
                    DataTypeAvailability.UNKNOWN
                }
                Log.d(TAG, "Sending HeartRateAvailability: $dataTypeAvailability")
                trySend(MeasureMessage.HeartRateAvailability(dataTypeAvailability))
            }

            override fun onDataReceived(data: DataPointContainer) {
                Log.d(TAG, "onDataReceived called for heart rate")
                val heartRatePoints = data.getData(DataType.HEART_RATE_BPM)
                val heartRateBpm = heartRatePoints.lastOrNull()?.value
                Log.d(TAG, "Heart rate BPM: $heartRateBpm, points size: ${heartRatePoints.size}")

                if (heartRateBpm != null) {
                    // Add sample for HRV calculation
                    addHeartRateSample(heartRateBpm)
                    Log.d(TAG, "Heart rate samples collected: ${heartRateSamples.size}")

                    // Send heart rate data
                    Log.d(TAG, "Sending HeartRateData: $heartRateBpm")
                    trySend(MeasureMessage.HeartRateData(heartRateBpm))

                    // Calculate and send HRV data if we have enough samples
                    if (heartRateSamples.size >= 10) {
                        val hrv = calculateHRV()
                        if (hrv != null) {
                            Log.d(TAG, "Sending HRV data: SDNN=${hrv.sdnn}, RMSSD=${hrv.rmssd}, pNN50=${hrv.pnn50}")
                            trySend(MeasureMessage.HRVData(hrv))
                        } else {
                            Log.w(TAG, "HRV calculation returned null despite having ${heartRateSamples.size} samples")
                        }
                    } else {
                        Log.d(TAG, "Not enough samples for HRV: ${heartRateSamples.size}/10")
                    }
                }
            }
        }

        Log.d(TAG, "Registering heart rate measure callback")
        measureClient.registerMeasureCallback(DataType.HEART_RATE_BPM, callback)

        awaitClose {
            Log.d(TAG, "Unregistering heart rate measure callback")
            measureClient.unregisterMeasureCallbackAsync(DataType.HEART_RATE_BPM, callback)
        }
    }


    fun stepsMeasureFlow(): Flow<MeasureMessage> = callbackFlow {
        Log.d(TAG, "stepsMeasureFlow: Starting steps measurement")

        // Determine which data type to use
        val capabilities = measureClient.getCapabilitiesAsync().await()
        val useStepsDaily = DataType.STEPS_DAILY in capabilities.supportedDataTypesMeasure
        val dataType = if (useStepsDaily) DataType.STEPS_DAILY else DataType.STEPS
        Log.d(TAG, "Using data type for steps: $dataType")

        val callback = object : MeasureCallback {
            override fun onAvailabilityChanged(
                dataType: DeltaDataType<*, *>,
                availability: Availability
            ) {
                Log.d(TAG, "Steps onAvailabilityChanged: dataType=$dataType, availability=${availability.id}")
                val dataTypeAvailability = try {
                    when (availability.id) {
                        1 -> DataTypeAvailability.ACQUIRING
                        2, 3 -> DataTypeAvailability.UNAVAILABLE
                        else -> DataTypeAvailability.AVAILABLE
                    }
                } catch (e: Exception) {
                    Log.e(TAG, "Error converting steps availability", e)
                    DataTypeAvailability.UNKNOWN
                }
                Log.d(TAG, "Sending StepsAvailability: $dataTypeAvailability")
                trySend(MeasureMessage.StepsAvailability(dataTypeAvailability))
            }

            override fun onDataReceived(data: DataPointContainer) {
                Log.d(TAG, "onDataReceived called for steps")
                // Try the determined data type
                val stepsPoints = data.getData(dataType)
                val stepsValue = stepsPoints.lastOrNull()?.value
                Log.d(TAG, "Steps value: $stepsValue, points size: ${stepsPoints.size}, dataType: $dataType")

                if (stepsValue != null) {
                    Log.d(TAG, "Sending StepsData: $stepsValue")
                    trySend(MeasureMessage.StepsData(stepsValue))
                }
            }
        }

        Log.d(TAG, "Registering steps measure callback for: $dataType")
        measureClient.registerMeasureCallback(dataType, callback)

        awaitClose {
            Log.d(TAG, "Unregistering steps measure callback for: $dataType")
            measureClient.unregisterMeasureCallbackAsync(dataType, callback)
        }
    }

}

sealed class MeasureMessage {
    data class HeartRateData(val heartRate: Double) : MeasureMessage()
    data class HeartRateAvailability(val availability: DataTypeAvailability) : MeasureMessage()
    data class HRVData(val hrvMetrics: HRVMetrics) : MeasureMessage()
    data class StepsData(val steps: Long) : MeasureMessage()
    data class StepsAvailability(val availability: DataTypeAvailability) : MeasureMessage()
}
