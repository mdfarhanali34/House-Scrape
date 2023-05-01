import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import logoImage from './Resources/logo.png'
import linkedinLogo from './Resources/linkedin-icon.png'
import Button from '@mui/material/Button';
import InstagramLogo from './Resources/Instagram-Logo.png'
import Twitter from './Resources/Twitter.png'
import useMediaQuery from '@mui/material/useMediaQuery';

function Footer(props) {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <>
            <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'grey', borderTop: 2, boxShadow: 0, margin: 0 }}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logoImage} alt='logo' style={{ paddingLeft: '60%', blockSize: '8vh', paddingTop: '10%' }} />
                    </Box>
                    <Box sx={{ display: 'flex-end', paddingRight: '10%', alignItems: 'center' }}>
                        <Button ><img src={linkedinLogo} alt="my" width={"40px"} /></Button>
                        <Button ><img src={InstagramLogo} alt="my" width={"70px"} /></Button>
                        <Button ><img src={Twitter} alt="my" width={"50px"} /></Button>
                    </Box>
                </Toolbar>
            </AppBar>

        </>
    );
}
export default Footer;
