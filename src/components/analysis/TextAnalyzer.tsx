import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select,
  SelectChangeEvent,
  MenuItem, 
  CircularProgress,
  Divider,
  Paper,
  Chip,
  Alert,
  Snackbar
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { 
  analyzeText, 
  getImprovedText, 
  setCurrentText, 
  setSelectedModelId 
} from '../../store/slices/analysisSlice';
import { AnalysisResult } from '../../services/aiService';
import { industryModels } from '../../models/industryModels';
import AnalysisResults from './AnalysisResults';
import ComparativeAnalysis from './ComparativeAnalysis';

interface AnalysisState {
  currentText: string;
  selectedModelId: string;
  analysisResult: AnalysisResult | null;
  improvedText: string | null;
  comparativeAnalysis: any | null;
  loading: boolean;
  error: string | null;
}

const TextAnalyzer: React.FC = () => {
  const dispatch = useDispatch();
  const { 
    currentText, 
    selectedModelId, 
    analysisResult, 
    improvedText, 
    comparativeAnalysis,
    loading, 
    error 
  } = useSelector((state: RootState) => state.analysis as AnalysisState);
  
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setCurrentText(e.target.value));
  };
  
  const handleModelChange = (e: SelectChangeEvent<string>) => {
    dispatch(setSelectedModelId(e.target.value));
  };
  
  const handleAnalyzeClick = () => {
    if (!currentText.trim()) {
      setSnackbarMessage('Please enter some text to analyze');
      setShowSnackbar(true);
      return;
    }
    
    dispatch(analyzeText({ text: currentText, modelId: selectedModelId }) as any);
  };
  
  const handleImproveClick = () => {
    if (!currentText.trim()) {
      setSnackbarMessage('Please enter some text to improve');
      setShowSnackbar(true);
      return;
    }
    
    console.log('Improving text with model:', selectedModelId);
    dispatch(getImprovedText({ text: currentText, modelId: selectedModelId }) as any);
  };
  
  const handleCopyImproved = () => {
    if (improvedText) {
      navigator.clipboard.writeText(improvedText);
      setSnackbarMessage('Improved text copied to clipboard');
      setShowSnackbar(true);
    }
  };
  
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Negotiation Text Analysis
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Paste your negotiation text below to receive AI-powered analysis and suggestions for improvement.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Negotiation Text
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="model-select-label">Industry Model</InputLabel>
                <Select
                  labelId="model-select-label"
                  value={selectedModelId}
                  label="Industry Model"
                  onChange={handleModelChange}
                >
                  {industryModels.map((model) => (
                    <MenuItem key={model.id} value={model.id}>
                      {model.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                label="Enter your negotiation text"
                multiline
                rows={10}
                value={currentText}
                onChange={handleTextChange}
                fullWidth
                variant="outlined"
                placeholder="e.g., I'm writing to discuss the terms of our contract. I believe the current pricing structure doesn't reflect the value we bring to the table..."
              />
              
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleAnalyzeClick}
                  disabled={loading}
                  fullWidth
                >
                  {loading && !improvedText ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Analyze Text'
                  )}
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={handleImproveClick}
                  disabled={loading}
                  fullWidth
                >
                  {loading && improvedText ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Improve Text'
                  )}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          {loading ? (
            <Card elevation={2} sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardContent sx={{ textAlign: 'center', py: 8 }}>
                <CircularProgress size={60} thickness={4} />
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  {analysisResult ? 'Improving Text...' : 'Analyzing Text...'}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <>
              {analysisResult && !improvedText && (
                <AnalysisResults result={analysisResult} />
              )}
              
              {improvedText && (
                <Card elevation={2}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        Improved Text
                      </Typography>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={handleCopyImproved}
                      >
                        Copy to Clipboard
                      </Button>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        bgcolor: 'background.default',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {improvedText}
                      </Typography>
                    </Paper>
                    
                    {comparativeAnalysis && (
                      <ComparativeAnalysis comparativeData={comparativeAnalysis} />
                    )}
                  </CardContent>
                </Card>
              )}
              
              {!analysisResult && !improvedText && (
                <Card elevation={2} sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CardContent sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No Analysis Yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enter your negotiation text and click "Analyze Text" to get started.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </Grid>
      </Grid>
      
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default TextAnalyzer;
