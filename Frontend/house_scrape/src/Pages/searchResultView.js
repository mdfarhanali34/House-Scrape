import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DataDisplay from '../Components/DataDisplay';
import '../App.css';
import { Box, Container } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchMenu from '../Components/searchSecondPage';
import HeaderWithLogo from "../Components/HeaderWithLogo";
import Button from '@mui/material/Button';
import { LinearProgress } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const websites = [
  'Rentgram Official',
  'Kijiji',
  'Zumper',
  'Rentals',
  'Cannon',
];

function SearchResultView() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isLoading, setIsLoading] = useState(false);

  const { province, city, subCity } = useParams();
  const [allData, setAllData] = useState([]);
  const [masterData, setMasterData] = useState([]);    ///this is data that is not affected by filters and holds the master data searched
  //const [filter, setFilter] = useState([]);
  const [filter, setFilter] = React.useState('noSort');
  const [submitClicked, setSubmitClicked] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let response;

      response = await fetch('/submit', { // updated URL
        //const response = await fetch('http://10.0.0.33:4000/submit', { // updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ province, city, subCity }) 
      });
      const data = await response.json('data');
      const result = [...data[0], ...data[1], ...data[2], ...data[3]];
      var ok = result.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
      setAllData(ok);
      setMasterData(ok);
      setSubmitClicked(true);
      setIsLoading(false);
      console.log('New page loaded');
    }
    fetchData(); // Call fetchData function here

  }, [city, province, subCity]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    setTotalPages(Math.ceil(allData.length / 20));
  }, [allData]);


  const startIndex = (currentPage - 1) * 20;
  const endIndex = Math.min(startIndex + 20, allData.length);

  const handleArgumentsChange = async (city, province, subCity, event) => {

    const response = await fetch('/submit', { // updated URL
      //const response = await fetch('http://10.0.0.33:4000/submit', { // updated URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ province, city, subCity })
    });

    const data = await response.json('data');
    const result = [...data[0], ...data[1], ...data[2], ...data[3]];
    var ok = result.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    console.log(result)
    setAllData(ok);
    setSubmitClicked(true)
    console.log('Server response:', response);
  };

  const handleSortChange = (event) => {
    setFilter(event.target.value);
    if (event.target.value === "priceAsc" || !event.target.value) {
      allData.sort((a, b) => {
        var priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
        var priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));

        if (isNaN(priceA)) {
          priceA = 99999.0;
        }
        if (isNaN(priceB)) {
          priceB = 99999.0;
        }

        return priceA - priceB;
      });
    }
    else if (event.target.value === "priceDsc" || !event.target.value) {
      allData.sort((a, b) => {
        var priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
        var priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));

        if (isNaN(priceA)) {
          priceA = 0.0;
        }
        if (isNaN(priceB)) {
          priceB = 0.0;
        }
        return priceB - priceA;
      });
    }
    else {
      allData.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    }
  };

  const [selectedWebsites, setSelectedWebsites] = React.useState([]);

  useEffect(() => {
    const filteredData = masterData.filter((item) => {
      const host = item.host.toLowerCase();
      return selectedWebsites.some((website) =>
        website.toLowerCase() === host
      );
    });
    setAllData(filteredData);

    //Show official listings if no listing available
    if (filteredData.length === 0) {
      const filteredData = masterData.filter(item => item.host === 'official');
      setAllData(filteredData);
    };
    //TODO - show a msg or something if no Listing availible after the filter 

  }, [selectedWebsites]);

  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    if (value[value.length - 1] === "Search All Websites") {
      setSelectedWebsites(selectedWebsites.length === websites.length ? [] : websites);
      return;
    }
    setSelectedWebsites(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <div className='header'>
        <HeaderWithLogo />
      </div>
      <SearchMenu onArgumentsChange={handleArgumentsChange} />
      <div style={{ padding: '0.2%' }}>{isLoading && <LinearProgress />}</div>
      {submitClicked && (
        <div style={{ textAlign: isMobile ? 'NA' : 'center' }}>
          <div>
            <FormControl sx={{ width: isMobile ? '95%' : 250, padding: '1%' }}>
              <InputLabel id="select-filter-label"></InputLabel>
              <Select
                labelId="select-filter-label"
                id="select-filter"
                value={filter}
                onChange={handleSortChange}
                displayEmpty
                MenuProps={{
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center'
                  },
                  getcontentanchorel: null,
                }}
              >
                <MenuItem key="noSort" value="noSort">
                  <em>Sort</em>
                </MenuItem>
                <MenuItem key="priceAsc" value="priceAsc">Price - Low to High</MenuItem>
                <MenuItem key="priceDsc" value="priceDsc">Price - High to Low</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: isMobile ? '95%' : 250, padding: '1%' }}>
              <InputLabel
                id="select-filter-label"
                sx={{
                  position: 'absolute',
                  top: 25,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '1rem',
                  color: 'black',
                  display: selectedWebsites.length !== 0 ? 'none' : 'block'
                }}
              >
                Filter
              </InputLabel>
              <Select
                labelId="select-filter-label"
                id="select-filter"
                value={selectedWebsites}
                onChange={handleFilterChange}
                displayEmpty
                multiple
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center'
                  },
                  getcontentanchorel: null,
                  PaperProps: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                      width: 250,
                    },
                  },
                }}
              >
                <MenuItem key="allWebsites" value="Search All Websites">
                  <Checkbox checked={selectedWebsites.length === websites.length} />
                  {/* Search All Websites */}
                  <em>Search All Websites</em>
                </MenuItem>
                {websites.map((website) => (
                  <MenuItem key={website} value={website}>
                    <Checkbox checked={selectedWebsites.indexOf(website) > -1} />
                    <ListItemText primary={website} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Container>
            {allData.slice(startIndex, endIndex).map(item => (
              <DataDisplay
                key={item.id}
                imageUrl={item.img}
                price={item.price}
                description={item.description}
                url={item.url}
                title={item.title}
                host={item.host}
              />
            ))}
          </Container>
          <div style={{ textAlign: 'center' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                disabled={currentPage === page}
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>

  );
}

export default SearchResultView;