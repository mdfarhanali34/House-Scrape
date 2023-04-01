import React from 'react';

function DataDisplay ({ imageUrl, price, description, url }) {
  const handleClick = () => {
    window.location.href = url;
  }

  return (
    <div onClick={handleClick} style={{ display: 'flex', alignItems: 'center', padding: '16px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', marginBottom: '16px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <img src={imageUrl} alt="product" style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '16px' }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold' }}>{description}</div>
          <div style={{ fontWeight: 'bold' }}>{price}</div>
        </div>
        <div>{description}</div>
      </div>
    </div>
  );
}

export default DataDisplay;
