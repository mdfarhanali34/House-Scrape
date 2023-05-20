import React from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import './LogoIntro.css';
import useMediaQuery from '@mui/material/useMediaQuery';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//const data = require('./locations.json');

const data = require('./locationsOne.json');

export default function DetailsFrontpage(props) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Grid className='LogoIntroGrid' alignItems='center' sx={{ alignItems: 'center', paddingTop: '3.5%', paddingBottom: '3%' }}>
            <FormLabel sx={{ fontSize: '1.5rem', color: 'black', paddingLeft:isMobile? '2%':'20%' }}>About </FormLabel>
            <FormLabel sx={{ fontSize: '1.5rem', color: 'primary.main' }}> Rentgram</FormLabel>
            <br />
            <Grid sx={{width:isMobile? '98%':'80%', paddingLeft:isMobile? '2%':'20%', paddingTop: '1%'}}>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>How does it work?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Rentgram searches for available rental listings on different real estate platforms accross Canada. This enables users to compare listings on different platform 
                            and find listings available all accross the internet in one click! The search happens realtime when the user searches on our platfrom, therefore , the listings
                            shown are live from all platforms.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Who we are? </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            The website is created by two 3rd year University of Guelph undergrads to help fellow students find rental listings all around Canada. The website is founded 
                            and managed by Simrat Hayer (3rd year Comp Engg) and Mohomadd Farhan (3rd year Comp Engg)
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>How to reach us? </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            At rentgram, we welcome feedback and are open to any suggestion to make the platform better and more stable. Reach us at rentgram@gmail.com
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    );
}