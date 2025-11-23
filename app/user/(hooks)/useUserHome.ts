import { useState, useCallback } from 'react';

export function useUserHome() {
  const [showHelpModal, setShowHelpModal] = useState(false);

  const openHelpModal = useCallback(() => setShowHelpModal(true), []);
  const closeHelpModal = useCallback(() => setShowHelpModal(false), []);

  return {
    showHelpModal,
    openHelpModal,
    closeHelpModal,
  };
}
