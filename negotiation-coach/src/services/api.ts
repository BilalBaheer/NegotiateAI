import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5002/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API endpoints
export const authAPI = {
  register: async (userData: { name: string; email: string; password: string }) => {
    try {
      const response = await api.post('/users/register', userData);
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  },
  
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/users/login', credentials);
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  },
  
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to get profile' 
      };
    }
  },
  
  updateProfile: async (userData: any) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update profile' 
      };
    }
  }
};

// Analysis API endpoints
export const analysisAPI = {
  createAnalysis: async (analysisData: any) => {
    try {
      const response = await api.post('/analysis', analysisData);
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to create analysis' 
      };
    }
  },
  
  getAnalyses: async () => {
    try {
      const response = await api.get('/analysis');
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to get analyses' 
      };
    }
  },
  
  getAnalysisById: async (id: string) => {
    try {
      const response = await api.get(`/analysis/${id}`);
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to get analysis' 
      };
    }
  }
};

// Feedback API endpoints
export const feedbackAPI = {
  createFeedback: async (feedbackData: any) => {
    try {
      const response = await api.post('/feedback', feedbackData);
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to create feedback' 
      };
    }
  },
  
  getFeedback: async () => {
    try {
      const response = await api.get('/feedback');
      return response.data;
    } catch (error: any) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to get feedback' 
      };
    }
  }
};

export default api;
