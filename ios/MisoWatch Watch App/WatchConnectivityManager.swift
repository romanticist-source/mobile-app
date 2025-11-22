//
//  WatchConnectivityManager.swift
//  MisoWatch Watch App
//
//  Created by 長谷川匠 on 2025/11/23.
//

import Foundation
import WatchConnectivity
import Combine

class WatchConnectivityManager: NSObject, ObservableObject {
    static let shared = WatchConnectivityManager()

    @Published var isReachable: Bool = false
    @Published var lastSentTime: Date?

    private override init() {
        super.init()

        if WCSession.isSupported() {
            WCSession.default.delegate = self
            WCSession.default.activate()
        }
    }

    // iPhone にヘルスデータを送信
    func sendHealthData(heartRate: Int, oxygenLevel: Int, steps: Int) {
        guard WCSession.default.isReachable else {
            print("iPhone is not reachable")
            return
        }

        let data: [String: Any] = [
            "type": "healthData",
            "heartRate": heartRate,
            "oxygenLevel": oxygenLevel,
            "steps": steps,
            "timestamp": Date().timeIntervalSince1970
        ]

        WCSession.default.sendMessage(data, replyHandler: { reply in
            print("Message sent successfully: \(reply)")
            DispatchQueue.main.async {
                self.lastSentTime = Date()
            }
        }, errorHandler: { error in
            print("Error sending message: \(error.localizedDescription)")
        })
    }

    // バックグラウンド転送（iPhone がスリープ中でも送信可能）
    func transferHealthData(heartRate: Int, oxygenLevel: Int, steps: Int) {
        let data: [String: Any] = [
            "type": "healthData",
            "heartRate": heartRate,
            "oxygenLevel": oxygenLevel,
            "steps": steps,
            "timestamp": Date().timeIntervalSince1970
        ]

        WCSession.default.transferUserInfo(data)
        print("Data transferred to iPhone")
    }
}

// MARK: - WCSessionDelegate
extension WatchConnectivityManager: WCSessionDelegate {
    func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
        if let error = error {
            print("WCSession activation failed: \(error.localizedDescription)")
            return
        }
        print("WCSession activated with state: \(activationState.rawValue)")
    }

    func sessionReachabilityDidChange(_ session: WCSession) {
        DispatchQueue.main.async {
            self.isReachable = session.isReachable
        }
    }
}
