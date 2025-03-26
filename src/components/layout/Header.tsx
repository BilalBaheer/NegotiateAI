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
  Avatar
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
    <AppBar position="static" elevation={0} sx={{ background: theme.palette.background.paper, color: theme.palette.text.primary }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold',
            color: theme.palette.primary.main
          }}
        >
          NegotiateAI
        </Typography>
        
        {!isMobile ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/')}
              sx={{ mx: 1 }}
            >
              Dashboard
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/analysis')}
              sx={{ mx: 1 }}
            >
              Text Analysis
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/history')}
              sx={{ mx: 1 }}
            >
              History
            </Button>
            
            <IconButton onClick={toggleDarkMode} sx={{ ml: 1 }}>
              {preferences.darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            
            {isAuthenticated ? (
              <>
                <Button 
                  onClick={handleMenuClick}
                  sx={{ ml: 2 }}
                  startIcon={
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: theme.palette.primary.main,
                        fontSize: '0.875rem'
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
                >
                  <MenuItem onClick={() => handleNavigation('/profile')}>Profile</MenuItem>
                  <MenuItem onClick={() => handleNavigation('/settings')}>Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/login')}
                  sx={{ mx: 1 }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/signup')}
                  sx={{ ml: 1 }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        ) : (
          <>
            <IconButton onClick={toggleDarkMode} sx={{ ml: 1 }}>
              {preferences.darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton
              size="large"
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
            >
              <MenuItem onClick={() => handleNavigation('/')}>Dashboard</MenuItem>
              <MenuItem onClick={() => handleNavigation('/analysis')}>Text Analysis</MenuItem>
              <MenuItem onClick={() => handleNavigation('/history')}>History</MenuItem>
              {isAuthenticated ? (
                <>
                  <MenuItem onClick={() => handleNavigation('/profile')}>Profile</MenuItem>
                  <MenuItem onClick={() => handleNavigation('/settings')}>Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => handleNavigation('/login')}>Login</MenuItem>
                  <MenuItem onClick={() => handleNavigation('/signup')}>Sign Up</MenuItem>
                </>
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
