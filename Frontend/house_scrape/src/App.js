// TextBoxes.js
import React, { useState } from 'react';

function TextBoxes({ onSubmit }) {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');

  const handleText1Change = (event) => {
    setProvince(event.target.value);
  }

  const handleText2Change = (event) => {
    setCity(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(province, city);
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ province, city })
    });


    console.log('Server response:', response);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={province} onChange={handleText1Change} />
      <input type="text" value={city} onChange={handleText2Change} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TextBoxes;