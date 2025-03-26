import React from 'react';
import Layout from '../components/layout/Layout';
import FeedbackStats from '../components/feedback/FeedbackStats';
import { Box, Typography, Container, Divider, alpha, useTheme } from '@mui/material';

const FeedbackStatsPage: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            AI Learning Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: 800 }}>
            This dashboard shows how our AI is learning from user feedback. As users rate the quality of AI suggestions,
            the system continuously improves to provide more accurate and helpful negotiation advice.
          </Typography>
          <Divider sx={{ 
            mb: 4,
            borderColor: alpha(theme.palette.primary.main, 0.2),
            borderWidth: 2,
            width: '100px'
          }} />
        </Box>
        
        <FeedbackStats />
      </Container>
    </Layout>
  );
};

export default FeedbackStatsPage;
