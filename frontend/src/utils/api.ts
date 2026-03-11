const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
    error?: string;
}

export const api = {
    async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const token = localStorage.getItem('token');

        const headers: Record<string, string> = {
            ...(options.headers as Record<string, string>),
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
            headers['x-auth-token'] = token; // Compatibility with legacy header if needed
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const result: ApiResponse<T> = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong');
        }

        return result.data;
    },

    get<T = any>(endpoint: string, options: RequestInit = {}) {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    },

    post<T = any>(endpoint: string, body: any, options: RequestInit = {}) {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            headers: body instanceof FormData ? {} : { 'Content-Type': 'application/json', ...options.headers },
            body: body instanceof FormData ? body : JSON.stringify(body),
        });
    },

    patch<T = any>(endpoint: string, body: any, options: RequestInit = {}) {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PATCH',
            headers: body instanceof FormData ? {} : { 'Content-Type': 'application/json', ...options.headers },
            body: body instanceof FormData ? body : JSON.stringify(body),
        });
    }
};
