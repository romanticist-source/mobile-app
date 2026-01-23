package com.example.wearapp

import android.content.Context
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
    val respiratoryRate: Double? = null,
    val hrv: Double? = null,
    val heartRateAvailability: DataTypeAvailability = DataTypeAvailability.UNKNOWN,
    val respiratoryRateAvailability: DataTypeAvailability = DataTypeAvailability.UNKNOWN
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

    // Store recent RR intervals for HRV calculation
    private val rrIntervals = mutableListOf<Long>()
    private val maxRRIntervals = 100 // Keep last 100 intervals for calculation

    suspend fun hasHeartRateCapability(): Boolean {
        val capabilities = measureClient.getCapabilitiesAsync().await()
        return DataType.HEART_RATE_BPM in capabilities.supportedDataTypesMeasure
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

    fun calculateHRV(rrIntervals: List<Long>): HRVMetrics? {
        if (rrIntervals.size < 2) return null

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

    suspend fun hasRespiratoryRateCapability(): Boolean {
        // Respiratory rate is not commonly available on most Wear OS devices
        // This can be extended when more devices support it
        return false
    }

    fun heartRateMeasureFlow(): Flow<MeasureMessage> = callbackFlow {
        val callback = object : MeasureCallback {
            override fun onAvailabilityChanged(
                dataType: DeltaDataType<*, *>,
                availability: Availability
            ) {
                // Convert Availability to DataTypeAvailability based on ordinal
                // Availability class has a similar structure to DataTypeAvailability
                val dataTypeAvailability = try {
                    when (availability.id) {
                        1 -> DataTypeAvailability.ACQUIRING
                        2, 3 -> DataTypeAvailability.UNAVAILABLE
                        else -> DataTypeAvailability.AVAILABLE
                    }
                } catch (e: Exception) {
                    DataTypeAvailability.UNKNOWN
                }
                trySend(MeasureMessage.HeartRateAvailability(dataTypeAvailability))
            }

            override fun onDataReceived(data: DataPointContainer) {
                val heartRatePoints = data.getData(DataType.HEART_RATE_BPM)
                val heartRateBpm = heartRatePoints.lastOrNull()?.value

                if (heartRateBpm != null) {
                    trySend(MeasureMessage.HeartRateData(heartRateBpm))
                }
            }
        }

        measureClient.registerMeasureCallback(DataType.HEART_RATE_BPM, callback)

        awaitClose {
            measureClient.unregisterMeasureCallbackAsync(DataType.HEART_RATE_BPM, callback)
        }
    }

    fun respiratoryRateMeasureFlow(): Flow<MeasureMessage> = callbackFlow {
        // Respiratory rate measurement is not commonly available on most Wear OS devices
        // This is a placeholder implementation
        awaitClose {
            // No cleanup needed
        }
    }
}

sealed class MeasureMessage {
    data class HeartRateData(val heartRate: Double) : MeasureMessage()
    data class HeartRateAvailability(val availability: DataTypeAvailability) : MeasureMessage()
    data class RespiratoryRateData(val respiratoryRate: Double) : MeasureMessage()
    data class RespiratoryRateAvailability(val availability: DataTypeAvailability) : MeasureMessage()
    data class HRVData(val hrvMetrics: HRVMetrics) : MeasureMessage()
}
