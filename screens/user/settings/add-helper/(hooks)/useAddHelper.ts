import { useState } from 'react';
import { sendHelperConnectRequest } from '@/api/helper-connect';
import type { CreateHelperConnectRequest } from '@/_schema';

export function useAddHelper() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (helperEmail: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const data: CreateHelperConnectRequest = {
        helperEmail,
      };

      await sendHelperConnectRequest(data);
      return true;
    } catch (err: any) {
      console.error('[useAddHelper] リクエスト送信エラー:', err);
      setError(err.message || 'リクエストの送信に失敗しました');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendRequest,
  };
}
