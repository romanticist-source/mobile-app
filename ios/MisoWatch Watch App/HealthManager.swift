//
//  HealthManager.swift
//  MisoWatch Watch App
//
//  Created by 長谷川匠 on 2025/11/23.
//

import Foundation
import HealthKit
import Combine
import OSLog

// HRV データソースの種類
enum HRVDataSource {
    case healthKit      // Apple Watch HealthKit から取得
    case calculated     // リアルタイム測定から計算
    case none           // データなし

    var displayName: String {
        switch self {
        case .healthKit: return "HealthKit"
        case .calculated: return "Calculated"
        case .none: return "--"
        }
    }
}

@MainActor
class HealthManager: NSObject, ObservableObject, HKWorkoutSessionDelegate, HKLiveWorkoutBuilderDelegate {
    private let healthStore = HKHealthStore()
    private let logger = Logger(subsystem: "com.miso.watchapp", category: "HealthManager")

    @Published var heartRate: Int = 0
    @Published var oxygenLevel: Int = 0
    @Published var steps: Int = 0
    @Published var hrv: Double = 0
    @Published var hrvDataSource: HRVDataSource = .none
    @Published var isAuthorized: Bool = false
    @Published var isHRVMeasuring: Bool = false  // HRV測定中フラグ

    // HRV 関連の計算結果
    @Published var baselineHRV: Double = 0  // 過去7日間の平均HRV
    @Published var todayHRV: Double = 0      // 今日のHRV
    @Published var fatigueScore: Double = 0  // 疲労スコア

    // UserDefaults keys
    private let hrvStorageKey = "lastHRVValue"
    private let hrvTimestampKey = "lastHRVTimestamp"
    private let hrvSourceKey = "lastHRVSource"

    // ワークアウトセッション関連
    private var workoutSession: HKWorkoutSession?
    private var workoutBuilder: HKLiveWorkoutBuilder?
    private var collectedHeartRates: [Double] = []

    // 読み取りたいデータタイプ
    private let typesToRead: Set<HKObjectType> = [
        HKObjectType.quantityType(forIdentifier: .heartRate)!,
        HKObjectType.quantityType(forIdentifier: .oxygenSaturation)!,
        HKObjectType.quantityType(forIdentifier: .stepCount)!,
        HKObjectType.quantityType(forIdentifier: .heartRateVariabilitySDNN)!
    ]

    override init() {
        super.init()

        // ローカルストレージからHRVを読み込み
        loadHRVFromStorage()

        Task {
            await requestAuthorization()
        }
    }

