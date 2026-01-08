import { useState, useEffect, useCallback } from 'react';
import {
  getPendingRequests,
  approveHelperConnectRequest,
  rejectHelperConnectRequest,
} from '@/api/helper-connect';
import type { HelperConnectWithDetails } from '@/_schema';

export function useRequests() {
  const [requests, setRequests] = useState<HelperConnectWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('[useRequests] リクエスト取得中...');
      const data = await getPendingRequests();
      console.log('[useRequests] リクエスト取得完了:', data.length);
      setRequests(data);
    } catch (err: any) {
      console.error('[useRequests] リクエスト取得エラー:', err);
      setError(err.message || 'リクエストの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const approveRequest = async (id: string): Promise<boolean> => {
    try {
      console.log('[useRequests] リクエスト承認中:', id);
      await approveHelperConnectRequest(id);
      console.log('[useRequests] リクエスト承認完了');
      await fetchRequests(); // リストを再取得
      return true;
    } catch (err: any) {
      console.error('[useRequests] リクエスト承認エラー:', err);
      setError(err.message || '承認に失敗しました');
      return false;
    }
  };

  const rejectRequest = async (id: string): Promise<boolean> => {
    try {
      console.log('[useRequests] リクエスト拒否中:', id);
      await rejectHelperConnectRequest(id);
      console.log('[useRequests] リクエスト拒否完了');
      await fetchRequests(); // リストを再取得
      return true;
    } catch (err: any) {
      console.error('[useRequests] リクエスト拒否エラー:', err);
      setError(err.message || '拒否に失敗しました');
      return false;
    }
  };

  return {
    requests,
    loading,
    error,
    fetchRequests,
    approveRequest,
    rejectRequest,
  };
}
