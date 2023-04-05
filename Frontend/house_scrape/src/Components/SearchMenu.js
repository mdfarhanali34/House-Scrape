import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

const data = require('./locations.json');

export default function SelectProvince(props) {
  const [selectedProvince, setSelectedProvince] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [selectedSubCity, setSelectedSubCity] = React.useState('');
  const [provinceSelected, setProvinceSelected] = React.useState(false);
  const [citySelected, setCitySelected] = React.useState(false);
  const [subcitySelected, setSubcitySelected] = React.useState(false);

  const [provinceKeys, setProvinceKeys] = useState([]);
  const [cityKeys, setCityKeys] = useState([]);
  const [subCityKeys, setSubCityKeys] = useState([]);


  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    // handleArgumentsChange();
    setSelectedCity('');
    if (event.target.value === "" || !event.target.value) {
      setProvinceSelected(false);
    }
    else {
      setProvinceSelected(true);
    }
  };

  const handleCityChange = (event) => {
    setSelectedSubCity('');
    setSelectedCity(event.target.value);
    setCitySelected(true)
    // handleArgumentsChange();
  };

  const handleArgumentsChange = () => {
    props.onArgumentsChange(selectedCity, selectedProvince, selectedSubCity);
  };

  const handleSubCityChange = (event) => {
    setSelectedSubCity(event.target.value);
    if (event.target.value === "" || !event.target.value) {
      setSubcitySelected(false);
    }
    else {
      setSubcitySelected(true);
    }
  };

  // const sendDataBack = (event) => {
  //   handleArgumentsChange()
  // };

  // useEffect(()=>{
  //   if(selectedCity === "" || !selectedCity || subCityKeys.length === 0){
  //     setCitySelected(false);
  //   }
  //   else{
  //     setCitySelected(true);
  //   }
  // },[subCityKeys.length, selectedCity]);

  useEffect(() => {
    setProvinceKeys(Object.keys(data).slice(1).map(key => key.replace(/_/g, ' ')));
    if (selectedProvince) {
      setCityKeys(Object.keys((selectedProvince && data[selectedProvince.replace(/ /g, '_')])).slice(1).map(key => key.replace(/_/g, ' ')));
    }
  }, [selectedProvince, selectedCity]);

  useEffect(() => {
    if (selectedCity) {
      setSubCityKeys(Object.keys(selectedCity && data[selectedProvince.replace(/ /g, '_')][selectedCity.replace(/ /g, '_')]).slice(1).map(key => key.replace(/_/g, ' ')));
    }
  }, [selectedProvince, selectedCity]);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 110 }}>
        <InputLabel id="select-province-label">Province</InputLabel>
        <Select
          labelId="select-province-label"
          id="select-province"
          value={selectedProvince}
          onChange={handleProvinceChange}
          autoWidth
          label="Province"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {provinceKeys.map(item => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {provinceSelected &&
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="select-city-label">City</InputLabel>
          <Select
            labelId="select-city-label"
            id="select-city"
            value={selectedCity}
            onChange={handleCityChange}
            autoWidth
            label="City"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {cityKeys.map(item => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>}
      {citySelected &&
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="select-sub-city-label">Sub City</InputLabel>
          <Select
            labelId="select-sub-city-label"
            id="select-city"
            value={selectedSubCity}
            onChange={handleSubCityChange}
            autoWidth
            label="SubCity"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {subCityKeys.map(item => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}

          </Select>
        </FormControl>}
      {citySelected && (subcitySelected || citySelected) && (

        <Button variant="contained"
          onClick={handleArgumentsChange}
          sx={{ m: 1, minWidth: 80 }}
          size="large"
        >
          Search</Button>

      )}
    </div>
  );
}