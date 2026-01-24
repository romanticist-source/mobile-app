package com.hasegawa.miso.wear

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
    private val phoneConnectivityManager = PhoneConnectivityManager(application)

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

            Log.d(TAG, "Capabilities - HeartRate: $hasHeartRate, HRV: $hasHRV")

            _uiState.value = _uiState.value.copy(
                supportsHeartRate = hasHeartRate,
                supportsHRV = hasHRV
            )

            // Start measuring automatically after checking capabilities
            startMeasuring()
        }
    }

    fun startMeasuring() {
        Log.d(TAG, "startMeasuring called")
        Log.d(TAG, "Current capabilities - HeartRate: ${_uiState.value.supportsHeartRate}")

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
                                // データが更新されたらPhoneに送信
                                sendDataToPhone()
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
                                // データが更新されたらPhoneに送信
                                sendDataToPhone()
                            }
                            else -> {}
                        }
                    }
                }
            } else {
                Log.w(TAG, "Heart rate not supported, skipping")
            }
        }
    }

    private fun sendDataToPhone() {
        val currentState = _uiState.value
        val heartRate = currentState.heartRate
        val hrv = currentState.hrvMetrics?.sdnn

        Log.d(TAG, "Sending data to phone - HeartRate: $heartRate, HRV: $hrv")

        // Data Layer API で送信（ペアリングされたPhoneへ）
        phoneConnectivityManager.sendHealthData(heartRate, hrv)

        // ローカルブロードキャスト送信（同一デバイスのReact Nativeアプリへ）
        phoneConnectivityManager.sendHealthDataLocally(heartRate, hrv)
    }
}

data class HealthUiState(
    val heartRate: Double? = null,
    val hrvMetrics: HRVMetrics? = null,
    val heartRateAvailability: DataTypeAvailability = DataTypeAvailability.UNKNOWN,
    val supportsHeartRate: Boolean = false,
    val supportsHRV: Boolean = false
)
