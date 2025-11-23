import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const USER_ID_STORAGE_KEY = '@selected_user_id';
const USER_LOCKED_STORAGE_KEY = '@user_locked';

interface UserContextType {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string) => Promise<void>;
  isLoading: boolean;
  isLocked: boolean;
  setIsLocked: (locked: boolean) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [selectedUserId, setSelectedUserIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLockedState] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const [storedUserId, storedLocked] = await Promise.all([
          AsyncStorage.getItem(USER_ID_STORAGE_KEY),
          AsyncStorage.getItem(USER_LOCKED_STORAGE_KEY),
        ]);
        if (storedUserId) {
          setSelectedUserIdState(storedUserId);
        }
        if (storedLocked) {
          setIsLockedState(storedLocked === 'true');
        }
      } catch (error) {
        console.error('Failed to load user data from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
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

  const setIsLocked = async (locked: boolean) => {
    try {
      await AsyncStorage.setItem(USER_LOCKED_STORAGE_KEY, locked.toString());
      setIsLockedState(locked);
    } catch (error) {
      console.error('Failed to save lock state to storage:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ selectedUserId, setSelectedUserId, isLoading, isLocked, setIsLocked }}>
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
