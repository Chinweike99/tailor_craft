import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BASE_API_URL } from "./constants";
import { useAuthStore } from "@/store/authstore";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get token from cookie
function getTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth='));
  return authCookie ? authCookie.split('=')[1] : null;
}

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    let { token } = useAuthStore.getState();
    
    // Fallback to cookie if store is not yet hydrated
    if (!token) {
      token = getTokenFromCookie();
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;




// import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// import { BASE_API_URL } from "./constants";
// import { useAuthStore } from "@/store/authstore";

// const apiClient: AxiosInstance = axios.create({
//   baseURL: BASE_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Helper function to get token from cookie
// function getTokenFromCookie(): string | null {
//   if (typeof document === 'undefined') return null;
  
//   const cookies = document.cookie.split(';');
//   const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth='));
//   return authCookie ? authCookie.split('=')[1] : null;
// }

// // Request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     // Try to get token from store first, then from cookie
//     let token = useAuthStore.getState().token;
    
//     if (!token) {
//       token = getTokenFromCookie();
//     }
    
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response.data;
//   },
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       console.error("Authentication failed:", error.response?.data);
//       useAuthStore.getState().logout();
//     }
//     return Promise.reject(error.response?.data || error.message);
//   }
// );

// export default apiClient;