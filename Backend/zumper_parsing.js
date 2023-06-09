const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const data = require('./locations.json');
const TorontoSubCity = require("./TorontoSubCity")

function parseRelativeTime(datePostedValue) {
  const now = new Date();
  let date;

  if (datePostedValue.endsWith('dago') || datePostedValue.endsWith('d+ago')) {
    const days = parseInt(datePostedValue);
    date = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  } else if (datePostedValue.endsWith('hago')) {
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
  console.log(subCity)

  if (city === "TORONTO-GTA" && subCity in TorontoSubCity.torontoGta) {
    console.log("check for GTA");
    urlZumper = `https://www.zumper.com/apartments-for-rent/${TorontoSubCity.torontoGta[subCity]}-${province}`;
  } else {
    let cityLower = city.toLowerCase();
    let provinceLower = province.toLowerCase();
    let subCityLower = subCity.toLowerCase();
    urlZumper = `https://www.zumper.com/apartments-for-rent/${cityLower}-${provinceLower}`;

    if (subCity != "") {
      urlZumper = `https://www.zumper.com/apartments-for-rent/${subCityLower}-${provinceLower}`;
    }
  }
  
  console.log(urlZumper)
  console.log("before axios");

  return new Promise((resolve, reject) => {
    axios.get(urlZumper)
      .then((response) => {

        console.log("going here");
        const html = response.data;
        const $ = cheerio.load(html);
        const divs = $('div.css-kr0n7w').toArray().slice(1, -1);
        console.log(divs.length);
        const zumperData = [];
        divs.forEach((div) => {

          const zumper = {}

          const priceDiv = $(div).find('div.css-3r58gr');
          zumper.price = priceDiv.text().trim();
          if (zumper.price.includes("css")) {
            const cssIndex = zumper.price.indexOf("css");
            zumper.price = zumper.price.substr(0, cssIndex);
            // The above code will remove all characters after "css" and include the "css" string in the final result.
          }

          beds = $(div).find('div.css-1v235bj').text().trim();

          address = $(div).find('div.css-ny1adc').text().trim();
          zumper.description = $(div).find('div.css-1gjuufu').text().trim();
          if (zumper.description.includes("css")) {
            const cssIndex = zumper.description.indexOf("css");
            zumper.description = zumper.description.substr(0, cssIndex);
            // The above code will remove all characters after "css" and include the "css" string in the final result.
          }
        
          const url = $(div).find('a').attr('href');
          let appendString = 'https://www.zumper.com' + url;
          zumper.url = appendString;
          zumper.title = beds + " at," +  address;
          if (zumper.title.includes("css")) {
            const cssIndex = zumper.title.indexOf("css");
            zumper.title = zumper.title.substr(0, cssIndex);
            // The above code will remove all characters after "css" and include the "css" string in the final result.
          }
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
        resolve(zumperData);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

//ZumperParser();

module.exports = ZumperParser;