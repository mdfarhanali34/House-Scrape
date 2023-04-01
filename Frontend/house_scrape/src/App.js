// TextBoxes.js
import React, { useState, useEffect } from 'react';
import DataDisplay from './Components/DataDisplay';

function TextBoxes({ onSubmit }) {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [kijijiData, setKijijiData] = useState([]);

  const handleText1Change = (event) => {
    setProvince(event.target.value);
  }

  const handleText2Change = (event) => {
    setCity(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit(province, city);
    const response = await fetch('http://localhost:4000/submit', { // updated URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ province, city })
    });
    
    const data = await response.json('data');
    setKijijiData(data);
    //response.text
    //console.log(kijijiData);

    console.log('Server response:', response);
  }

  useEffect(() => {
    console.log(kijijiData);
  }, [kijijiData]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('myData'));
    if (storedData) {
      setKijijiData(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('myData', JSON.stringify(kijijiData));
  }, [kijijiData]);

  const handleButtonClick = (url) => {
    window.location.href = url;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type="text" value={province} onChange={handleText1Change} />
      <input type="text" value={city} onChange={handleText2Change} />
      <button type="submit">Submit</button>
      </form>

      <div>
        {kijijiData.map(item => (
          <DataDisplay imageUrl= {item.img} price= {item.price} description={item.description} url={item.url} />
        ))}
      </div>
    </div>

  );
}

export default TextBoxes;
