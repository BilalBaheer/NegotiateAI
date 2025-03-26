import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Chip,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import EqualizerIcon from '@mui/icons-material/Equalizer';

interface ComparativeAnalysisProps {
  comparativeData: {
    originalScore: number;
    improvedScore: number;
    scoreDifference: number;
    originalPersuasiveness?: number;
    improvedPersuasiveness?: number;
    persuasivenessDifference?: number;
    improvements?: string[];
    addressedWeaknesses?: string[];
  };
}

const ComparativeAnalysis: React.FC<ComparativeAnalysisProps> = ({ comparativeData }) => {
  const theme = useTheme();
  
  const {
    originalScore,
    improvedScore,
    scoreDifference,
    originalPersuasiveness = 0,
    improvedPersuasiveness = 0,
    persuasivenessDifference = 0,
    improvements = [],
    addressedWeaknesses = []
  } = comparativeData;
  
  const scoreImprovement = Math.round((scoreDifference / originalScore) * 100);
  const persuasiveImprovement = originalPersuasiveness 
    ? Math.round((persuasivenessDifference / originalPersuasiveness) * 100) 
    : 0;
  
  return (
    <Card elevation={2} sx={{ mt: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CompareArrowsIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">
            Improvement Analysis
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.2),
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Overall Score Improvement
              </Typography>
              
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">Original</Typography>
                    <Typography variant="body2" fontWeight="medium">{originalScore}/100</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={originalScore} 
                    color="warning"
                    sx={{ height: 8, borderRadius: 4, mb: 1.5 }}
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">Improved</Typography>
                    <Typography variant="body2" fontWeight="medium">{improvedScore}/100</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={improvedScore} 
                    color="success"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Stack>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  p: 1.5,
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  borderRadius: 2
                }}
              >
                <ArrowUpwardIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6" color="success.main" fontWeight="bold">
                  +{scoreDifference} points ({scoreImprovement}% improvement)
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.2),
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Persuasiveness Improvement
              </Typography>
              
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">Original</Typography>
                    <Typography variant="body2" fontWeight="medium">{originalPersuasiveness}%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={originalPersuasiveness} 
                    color="warning"
                    sx={{ height: 8, borderRadius: 4, mb: 1.5 }}
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">Improved</Typography>
                    <Typography variant="body2" fontWeight="medium">{improvedPersuasiveness}%</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={improvedPersuasiveness} 
                    color="success"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Stack>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  p: 1.5,
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  borderRadius: 2
                }}
              >
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6" color="success.main" fontWeight="bold">
                  +{persuasivenessDifference}% ({persuasiveImprovement}% improvement)
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                height: '100%',
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                New Strengths Added
              </Typography>
              
              {improvements.length > 0 ? (
                <List dense disablePadding>
                  {improvements.map((improvement, index) => (
                    <ListItem key={`improvement-${index}`} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={improvement} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                  No new strengths identified
                </Typography>
              )}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                height: '100%',
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Weaknesses Addressed
              </Typography>
              
              {addressedWeaknesses.length > 0 ? (
                <List dense disablePadding>
                  {addressedWeaknesses.map((weakness, index) => (
                    <ListItem key={`weakness-${index}`} disableGutters>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={weakness} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                  No weaknesses addressed
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ComparativeAnalysis;
