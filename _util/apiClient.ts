import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const createApiError = (errorMessage: string, errorCode: number) => {
    const error = new Error(errorMessage) as Error & { errorCode: number };
    error.errorCode = errorCode;
    error.name = "ApiError";
    return error;
};

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Axiosクライアントのインスタンスを作成
const createApiClient = (): AxiosInstance => {
    const client = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // 成功時のハンドラー
    const handleSuccess = (response: AxiosResponse) => response;

    // エラー時のハンドラー
    const handleError = (error: AxiosError): Promise<Error> => {
        const errorMessage =
            (error.response?.data as { errorMessage?: string })?.errorMessage ??
            error.message;
        const errorCode = error.response?.status ?? 500;
        return Promise.reject(createApiError(errorMessage, errorCode));
    };

    // インターセプターの設定
    client.interceptors.response.use(handleSuccess, handleError);

    return client;
};

const apiClient = createApiClient();

export const apiGet = async (url: string) => {
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const apiPost = async (url: string, data?: unknown) => {
    try {
        const response = await apiClient.post(url, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const apiPut = async (url: string, data?: unknown) => {
    try {
        const response = await apiClient.put(url, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const apiPatch = async (url: string, data?: unknown) => {
    try {
        const response = await apiClient.patch(url, data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const apiDelete = async (url: string) => {
    try {
        const response = await apiClient.delete(url);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};
