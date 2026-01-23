package com.example.wearapp

import android.app.Application
import android.util.Log
import androidx.health.services.client.data.DataTypeAvailability
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class HealthViewModel(application: Application) : AndroidViewModel(application) {
    private val healthServicesManager = HealthServicesManager(application)

    private val _uiState = MutableStateFlow(HealthUiState())
    val uiState: StateFlow<HealthUiState> = _uiState.asStateFlow()

    companion object {
        private const val TAG = "HealthViewModel"
    }

    init {
        Log.d(TAG, "HealthViewModel initialized")
        checkCapabilities()
    }

    private fun checkCapabilities() {
        Log.d(TAG, "checkCapabilities called")
        viewModelScope.launch {
            val hasHeartRate = healthServicesManager.hasHeartRateCapability()
            val hasHRV = healthServicesManager.hasHRVCapability()
            val hasSteps = healthServicesManager.hasStepsCapability()

            Log.d(TAG, "Capabilities - HeartRate: $hasHeartRate, HRV: $hasHRV, Steps: $hasSteps")

            _uiState.value = _uiState.value.copy(
                supportsHeartRate = hasHeartRate,
                supportsHRV = hasHRV,
                supportsSteps = hasSteps
            )

            // Start measuring automatically after checking capabilities
            startMeasuring()
        }
    }

    fun startMeasuring() {
        Log.d(TAG, "startMeasuring called")
        Log.d(TAG, "Current capabilities - HeartRate: ${_uiState.value.supportsHeartRate}, Steps: ${_uiState.value.supportsSteps}")

        viewModelScope.launch {
            if (_uiState.value.supportsHeartRate) {
                Log.d(TAG, "Starting heart rate measurement")
                launch {
                    healthServicesManager.heartRateMeasureFlow().collect { message ->
                        Log.d(TAG, "Received message: $message")
                        when (message) {
                            is MeasureMessage.HeartRateData -> {
                                Log.d(TAG, "Updating heart rate: ${message.heartRate}")
                                _uiState.value = _uiState.value.copy(
                                    heartRate = message.heartRate
                                )
                            }
                            is MeasureMessage.HeartRateAvailability -> {
                                Log.d(TAG, "Updating heart rate availability: ${message.availability}")
                                _uiState.value = _uiState.value.copy(
                                    heartRateAvailability = message.availability
                                )
                            }
                            is MeasureMessage.HRVData -> {
                                Log.d(TAG, "Updating HRV data")
                                _uiState.value = _uiState.value.copy(
                                    hrvMetrics = message.hrvMetrics
                                )
                            }
                            else -> {}
                        }
                    }
                }
            } else {
                Log.w(TAG, "Heart rate not supported, skipping")
            }

            if (_uiState.value.supportsSteps) {
                Log.d(TAG, "Starting steps measurement")
                launch {
                    healthServicesManager.stepsMeasureFlow().collect { message ->
                        Log.d(TAG, "Received steps message: $message")
                        when (message) {
                            is MeasureMessage.StepsData -> {
                                Log.d(TAG, "Updating steps: ${message.steps}")
                                _uiState.value = _uiState.value.copy(
                                    steps = message.steps
                                )
                            }
                            is MeasureMessage.StepsAvailability -> {
                                Log.d(TAG, "Updating steps availability: ${message.availability}")
                                _uiState.value = _uiState.value.copy(
                                    stepsAvailability = message.availability
                                )
                            }
                            else -> {}
                        }
                    }
                }
            } else {
                Log.w(TAG, "Steps not supported, skipping")
            }
        }
    }
}

data class HealthUiState(
    val heartRate: Double? = null,
    val steps: Long? = null,
    val hrvMetrics: HRVMetrics? = null,
    val heartRateAvailability: DataTypeAvailability = DataTypeAvailability.UNKNOWN,
    val stepsAvailability: DataTypeAvailability = DataTypeAvailability.UNKNOWN,
    val supportsHeartRate: Boolean = false,
    val supportsSteps: Boolean = false,
    val supportsHRV: Boolean = false
)
