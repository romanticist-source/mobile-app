package com.hasegawa.miso.wear

import android.content.Context
import android.content.Intent
import android.util.Log
import com.google.android.gms.wearable.*

/**
 * Wear OS から Android Phone へデータを送信するマネージャー
 */
class PhoneConnectivityManager(private val context: Context) {
    private val dataClient: DataClient = Wearable.getDataClient(context)
    private val messageClient: MessageClient = Wearable.getMessageClient(context)

    companion object {
        private const val TAG = "PhoneConnectivity"
        private const val PATH_HEALTH_DATA = "/health_data"
        private const val KEY_HEART_RATE = "heartRate"
        private const val KEY_HRV = "hrv"
        private const val KEY_TIMESTAMP = "timestamp"
        const val ACTION_HEALTH_DATA = "com.hasegawa.miso.HEALTH_DATA"
    }

    /**
     * ヘルスデータを Phone に送信（Data Layer API 使用）
     */
    fun sendHealthData(heartRate: Double?, hrv: Double?) {
        Log.d(TAG, "sendHealthData called - HeartRate: $heartRate, HRV: $hrv")

        try {
            val putDataReq = PutDataMapRequest.create(PATH_HEALTH_DATA).apply {
                dataMap.apply {
                    putDouble(KEY_HEART_RATE, heartRate ?: 0.0)
                    putDouble(KEY_HRV, hrv ?: 0.0)
                    putLong(KEY_TIMESTAMP, System.currentTimeMillis())
                }
            }.asPutDataRequest()
                .setUrgent() // 即座に同期

            dataClient.putDataItem(putDataReq)
                .addOnSuccessListener {
                    Log.d(TAG, "Health data sent successfully via DataItem")
                }
                .addOnFailureListener { e ->
                    Log.e(TAG, "Failed to send health data via DataItem", e)
                }
        } catch (e: Exception) {
            Log.e(TAG, "Exception while sending health data", e)
        }
    }

    /**
     * ヘルスデータをローカルブロードキャストで送信（同一デバイス内通信用）
     */
    fun sendHealthDataLocally(heartRate: Double?, hrv: Double?) {
        Log.d(TAG, "sendHealthDataLocally - HeartRate: $heartRate, HRV: $hrv")

        try {
            val intent = Intent(ACTION_HEALTH_DATA).apply {
                putExtra("heartRate", heartRate ?: 0.0)
                putExtra("hrv", hrv ?: 0.0)
                putExtra("timestamp", System.currentTimeMillis())
            }
            context.sendBroadcast(intent)
            Log.d(TAG, "Health data broadcast sent locally")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to send local broadcast", e)
        }
    }

    /**
     * Message API を使用してリアルタイムメッセージ送信
     */
    fun sendMessageToPhone(heartRate: Double?, hrv: Double?) {
        Log.d(TAG, "sendMessageToPhone - HeartRate: $heartRate, HRV: $hrv")

        Wearable.getNodeClient(context).connectedNodes.addOnSuccessListener { nodes ->
            val message = "$heartRate,$hrv,${System.currentTimeMillis()}"

            nodes.forEach { node ->
                messageClient.sendMessage(node.id, PATH_HEALTH_DATA, message.toByteArray())
                    .addOnSuccessListener {
                        Log.d(TAG, "Message sent to node: ${node.displayName}")
                    }
                    .addOnFailureListener { e ->
                        Log.e(TAG, "Failed to send message to node: ${node.displayName}", e)
                    }
            }
        }
    }
}
