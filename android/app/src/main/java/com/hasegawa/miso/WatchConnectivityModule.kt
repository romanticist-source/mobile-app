package com.hasegawa.miso

import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.android.gms.wearable.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

class WatchConnectivityModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val messageClient: MessageClient by lazy {
        Wearable.getMessageClient(reactContext)
    }

    private val dataClient: DataClient by lazy {
        Wearable.getDataClient(reactContext)
    }

    private val scope = CoroutineScope(Dispatchers.Main)

    companion object {
        private const val TAG = "WatchConnectivityModule"
        private const val HEALTH_DATA_PATH = "/health-data"
        private const val MODULE_NAME = "WatchConnectivityModule"
    }

    override fun getName(): String = MODULE_NAME

    init {
        // Listen for data changes from Wear OS
        dataClient.addListener(dataListener)
    }

    private val dataListener = DataClient.OnDataChangedListener { dataEvents ->
        for (event in dataEvents) {
            if (event.type == DataEvent.TYPE_CHANGED) {
                val dataItem = event.dataItem
                if (dataItem.uri.path == HEALTH_DATA_PATH) {
                    val dataMap = DataMapItem.fromDataItem(dataItem).dataMap
                    Log.d(TAG, "Received health data from Wear OS: $dataMap")

                    val healthData = Arguments.createMap().apply {
                        putDouble("heartRate", dataMap.getDouble("heartRate", 0.0))
                        putDouble("hrv", dataMap.getDouble("hrv", 0.0))
                        putDouble("timestamp", dataMap.getLong("timestamp", 0).toDouble())
                    }

                    sendEvent("onHealthDataReceived", healthData)
                }
            }
        }
    }

    @ReactMethod
    fun getLatestHealthData(promise: Promise) {
        scope.launch {
            try {
                Log.d(TAG, "Fetching latest health data from Wear OS")

                // Get the DataItem from Wear OS
                val dataItems = dataClient.getDataItems(
                    WearableUris.fromPathPattern(HEALTH_DATA_PATH, WearableUris.PatternType.PREFIX)
                ).await()

                if (dataItems.count > 0) {
                    val dataItem = dataItems.first()
                    val dataMap = DataMapItem.fromDataItem(dataItem).dataMap

                    val healthData = Arguments.createMap().apply {
                        putDouble("heartRate", dataMap.getDouble("heartRate", 0.0))
                        putDouble("hrv", dataMap.getDouble("hrv", 0.0))
                        putDouble("timestamp", dataMap.getLong("timestamp", 0).toDouble())
                    }

                    Log.d(TAG, "Health data retrieved: $healthData")
                    dataItems.release()
                    promise.resolve(healthData)
                } else {
                    Log.d(TAG, "No health data available from Wear OS")
                    promise.resolve(null)
                }
            } catch (e: Exception) {
                Log.e(TAG, "Failed to fetch health data from Wear OS", e)
                promise.reject("FETCH_ERROR", "Failed to fetch health data: ${e.message}", e)
            }
        }
    }

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        dataClient.removeListener(dataListener)
    }
}
