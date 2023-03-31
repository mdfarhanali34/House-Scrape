const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs'); 
const data = require('./locations.json');


function KijijiParser(province, city) {

  const urlKijiji = `https://www.kijiji.ca/b-canada/c34l0${data[province][city].id}`;
  console.log(urlKijiji)
  
  axios.get(urlKijiji)
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
  
          const titlediv = $(div).find('div.title');
          const title = titlediv.text().trim();
          kijiji.title = title;
  
          const imgSrc = $(div).find('div.image img').attr('data-src');
          //const imgSrc4 = imgSrc.replace('200-jpg','400-jpg')       //changing image size for 200X to 400X(to get better picture)
          kijiji.img = imgSrc;
  
       kijijiData.push(kijiji)
      });
        fs.writeFile("kijiji_listings.json", JSON.stringify(kijijiData, null, 2), (err) => { 
          if (err) { 
              console.error(err); 
              return; 
          } 
          console.log("Data written to file successfully in kijiji_listings.json!"); 
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
}

module.exports = KijijiParser;