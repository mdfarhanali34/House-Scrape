import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
const data = require('./locations.json');

export default function SelectAutoWidth() {
  const [selectedProvince, setSelectedProvince] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [provinceSelected, setProvinceSelected] = React.useState(false);

  const handleProvinceChange = (event: SelectChangeEvent) => {
    setSelectedProvince(event.target.value);
    if(event.target.value === "" || !event.target.value){
      console.log(event.target.value);
      setProvinceSelected(false);
    }
    else{
      setProvinceSelected(true);
    }
  };

  const handleCityChange = (event: SelectChangeEvent) => {
    setSelectedCity(event.target.value);
  };

  const keys = Object.keys(data).slice(1);
  const newKeys = keys.map(key => key.replace(/_/g, ' '));

  const provinces = selectedProvince && data[selectedProvince.replace(/ /g, '_')];
  const provinceKeys = Object.keys(provinces).slice(1).map(key => key.replace(/_/g, ' '));

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
          {newKeys.map(item => (
            <MenuItem key = {item} value = {item}>{item}</MenuItem>
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
          label="Province"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {provinceKeys.map(item => (
            <MenuItem key = {item} value = {item}>{item}</MenuItem>
           ))}
        </Select>
      </FormControl>  }
    </div>
  );
}