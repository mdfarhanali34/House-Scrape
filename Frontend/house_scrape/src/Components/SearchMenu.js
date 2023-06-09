import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import kijijiLogo from './Resources/kijiji_logo1.png';
import zumperLogo from './Resources/zumper_logo.png';
import cannonLogo from './Resources/cannon_logo.png';
import rentalsLogo from './Resources/rentals_logo.png'

const data = require('./locations.json');

export default function SelectProvince(props) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [selectedProvince, setSelectedProvince] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [selectedSubCity, setSelectedSubCity] = React.useState('');
  const [provinceSelected, setProvinceSelected] = React.useState(false);
  const [citySelected, setCitySelected] = React.useState(false);
  const [subcitySelected, setSubcitySelected] = React.useState(false);

  const [provinceKeys, setProvinceKeys] = useState([]);
  const [cityKeys, setCityKeys] = useState([]);
  const [subCityKeys, setSubCityKeys] = useState([]);
  const subCityAvailable = subCityKeys.length > 0;
  const cityAvailable = cityKeys.length > 0;

  console.log(data);

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
    <Grid container justifyContent='center' className='greyBar' alignItems='center' alignContent={'center'} textAlign={'center'} sx={{ alignItems: 'flex', paddingTop: '5%', backgroundColor: isMobile ? 'white' : '#f4f5f7', paddingBottom: '3%', textAlign: 'center', alignContent: 'center', display: "flex", flexDirection: "column", paddingLeft:isMobile? '5%': 'NA'  }}>
      <Grid className='greyBar' alignItems='center' textAlign={'center'} sx={{ alignItems: 'center', backgroundColor: 'white', paddingTop: isMobile ? '2%' : '0.5%', paddingBottom: '0.5%', paddingRight: '0%', paddingLeft: '0.5%', borderRadius: '12px', width: isMobile ? '95%' : 'NA', boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.5)' }}>
        <FormControl sx={{ width: isMobile ? '95%' : 250 }}>
          <InputLabel id="select-province-label"></InputLabel>
          <Select
            labelId="select-province-label"
            id="select-province"
            value={selectedProvince}
            onChange={handleProvinceChange}
            displayEmpty
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
              },
              getcontentanchorel: null,
            }}
          >
            <MenuItem value="">
              <em>Select a Province</em>
            </MenuItem>
            {provinceKeys.map(item => (
              <MenuItem key={item} value={item}>{item} </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: isMobile ? '95%' : 250 }}>
          <InputLabel id="select-city-label"></InputLabel>
          <Select
            labelId="select-city-label"
            id="select-city"
            value={selectedCity}
            onChange={handleCityChange}
            autoWidth
            disabled={!cityAvailable}
            displayEmpty
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
              },
              getcontentanchorel: null,
            }}
          >
            <MenuItem value="">
              <em>Select a City</em>
            </MenuItem>
            {cityKeys.map(item => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: isMobile ? '95%' : 250 }}>
          <InputLabel id="select-sub-city-label"></InputLabel>
          <Select
            labelId="select-sub-city-label"
            id="select-city"
            value={selectedSubCity}
            onChange={handleSubCityChange}
            autoWidth
            disabled={!subCityAvailable}
            displayEmpty
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
              },
              getcontentanchorel: null,
            }}
          >
            <MenuItem value="">
              <em>Select Sub City</em>
            </MenuItem>
            {subCityKeys.map(item => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}

          </Select>
        </FormControl>

        <Button variant="contained"
          onClick={handleArgumentsChange}
          sx={{ m: 1, minWidth: 80 }}
          size="large"
        >
          Search</Button>

      </Grid>
      <Grid sx={{ paddingTop: '2%' }}>
  <img src={kijijiLogo} alt="kijiji_logo" style={{ filter: 'grayscale(100%)', blockSize: '6vh', display: 'inline-block', verticalAlign: 'middle', paddingRight: '2vh' }} />
  <img src={zumperLogo} alt="zumper_logo" style={{ filter: 'grayscale(100%) invert(100%)', blockSize: '6vh', display: 'inline-block', verticalAlign: 'middle', paddingRight: '2vh' }} />
  <img src={cannonLogo} alt="cannon_logo" style={{ filter: 'grayscale(100%)', blockSize: '3vh', display: 'inline-block', verticalAlign: 'middle', paddingRight: '2vh' }} />
  <img src={rentalsLogo} alt="rentals_logo" style={{ filter: 'grayscale(100%)', blockSize: '6vh', display: 'inline-block', verticalAlign: 'middle', paddingRight: '2vh' }} />
</Grid>
    </Grid>
  );
}