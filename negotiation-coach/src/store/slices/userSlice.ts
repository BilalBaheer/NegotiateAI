import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  isAuthenticated: boolean;
  user: {
    _id?: string;
    name?: string;
    email?: string;
    industry?: string;
    preferredModelId?: string;
  } | null;
  preferences: {
    darkMode: boolean;
    notificationsEnabled: boolean;
  };
}

// Initial state - we'll check auth status by making an API call
const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  preferences: {
    darkMode: false,
    notificationsEnabled: true,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ _id: string; name: string; email: string; industry?: string; preferredModelId?: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
    },
    updateUserProfile: (state, action: PayloadAction<Partial<NonNullable<UserState['user']>>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    setAuthState: (state, action: PayloadAction<{ isAuthenticated: boolean; user: UserState['user'] }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    }
  },
});

export const { loginSuccess, logoutSuccess, updatePreferences, updateUserProfile, setAuthState } = userSlice.actions;

// Async action creators
export const login = (userData: { email: string; password: string }) => async (dispatch: any) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
    const response = await axios.post(`${apiUrl}/users/login`, userData, {
      withCredentials: true, // Important for cookies to be sent and received
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data.success) {
      dispatch(loginSuccess(response.data.user));
      return response.data;
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    throw error;
  }
};

export const register = (userData: { name: string; email: string; password: string }) => async (dispatch: any) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
    const response = await axios.post(`${apiUrl}/users/register`, userData, {
      withCredentials: true // Important for cookies to be sent and received
    });
    
    dispatch(loginSuccess(response.data.user));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
    await axios.post(`${apiUrl}/users/logout`, {}, {
      withCredentials: true // Important for cookies to be sent and received
    });
    
    dispatch(logoutSuccess());
  } catch (error) {
    console.error('Logout error:', error);
    // Still logout on the client side even if server logout fails
    dispatch(logoutSuccess());
    throw error;
  }
};

export const checkAuth = () => async (dispatch: any) => {
  try {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
    const response = await axios.get(`${apiUrl}/users/profile`, {
      withCredentials: true // Important for cookies to be sent and received
    });
    
    if (response.data.success) {
      dispatch(setAuthState({
        isAuthenticated: true,
        user: response.data.user
      }));
    }
  } catch (error) {
    // If there's an error, user is not authenticated
    dispatch(setAuthState({
      isAuthenticated: false,
      user: null
    }));
    console.error('Auth check error:', error);
  }
};

export default userSlice.reducer;
