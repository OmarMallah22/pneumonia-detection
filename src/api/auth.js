import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance for auth
const authAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
authAxios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("Auth API Error:", error);

    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  /**
   * Login user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} User data and token
   */
  login: async (email, password) => {
    // For demo purposes, simulate API response
    // In production, uncomment the line below
    // return await authAxios.post('/auth/login', { email, password })

    // DEMO SIMULATION - Remove in production
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "demo@medical.com" && password === "demo123") {
          resolve({
            token: "demo_jwt_token_" + Date.now(),
            user: {
              id: 1,
              name: "Dr. Demo User",
              email: "demo@medical.com",
              role: "doctor",
            },
          });
        } else {
          reject({
            response: {
              data: { message: "Invalid email or password" },
            },
          });
        }
      }, 1000);
    });
  },

  /**
   * Register new user
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} User data and token
   */
  register: async (name, email, password) => {
    // For demo purposes, simulate API response
    // In production, uncomment the line below
    // return await authAxios.post('/auth/register', { name, email, password })

    // DEMO SIMULATION - Remove in production
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          resolve({
            token: "demo_jwt_token_" + Date.now(),
            user: {
              id: Date.now(),
              name: name,
              email: email,
              role: "doctor",
            },
          });
        } else {
          reject({
            response: {
              data: { message: "All fields are required" },
            },
          });
        }
      }, 1000);
    });
  },

  /**
   * Get current user info
   * @returns {Promise<Object>} Current user data
   */
  getCurrentUser: async () => {
    // For demo purposes, simulate API response
    // In production, uncomment the line below
    // return await authAxios.get('/auth/me')

    // DEMO SIMULATION - Remove in production
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          name: "Dr. Demo User",
          email: "demo@medical.com",
          role: "doctor",
        });
      }, 500);
    });
  },
};
