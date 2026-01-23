package com.example.wearapp

import android.app.Application
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

    init {
        checkCapabilities()
    }

    private fun checkCapabilities() {
        viewModelScope.launch {
            val hasHeartRate = healthServicesManager.hasHeartRateCapability()
            val hasHRV = healthServicesManager.hasHRVCapability()
            val hasSteps = healthServicesManager.hasStepsCapability()

            _uiState.value = _uiState.value.copy(
                supportsHeartRate = hasHeartRate,
                supportsHRV = hasHRV,
                supportsSteps = hasSteps
            )
        }
    }

    fun startMeasuring() {
        viewModelScope.launch {
            if (_uiState.value.supportsHeartRate) {
                launch {
                    healthServicesManager.heartRateMeasureFlow().collect { message ->
                        when (message) {
                            is MeasureMessage.HeartRateData -> {
                                _uiState.value = _uiState.value.copy(
                                    heartRate = message.heartRate
                                )
                            }
                            is MeasureMessage.HeartRateAvailability -> {
                                _uiState.value = _uiState.value.copy(
                                    heartRateAvailability = message.availability
                                )
                            }
                            is MeasureMessage.HRVData -> {
                                _uiState.value = _uiState.value.copy(
                                    hrvMetrics = message.hrvMetrics
                                )
                            }
                            else -> {}
                        }
                    }
                }
            }

            if (_uiState.value.supportsSteps) {
                launch {
                    healthServicesManager.stepsMeasureFlow().collect { message ->
                        when (message) {
                            is MeasureMessage.StepsData -> {
                                _uiState.value = _uiState.value.copy(
                                    steps = message.steps
                                )
                            }
                            is MeasureMessage.StepsAvailability -> {
                                _uiState.value = _uiState.value.copy(
                                    stepsAvailability = message.availability
                                )
                            }
                            else -> {}
                        }
                    }
                }
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
