import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Snackbar,
  Alert,
  Paper,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { SentimentSatisfiedAlt, SentimentVeryDissatisfied } from '@mui/icons-material';
import feedbackService, { FeedbackData } from '../../services/feedbackService';

interface FeedbackFormProps {
  analysisId: string;
  modelId: string;
  suggestionType: 'analysis' | 'improvement';
  originalText: string;
  improvedText?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  analysisId,
  modelId,
  suggestionType,
  originalText,
  improvedText
}) => {
  const theme = useTheme();
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    setRating(newValue);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (rating === null) {
      setSnackbarMessage('Please provide a rating before submitting');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
      return;
    }

    setSubmitting(true);

    const feedbackData: FeedbackData = {
      analysisId,
      rating,
      comment: comment.trim() || undefined,
      modelId,
      suggestionType,
      originalText,
      improvedText,
      timestamp: new Date().toISOString()
    };

    try {
      const result = await feedbackService.submitFeedback(feedbackData);
      
      if (result.success) {
        setSnackbarMessage(result.message);
        setSnackbarSeverity('success');
        setSubmitted(true);
      } else {
        setSnackbarMessage(result.message);
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setSnackbarMessage('An unexpected error occurred. Please try again later.');
      setSnackbarSeverity('error');
    } finally {
      setSubmitting(false);
      setShowSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  if (submitted) {
    return (
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.2),
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          textAlign: 'center'
        }}
      >
        <SentimentSatisfiedAlt 
          sx={{ 
            fontSize: 48, 
            color: theme.palette.primary.main,
            mb: 2
          }} 
        />
        <Typography variant="h6" gutterBottom>
          Thank You for Your Feedback!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your input helps us improve our AI suggestions and provide better assistance for future negotiations.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Rate this AI Suggestion
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Your feedback helps us improve our AI and provide better suggestions in the future.
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          How helpful was this suggestion?
        </Typography>
        <Rating
          name="ai-suggestion-rating"
          value={rating}
          onChange={handleRatingChange}
          size="large"
          precision={0.5}
          sx={{ 
            fontSize: '2rem',
            '& .MuiRating-iconFilled': {
              color: theme.palette.primary.main,
            }
          }}
        />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Additional comments (optional)
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="What did you like or dislike about this suggestion? How could it be improved?"
          value={comment}
          onChange={handleCommentChange}
          variant="outlined"
        />
      </Box>
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={submitting}
        fullWidth
      >
        {submitting ? 'Submitting...' : 'Submit Feedback'}
      </Button>
      
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default FeedbackForm;
