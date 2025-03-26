import React, { ReactNode } from 'react';
import { Box, Container, CssBaseline, ThemeProvider, createTheme, alpha } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Header from './Header';
import baseTheme from '../../theme';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { preferences } = useSelector((state: RootState) => state.user);
  
  // Create theme with dark mode preference
  const theme = React.useMemo(() => {
    return createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        mode: 'dark', // Always use dark mode for modern look
        background: {
          default: '#0f172a', // Deep blue-black
          paper: '#1e293b',   // Slightly lighter blue-black
        },
      },
    });
  }, [preferences.darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: theme.palette.background.default,
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.08), transparent 70%)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Header />
        <Container 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            py: { xs: 4, md: 6 },
            px: { xs: 2, md: 3 },
            maxWidth: { sm: 'lg' },
          }}
        >
          {children}
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: 'transparent',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Container maxWidth="lg">
            <Box 
              sx={{ 
                textAlign: 'center', 
                color: alpha(theme.palette.common.white, 0.6),
                fontSize: '0.875rem',
              }}
            >
              {new Date().getFullYear()} NegotiateAI - AI-Driven Negotiation Coach
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
