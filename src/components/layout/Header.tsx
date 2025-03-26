import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  useMediaQuery, 
  useTheme, 
  Menu, 
  MenuItem,
  Avatar,
  Container,
  alpha
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout, updatePreferences } from '../../store/slices/userSlice';

interface UserState {
  isAuthenticated: boolean;
  user: { name: string | null };
  preferences: { darkMode: boolean };
}

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, preferences } = useSelector((state: RootState) => state.user as UserState);
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleClose();
  };
  
  const toggleDarkMode = () => {
    dispatch(updatePreferences({ darkMode: !preferences.darkMode }));
  };
  
  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ px: { xs: 0 }, py: 1.5, minHeight: '64px' }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              mr: 3
            }}
            onClick={() => navigate('/')}
          >
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                color: theme.palette.primary.main,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  color: '#0f172a',
                  width: 28,
                  height: 28,
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1.5,
                  fontWeight: 800,
                  fontSize: '1rem'
                }}
              >
                N
              </Box>
              NegotiateAI
            </Typography>
          </Box>
          
          {!isMobile ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/')}
                  sx={{ 
                    mx: 1,
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: theme.palette.grey[300],
                    '&:hover': {
                      color: theme.palette.common.white,
                      backgroundColor: 'transparent',
                    }
                  }}
                >
                  Home
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/analysis')}
                  sx={{ 
                    mx: 1,
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: theme.palette.grey[300],
                    '&:hover': {
                      color: theme.palette.common.white,
                      backgroundColor: 'transparent',
                    }
                  }}
                >
                  Analysis
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/history')}
                  sx={{ 
                    mx: 1,
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: theme.palette.grey[300],
                    '&:hover': {
                      color: theme.palette.common.white,
                      backgroundColor: 'transparent',
                    }
                  }}
                >
                  History
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/pricing')}
                  sx={{ 
                    mx: 1,
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: theme.palette.grey[300],
                    '&:hover': {
                      color: theme.palette.common.white,
                      backgroundColor: 'transparent',
                    }
                  }}
                >
                  Pricing
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isAuthenticated ? (
                  <>
                    <Button 
                      onClick={handleMenuClick}
                      sx={{ 
                        color: theme.palette.common.white,
                        fontWeight: 500,
                        fontSize: '0.875rem',
                      }}
                      startIcon={
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32,
                            bgcolor: alpha(theme.palette.primary.main, 0.2),
                            color: theme.palette.primary.main,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        >
                          {user?.name?.charAt(0) || 'U'}
                        </Avatar>
                      }
                    >
                      {user?.name || 'User'}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        elevation: 2,
                        sx: {
                          mt: 1.5,
                          borderRadius: 2,
                          minWidth: 180,
                          backgroundColor: '#1e293b',
                          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }
                      }}
                    >
                      <MenuItem 
                        onClick={() => handleNavigation('/profile')}
                        sx={{ py: 1.5, px: 2, borderRadius: 1 }}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem 
                        onClick={() => handleNavigation('/settings')}
                        sx={{ py: 1.5, px: 2, borderRadius: 1 }}
                      >
                        Settings
                      </MenuItem>
                      <MenuItem 
                        onClick={handleLogout}
                        sx={{ py: 1.5, px: 2, borderRadius: 1 }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="text"
                      color="inherit" 
                      onClick={() => navigate('/login')}
                      sx={{ 
                        mx: 1,
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        color: theme.palette.common.white,
                      }}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => navigate('/signup')}
                      sx={{ 
                        ml: 1,
                        borderRadius: '8px',
                        px: 3,
                        py: 1,
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)',
                        '&:hover': {
                          boxShadow: '0 0 25px rgba(96, 165, 250, 0.5)',
                        }
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                size="medium"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  elevation: 2,
                  sx: {
                    mt: 1.5,
                    borderRadius: 2,
                    minWidth: 200,
                    backgroundColor: '#1e293b',
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <MenuItem 
                  onClick={() => handleNavigation('/')}
                  sx={{ py: 1.5, px: 2, borderRadius: 1 }}
                >
                  Home
                </MenuItem>
                <MenuItem 
                  onClick={() => handleNavigation('/analysis')}
                  sx={{ py: 1.5, px: 2, borderRadius: 1 }}
                >
                  Analysis
                </MenuItem>
                <MenuItem 
                  onClick={() => handleNavigation('/history')}
                  sx={{ py: 1.5, px: 2, borderRadius: 1 }}
                >
                  History
                </MenuItem>
                <MenuItem 
                  onClick={() => handleNavigation('/pricing')}
                  sx={{ py: 1.5, px: 2, borderRadius: 1 }}
                >
                  Pricing
                </MenuItem>
                {isAuthenticated ? (
                  <>
                    <MenuItem 
                      onClick={() => handleNavigation('/profile')}
                      sx={{ py: 1.5, px: 2, borderRadius: 1 }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem 
                      onClick={() => handleNavigation('/settings')}
                      sx={{ py: 1.5, px: 2, borderRadius: 1 }}
                    >
                      Settings
                    </MenuItem>
                    <MenuItem 
                      onClick={handleLogout}
                      sx={{ py: 1.5, px: 2, borderRadius: 1 }}
                    >
                      Logout
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem 
                      onClick={() => handleNavigation('/login')}
                      sx={{ py: 1.5, px: 2, borderRadius: 1 }}
                    >
                      Login
                    </MenuItem>
                    <MenuItem 
                      onClick={() => handleNavigation('/signup')}
                      sx={{ py: 1.5, px: 2, borderRadius: 1 }}
                    >
                      Sign Up
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
