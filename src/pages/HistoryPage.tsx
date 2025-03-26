import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Chip,
  Button,
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const HistoryPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { analysisHistory } = useSelector((state: RootState) => state.analysis);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };
  
  if (analysisHistory.length === 0) {
    return (
      <Layout>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <HistoryIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No Analysis History Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Start analyzing your negotiation texts to build up your history.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/analysis')}
          >
            Go to Text Analysis
          </Button>
        </Box>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Box>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Analysis History
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Review your past negotiation analyses and track your improvement over time.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card elevation={2}>
              <CardContent>
                <List disablePadding>
                  {analysisHistory.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <ListItem 
                        alignItems="flex-start" 
                        sx={{ 
                          py: 2,
                          px: 0,
                          borderLeft: '4px solid',
                          borderColor: theme.palette[getScoreColor(item.result.score)].main,
                          pl: 2
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="subtitle1" fontWeight="medium">
                                {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}
                              </Typography>
                              <Chip 
                                label={`Score: ${item.result.score}`} 
                                color={getScoreColor(item.result.score)}
                                size="small"
                              />
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography 
                                variant="body2" 
                                color="text.primary"
                                sx={{
                                  display: '-webkit-box',
                                  overflow: 'hidden',
                                  WebkitBoxOrient: 'vertical',
                                  WebkitLineClamp: 2,
                                }}
                              >
                                {item.text}
                              </Typography>
                              <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                <Chip 
                                  size="small" 
                                  label={`Tone: ${item.result.tone}`} 
                                  variant="outlined"
                                />
                                <Chip 
                                  size="small" 
                                  label={`Sentiment: ${item.result.sentiment}`} 
                                  variant="outlined"
                                />
                                <Chip 
                                  size="small" 
                                  label={`Persuasiveness: ${item.result.persuasiveStrength}%`} 
                                  variant="outlined"
                                />
                              </Box>
                              <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                <Button 
                                  size="small" 
                                  startIcon={<VisibilityIcon />}
                                  onClick={() => navigate('/analysis', { state: { analysisId: item.id } })}
                                >
                                  View Details
                                </Button>
                                <Button 
                                  size="small" 
                                  color="error" 
                                  startIcon={<DeleteIcon />}
                                >
                                  Delete
                                </Button>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < analysisHistory.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Your Progress
                </Typography>
                <Typography variant="body2" paragraph>
                  Track your negotiation skills improvement over time.
                </Typography>
                
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'background.default',
                    borderRadius: 2,
                    mb: 2,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Average Score
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {Math.round(analysisHistory.reduce((sum, item) => sum + item.result.score, 0) / analysisHistory.length)}
                  </Typography>
                </Paper>
                
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'background.default',
                    borderRadius: 2,
                    mb: 2,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Total Analyses
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {analysisHistory.length}
                  </Typography>
                </Paper>
                
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={() => navigate('/analysis')}
                >
                  New Analysis
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default HistoryPage;
