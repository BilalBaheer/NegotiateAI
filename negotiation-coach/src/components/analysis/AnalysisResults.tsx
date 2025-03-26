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
  Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BalanceIcon from '@mui/icons-material/Balance';
import TimelineIcon from '@mui/icons-material/Timeline';
import { AnalysisResult } from '../../services/aiService';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success.main';
    if (score >= 60) return 'warning.main';
    return 'error.main';
  };
  
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };
  
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Analysis Results
        </Typography>
        
        <Box sx={{ mb: 4, mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1" fontWeight="medium">
              Overall Negotiation Score
            </Typography>
            <Typography 
              variant="body1" 
              fontWeight="bold" 
              color={getScoreColor(result.score)}
            >
              {result.score}/100 - {getScoreLabel(result.score)}
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={result.score} 
            color={
              result.score >= 80 ? 'success' : 
              result.score >= 60 ? 'warning' : 
              'error'
            }
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                bgcolor: 'background.default',
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Tone
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {result.tone}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                bgcolor: 'background.default',
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Sentiment
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {result.sentiment}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                bgcolor: 'background.default',
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Power Dynamics
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {result.powerDynamics || 'Not analyzed'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                bgcolor: 'background.default',
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Negotiation Phase
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {result.negotiationPhase || 'Not identified'}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight="medium" gutterBottom>
            Persuasive Strength
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={result.persuasiveStrength} 
              color="primary"
              sx={{ height: 8, borderRadius: 4, flexGrow: 1 }}
            />
            <Typography variant="body2" fontWeight="bold">
              {result.persuasiveStrength}%
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Strengths
        </Typography>
        <List dense disablePadding>
          {result.strengths.map((strength, index) => (
            <ListItem key={`strength-${index}`} disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon color="success" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={strength} />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Areas for Improvement
        </Typography>
        <List dense disablePadding>
          {result.weaknesses.map((weakness, index) => (
            <ListItem key={`weakness-${index}`} disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <ErrorIcon color="error" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={weakness} />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Suggestions
        </Typography>
        <List dense disablePadding>
          {result.suggestions.map((suggestion, index) => (
            <ListItem key={`suggestion-${index}`} disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <TipsAndUpdatesIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={suggestion} />
            </ListItem>
          ))}
        </List>
        
        {result.frameworksUsed && result.frameworksUsed.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <BalanceIcon color="primary" fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Negotiation Frameworks Used
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {result.frameworksUsed.map((framework, index) => (
                  <Chip 
                    key={`framework-${index}`} 
                    label={framework} 
                    color="primary" 
                    variant="outlined" 
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </>
        )}
        
        {result.techniquesIdentified && result.techniquesIdentified.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PsychologyIcon color="secondary" fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Expert Techniques Identified
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {result.techniquesIdentified.map((technique, index) => (
                  <Chip 
                    key={`technique-${index}`} 
                    label={technique} 
                    color="secondary" 
                    variant="outlined" 
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
