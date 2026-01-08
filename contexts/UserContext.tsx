import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

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
  const { user, helper, role } = useAuth();
  const [selectedUserId, setSelectedUserIdState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ログイン中のユーザーIDを自動的に設定
  useEffect(() => {
    if (role === 'user' && user) {
      setSelectedUserIdState(user.id);
      setIsLoading(false);
    } else if (role === 'helper' && helper) {
      // Helper用は別途処理が必要な場合はここに追加
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user, helper, role]);

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

UserProvider.displayName = 'UserProvider';

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
