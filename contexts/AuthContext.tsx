import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  login as apiLogin,
  getCurrentAuth,
  logout as apiLogout,
  register as apiRegister,
} from '@/api/auth';
import type { LoginRequest, RegisterRequest, AuthRole, User, Helper } from '@/_schema';

const TOKEN_KEY = 'auth_token';
const ROLE_KEY = 'auth_role';

interface AuthContextType {
  user: User | null;
  helper: Helper | null;
  role: AuthRole | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [helper, setHelper] = useState<Helper | null>(null);
  const [role, setRole] = useState<AuthRole | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // アプリ起動時にトークンを確認して自動ログイン
  useEffect(() => {
    loadStoredToken();
  }, []);

  const loadStoredToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      const storedRole = (await AsyncStorage.getItem(ROLE_KEY)) as AuthRole | null;

      if (storedToken && storedRole) {
        setToken(storedToken);
        setRole(storedRole);

        // トークンが有効か確認
        const authData = await getCurrentAuth();
        setRole(authData.role);

        if (authData.role === 'user' && authData.user) {
          setUser(authData.user);
          setHelper(null);
        } else if (authData.role === 'helper' && authData.helper) {
          setHelper(authData.helper);
          setUser(null);
        }

        // ロールが変わった場合は更新
        if (storedRole !== authData.role) {
          await AsyncStorage.setItem(ROLE_KEY, authData.role);
        }
      }
    } catch (error) {
      console.error('トークンの読み込みエラー:', error);
      // トークンが無効な場合は削除
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(ROLE_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await apiLogin(credentials);
      setToken(response.token);
      setRole(response.role);

      if (response.role === 'user' && response.user) {
        setUser(response.user);
        setHelper(null);
      } else if (response.role === 'helper' && response.helper) {
        setHelper(response.helper);
        setUser(null);
      }

      await AsyncStorage.setItem(TOKEN_KEY, response.token);
      await AsyncStorage.setItem(ROLE_KEY, response.role);
    } catch (error) {
      console.error('ログインエラー:', error);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      console.log('API登録リクエスト送信中...', { role: data.role });
      const response = await apiRegister(data);
      console.log('API登録レスポンス受信:', {
        token: response.token ? '***' : null,
        role: response.role,
      });

      setToken(response.token);
      setRole(response.role);

      if (response.role === 'user' && response.user) {
        setUser(response.user);
        setHelper(null);
      } else if (response.role === 'helper' && response.helper) {
        setHelper(response.helper);
        setUser(null);
      }

      await AsyncStorage.setItem(TOKEN_KEY, response.token);
      await AsyncStorage.setItem(ROLE_KEY, response.role);
      console.log('トークン・ロール保存完了');
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
      setHelper(null);
      setRole(null);
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(ROLE_KEY);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, helper, role, token, isLoading, login, register, logout }}
    >
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
