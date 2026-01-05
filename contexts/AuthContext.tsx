import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, getCurrentUser, logout as apiLogout, register as apiRegister } from '@/api/auth';
import type { LoginRequest, RegisterRequest } from '@/api/auth';
import type { User } from '@/_schema';

const TOKEN_KEY = 'auth_token';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // アプリ起動時にトークンを確認して自動ログイン
  useEffect(() => {
    loadStoredToken();
  }, []);

  const loadStoredToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        setToken(storedToken);
        // トークンが有効か確認
        const userData = await getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('トークンの読み込みエラー:', error);
      // トークンが無効な場合は削除
      await AsyncStorage.removeItem(TOKEN_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await apiLogin(credentials);
      setToken(response.token);
      setUser(response.user);
      await AsyncStorage.setItem(TOKEN_KEY, response.token);
    } catch (error) {
      console.error('ログインエラー:', error);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      console.log('API登録リクエスト送信中...');
      const response = await apiRegister(data);
      console.log('API登録レスポンス受信:', { token: response.token ? '***' : null, user: response.user });
      setToken(response.token);
      setUser(response.user);
      await AsyncStorage.setItem(TOKEN_KEY, response.token);
      console.log('トークン保存完了');
    } catch (error) {
      console.error('登録エラー (AuthContext):', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('ログアウトエラー:', error);
    } finally {
      setToken(null);
      setUser(null);
      await AsyncStorage.removeItem(TOKEN_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
