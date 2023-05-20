import React from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import './LogoIntro.css';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logoImage from './Resources/logo.png'

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

function LogoIntro() {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Grid className='LogoIntroGrid' alignItems='center' textAlign={'center'} sx={{alignItems: 'center', paddingTop: '3.5%', paddingBottom: '3%'}}>    
            {!isMobile && (
                <img src={logoImage} alt='logo' style={{ paddingRight: '2.5%', borderRight: '1px solid black', blockSize: '16vh' }} />
             //   <FormLabel sx={{fontSize: '2.5rem', color: 'black', paddingRight: '2.5%', borderRight: 1}}>LOGO</FormLabel>
            )}  
            <FormLabel sx={{fontSize: '1.5rem', color: 'primary.main', paddingLeft: '2.5%'}}>Deals </FormLabel>      
            <FormLabel sx={{fontSize: '1.5rem', color: 'black'}}>from your favourite marketplaces</FormLabel>
        </Grid>
    );
}

export default LogoIntro;
