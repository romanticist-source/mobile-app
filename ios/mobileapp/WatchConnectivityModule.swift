//
//  WatchConnectivityModule.swift
//  mobileapp
//
//  Created by 長谷川匠 on 2025/11/23.
//

import Foundation
import React

@objc(WatchConnectivityModule)
class WatchConnectivityModule: RCTEventEmitter {
    static var shared: WatchConnectivityModule?

    override init() {
        super.init()
        WatchConnectivityModule.shared = self

        // WatchConnectivityManager を初期化
        _ = WatchConnectivityManager.shared
    }

    override static func moduleName() -> String! {
        return "WatchConnectivityModule"
    }

    @objc override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    // サポートするイベント名
    override func supportedEvents() -> [String]! {
        return ["onHealthDataReceived"]
    }

    // React Native から呼び出し可能: 最新のヘルスデータを取得
    @objc func getLatestHealthData(_ resolve: @escaping RCTPromiseResolveBlock,
                                    reject: @escaping RCTPromiseRejectBlock) {
        let data = WatchConnectivityManager.shared.latestHealthData

        if data.isEmpty {
            resolve(nil)
        } else {
            resolve([
                "heartRate": data["heartRate"] ?? 0,
                "oxygenLevel": data["oxygenLevel"] ?? 0,
                "steps": data["steps"] ?? 0,
                "timestamp": data["timestamp"] ?? 0
            ])
        }
    }

    // Watch からデータを受信した時に React Native にイベントを送信
    func sendHealthDataEvent(_ data: [String: Any]) {
        sendEvent(withName: "onHealthDataReceived", body: [
            "heartRate": data["heartRate"] ?? 0,
            "oxygenLevel": data["oxygenLevel"] ?? 0,
            "steps": data["steps"] ?? 0,
            "timestamp": data["timestamp"] ?? 0
        ])
    }
}
