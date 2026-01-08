import { useEffect, useState } from "react";
import { watchEvents } from "react-native-watch-connectivity";

// Swift側からのデータ構造に合わせます
type WatchHealthData = {
  type?: string;
  hrv?: number; // ← 今回はここを使います
  // 他のデータも型定義しておくと安全ですが、省略も可能です
  heartRate?: number;
  oxygenLevel?: number;
  steps?: number;
};

export const useWatchHrv = () => {
  // 1. Stateの変数名を hrv に変更
  const [hrv, setHrv] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = watchEvents.on(
      "message",
      (message: WatchHealthData) => {
        console.log("Watchからデータを受信:", message);

        // 2. message.hrv を取り出すように変更
        // "healthData" というタイプで、かつ hrv が数値であることを確認
        if (message.type === "healthData" && typeof message.hrv === "number") {
          setHrv(message.hrv);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // 3. hrv を返します
  return hrv;
};