    // HealthKit の権限をリクエスト
    func requestAuthorization() async {
        guard HKHealthStore.isHealthDataAvailable() else {
            logger.error("このデバイスではHealthKitが利用できません")
            print("HealthKit is not available on this device")
            return
        }

        logger.info("HealthKitの権限をリクエスト中...")
        do {
            try await healthStore.requestAuthorization(toShare: [], read: typesToRead)
            isAuthorized = true
            logger.info("HealthKitの権限が許可されました")
            await fetchAllData()
        } catch {
            logger.error("HealthKit権限の取得に失敗: \(error.localizedDescription)")
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

//  1.HRV(心拍の揺らぎ)
//  心拍のリズムが一定→HRVが低い=疲労/ストレス
//  心拍のリズムに揺らぎがでる→HRVが高い=健康/回復
//
//  取得データ：Heart Rate Variability SDNN(心拍変動)
//  計算：
//  ユーザーの過去7日間の平均HRV=ベースラインHRV
//  疲労スコア=(ベースラインHRV - 今日のHRV) / ベースラインHRV * 100
//  →0以上なら健康的、0より低いなら疲れている
//
//  2.RHRとの乖離
//  安静時心拍数を比較、普段より+5bpm以上高い場合は疲労
//
//  取得データ：Resting Heart Rate(安静時心拍数)

    /// HRV疲労スコアを計算
    /// ベースラインHRV（過去7日間の平均）と今日のHRVを比較して疲労度を算出
    /// スコアが0以上なら健康的、0より低いなら疲れている
    func calculateHRVFatigueScore() async {
        logger.info("開始: HRV疲労スコア計算")

        guard let hrvType = HKQuantityType.quantityType(forIdentifier: .heartRateVariabilitySDNN) else {
            logger.error("HRVタイプの作成に失敗しました")
            return
        }

        let hrvUnit = HKUnit.secondUnit(with: .milli)

        // 1. 過去7日間のHRVデータを取得してベースラインを計算
        let endDate = Date()
        let startDate = Calendar.current.date(byAdding: .day, value: -7, to: endDate) ?? endDate
        let weekPredicate = HKQuery.predicateForSamples(withStart: startDate, end: endDate, options: .strictStartDate)

        // 過去7日間のすべてのHRVサンプルを取得
        let weekQuery = HKSampleQuery(
            sampleType: hrvType,
            predicate: weekPredicate,
            limit: HKObjectQueryNoLimit,
            sortDescriptors: [NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: false)]
        ) { [weak self] _, samples, error in
            guard let self = self else { return }

            if let error = error {
                self.logger.error("過去7日間のHRVデータ取得エラー: \(error.localizedDescription)")
                return
            }

            guard let hrvSamples = samples as? [HKQuantitySample], !hrvSamples.isEmpty else {
                self.logger.warning("過去7日間にHRVデータが見つかりませんでした")
                return
            }

            // 過去7日間の平均HRVを計算
            let hrvValues = hrvSamples.map { $0.quantity.doubleValue(for: hrvUnit) }
            let averageHRV = hrvValues.reduce(0, +) / Double(hrvValues.count)

            self.logger.info("過去7日間のHRVサンプル数: \(hrvSamples.count)")
            self.logger.info("ベースラインHRV（7日間平均）: \(averageHRV) ms")

            // 2. 今日（過去24時間）のHRVデータを取得
            let todayStart = Calendar.current.date(byAdding: .hour, value: -24, to: Date()) ?? Date()
            let todayPredicate = HKQuery.predicateForSamples(withStart: todayStart, end: Date(), options: .strictStartDate)

            let todayQuery = HKSampleQuery(
                sampleType: hrvType,
                predicate: todayPredicate,
                limit: HKObjectQueryNoLimit,
                sortDescriptors: [NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: false)]
            ) { [weak self] _, todaySamples, error in
                guard let self = self else { return }

                if let error = error {
                    self.logger.error("今日のHRVデータ取得エラー: \(error.localizedDescription)")
                    return
                }

                guard let todayHRVSamples = todaySamples as? [HKQuantitySample], !todayHRVSamples.isEmpty else {
                    self.logger.warning("今日のHRVデータが見つかりませんでした")
                    return
                }

                // 今日のHRV平均を計算
                let todayHRVValues = todayHRVSamples.map { $0.quantity.doubleValue(for: hrvUnit) }
                let todayAverage = todayHRVValues.reduce(0, +) / Double(todayHRVValues.count)

                self.logger.info("今日のHRVサンプル数: \(todayHRVSamples.count)")
                self.logger.info("今日のHRV平均: \(todayAverage) ms")

                // 3. 疲労スコアを計算
                // 疲労スコア = (ベースラインHRV - 今日のHRV) / ベースラインHRV * 100
                let fatigue = ((averageHRV - todayAverage) / averageHRV) * 100

                self.logger.info("疲労スコア: \(fatigue)")

                // 判定結果をログ出力
                if fatigue >= 0 {
                    self.logger.info("判定: 健康的（スコア: \(fatigue)）")
                } else {
                    self.logger.info("判定: 疲れている（スコア: \(fatigue)）")
                }

                // メインスレッドで@Published変数を更新
                Task { @MainActor in
                    self.baselineHRV = averageHRV
                    self.todayHRV = todayAverage
                    self.fatigueScore = fatigue
                }
            }

            self.healthStore.execute(todayQuery)
        }

        healthStore.execute(weekQuery)
    }
  
    // HRV を取得
    // まずHealthKitから取得を試み、データがない場合はワークアウトセッションで測定
    func fetchHRV() async {
        logger.info("開始: HRVデータの取得")

        guard let hrvType = HKQuantityType.quantityType(forIdentifier: .heartRateVariabilitySDNN) else {
            logger.error("HRVタイプの作成に失敗しました")
            print("HRV: Failed to create HRV quantity type")
            return
        }

        // 過去7日間のデータを検索（Apple Watchは自動的にHRVを測定するが頻度が低いため）
        let endDate = Date()
        let startDate = Calendar.current.date(byAdding: .day, value: -7, to: endDate) ?? endDate
        let predicate = HKQuery.predicateForSamples(withStart: startDate, end: endDate, options: .strictStartDate)

        let sortDescriptor = NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: false)

