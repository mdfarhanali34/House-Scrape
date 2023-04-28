import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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

function Header() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'grey', borderBottom: 1 , boxShadow: 0, margin: 0, alignItems: 'flex-end'}}>
                <Toolbar>
                    <Button color="secondary" sx={{textTransform: 'none'}}>Log in</Button>
                    <Button color="secondary" >CAD</Button>
                    <Button color="secondary">EN</Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default Header;
