import { useState, useEffect, useCallback } from 'react';
import {
  getHelpers,
  createHelper,
  updateHelper,
  deleteHelper,
} from '@/api/helpers';
import type { Helper, CreateHelper, UpdateHelper } from '@/_schema';

export interface HelperDisplay extends Helper {
  avatar: string;
  avatarColor: string;
}

const AVATAR_COLORS = ['#FFE5E5', '#E0F7F7', '#E3F2FD', '#FFF3E0', '#F3E5F5'];

const helperToDisplay = (helper: Helper, index: number): HelperDisplay => ({
  ...helper,
  avatar: helper.name.charAt(0),
  avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
});

export function useHelperManagement() {
  const [helpers, setHelpers] = useState<HelperDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchHelpers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getHelpers();
      const displayHelpers = data.map((helper, index) =>
        helperToDisplay(helper, index)
      );
      setHelpers(displayHelpers);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHelpers();
  }, [fetchHelpers]);

  const addHelper = useCallback(async (data: CreateHelper): Promise<Helper> => {
    try {
      setSaving(true);
      const newHelper = await createHelper(data);
      await fetchHelpers();
      return newHelper;
    } catch (err) {
      throw err;
    } finally {
      setSaving(false);
    }
  }, [fetchHelpers]);

  const editHelper = useCallback(async (id: string, data: UpdateHelper): Promise<Helper> => {
    try {
      setSaving(true);
      const updatedHelper = await updateHelper(id, data);
      await fetchHelpers();
      return updatedHelper;
    } catch (err) {
      throw err;
    } finally {
      setSaving(false);
    }
  }, [fetchHelpers]);

  const removeHelper = useCallback(async (id: string): Promise<void> => {
    try {
      setSaving(true);
      await deleteHelper(id);
      await fetchHelpers();
    } catch (err) {
      throw err;
    } finally {
      setSaving(false);
    }
  }, [fetchHelpers]);

  return {
    helpers,
    loading,
    error,
    saving,
    refetch: fetchHelpers,
    addHelper,
    editHelper,
    removeHelper,
  };
}
