import React, { useState, useEffect } from 'react';
import DataDisplay from '../Components/DataDisplay';
import SearchMenu from '../Components/SearchMenu';
import Header from "../Components/Header";
import LogoIntro from "../Components/LogoIntro";
import '../App.css';
import { Box, Container } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';


function TextBoxes({ onSubmit }) {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [subCity, setSubCity] = useState('');
  const [kijijiData, setKijijiData] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const centeredDivStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '-20px' // adjust the margin-top value as needed
  };

  const handleArgumentsChange = async (city, province, subCity, event) => {
    setProvince(province);
    setCity(city);
    setSubCity(subCity);
    console.log(city)
    console.log(province)
    console.log(subCity)

    // event.preventDefault();
    //onSubmit(province, city);
    const response = await fetch('http://localhost:4000/submit', { // updated URL
    //const response = await fetch('http://10.0.0.33:4000/submit', { // updated URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ province, city, subCity })
    });

    const data = await response.json('data');
    const result = [...data[0], ...data[1]];
    var ok = result.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    console.log(data)
    setKijijiData(ok);
    setSubmitClicked(true)
    console.log('Server response:', response);
  };

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

  return (
    <div id="root" style={{ backgroundColor: 'white' }}>
      
      <div className='header'>
        <Header/>
      </div>
        <LogoIntro/>
      
      <div>
        <SearchMenu onArgumentsChange={handleArgumentsChange}/>
        {submitClicked && (
        <Container>
          {kijijiData.map(item => (
            <DataDisplay imageUrl={item.img} price={item.price} description={item.description} url={item.url} title={item.title}/>
          ))}
        </Container>
      )}
      </div>
    </div>

  );
}

export default TextBoxes;
