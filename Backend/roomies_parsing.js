const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const data = require('./locations.json'); 

async function RoomiesParser(province, city, subCity) {
    var urlRoomies = ""

    if (city === "TORONTO-GTA" && subCity in TorontoSubCity.torontoGta) {
        console.log("check for GTA");
        urlRoomies = `https://www.roomies.ca/${TorontoSubCity.torontoGta[subCity]}-${province}`;
      } else {
        let cityLower = city.toLowerCase();
        let provinceLower = province.toLowerCase();
        let subCityLower = subCity.toLowerCase();
        urlRoomies = `https://www.roomies.ca/${cityLower}-${provinceLower}`;
    
        if (subCity != "") {
            urlRoomies = `https://www.roomies.ca/${subCityLower}-${provinceLower}`;
        }
      }

  console.log(urlRoomies)
  console.log("before axios");

  return new Promise((resolve, reject) => {
    axios.get(urlRoomies)
      .then((response) => {

        console.log("going here");
        const html = response.data;
        const $ = cheerio.load(html);
        //const divs = $('div[data-listing-id]').toArray().slice(0, 20);
        const divs = $('article.tile.relative').toArray();
        const roomiesData = [];
        console.log("Here - " + divs.length);
        divs.forEach((div) => {

          const roomies = {}

          const priceDiv = $(div).find('div.inline-flex.items-center.bg-pink.text-white.text-sm.font-semibold.rounded-full.px-3.py-1.mr-1');
          const text = priceDiv.text().trim();
          roomies.price = text.replace(/[^$\d]/g, '');

          const desc = $(div).find('p.text-sm.text-gray-darker.break-words.leading-snug.line-clamp-3.mb-2');
          roomies.description = desc.text().trim();

          const url = $(div).find('a.absolute.inset-0.z-10').attr('href');
          roomies.url = url;

          const titlediv = $(div).find('p.text-lg.font-bold.truncate.font-display.tracking-tight');
          const title = titlediv.text().trim();
          roomies.title = title;

          const imgSrc = $(div).find('div.bg-gray-lighter.border-b-2.border-pink.flex.justify-center.items-center.h-40.relative.overflow-hidden img').attr('src');
          
          //const imgSrc4 = imgSrc.replace('200-jpg','400-jpg')       //changing image size for 200X to 400X(to get better picture)
          roomies.img = imgSrc;  

          const currentDate = new Date();

            // Get the year and month of the current date
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            // Generate a random day within the current month
            const randomDay = Math.floor(Math.random() * 30) + 1; // Assumes a maximum of 30 days in a month

            // Create a new Date object with the random date within the current month
            const randomDate = new Date(year, month, randomDay);

            // Assign the random date to the kijiji.datePosted variable
            roomies.datePosted = randomDate;

            roomies.host = "roomies";

            if (title.toLowerCase().includes(city.toLowerCase() || title.toLowerCase().includes(subCity.toLowerCase()))){
                roomiesData.push(roomies)
              }
        });
        resolve(roomiesData);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

module.exports = RoomiesParser;