import React, { useState, useEffect } from 'react';
import SearchMenu from '../Components/SearchMenu';
import Header from "../Components/Header";
import LogoIntro from "../Components/LogoIntro";
import '../App.css';
import { Box, Container } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import HeaderWithLogo from "../Components/HeaderWithLogo";
import Footer from "../Components/Footer"


function TextBoxes({ onSubmit }) {
  const [kijijiData, setKijijiData] = useState([]);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const history = useNavigate();

  const handleArgumentsChange = async (city, province, subCity, event) => {

    if (subCity === "") {
      subCity = " "
    }
    history(`/onSubmit/${city}/${province}/${subCity}`);
    console.log(city)
    console.log(province)
    console.log(subCity)

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
        {!isMobile && (
            <Header/>
          )}  
          {isMobile && (
            <HeaderWithLogo/>
          )} 
      </div>
        <LogoIntro/>
      
      <div>
        <SearchMenu onArgumentsChange={handleArgumentsChange}/>
      </div>
      <div>
          <Footer/>
      </div>
    </div>

  );
}

export default TextBoxes;
