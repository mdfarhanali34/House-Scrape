import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logoImage from './Resources/logo.png'
import Box from '@mui/material/Box';

const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
        secondary: {
            main: '#6c757d',
        },
        customColor: {
            main: '#ffffff',
        },
    },
});

function HeaderWithLogo() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <ThemeProvider theme={theme}>
      <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'grey', borderBottom: 1 , boxShadow: 0, margin: 0 }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={logoImage} alt='logo' style={{ paddingRight: '2.5%', blockSize: '8vh' }} />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Button color="secondary" sx={{textTransform: 'none'}}>Log in</Button>
            <Button color="secondary" sx={{textTransform: 'none'}}>CAD</Button>
            <Button color="secondary" sx={{textTransform: 'none'}}>EN</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
    );
}

export default HeaderWithLogo;
