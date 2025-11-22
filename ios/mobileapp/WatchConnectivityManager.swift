//
//  WatchConnectivityManager.swift
//  mobileapp
//
//  Created by 長谷川匠 on 2025/11/23.
//

import Foundation
import WatchConnectivity

@objc(WatchConnectivityManager)
class WatchConnectivityManager: NSObject, WCSessionDelegate {
    static let shared = WatchConnectivityManager()

    // 最新のヘルスデータを保持
    private(set) var latestHealthData: [String: Any] = [:]

    // データ更新時のコールバック
    var onHealthDataReceived: (([String: Any]) -> Void)?

    private override init() {
        super.init()
        setupSession()
    }

    private func setupSession() {
        if WCSession.isSupported() {
            let session = WCSession.default
            session.delegate = self
            session.activate()
        }
    }

    // MARK: - WCSessionDelegate

    func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
        if let error = error {
            print("WCSession activation failed: \(error.localizedDescription)")
            return
        }
        print("WCSession activated on iPhone with state: \(activationState.rawValue)")
    }

    func sessionDidBecomeInactive(_ session: WCSession) {
        print("WCSession became inactive")
    }

    func sessionDidDeactivate(_ session: WCSession) {
        print("WCSession deactivated")
        // 再アクティベート
        WCSession.default.activate()
    }

    // Watch からのリアルタイムメッセージを受信
    func session(_ session: WCSession, didReceiveMessage message: [String: Any], replyHandler: @escaping ([String: Any]) -> Void) {
        print("Received message from Watch: \(message)")

        if message["type"] as? String == "healthData" {
            DispatchQueue.main.async {
                self.latestHealthData = message
                self.onHealthDataReceived?(message)

                // React Native にイベントを送信
                WatchConnectivityModule.shared?.sendHealthDataEvent(message)
            }
        }

        replyHandler(["status": "received"])
    }

    // Watch からのバックグラウンド転送を受信
    func session(_ session: WCSession, didReceiveUserInfo userInfo: [String: Any] = [:]) {
        print("Received userInfo from Watch: \(userInfo)")

        if userInfo["type"] as? String == "healthData" {
            DispatchQueue.main.async {
                self.latestHealthData = userInfo
                self.onHealthDataReceived?(userInfo)

                // React Native にイベントを送信
                WatchConnectivityModule.shared?.sendHealthDataEvent(userInfo)
            }
        }
    }
}
