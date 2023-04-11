import React from 'react';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

function DataDisplay ({ imageUrl, price, description, url, title }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const handleClick = () => {
    window.location.href = url;
  }

  return (
    <Grid onClick={handleClick} sx={{display: 'flex', alignItems: 'center',border: '0.1px solid #ccc', borderRadius: '2vh', cursor: 'pointer', marginBottom: '2vh', boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.1)'}}>
      <img src={imageUrl} alt="product" style={{ width:isMobile? 'NA':'25vh', height:isMobile? 'NA':'25vh', objectFit: 'cover', marginRight: '4vh', borderTopLeftRadius:'1.5vh' }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold' }}>{title}</div>
          <div style={{ fontWeight: 'bold' }}>{price}</div>
        </div>
        <div>{description}</div>
      </div>
    </Grid>
  );
}

export default DataDisplay;
