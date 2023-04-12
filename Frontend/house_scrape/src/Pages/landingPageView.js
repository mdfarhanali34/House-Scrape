import React, { useState, useEffect } from 'react';
import DataDisplay from './Components/DataDisplay';
import SearchMenu from './Components/SearchMenu';
import Header from "./Components/Header";
import { useHistory } from "react-router-dom";
import SearchResultsPage from ".Pages/searchResultView";

function TextBoxes({ onSubmit }) {
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [subCity, setSubCity] = useState('');
  const [kijijiData, setKijijiData] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  // const handleText1Change = (event) => {
  //   setProvince(event.target.value);
  // }

  // const handleText2Change = (event) => {
  //   setCity(event.target.value);
  // }

  const history = useHistory();
  const centeredDivStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '-20px' // adjust the margin-top value as needed
  };

  const handleArgumentsChange = async (city, province, subCity) => {
    setProvince(province);
    setCity(city);
    setSubCity(subCity);

    history.push("/search-results");
    console.log(city)
    console.log(province)
    console.log(subCity)

    event.preventDefault();
    onSubmit(province, city);
    const response = await fetch('http://localhost:4000/submit', { // updated URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ province, city, subCity })
    });

    const data = await response.json('data');
    setKijijiData(data);
    setSubmitClicked(true)
    console.log('Server response:', response);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   onSubmit(province, city);
  //   const response = await fetch('http://localhost:4000/submit', { // updated URL
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ province, city, subCity })
  //   });

  //   const data = await response.json('data');
  //   setKijijiData(data);
  //   setSubmitClicked(true)
  //   console.log('Server response:', response);
  // }

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
    <div>
      <div>
        <Header />
      </div>

      <div style={centeredDivStyles}>
        <SearchMenu onArgumentsChange={handleArgumentsChange} />
      </div>

      {submitClicked && (
        <div>
          {kijijiData.map(item => (
            <DataDisplay imageUrl={item.img} price={item.price} description={item.description} url={item.url} title={item.title} />
          ))}
        </div>
      )}

    </div>

  );
}

export default TextBoxes;
