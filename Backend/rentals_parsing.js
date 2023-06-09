const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const TorontoSubCity = require("./TorontoSubCity")

async function RentalsParser(city, subCity) {

    //TODO - Make Sure you replaces spaces " " with "-" before passing
  urlParser = `https://rentals.ca/${city}`;

  console.log("City - " + city + " SubCity - " + subCity);
  if (city === "TORONTO_GTA" && subCity in TorontoSubCity.torontoGta) {
    urlParser = `https://rentals.ca/${TorontoSubCity.torontoGta[subCity]}`;
  } else {
    let cityLower = city.toLowerCase();
    let subCityLower = subCity.toLowerCase();
    urlParser = `https://rentals.ca/${cityLower}`;

    if (subCity != "") {
      urlParser = `https://rentals.ca/${subCityLower}`;
    }
  }


  console.log(urlParser);
  console.log("before axios");
  

  return new Promise((resolve, reject) => {
    axios.get(urlParser)
      .then((response) => {

        const html = response.data;
        const $ = cheerio.load(html);

        // Find the script tag containing the data
        const scriptTags = $('script[type="application/ld+json"]');

        // Extract the contents of each script tag as JSON objects
        const jsonObjects = scriptTags.map((i, tag) => JSON.parse($(tag).html())).get();

        //console.log(jsonObjects[2].url);

        const rentalsData = [];
        jsonObjects.slice(2).forEach((item) => {
          const rentals = {}
          
          prices = item.containsPlace.map((place) => place.potentialAction.priceSpecification.price);
          const maxPrice = Math.max(...prices);
          const minPrice = Math.min(...prices);
          rentals.price = minPrice.toString() + " - " + maxPrice.toString();

          //rentals.beds = item.containsPlace.map((place) => place.name);
          beds = item.containsPlace.map((place) => place.name.charAt(0));
          const maxBeds = Math.max(...beds);
          const minBeds = Math.min(...beds);
          bedRange = minBeds.toString() + " - " + maxBeds.toString();

          type = item['@type'];
          address = item.address.streetAddress;
          rentals.description = bedRange + " room/s in a " + type + ", " + address;
        
          rentals.url = item.url;
          rentals.title = item.name;
          rentals.img = item.photo[0].image;

          rentals.host = "rentals";
   
          rentalsData.push(rentals)
        });

        i = 0;
        const regex = /"updated":"([\d\-T\:Z]+)"/g;
        let match;
        while ((match = regex.exec(html)) !== null) {
          updated = match[1];
        //   updated = updated.replace('T', ', ');
        //   updated = updated.replace('Z', '');
        //   updated = updated.replace(/-/g, '/');
          rentalsData[i].datePosted = updated;
          i++;
        }
        resolve(rentalsData);
      })
      .catch((error) => {
        console.error(error);
        reject(JSON.stringify(error));
      });
  });
}

module.exports = RentalsParser;