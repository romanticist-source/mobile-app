import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const HELPER_ID_STORAGE_KEY = '@selected_helper_id';

interface HelperContextType {
  selectedHelperId: string | null;
  setSelectedHelperId: (helperId: string) => Promise<void>;
  isLoading: boolean;
}

const HelperContext = createContext<HelperContextType | undefined>(undefined);

interface HelperProviderProps {
  children: ReactNode;
}

export function HelperProvider({ children }: HelperProviderProps) {
  const [selectedHelperId, setSelectedHelperIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHelperId = async () => {
      try {
        const storedHelperId = await AsyncStorage.getItem(HELPER_ID_STORAGE_KEY);
        if (storedHelperId) {
          setSelectedHelperIdState(storedHelperId);
        }
      } catch (error) {
        console.error('Failed to load helper ID from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadHelperId();
  }, []);

  const setSelectedHelperId = async (helperId: string) => {
    try {
      await AsyncStorage.setItem(HELPER_ID_STORAGE_KEY, helperId);
      setSelectedHelperIdState(helperId);
    } catch (error) {
      console.error('Failed to save helper ID to storage:', error);
      throw error;
    }
  };

  return (
    <HelperContext.Provider value={{ selectedHelperId, setSelectedHelperId, isLoading }}>
      {children}
    </HelperContext.Provider>
  );
}

export function useHelper() {
  const context = useContext(HelperContext);
  if (context === undefined) {
    throw new Error('useHelper must be used within a HelperProvider');
  }
  return context;
}
