//
//  ContentView.swift
//  MisoWatch Watch App
//
//  Created by 長谷川匠 on 2025/11/23.
//

import SwiftUI

struct ContentView: View {
    @StateObject private var healthManager = HealthManager()
    @ObservedObject private var connectivityManager = WatchConnectivityManager.shared

    var body: some View {
        ScrollView {
            VStack(spacing: 12) {
                Text("Miso Health")
                    .font(.headline)
                    .foregroundColor(.cyan)

                if healthManager.isAuthorized {
                    HealthCard(
                        icon: "heart.fill",
                        iconColor: .red,
                        title: "心拍数",
                        value: healthManager.heartRate > 0 ? "\(healthManager.heartRate)" : "--",
                        unit: "BPM"
                    )

                    HealthCard(
                        icon: "lungs.fill",
                        iconColor: .blue,
                        title: "血中酸素",
                        value: healthManager.oxygenLevel > 0 ? "\(healthManager.oxygenLevel)" : "--",
                        unit: "%"
                    )

                    HealthCard(
                        icon: "figure.walk",
                        iconColor: .green,
                        title: "歩数",
                        value: "\(healthManager.steps)",
                        unit: "歩"
                    )

                    HealthCard(
                        icon: "waveform.path.ecg",
                        iconColor: .purple,
                        title: "HRV",
                        value: healthManager.hrv > 0 ? String(format: "%.1f", healthManager.hrv) : "--",
                        unit: "ms"
                    )

                    // ボタン群
                    HStack(spacing: 8) {
                        // 更新ボタン
                        Button(action: {
                            Task {
                                await healthManager.fetchAllData()
                            }
                        }) {
                            Image(systemName: "arrow.clockwise")
                                .font(.caption)
                        }
                        .buttonStyle(.bordered)

                        // iPhone に送信ボタン
                        Button(action: {
                            connectivityManager.sendHealthData(
                                heartRate: healthManager.heartRate,
                                oxygenLevel: healthManager.oxygenLevel,
                                steps: healthManager.steps,
                                hrv: healthManager.hrv
                            )
                        }) {
                            Image(systemName: "iphone.and.arrow.forward")
                                .font(.caption)
                        }
                        .buttonStyle(.bordered)
                        .disabled(!connectivityManager.isReachable)
                    }
                    .padding(.top, 8)

                    // 接続状態
                    HStack(spacing: 4) {
                        Circle()
                            .fill(connectivityManager.isReachable ? Color.green : Color.red)
                            .frame(width: 8, height: 8)
                        Text(connectivityManager.isReachable ? "接続中" : "未接続")
                            .font(.caption2)
                            .foregroundColor(.gray)
                    }
                } else {
                    Text("HealthKit の権限を\n許可してください")
                        .font(.caption)
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                        .padding()
                }
            }
            .padding(.horizontal, 4)
        }
        .onAppear {
            healthManager.startHeartRateMonitoring()
        }
    }
}

// 再利用可能なヘルスカードコンポーネント
struct HealthCard: View {
    let icon: String
    let iconColor: Color
    let title: String
    let value: String
    let unit: String

    var body: some View {
        HStack {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(iconColor)
                .frame(width: 30)

            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.caption2)
                    .foregroundColor(.gray)

                HStack(alignment: .lastTextBaseline, spacing: 2) {
                    Text(value)
                        .font(.title3)
                        .fontWeight(.bold)
                    Text(unit)
                        .font(.caption2)
                        .foregroundColor(.gray)
                }
            }
            Spacer()
        }
        .padding(10)
        .background(Color.gray.opacity(0.2))
        .cornerRadius(10)
    }
}

#Preview {
    ContentView()
}
