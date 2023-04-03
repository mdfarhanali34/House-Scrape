import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" sx={{ bgcolor: 'primary.main', color: 'white'}}>
                <Toolbar>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        LOGO
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>

    );
}

export default Header;
