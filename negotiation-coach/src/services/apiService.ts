import axios from 'axios';

// Create axios instance with base URL and default headers
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/users/register', { name, email, password });
    return response.data;
  },
  
  login: async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    
    // Store token and user data in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  updateProfile: async (userData: { name?: string; email?: string; password?: string }) => {
    const response = await api.put('/users/profile', userData);
    
    // Update stored user data
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  }
};

// Analysis services
export const analysisService = {
  createAnalysis: async (text: string, modelId: string) => {
    const response = await api.post('/analysis', { text, modelId });
    return response.data;
  },
  
  improveText: async (text: string, modelId: string, analysisId?: string) => {
    const response = await api.post('/analysis/improve', { text, modelId, analysisId });
    return response.data;
  },
  
  getAnalyses: async () => {
    const response = await api.get('/analysis');
    return response.data;
  },
  
  getAnalysisById: async (id: string) => {
    const response = await api.get(`/analysis/${id}`);
    return response.data;
  },
  
  deleteAnalysis: async (id: string) => {
    const response = await api.delete(`/analysis/${id}`);
    return response.data;
  }
};

// Feedback services
export const feedbackService = {
  submitFeedback: async (feedbackData: {
    analysisId: string;
    rating: number;
    comment?: string;
    modelId: string;
    suggestionType: 'analysis' | 'improvement';
  }) => {
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  },
  
  getFeedback: async () => {
    const response = await api.get('/feedback');
    return response.data;
  },
  
  getFeedbackStats: async () => {
    const response = await api.get('/feedback/stats');
    return response.data;
  }
};

export default {
  auth: authService,
  analysis: analysisService,
  feedback: feedbackService
};
