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
            val hasRespiratoryRate = healthServicesManager.hasRespiratoryRateCapability()

            _uiState.value = _uiState.value.copy(
                supportsHeartRate = hasHeartRate,
                supportsRespiratoryRate = hasRespiratoryRate
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
                            else -> {}
                        }
                    }
                }
            }

            if (_uiState.value.supportsRespiratoryRate) {
                launch {
                    healthServicesManager.respiratoryRateMeasureFlow().collect { message ->
                        when (message) {
                            is MeasureMessage.RespiratoryRateData -> {
                                _uiState.value = _uiState.value.copy(
                                    respiratoryRate = message.respiratoryRate
                                )
                            }
                            is MeasureMessage.RespiratoryRateAvailability -> {
                                _uiState.value = _uiState.value.copy(
                                    respiratoryRateAvailability = message.availability
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
    val respiratoryRate: Double? = null,
    val heartRateAvailability: DataTypeAvailability = DataTypeAvailability.UNKNOWN,
    val respiratoryRateAvailability: DataTypeAvailability = DataTypeAvailability.UNKNOWN,
    val supportsHeartRate: Boolean = false,
    val supportsRespiratoryRate: Boolean = false
)
