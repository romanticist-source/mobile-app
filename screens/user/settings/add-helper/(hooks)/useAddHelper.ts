import { useState } from 'react';
import { sendHelperConnectRequest } from '@/api/helper-connect';
import { getHelperByEmail } from '@/api/helpers';
import type { CreateHelperConnectRequest } from '@/_schema';

export function useAddHelper() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (helperEmail: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // First, get Helper ID from email
      const helper = await getHelperByEmail(helperEmail);

      if (!helper) {
        setError('指定されたメールアドレスのHelperが見つかりませんでした');
        return false;
      }

      // Then send connection request with Helper ID
      const data: CreateHelperConnectRequest = {
        helperId: helper.id,
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
