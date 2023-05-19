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
import rentalsLogo from './Resources/rentals_logo.png';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

//const data = require('./locations.json');

const data = require('./locationsOne.json');

export default function SelectProvince(props) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = require('./locationsOne.json');
        const keys = Object.keys(data).map(key => key.replace(/_/g, ' ')).slice(1);
        setOptions(keys);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleArgumentsChange = () => {
    if (selectedItem && data[selectedItem]) {
      let selectedCity = data[selectedItem].PARENT;
      let selectedProvince = data[selectedItem].PROVINCE;
      let selectedSubCity = selectedItem;

      if (selectedCity === "NONE") {
        selectedCity = selectedSubCity;
        selectedSubCity = "";
      }

      ///TODO - Handle if user selects a whole province(can be dis allowed too)
      // if(selectedProvince === "NONE"){}
      props.onArgumentsChange(selectedCity.replace(/_/g, ' '), selectedProvince.replace(/_/g, ' '), selectedSubCity.replace(/_/g, ' '));
    }
  };

  useEffect(() => {
    if (selectedItem && data[selectedItem]) {
      setSelectedCity(data[selectedItem].PARENT);
      setSelectedProvince(data[selectedItem].PROVINCE);
    }
  }, [selectedItem]);


  return (
    <Grid container justifyContent='center' className='greyBar' alignItems='center' alignContent={'center'} textAlign={'center'} sx={{alignItems: 'flex', paddingTop: '1%', backgroundColor: isMobile ? 'white' : '#f4f5f7', paddingBottom: '1%', textAlign: 'center', alignContent: 'center', display: "flex", flexDirection: "column" }}>
      <Grid className='greyBar' alignItems='center' textAlign={'center'} sx={{minWidth:isMobile? '95%':'70%', alignItems: 'center',textAlign:'center', backgroundColor: 'white', paddingTop: isMobile ? '2%' : '0.5%', paddingBottom: '0.5%', paddingRight: '0.5%', paddingLeft:isMobile? '3%': '0.5%', borderRadius: '12px', width: isMobile ? '95%' : 'NA', boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.5)', display:isMobile? 'NA':'flex', flexDirection:isMobile? 'NA': 'row' }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          value={selectedItem}
          onChange={(event, newValue) => setSelectedItem(newValue)}
          sx={{ width: isMobile ? '96%' : '70%' }}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
        <Button variant="contained"
          onClick={handleArgumentsChange}
          sx={{ m: 1, minWidth: '30%' }}
          size="large"
        >
          Search</Button>

      </Grid>
    </Grid>
  );
}
