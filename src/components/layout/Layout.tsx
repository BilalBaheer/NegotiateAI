import React, { ReactNode } from 'react';
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
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
        mode: preferences.darkMode ? 'dark' : 'light',
        background: {
          default: preferences.darkMode ? '#121212' : '#f5f5f5',
          paper: preferences.darkMode ? '#1e1e1e' : '#ffffff',
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
        }}
      >
        <Header />
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          {children}
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: theme.palette.background.paper,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', color: theme.palette.text.secondary }}>
              © {new Date().getFullYear()} NegotiateAI - AI-Driven Negotiation Coach & Language Optimizer
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
