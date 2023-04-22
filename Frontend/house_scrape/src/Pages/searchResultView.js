import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DataDisplay from '../Components/DataDisplay';
import '../App.css';
import { Box, Container } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchMenu from '../Components/searchSecondPage';
import Header from "../Components/Header";

function SearchResultView() {

    const { province, city, subCity } = useParams();
    const [kijijiData, setKijijiData] = useState([]);
    const [submitClicked, setSubmitClicked] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            let response;
            response = await fetch('http://localhost:4000/submit', { // updated URL
                //const response = await fetch('http://10.0.0.33:4000/submit', { // updated URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ province, city, subCity })
            });
            const data = await response.json('data');
            const result = [...data[0], ...data[1], ...data[2]];
            setKijijiData(result);
            setSubmitClicked(true)
            console.log('New page loaded');
        }
        fetchData(); // Call fetchData function here

    }, []);

    const handleArgumentsChange = async (city, province, subCity, event) => {

        const response = await fetch('http://localhost:4000/submit', { // updated URL
            //const response = await fetch('http://10.0.0.33:4000/submit', { // updated URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ province, city, subCity })
        });

        const data = await response.json('data');
        const result = [...data[0], ...data[1], ...data[2]];
        var ok = result.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
        console.log(data)
        setKijijiData(ok);
        setSubmitClicked(true)
        console.log('Server response:', response);
    };
    return (
        <div>
            <div className='header'>
                <Header />
            </div>
            <SearchMenu onArgumentsChange={handleArgumentsChange} />
            {submitClicked && (
                <Container>
                    {kijijiData.map(item => (
                        <DataDisplay imageUrl={item.img} price={item.price} description={item.description} url={item.url} title={item.title} />
                    ))}
                </Container>
            )}

        </div>
    );
}

export default SearchResultView;