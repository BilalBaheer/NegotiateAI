import React, { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  useTheme, 
  alpha,
  Paper
} from '@mui/material';

// Define the integration logos and names
const integrations = [
  { name: 'Gmail', logo: '/images/integrations/gmail-logo.png' },
  { name: 'Slack', logo: '/images/integrations/slack-logo.png' },
  { name: 'Microsoft Teams', logo: '/images/integrations/teams-logo.png' },
  { name: 'WhatsApp', logo: '/images/integrations/whatsapp-logo.png' },
  { name: 'Outlook', logo: '/images/integrations/outlook-logo.png' },
  { name: 'Google Docs', logo: '/images/integrations/gdocs-logo.png' },
  { name: 'Zoom', logo: '/images/integrations/zoom-logo.png' },
  { name: 'Salesforce', logo: '/images/integrations/salesforce-logo.png' }
];

const IntegrationSlider: React.FC = () => {
  const theme = useTheme();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);

  // Create a duplicate set of integrations for seamless looping
  const allIntegrations = [...integrations, ...integrations];

  // Handle mouse interactions to pause/resume animation
  const handleMouseEnter = () => setIsAnimationPaused(true);
  const handleMouseLeave = () => setIsAnimationPaused(false);

  return (
    <Box 
      sx={{ 
        position: 'relative',
        py: 8,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(18, 24, 38, 0) 0%, rgba(30, 40, 60, 0.2) 50%, rgba(18, 24, 38, 0) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(96, 165, 250, 0) 0%, rgba(96, 165, 250, 0.2) 50%, rgba(96, 165, 250, 0) 100%)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(96, 165, 250, 0) 0%, rgba(96, 165, 250, 0.2) 50%, rgba(96, 165, 250, 0) 100%)',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 1.5,
            fontWeight: 700,
            textAlign: 'center',
            background: 'linear-gradient(90deg, #60a5fa, #93c5fd)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Seamless Integrations
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
          NegotiateAI works with your favorite tools to improve your negotiation workflow
        </Typography>

        {/* Integration logos slider */}
        <Box 
          sx={{ 
            overflow: 'hidden',
            position: 'relative',
            py: 4,
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              width: '150px',
              height: '100%',
              top: 0,
              zIndex: 2,
              pointerEvents: 'none'
            },
            '&::before': {
              left: 0,
              background: 'linear-gradient(90deg, rgba(18, 24, 38, 1) 0%, rgba(18, 24, 38, 0) 100%)'
            },
            '&::after': {
              right: 0,
              background: 'linear-gradient(90deg, rgba(18, 24, 38, 0) 0%, rgba(18, 24, 38, 1) 100%)'
            }
          }}
        >
          <Box
            ref={sliderRef}
            sx={{
              display: 'flex',
              gap: 8,
              animation: isAnimationPaused ? 'none' : 'slideAnimation 30s linear infinite',
              '@keyframes slideAnimation': {
                '0%': {
                  transform: 'translateX(0)'
                },
                '100%': {
                  transform: 'translateX(-50%)'
                }
              }
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {allIntegrations.map((integration, index) => (
              <Box
                key={`${integration.name}-${index}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '120px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    '& .logo-box': {
                      boxShadow: '0 0 15px rgba(96, 165, 250, 0.5)',
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                    },
                    '& .logo-text': {
                      color: theme.palette.primary.light,
                    }
                  }
                }}
              >
                <Box
                  className="logo-box"
                  sx={{
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    bgcolor: alpha(theme.palette.common.white, 0.05),
                    borderRadius: '12px',
                    p: 1,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {/* Use actual logo images instead of placeholder boxes */}
                  <Box
                    component="img"
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </Box>
                <Typography
                  className="logo-text"
                  variant="caption"
                  sx={{
                    color: alpha(theme.palette.common.white, 0.7),
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    fontSize: '0.75rem',
                  }}
                >
                  {integration.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default IntegrationSlider;
