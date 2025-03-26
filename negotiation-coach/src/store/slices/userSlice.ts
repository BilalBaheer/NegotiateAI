import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  user: {
    id?: string;
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
    login: (state, action: PayloadAction<{ id: string; name: string; email: string; industry?: string; preferredModelId?: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
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
  },
});

export const { login, logout, updatePreferences, updateUserProfile } = userSlice.actions;

export default userSlice.reducer;
