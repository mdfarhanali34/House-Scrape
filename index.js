const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.kijiji.ca/b-real-estate/guelph/c34l1700242?rb=true&ad=offering';
const fs = require('fs'); 

axios.get(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const divs = $('div[data-listing-id]').toArray();
    const kijijiData = [];
	divs.forEach((div) => {

        const kijiji = {} 


        const priceDiv = $(div).find('div.price');
        kijiji.price = priceDiv.text().trim();
        const desc = $(div).find('div.description');
        kijiji.description = desc.text().trim();
        
        const url = $(div).find('a.title ').attr('href');
        let appendString = 'https://www.kijiji.ca' + url;
        kijiji.url = appendString;

        const img = $('div.image').find('img').attr('src');
        kijiji.img = img;

     kijijiData.push(kijiji)
	  });
      fs.writeFile("kijiji_listings.json", JSON.stringify(kijijiData, null, 2), (err) => { 
        if (err) { 
            console.error(err); 
            return; 
        } 
        console.log("Data written to file successfully!"); 
    }); 

	//Code to get page navigation 
	const paginationDiv = $('div.pagination');
	const kijiji_navigation = [];
    paginationDiv.find('a').each((i, elem) => {
      const href = $(elem).attr('href');
      kijiji_navigation.push(href);
    });
    fs.writeFile('kijiji_navigation.json', JSON.stringify(kijiji_navigation), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('kijiji_navigation.json written successfully');
      }
    });

  })
  .catch((error) => {
    console.error(error);
  });