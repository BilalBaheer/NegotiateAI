import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Grid,
  Rating,
  LinearProgress,
  useTheme,
  alpha,
  Card,
  CardContent
} from '@mui/material';
import { 
  InsightsOutlined, 
  TrendingUpOutlined, 
  PeopleOutlineOutlined,
  BarChartOutlined
} from '@mui/icons-material';
import feedbackService from '../../services/feedbackService';

interface FeedbackStatsProps {
  refreshTrigger?: number; // Optional prop to trigger refresh
}

const FeedbackStats: React.FC<FeedbackStatsProps> = ({ refreshTrigger = 0 }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{
    averageRating: number;
    totalFeedback: number;
    modelRatings: Record<string, number>;
    suggestionTypeRatings: Record<string, number>;
  }>({
    averageRating: 0,
    totalFeedback: 0,
    modelRatings: {},
    suggestionTypeRatings: {}
  });

  // Model name mapping for display
  const modelNames: Record<string, string> = {
    general: 'General Business',
    legal: 'Legal',
    sales: 'Sales',
    procurement: 'Procurement',
    recruitment: 'Recruitment'
  };

  // Suggestion type name mapping for display
  const suggestionTypeNames: Record<string, string> = {
    analysis: 'Text Analysis',
    improvement: 'Text Improvement'
  };

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const feedbackStats = await feedbackService.getFeedbackStats();
        setStats(feedbackStats);
      } catch (error) {
        console.error('Error fetching feedback stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        AI Feedback Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        User feedback helps our AI learn and improve over time. Here's how our AI suggestions are performing.
      </Typography>

      {stats.totalFeedback === 0 ? (
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Feedback Data Yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            As users provide feedback on AI suggestions, you'll see performance metrics here.
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Average Rating
                    </Typography>
                    <InsightsOutlined color="primary" />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4" component="span" fontWeight="bold" sx={{ mr: 1 }}>
                      {stats.averageRating.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      / 5.0
                    </Typography>
                  </Box>
                  <Rating 
                    value={stats.averageRating} 
                    precision={0.1} 
                    readOnly 
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Feedback
                    </Typography>
                    <PeopleOutlineOutlined color="primary" />
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalFeedback}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    submissions received
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Top Rated Model
                    </Typography>
                    <TrendingUpOutlined color="primary" />
                  </Box>
                  {Object.keys(stats.modelRatings).length > 0 ? (
                    <>
                      <Typography variant="h6" fontWeight="bold">
                        {modelNames[getTopRatedModel(stats.modelRatings)] || getTopRatedModel(stats.modelRatings)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Rating 
                          value={stats.modelRatings[getTopRatedModel(stats.modelRatings)]} 
                          precision={0.1} 
                          readOnly 
                          size="small" 
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          ({stats.modelRatings[getTopRatedModel(stats.modelRatings)].toFixed(1)})
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No model ratings yet
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Top Feature
                    </Typography>
                    <BarChartOutlined color="primary" />
                  </Box>
                  {Object.keys(stats.suggestionTypeRatings).length > 0 ? (
                    <>
                      <Typography variant="h6" fontWeight="bold">
                        {suggestionTypeNames[getTopRatedFeature(stats.suggestionTypeRatings)] || 
                          getTopRatedFeature(stats.suggestionTypeRatings)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Rating 
                          value={stats.suggestionTypeRatings[getTopRatedFeature(stats.suggestionTypeRatings)]} 
                          precision={0.1} 
                          readOnly 
                          size="small" 
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          ({stats.suggestionTypeRatings[getTopRatedFeature(stats.suggestionTypeRatings)].toFixed(1)})
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No feature ratings yet
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Detailed Stats */}
          <Grid container spacing={4}>
            {/* Model Ratings */}
            <Grid item xs={12} md={6}>
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
                  Industry Model Performance
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {Object.keys(stats.modelRatings).length > 0 ? (
                  Object.entries(stats.modelRatings)
                    .sort(([, a], [, b]) => b - a)
                    .map(([modelId, rating]) => (
                      <Box key={modelId} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2">
                            {modelNames[modelId] || modelId}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {rating.toFixed(1)}
                            </Typography>
                            <Rating value={rating} precision={0.1} readOnly size="small" />
                          </Box>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(rating / 5) * 100} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            '& .MuiLinearProgress-bar': {
                              bgcolor: theme.palette.primary.main
                            }
                          }}
                        />
                      </Box>
                    ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No model ratings available yet
                  </Typography>
                )}
              </Paper>
            </Grid>
            
            {/* Feature Ratings */}
            <Grid item xs={12} md={6}>
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
                  Feature Performance
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {Object.keys(stats.suggestionTypeRatings).length > 0 ? (
                  Object.entries(stats.suggestionTypeRatings)
                    .sort(([, a], [, b]) => b - a)
                    .map(([featureId, rating]) => (
                      <Box key={featureId} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2">
                            {suggestionTypeNames[featureId] || featureId}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ mr: 1 }}>
                              {rating.toFixed(1)}
                            </Typography>
                            <Rating value={rating} precision={0.1} readOnly size="small" />
                          </Box>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={(rating / 5) * 100} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            '& .MuiLinearProgress-bar': {
                              bgcolor: theme.palette.primary.main
                            }
                          }}
                        />
                      </Box>
                    ))
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No feature ratings available yet
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

// Helper function to get the top rated model
function getTopRatedModel(modelRatings: Record<string, number>): string {
  return Object.entries(modelRatings)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => key)[0] || '';
}

// Helper function to get the top rated feature
function getTopRatedFeature(featureRatings: Record<string, number>): string {
  return Object.entries(featureRatings)
    .sort(([, a], [, b]) => b - a)
    .map(([key]) => key)[0] || '';
}

export default FeedbackStats;
