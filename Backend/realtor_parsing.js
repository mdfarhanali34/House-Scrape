const cheerio = require('cheerio');
const axios = require('axios');



axios.get("https://www.places4students.com/Places/PropertyListings?SchoolID=Ey3k2jjN%2fQI%3d")
    .then((response) => {
        console.log('here');
        const html = response.data;
        console.log(html);
        const $ = cheerio.load(html)
        //console.log($);
        const trArray = $('#MainContent_divFeaturedLabelContainer');
        console.log(trArray);
        // trArr.forEach((tr) => {
        //     const realtor = {}
        //     console.log('here');
        //   //  const realtorUrl = $(div).find('a.title').attr('href')

        //     //console.log(realtorUrl);
        // })
    })






