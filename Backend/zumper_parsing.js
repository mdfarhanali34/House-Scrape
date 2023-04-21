const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const data = require('./locations.json');
const kijijiToZummper = require("./kijijiToZummper")

function parseRelativeTime(datePostedValue) {
  const now = new Date();
  let date;
    ///TODO, do parsing for days ago
  if (datePostedValue.endsWith('hago')) {
    const hours = parseInt(datePostedValue);
    date = new Date(now.getTime() - hours * 60 * 60 * 1000);
  } else if (datePostedValue.endsWith('mago')) {
    const minutes = parseInt(datePostedValue);
    date = new Date(now.getTime() - minutes * 60 * 1000);
  } else if (datePostedValue === 'Yesterday') {
    date = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    date.setHours(0, 0, 0, 0);
  } else {
    let parts = datePostedValue.split("/");
    let formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
    let dateObject = new Date(formattedDate);
    date = dateObject;
  }

  return date.toLocaleString();
}

async function ZumperParser(province, city, subCity) {
  var urlZumper = ""
  console.log(province)
  console.log(city)
  if (city === "TORONTO-GTA" && subCity in kijijiToZummper.TORONTO_GTA) {
    urlZumper = `https://www.zumper.com/apartments-for-rent/${TORONTO_GTA[subCity]-province}`;
  } else {
    let cityLower = city.toLowerCase();
    let provinceLower = province.toLowerCase();
    urlZumper = `https://www.zumper.com/apartments-for-rent/${cityLower}-${provinceLower}`;
  }
  
  console.log(urlZumper)
  console.log("before axios");

  return new Promise((resolve, reject) => {
    axios.get(urlZumper)
      .then((response) => {

        console.log("going here");
        const html = response.data;
        const $ = cheerio.load(html);
        const divs = $('div.css-kr0n7w').toArray().slice(1);
        console.log(divs.length);
        const zumperData = [];
        divs.forEach((div) => {

          const zumper = {}

          const priceDiv = $(div).find('div.css-3r58gr');
          zumper.price = priceDiv.text().trim();

          beds = $(div).find('div.css-1v235bj').text().trim();

          address = $(div).find('div.css-ny1adc').text().trim();
          zumper.description = $(div).find('div.css-1gjuufu').text().trim();
        
        //   rentals.url = item.url;
          const url = $(div).find('a').attr('href');
          let appendString = 'https://www.zumper.com' + url;
          zumper.url = appendString;
          zumper.title = beds + " at," +  address;
        //   rentals.img = item.photo[0].image;
        const imgSrc = $(div).find('img.css-1neknpp').attr('data-src');
        //const firstImageLink = $('div.css-1rel5gf.e1k4it830 img').first().attr('src');
        //console.log(firstImageLink);
        zumper.img = imgSrc;

          const datePosted = $(div).find('div.css-1gz4is2');
          const datePostedValue = datePosted.text().replace(/\s+|<+/g, '');
       //   console.log(datePostedValue);
          zumper.datePosted = parseRelativeTime(datePostedValue);

          zumper.host = "zumper";

          zumperData.push(zumper)
        });
        fs.writeFile("zumper_listings.json", JSON.stringify(zumperData, null, 2), (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log("Data written to file successfully in zumper_listings.json!");
            resolve(zumperData);
          }
        });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

//ZumperParser();

module.exports = ZumperParser;