import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormLabel from '@mui/material/FormLabel';
import kijijiLogo from './Resources/kijiji_logo1.png';
import zumperLogo from './Resources/zumper_logo.png';
import cannonLogo from './Resources/cannon_logo.png';
import cannonImage from './Resources/cannon_image.jpg';
import rentalsLogo from './Resources/rentals_logo.png';
import roomiesLogo from './Resources/roomies_logo.png'

function DataDisplay({ imageUrl, price, description, url, title, host }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  console.log("Host: " + host);
  if (host === "cannon") {
    imageUrl = cannonImage;
  }
  const handleClick = () => {
    window.open(url, '_blank');
  }

  if (description == null) {
    description = "";
  }

  const MAX_TITLE_LENGTH = 80;

  let titleToDisplay = title;
  if (isMobile && title.length > MAX_TITLE_LENGTH) {
    titleToDisplay = title.slice(0, MAX_TITLE_LENGTH) + "...";
  }

  return (
    <Grid onClick={handleClick} sx={{ minHeight: '20vh', maxHeight: isMobile ? '28vh' : '20vh', border: '0.1px solid #ccc', borderRadius: '1.5vh', cursor: 'pointer', marginBottom: '2vh', boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)' }} container>
      <Grid sx={{ width: isMobile ? '30%' : '20%', minHeight: '100%', paddingRight: '1%', maxHeight: isMobile ? '26vh' : '20vh' }}>
        <img src={imageUrl} alt="product" style={{ marginRight: '4vh', borderTopLeftRadius: '1.5vh', width: '100%', height: '100%', maxHeight: '100%' }} />
      </Grid>
      <Grid sx={{ width: isMobile ? '70%' : '55%', minHeight: '100%', paddingRight: '1%' }}>
        <Box sx={{ padding: '1%', paddingTop: '2%' }}>
          <FormLabel sx={{ color: 'black', fontWeight: 'bold', fontSize:'medium' }}>{titleToDisplay}</FormLabel><br />
          {!isMobile && (
            <FormLabel sx={{ color: 'black', fontSize: 'small' }}>{description.slice(0, 200)}</FormLabel>
          )}
          {isMobile && (
            <Grid sx={{ width: '100%', paddingLeft: '0.5%', alignContent: 'center', padding: '0.75%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: '3%' }}>
              
              <Box sx={{ borderTop: 1, borderRight: 1, borderLeft: 1, height: '100%', borderTopLeftRadius: '1.5vh', borderTopRightRadius: '1.5vh', backgroundColor: '#e4eddf', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderColor: '#093405' }}>
                <FormLabel sx={{ color: '#37890b', fontSize: '1.65vh', fontWeight: '900', paddingTop: '5%', paddingLeft: '3%' }}>{price}</FormLabel>
                <Box sx={{ paddingTop: '5%', paddingRight: '3%',paddingBottom: '2%' }}>
                  <Button sx={{ backgroundColor: '#37890b', blockSize: '4vh', color: 'white', padding: '1vh' }}>View Listing</Button>
                </Box>
              </Box>
              <Box container='true' sx={{ backgroundColor: 'white', borderBottomRightRadius: '1.5vh', borderBottomLeftRadius: '1.5vh', height: '90%', border: 1, borderTop: 0, textAlign: 'center' }}>

                {host === 'kijiji' && (
                  <img src={kijijiLogo} alt="kijiji_logo" style={{ filter: 'grayscale(100%)', blockSize: '5vh', paddingTop: '5%' }} />
                )}
                {host === 'cannon' && (
                  <img src={cannonLogo} alt="cannon_logo" style={{ filter: 'grayscale(100%)', blockSize: '3vh', paddingTop: '5%' }} />
                )}
                {host === 'zumper' && (
                  <img src={zumperLogo} alt="zumper_logo" style={{ filter: 'grayscale(100%) invert(100%)', blockSize: '5vh', paddingTop: '5%' }} />
                )}
                {host === 'rentals' && (
                  <img src={rentalsLogo} alt="rentals_logo" style={{ filter: 'grayscale(100%)', blockSize: '5vh', paddingTop: '5%' }} />
                )}
                {host === 'roomies' && (
                  <img src={roomiesLogo} alt="roomies_logo" style={{ filter: 'grayscale(100%)', blockSize: '3vh', paddingTop: '5%' }} />
                )}

              </Box>
            </Grid>

          )}
        </Box>
      </Grid>
      {!isMobile && (
        <Grid sx={{ width: '25%', paddingLeft: '0.5%', alignContent: 'center', padding: '0.75%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box sx={{ borderTop: 1, borderRight: 1, borderLeft: 1, height: '100%', borderTopLeftRadius: '1.5vh', borderTopRightRadius: '1.5vh', backgroundColor: '#e4eddf', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderColor: '#093405' }}>
            <FormLabel sx={{ color: '#37890b', fontSize: '1.65vh', fontWeight: '900', paddingTop: '22%', paddingLeft: '3%' }}>{price}</FormLabel>
            <Box sx={{ paddingTop: '18%', paddingRight: '3%' }}>
              <Button sx={{ backgroundColor: '#37890b', blockSize: '4vh', color: 'white', padding: '1vh' }}>View Listing</Button>
            </Box>
          </Box>
          <Box container='true' sx={{ backgroundColor: 'white', borderBottomRightRadius: '1.5vh', borderBottomLeftRadius: '1.5vh', height: '90%', border: 1, borderTop: 0 }}>

            {host === 'kijiji' && (
              <img src={kijijiLogo} alt="kijiji_logo" style={{ filter: 'grayscale(100%)', blockSize: '5vh', paddingTop: '5%' }} />
            )}
            {host === 'cannon' && (
              <img src={cannonLogo} alt="cannon_logo" style={{ filter: 'grayscale(100%)', blockSize: '3vh', paddingTop: '5%' }} />
            )}
            {host === 'zumper' && (
              <img src={zumperLogo} alt="zumper_logo" style={{ filter: 'grayscale(100%) invert(100%)', blockSize: '5vh', paddingTop: '5%' }} />
            )}
            {host === 'rentals' && (
              <img src={rentalsLogo} alt="rentals_logo" style={{ filter: 'grayscale(100%)', blockSize: '5vh', paddingTop: '5%' }} />
            )}
            {host === 'roomies' && (
                  <img src={roomiesLogo} alt="roomies_logo" style={{ filter: 'grayscale(100%)', blockSize: '3vh', paddingTop: '5%' }} />
            )}

          </Box>
        </Grid>

      )}
    </Grid>
  );
}

export default DataDisplay;
