import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ChatIcon from '@mui/icons-material/Chat';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { analysisHistory } = useSelector((state: RootState) => state.analysis);
  const { user } = useSelector((state: RootState) => state.user);
  
  const recentAnalyses = analysisHistory.slice(0, 3);
  
  const features = [
    {
      title: 'AI-Powered Text Analysis',
      description: 'Evaluates emails, chat transcripts, and documents for tone, sentiment, and persuasive strength.',
      icon: <ChatIcon fontSize="large" color="primary" />
    },
    {
      title: 'Negotiation Strength Scoring',
      description: 'Provides scores based on best practices with actionable tips for improvement.',
      icon: <TrendingUpIcon fontSize="large" color="primary" />
    },
    {
      title: 'Industry-Specific Models',
      description: 'Pre-trained models for legal, sales, procurement, and recruitment negotiations.',
      icon: <SchoolIcon fontSize="large" color="primary" />
    },
    {
      title: 'Secure Document Handling',
      description: 'Enterprise-grade encryption for all your sensitive negotiation data.',
      icon: <CheckCircleIcon fontSize="large" color="primary" />
    }
  ];
  
  return (
    <Box>
      <Box 
        sx={{ 
          p: 4, 
          borderRadius: 2, 
          mb: 4, 
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
          color: 'white'
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome to NegotiateAI
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Your AI-Driven Negotiation Coach & Language Optimizer
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '800px', mb: 3, opacity: 0.8 }}>
          This isn't just software—it's a smart negotiation companion that continuously evolves with every interaction.
          Get instant suggestions, data-driven insights, and powerful language optimization to improve your negotiation skills.
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          color="secondary"
          onClick={() => navigate('/analysis')}
          sx={{ 
            px: 4, 
            py: 1.5, 
            fontWeight: 'bold',
            backgroundColor: 'white',
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.grey[100],
            }
          }}
        >
          Start Analyzing Text
        </Button>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Key Features
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card 
                  elevation={2} 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              How It Works
            </Typography>
            <Paper elevation={2} sx={{ p: 3 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Box 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      1
                    </Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Input Your Negotiation Text" 
                    secondary="Paste your emails, chat messages, or draft documents into our analyzer."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Box 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      2
                    </Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Receive AI Analysis" 
                    secondary="Our AI evaluates tone, sentiment, persuasiveness, and provides a comprehensive score."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Box 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      3
                    </Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Get Actionable Suggestions" 
                    secondary="Review strengths, weaknesses, and specific suggestions to improve your negotiation text."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Box 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: '50%', 
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                    >
                      4
                    </Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Optimize Your Language" 
                    secondary="Use our AI to rewrite and improve your text for maximum negotiation effectiveness."
                  />
                </ListItem>
              </List>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/analysis')}
                  sx={{ px: 4 }}
                >
                  Try It Now
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Getting Started
              </Typography>
              <Typography variant="body2" paragraph>
                New to NegotiateAI? Follow these steps to get the most out of your AI negotiation coach:
              </Typography>
              <List dense>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Analyze your first negotiation text" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Review your strengths and areas for improvement" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Try different industry models for specialized feedback" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Use the AI to improve your text" />
                </ListItem>
              </List>
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mt: 2 }}
                onClick={() => navigate('/analysis')}
              >
                Start Now
              </Button>
            </CardContent>
          </Card>
          
          {recentAnalyses.length > 0 && (
            <Card elevation={2} sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Analyses
                </Typography>
                <List disablePadding>
                  {recentAnalyses.map((analysis, index) => (
                    <React.Fragment key={analysis.id}>
                      <ListItem disableGutters sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <HistoryIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={analysis.text.substring(0, 40) + '...'}
                          secondary={new Date(analysis.date).toLocaleDateString()}
                        />
                        <Box 
                          sx={{ 
                            ml: 1, 
                            bgcolor: 
                              analysis.result.score >= 80 ? 'success.main' : 
                              analysis.result.score >= 60 ? 'warning.main' : 
                              'error.main',
                            color: 'white',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {analysis.result.score}
                        </Box>
                      </ListItem>
                      {index < recentAnalyses.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                  ))}
                </List>
                {recentAnalyses.length > 0 && (
                  <Button 
                    variant="text" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/history')}
                  >
                    View All History
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
