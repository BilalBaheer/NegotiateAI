import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  useTheme,
  Container,
  alpha,
  Stack,
  Divider,
  Paper
} from '@mui/material';
import { 
  MessageOutlined, 
  HistoryOutlined, 
  TipsAndUpdatesOutlined, 
  AnalyticsOutlined,
  ArrowForwardOutlined,
  CheckCircleOutlineOutlined,
  AutoGraphOutlined,
  PsychologyOutlined,
  ForumOutlined,
  ArrowRightAltOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface RecentAnalysis {
  id: string;
  title: string;
  date: string;
  score: number;
  industry: string;
}

// Map of model IDs to industry names for display
const industryNames: Record<string, string> = {
  general: 'General Business',
  legal: 'Legal',
  sales: 'Sales',
  procurement: 'Procurement',
  recruitment: 'Recruitment'
};

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Get analysis history and selected model ID from Redux store
  const { analysisHistory = [], selectedModelId = 'general' } = useSelector((state: RootState) => state.analysis);
  
  // Transform the analysis history into the format we need for display
  const recentAnalyses: RecentAnalysis[] = analysisHistory.slice(0, 3).map(analysis => {
    return {
      id: analysis.id || '',
      title: analysis.text?.substring(0, 30) + '...' || 'Untitled Analysis',
      date: new Date(analysis.date || Date.now()).toLocaleDateString(),
      score: analysis.result?.score || 0,
      // Use a default industry based on the current selected model
      industry: industryNames[selectedModelId] || 'General Business'
    };
  });

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 4 },
          borderRadius: 0,
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          mb: 8
        }}
      >
        {/* Gradient background */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            background: 'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.15), transparent 70%)',
          }}
        />

        <Container maxWidth="md">
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(90deg, #60a5fa, #93c5fd)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AI-Powered Negotiation Coach
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p" 
            sx={{ 
              mb: 5, 
              color: alpha(theme.palette.common.white, 0.8),
              maxWidth: '700px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6
            }}
          >
            Enhance your negotiation skills with advanced AI analysis. Get personalized feedback, 
            improve your communication, and achieve better outcomes in any negotiation scenario.
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => navigate('/analysis')}
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1rem',
                borderRadius: '10px',
                boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)',
                '&:hover': {
                  boxShadow: '0 0 25px rgba(96, 165, 250, 0.5)',
                }
              }}
              endIcon={<ArrowForwardOutlined />}
            >
              Analyze Text
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              onClick={() => navigate('/history')}
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1rem',
                borderRadius: '10px',
                borderColor: alpha(theme.palette.primary.main, 0.5),
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                }
              }}
            >
              View History
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 1.5,
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Key Features
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 6, 
            color: alpha(theme.palette.common.white, 0.7),
            textAlign: 'center',
            maxWidth: '700px',
            mx: 'auto'
          }}
        >
          Our AI-powered platform provides comprehensive tools to elevate your negotiation skills
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={3}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '12px',
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    color: theme.palette.primary.main,
                    mb: 2,
                    mx: 'auto'
                  }}
                >
                  <AnalyticsOutlined fontSize="large" />
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  sx={{ 
                    mb: 1.5,
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  Text Analysis
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: alpha(theme.palette.common.white, 0.7),
                    textAlign: 'center',
                    mb: 2
                  }}
                >
                  Get detailed analysis of your negotiation text with specific feedback on tone, clarity, and persuasiveness.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '12px',
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    color: theme.palette.primary.main,
                    mb: 2,
                    mx: 'auto'
                  }}
                >
                  <AutoGraphOutlined fontSize="large" />
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  sx={{ 
                    mb: 1.5,
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  Performance Scoring
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: alpha(theme.palette.common.white, 0.7),
                    textAlign: 'center',
                    mb: 2
                  }}
                >
                  Receive objective scoring on multiple dimensions of your negotiation approach and track improvements over time.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '12px',
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    color: theme.palette.primary.main,
                    mb: 2,
                    mx: 'auto'
                  }}
                >
                  <PsychologyOutlined fontSize="large" />
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  sx={{ 
                    mb: 1.5,
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  AI Suggestions
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: alpha(theme.palette.common.white, 0.7),
                    textAlign: 'center',
                    mb: 2
                  }}
                >
                  Get intelligent suggestions to improve your negotiation text, tailored to your specific industry and context.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '12px',
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    color: theme.palette.primary.main,
                    mb: 2,
                    mx: 'auto'
                  }}
                >
                  <ForumOutlined fontSize="large" />
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  sx={{ 
                    mb: 1.5,
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  Industry Specific
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: alpha(theme.palette.common.white, 0.7),
                    textAlign: 'center',
                    mb: 2
                  }}
                >
                  Customized analysis based on your industry, whether it's sales, legal, real estate, or business development.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* How It Works Section */}
      <Box 
        sx={{ 
          py: 8, 
          mb: 10,
          background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 1.5,
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            How It Works
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 6, 
              color: alpha(theme.palette.common.white, 0.7),
              textAlign: 'center',
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Three simple steps to improve your negotiation skills
          </Typography>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    color: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    fontSize: '1.25rem',
                    fontWeight: 700
                  }}
                >
                  1
                </Box>
                <Typography variant="h6" component="h3" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Input Your Text
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.7) }}>
                  Enter your negotiation text or email draft into our system. Specify your industry for more targeted analysis.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    color: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    fontSize: '1.25rem',
                    fontWeight: 700
                  }}
                >
                  2
                </Box>
                <Typography variant="h6" component="h3" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Get AI Analysis
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.7) }}>
                  Our AI analyzes your text for tone, clarity, persuasiveness, and negotiation strategy, providing a comprehensive score.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  backgroundColor: alpha(theme.palette.background.paper, 0.5),
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                    color: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    fontSize: '1.25rem',
                    fontWeight: 700
                  }}
                >
                  3
                </Box>
                <Typography variant="h6" component="h3" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Improve & Implement
                </Typography>
                <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.7) }}>
                  Review AI suggestions to improve your text, implement changes, and track your progress over time.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => navigate('/analysis')}
              endIcon={<ArrowRightAltOutlined />}
              sx={{ 
                px: 3,
                py: 1,
                borderColor: alpha(theme.palette.primary.main, 0.5),
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                }
              }}
            >
              Try It Now
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Recent Analyses Section */}
      {recentAnalyses.length > 0 && (
        <Container maxWidth="lg" sx={{ mb: 10 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 1.5,
              fontWeight: 700,
            }}
          >
            Recent Analyses
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4, 
              color: alpha(theme.palette.common.white, 0.7),
            }}
          >
            Your most recent negotiation text analyses
          </Typography>
          
          <Grid container spacing={3}>
            {recentAnalyses.map((analysis) => (
              <Grid item xs={12} md={6} lg={4} key={analysis.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {analysis.title}
                      </Typography>
                      <Box 
                        sx={{ 
                          px: 1.5, 
                          py: 0.5, 
                          borderRadius: '20px',
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          color: theme.palette.primary.main,
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        Score: {analysis.score}/100
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.7), mb: 2 }}>
                      Industry: {analysis.industry}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ color: alpha(theme.palette.common.white, 0.5) }}>
                        {analysis.date}
                      </Typography>
                      <Button 
                        size="small" 
                        color="primary"
                        onClick={() => navigate(`/analysis/${analysis.id}`)}
                        endIcon={<ArrowForwardOutlined fontSize="small" />}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {recentAnalyses.length > 0 && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => navigate('/history')}
                endIcon={<ArrowRightAltOutlined />}
                sx={{ 
                  px: 3,
                  py: 1,
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                  }
                }}
              >
                View All History
              </Button>
            </Box>
          )}
        </Container>
      )}
      
      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 8, 
          mb: 6,
          background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, rgba(15, 23, 42, 0) 100%)',
          borderRadius: '24px',
          mx: 4
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 2,
              fontWeight: 700,
            }}
          >
            Ready to Improve Your Negotiation Skills?
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4, 
              color: alpha(theme.palette.common.white, 0.7),
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            Start analyzing your negotiation texts today and see immediate improvements in your communication effectiveness.
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/analysis')}
            sx={{ 
              px: 4, 
              py: 1.5,
              fontSize: '1rem',
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)',
              '&:hover': {
                boxShadow: '0 0 25px rgba(96, 165, 250, 0.5)',
              }
            }}
            endIcon={<ArrowForwardOutlined />}
          >
            Start Analyzing
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
