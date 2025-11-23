import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const USER_ID_STORAGE_KEY = '@selected_user_id';

interface UserContextType {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string) => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [selectedUserId, setSelectedUserIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem(USER_ID_STORAGE_KEY);
        if (storedUserId) {
          setSelectedUserIdState(storedUserId);
        }
      } catch (error) {
        console.error('Failed to load user ID from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserId();
  }, []);

  const setSelectedUserId = async (userId: string) => {
    try {
      await AsyncStorage.setItem(USER_ID_STORAGE_KEY, userId);
      setSelectedUserIdState(userId);
    } catch (error) {
      console.error('Failed to save user ID to storage:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ selectedUserId, setSelectedUserId, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
