import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import aiService, { AnalysisResult } from '../../services/aiService';

interface AnalysisState {
  currentText: string;
  selectedModelId: string;
  analysisResult: AnalysisResult | null;
  improvedText: string | null;
  comparativeAnalysis: any | null;
  analysisHistory: {
    id: string;
    date: string;
    text: string;
    result: AnalysisResult;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: AnalysisState = {
  currentText: '',
  selectedModelId: 'general',
  analysisResult: null,
  improvedText: null,
  comparativeAnalysis: null,
  analysisHistory: [],
  loading: false,
  error: null,
};

export const analyzeText = createAsyncThunk(
  'analysis/analyzeText',
  async ({ text, modelId }: { text: string; modelId: string }, { rejectWithValue }) => {
    try {
      const result = await aiService.analyzeText(text, modelId);
      return result;
    } catch (error) {
      return rejectWithValue('Failed to analyze text. Please try again.');
    }
  }
);

export const getImprovedText = createAsyncThunk(
  'analysis/getImprovedText',
  async ({ text, modelId }: { text: string; modelId: string }, { rejectWithValue }) => {
    try {
      const result = await aiService.getImprovedTextWithComparison(text, modelId);
      return result;
    } catch (error) {
      return rejectWithValue('Failed to get improved text. Please try again.');
    }
  }
);

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setCurrentText: (state, action: PayloadAction<string>) => {
      state.currentText = action.payload;
    },
    setSelectedModelId: (state, action: PayloadAction<string>) => {
      state.selectedModelId = action.payload;
    },
    clearAnalysisResult: (state) => {
      state.analysisResult = null;
      state.improvedText = null;
      state.comparativeAnalysis = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeText.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.analysisResult = null; // Clear previous results when starting a new analysis
        state.improvedText = null; // Also clear any improved text
        state.comparativeAnalysis = null;
      })
      .addCase(analyzeText.fulfilled, (state, action) => {
        state.loading = false;
        state.analysisResult = action.payload;
        
        // Add to history
        const newHistoryItem = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          text: state.currentText,
          result: action.payload,
        };
        
        state.analysisHistory = [newHistoryItem, ...state.analysisHistory];
      })
      .addCase(analyzeText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getImprovedText.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.improvedText = null; // Clear previous improved text
        state.comparativeAnalysis = null;
      })
      .addCase(getImprovedText.fulfilled, (state, action) => {
        state.loading = false;
        
        // Check if the payload has the expected structure
        if (action.payload && typeof action.payload === 'object') {
          // If it's the new structure with comparativeAnalysis
          if ('improvedText' in action.payload && 'comparativeAnalysis' in action.payload) {
            state.improvedText = action.payload.improvedText;
            state.comparativeAnalysis = action.payload.comparativeAnalysis;
            
            // If we have analysis results, add the improved text to history with the improved score
            if (state.comparativeAnalysis) {
              const newHistoryItem = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                text: state.improvedText,
                result: {
                  score: state.comparativeAnalysis.improvedScore,
                  tone: state.analysisResult?.tone || 'Improved',
                  sentiment: state.analysisResult?.sentiment || 'Positive',
                  persuasiveStrength: state.comparativeAnalysis.improvedPersuasiveness,
                  strengths: state.analysisResult?.strengths || [],
                  weaknesses: [],
                  suggestions: [],
                },
              };
              
              state.analysisHistory = [newHistoryItem, ...state.analysisHistory];
            }
          } else {
            // Handle the old format for backward compatibility
            state.improvedText = action.payload as unknown as string;
          }
        } else {
          // Fallback for unexpected payload format
          console.error('Unexpected payload format:', action.payload);
          state.error = 'Unexpected response format from the server';
        }
      })
      .addCase(getImprovedText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setCurrentText, 
  setSelectedModelId, 
  clearAnalysisResult,
  clearError,
} = analysisSlice.actions;

export default analysisSlice.reducer;