        return await withCheckedContinuation { continuation in
            let query = HKSampleQuery(
                sampleType: hrvType,
                predicate: predicate,
                limit: 1,
                sortDescriptors: [sortDescriptor]
            ) { [weak self] _, samples, error in
                guard let self = self else {
                    continuation.resume()
                    return
                }

                if let error = error {
                    self.logger.error("HRVデータ取得エラー: \(error.localizedDescription)")
                    print("HRV: Error fetching HRV data: \(error.localizedDescription)")

                    // エラー時はフォールバック
                    Task { @MainActor in
                        self.logger.info("フォールバック: ワークアウトセッションでHRV測定を開始")
                        await self.measureHRVWithWorkout()
                        continuation.resume()
                    }
                    return
                }

                guard let sample = samples?.first as? HKQuantitySample else {
                    self.logger.warning("過去7日間にHRVデータが見つかりませんでした")
                    print("HRV: No HRV samples found in HealthKit (last 7 days)")

                    // データがない場合はフォールバック
                    Task { @MainActor in
                        self.logger.info("フォールバック: ワークアウトセッションでHRV測定を開始")
                        print("HRV: Starting workout session to measure HRV...")
                        await self.measureHRVWithWorkout()
                        continuation.resume()
                    }
                    return
                }

                let hrvUnit = HKUnit.secondUnit(with: .milli)
                let value = sample.quantity.doubleValue(for: hrvUnit)

                // データが古すぎる場合（24時間以上前）は警告を出す
                let hoursSinceMeasurement = Calendar.current.dateComponents([.hour], from: sample.startDate, to: Date()).hour ?? 0
                if hoursSinceMeasurement > 24 {
                    self.logger.info("HRVデータは\(hoursSinceMeasurement)時間前のものです")
                }

                self.logger.info("HRVデータ取得成功: \(value) ms (測定日時: \(sample.startDate))")
                print("HRV: Successfully fetched HRV value: \(value) ms (measured at: \(sample.startDate))")

                Task { @MainActor in
                    self.hrv = value
                    self.hrvDataSource = .healthKit
                    self.saveHRVToStorage(value: value, source: .healthKit)
                    continuation.resume()
                }
            }

            healthStore.execute(query)
        }
    }

    // HRV をローカルストレージに保存
    func saveHRVToStorage(value: Double, source: HRVDataSource) {
        UserDefaults.standard.set(value, forKey: hrvStorageKey)
        UserDefaults.standard.set(Date().timeIntervalSince1970, forKey: hrvTimestampKey)
        UserDefaults.standard.set(source.displayName, forKey: hrvSourceKey)
        logger.info("HRVをストレージに保存: \(value) ms (ソース: \(source.displayName))")
        print("HRV saved to storage: \(value) ms (source: \(source.displayName))")
    }

    // HRV をローカルストレージから読み込み
    func loadHRVFromStorage() {
        let storedValue = UserDefaults.standard.double(forKey: hrvStorageKey)
        let storedSource = UserDefaults.standard.string(forKey: hrvSourceKey) ?? ""

        if storedValue > 0 {
            hrv = storedValue

            // ソースを復元
            if storedSource == "HealthKit" {
                hrvDataSource = .healthKit
            } else if storedSource == "Calculated" {
                hrvDataSource = .calculated
            } else {
                hrvDataSource = .none
            }

            logger.info("ストレージからHRVを読み込み: \(storedValue) ms (ソース: \(storedSource))")
            print("HRV loaded from storage: \(storedValue) ms (source: \(storedSource))")
        } else {
            logger.info("ストレージにHRVデータがありません")
            hrvDataSource = .none
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

    // MARK: - HRV Calculation from R-R Intervals

    /// R-R間隔の配列からSDNN（標準偏差）を計算
    /// - Parameter rrIntervals: R-R間隔の配列（ミリ秒単位）
    /// - Returns: SDNN値（ミリ秒単位）、計算できない場合はnil
    private func calculateSDNN(from rrIntervals: [Double]) -> Double? {
        guard rrIntervals.count >= 2 else {
            logger.warning("SDNN計算: R-R間隔のサンプル数が不足しています（\(rrIntervals.count)個）")
            return nil
        }

        // 1. 平均値を計算
        let mean = rrIntervals.reduce(0, +) / Double(rrIntervals.count)

        // 2. 分散を計算（各値と平均値の差の二乗の平均）
        let squaredDifferences = rrIntervals.map { pow($0 - mean, 2) }
        let variance = squaredDifferences.reduce(0, +) / Double(rrIntervals.count)

        // 3. 標準偏差（SDNN）を計算
        let sdnn = sqrt(variance)

        logger.info("SDNN計算完了: \(sdnn) ms (サンプル数: \(rrIntervals.count), 平均R-R間隔: \(mean) ms)")

        return sdnn
    }

    /// 心拍数データからR-R間隔を推定
    /// - Parameter heartRates: 心拍数の配列（bpm）
    /// - Returns: R-R間隔の配列（ミリ秒単位）
    private func estimateRRIntervals(from heartRates: [Double]) -> [Double] {
        // 心拍数（bpm）からR-R間隔（ms）への変換
        // R-R間隔 = 60,000 / 心拍数
        return heartRates.map { hr in
            guard hr > 0 else { return 0 }
            return 60000.0 / hr
        }
    }

    // MARK: - Workout Session for HRV Measurement

    /// ワークアウトセッションを開始してHRVを測定
    /// 約60秒間心拍データを収集してSDNNを計算
    func measureHRVWithWorkout() async {
        logger.info("ワークアウトセッションを使用したHRV測定を開始")

        // 既に測定中の場合は停止
        if isHRVMeasuring {
            logger.warning("既にHRV測定中です")
            return
        }

        // ワークアウト設定
        let configuration = HKWorkoutConfiguration()
        configuration.activityType = .other
        configuration.locationType = .indoor

        do {
            // ワークアウトセッションを作成
            let session = try HKWorkoutSession(healthStore: healthStore, configuration: configuration)
            let builder = session.associatedWorkoutBuilder()

            // デリゲートを設定
            session.delegate = self
            builder.delegate = self

            // データソースを設定
            builder.dataSource = HKLiveWorkoutDataSource(
                healthStore: healthStore,
                workoutConfiguration: configuration
            )

            // プロパティに保存
            workoutSession = session
            workoutBuilder = builder

            // データ収集をリセット
            collectedHeartRates.removeAll()
            isHRVMeasuring = true

            // セッション開始
            session.startActivity(with: Date())
            try await builder.beginCollection(at: Date())

            logger.info("ワークアウトセッション開始成功")

            // 60秒後に自動停止
            Task {
                try? await Task.sleep(nanoseconds: 60_000_000_000) // 60秒
                await stopHRVMeasurement()
            }

        } catch {
            logger.error("ワークアウトセッション開始エラー: \(error.localizedDescription)")
            isHRVMeasuring = false
        }
    }

    /// HRV測定を停止して結果を計算
    func stopHRVMeasurement() async {
        logger.info("HRV測定を停止")

        guard let session = workoutSession, let builder = workoutBuilder else {
            logger.warning("ワークアウトセッションが存在しません")
            isHRVMeasuring = false
            return
        }

        // セッション終了
        session.end()

        do {
            try await builder.endCollection(at: Date())
            _ = try await builder.finishWorkout()

            // 収集したデータからHRVを計算
            if self.collectedHeartRates.count >= 30 {
                let rrIntervals = self.estimateRRIntervals(from: self.collectedHeartRates)
                if let sdnn = self.calculateSDNN(from: rrIntervals) {
                    self.hrv = sdnn
                    self.hrvDataSource = .calculated
                    self.saveHRVToStorage(value: sdnn, source: .calculated)
                    self.logger.info("HRV測定完了: \(sdnn) ms (収集サンプル数: \(self.collectedHeartRates.count))")
                } else {
                    self.logger.error("SDNN計算に失敗しました")
                }
            } else {
                self.logger.warning("心拍データが不足しています（\(self.collectedHeartRates.count)個）。最低30個必要です。")
            }

        } catch {
            logger.error("ワークアウト終了エラー: \(error.localizedDescription)")
        }

        // クリーンアップ
        workoutSession = nil
        workoutBuilder = nil
        collectedHeartRates.removeAll()
        isHRVMeasuring = false
    }

    // MARK: - HKWorkoutSessionDelegate

    nonisolated func workoutSession(
        _ workoutSession: HKWorkoutSession,
        didChangeTo toState: HKWorkoutSessionState,
        from fromState: HKWorkoutSessionState,
        date: Date
    ) {
        Task { @MainActor in
            logger.info("ワークアウトセッション状態変化: \(fromState.rawValue) -> \(toState.rawValue)")
        }
    }

    nonisolated func workoutSession(
        _ workoutSession: HKWorkoutSession,
        didFailWithError error: Error
    ) {
        Task { @MainActor in
            logger.error("ワークアウトセッションエラー: \(error.localizedDescription)")
            isHRVMeasuring = false
        }
    }

    // MARK: - HKLiveWorkoutBuilderDelegate

    nonisolated func workoutBuilder(
        _ workoutBuilder: HKLiveWorkoutBuilder,
        didCollectDataOf collectedTypes: Set<HKSampleType>
    ) {
        Task { @MainActor in
            // 心拍数データを収集
            for type in collectedTypes {
                guard let quantityType = type as? HKQuantityType,
                      quantityType == HKQuantityType.quantityType(forIdentifier: .heartRate) else { continue }

                if let statistics = workoutBuilder.statistics(for: quantityType),
                   let mostRecentQuantity = statistics.mostRecentQuantity() {
                    let heartRateUnit = HKUnit.count().unitDivided(by: .minute())
                    let heartRateValue = mostRecentQuantity.doubleValue(for: heartRateUnit)

                    self.collectedHeartRates.append(heartRateValue)
                    self.logger.debug("心拍データ収集: \(heartRateValue) bpm (合計: \(self.collectedHeartRates.count)個)")
                }
            }
        }
    }

    nonisolated func workoutBuilderDidCollectEvent(_ workoutBuilder: HKLiveWorkoutBuilder) {
        // イベント収集時の処理（必要に応じて実装）
    }
}
