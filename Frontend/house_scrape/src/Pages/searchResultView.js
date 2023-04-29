import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DataDisplay from '../Components/DataDisplay';
import '../App.css';
import { Box, Container } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchMenu from '../Components/searchSecondPage';
import HeaderWithLogo from "../Components/HeaderWithLogo";
import Button from '@mui/material/Button';

function SearchResultView() {

    const { province, city, subCity } = useParams();
    const [kijijiData, setKijijiData] = useState([]);
    const [submitClicked, setSubmitClicked] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
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
            setKijijiData(result);
            setSubmitClicked(true)
            console.log('New page loaded');
        }
        fetchData(); // Call fetchData function here

    }, []);

    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        setTotalPages(Math.ceil(kijijiData.length / 20));
      }, [kijijiData]);
    

    const startIndex = (currentPage - 1) * 20;
  const endIndex = Math.min(startIndex + 20, kijijiData.length);

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
        setKijijiData(ok);
        setSubmitClicked(true)
        console.log('Server response:', response);
    };
    return (
        <div>
      <div className='header'>
        <HeaderWithLogo />
      </div>
      <SearchMenu onArgumentsChange={handleArgumentsChange}/>
      {submitClicked && (
        <div style={{ textAlign: 'center' }}>
          <Container>
            {kijijiData.slice(startIndex, endIndex).map(item => (
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
          <div>
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