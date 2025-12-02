//
//  HealthManager.swift
//  MisoWatch Watch App
//
//  Created by 長谷川匠 on 2025/11/23.
//

import Foundation
import HealthKit
import Combine

@MainActor
class HealthManager: ObservableObject {
    private let healthStore = HKHealthStore()

    @Published var heartRate: Int = 0
    @Published var oxygenLevel: Int = 0
    @Published var steps: Int = 0
    @Published var hrv: Double = 0
    @Published var isAuthorized: Bool = false

    // UserDefaults keys
    private let hrvStorageKey = "lastHRVValue"
    private let hrvTimestampKey = "lastHRVTimestamp"

    // 読み取りたいデータタイプ
    private let typesToRead: Set<HKObjectType> = [
        HKObjectType.quantityType(forIdentifier: .heartRate)!,
        HKObjectType.quantityType(forIdentifier: .oxygenSaturation)!,
        HKObjectType.quantityType(forIdentifier: .stepCount)!,
        HKObjectType.quantityType(forIdentifier: .heartRateVariabilitySDNN)!
    ]

    init() {
        // ローカルストレージからHRVを読み込み
        loadHRVFromStorage()

        Task {
            await requestAuthorization()
        }
    }

    // HealthKit の権限をリクエスト
    func requestAuthorization() async {
        guard HKHealthStore.isHealthDataAvailable() else {
            print("HealthKit is not available on this device")
            return
        }

        do {
            try await healthStore.requestAuthorization(toShare: [], read: typesToRead)
            isAuthorized = true
            await fetchAllData()
        } catch {
            print("HealthKit authorization failed: \(error.localizedDescription)")
        }
    }

    // 全データを取得
    func fetchAllData() async {
        await fetchHeartRate()
        await fetchOxygenSaturation()
        await fetchSteps()
        await fetchHRV()
    }

    // 心拍数を取得
    func fetchHeartRate() async {
        guard let heartRateType = HKQuantityType.quantityType(forIdentifier: .heartRate) else { return }

        let sortDescriptor = NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: false)
        let query = HKSampleQuery(
            sampleType: heartRateType,
            predicate: nil,
            limit: 1,
            sortDescriptors: [sortDescriptor]
        ) { [weak self] _, samples, error in
            guard let sample = samples?.first as? HKQuantitySample else { return }

            let heartRateUnit = HKUnit.count().unitDivided(by: .minute())
            let value = Int(sample.quantity.doubleValue(for: heartRateUnit))

            Task { @MainActor in
                self?.heartRate = value
            }
        }

        healthStore.execute(query)
    }

    // 血中酸素濃度を取得
    func fetchOxygenSaturation() async {
        guard let oxygenType = HKQuantityType.quantityType(forIdentifier: .oxygenSaturation) else { return }

        let sortDescriptor = NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: false)
        let query = HKSampleQuery(
            sampleType: oxygenType,
            predicate: nil,
            limit: 1,
            sortDescriptors: [sortDescriptor]
        ) { [weak self] _, samples, error in
            guard let sample = samples?.first as? HKQuantitySample else { return }

            let value = Int(sample.quantity.doubleValue(for: .percent()) * 100)

            Task { @MainActor in
                self?.oxygenLevel = value
            }
        }

        healthStore.execute(query)
    }

    // 歩数を取得（今日の合計）
    func fetchSteps() async {
        guard let stepType = HKQuantityType.quantityType(forIdentifier: .stepCount) else { return }

        let now = Date()
        let startOfDay = Calendar.current.startOfDay(for: now)
        let predicate = HKQuery.predicateForSamples(withStart: startOfDay, end: now, options: .strictStartDate)

        let query = HKStatisticsQuery(
            quantityType: stepType,
            quantitySamplePredicate: predicate,
            options: .cumulativeSum
        ) { [weak self] _, result, error in
            guard let sum = result?.sumQuantity() else { return }

            let value = Int(sum.doubleValue(for: .count()))

            Task { @MainActor in
                self?.steps = value
            }
        }

        healthStore.execute(query)
    }

    // 心拍数のリアルタイム監視を開始
    func startHeartRateMonitoring() {
        guard let heartRateType = HKQuantityType.quantityType(forIdentifier: .heartRate) else { return }

        let query = HKObserverQuery(sampleType: heartRateType, predicate: nil) { [weak self] _, _, error in
            if error == nil {
                Task {
                    await self?.fetchHeartRate()
                }
            }
        }

        healthStore.execute(query)
    }

    // MARK: - HRV (Heart Rate Variability) Functions

    // HRV を取得
    func fetchHRV() async {
        guard let hrvType = HKQuantityType.quantityType(forIdentifier: .heartRateVariabilitySDNN) else { return }

        let sortDescriptor = NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: false)
        let query = HKSampleQuery(
            sampleType: hrvType,
            predicate: nil,
            limit: 1,
            sortDescriptors: [sortDescriptor]
        ) { [weak self] _, samples, error in
            guard let sample = samples?.first as? HKQuantitySample else { return }

            let hrvUnit = HKUnit.secondUnit(with: .milli)
            let value = sample.quantity.doubleValue(for: hrvUnit)

            Task { @MainActor in
                self?.hrv = value
                self?.saveHRVToStorage(value: value)
            }
        }

        healthStore.execute(query)
    }

    // HRV をローカルストレージに保存
    func saveHRVToStorage(value: Double) {
        UserDefaults.standard.set(value, forKey: hrvStorageKey)
        UserDefaults.standard.set(Date().timeIntervalSince1970, forKey: hrvTimestampKey)
        print("HRV saved to storage: \(value) ms")
    }

    // HRV をローカルストレージから読み込み
    func loadHRVFromStorage() {
        let storedValue = UserDefaults.standard.double(forKey: hrvStorageKey)
        if storedValue > 0 {
            hrv = storedValue
            print("HRV loaded from storage: \(storedValue) ms")
        }
    }

    // 保存されたHRVの更新日時を取得
    func getHRVTimestamp() -> Date? {
        let timestamp = UserDefaults.standard.double(forKey: hrvTimestampKey)
        return timestamp > 0 ? Date(timeIntervalSince1970: timestamp) : nil
    }

    // HRV を計算してストレージに保存（取得と保存を一括処理）
    func calculateAndSaveHRV() async {
        await fetchHRV()
    }
}
