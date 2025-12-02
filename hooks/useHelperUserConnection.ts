import { useState, useEffect } from 'react';
import { getHelperUserConnection, type HelperUserConnection } from '@/api/helper-connect';
import { useHelper } from '@/contexts/HelperContext';

/**
 * Hook to get User ID from current Helper ID
 * Automatically fetches the connected user when helper is selected
 */
export function useHelperUserConnection() {
  const { selectedHelperId, isLoading: isHelperLoading } = useHelper();
  const [userId, setUserId] = useState<string | null>(null);
  const [connectionData, setConnectionData] = useState<HelperUserConnection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!selectedHelperId || isHelperLoading) {
      console.log('[useHelperUserConnection] Waiting for helper selection...');
      setLoading(false);
      return;
    }

    console.log('[useHelperUserConnection] Current Helper ID:', selectedHelperId);

    const fetchConnection = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('[useHelperUserConnection] Fetching connection data from API...');
        console.log('[useHelperUserConnection] Endpoint: /helper-connect/' + selectedHelperId);

        // Fetch full connection data
        const connection = await getHelperUserConnection(selectedHelperId);

        console.log('[useHelperUserConnection] ✅ API Response:', JSON.stringify(connection, null, 2));
        console.log('[useHelperUserConnection] Connected User ID:', connection.userId);

        setConnectionData(connection);
        setUserId(connection.userId);
      } catch (err) {
        console.error('[useHelperUserConnection] ❌ API Error:', err);
        console.error('[useHelperUserConnection] Error details:', {
          message: (err as Error).message,
          name: (err as Error).name,
          stack: (err as Error).stack,
        });
        setError(err as Error);
        setUserId(null);
        setConnectionData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchConnection();
  }, [selectedHelperId, isHelperLoading]);

  /**
   * Manually refetch the connection data
   */
  const refetch = async () => {
    if (!selectedHelperId) return;

    try {
      setLoading(true);
      setError(null);
      const connection = await getHelperUserConnection(selectedHelperId);
      setConnectionData(connection);
      setUserId(connection.userId);
    } catch (err) {
      console.error('Failed to refetch helper-user connection:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    /** The user ID connected to the current helper */
    userId,
    /** Full connection data (helperId, userId, timestamps) */
    connectionData,
    /** Loading state */
    loading,
    /** Error object if fetch failed */
    error,
    /** Manually refetch the connection */
    refetch,
    /** Current helper ID from context */
    helperId: selectedHelperId,
  };
}
