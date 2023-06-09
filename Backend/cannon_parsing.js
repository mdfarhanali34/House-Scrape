const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const data = require("./locations.json");

async function CannonParser(city) {
 
  if (city == "GUELPH"){
    var urlCannon =
    "https://thecannon.ca/classifieds/housing?subType=&h_lType=1&h_sublet=&h_bedrooms=&h_price_range=&c_search=&ns=1&o=%2Fclassifieds%2Fhousing%3Fo%3Ddate&viewMode=%2Fclassifieds%2Fhousing%3Fview%3Dtabular";

  } else {
    return []
  }
    
  console.log(urlCannon);
  console.log("before axios");

  return new Promise((resolve, reject) => {
    axios.get(urlCannon).then((response) => {
      console.log("got html");
      const html = response.data;
      const $ = cheerio.load(html);
      // Find the table you want to extract using Cheerio's selector syntax
      const table = $("table");

      const cannonData = [];
      table.find("tr").each((i, el) => {
        // Skip the first row (header row)
        if (i === 0) return;

        // Extract the row data using Cheerio's 'map' function
        const rowData = $(el)
          .find("td")
          .map((i, el) => $(el).text())
          .get();

        const postingUrl = $(el).find("td").eq(4).find("a").attr("href");

        const row = {
          DatePosted: rowData[0],
          DateAvailable: rowData[1],
          Type: rowData[2],
          Location: rowData[3],
          Name: rowData[4],
          Distance: rowData[5],
          UtilitiesIncluded: rowData[6],
          Bedrooms: rowData[7],
          Features: rowData[8],
          Rent: rowData[9],
          PostingUrl: postingUrl, // Add the href attribute value to the row object
        };

        const cannon = {};

        cannon.price = row.Rent;
        const desc = row.Features;
        cannon.description = desc;
        const url = row.PostingUrl;
        let appendString = "https://www.thecannon.ca" + url;
        cannon.url = appendString;

        const title =
          row.Bedrooms +
          " room/s in a " +
          row.Type +
          ", " +
          row.Location +
          ", Available from " +
          row.DateAvailable;
        cannon.title = title;

        cannon.img = "NA"

        let parts = rowData[0].split("/");
        let formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
        let dateObject = new Date(formattedDate);
        cannon.datePosted = dateObject

        cannon.host = "cannon";

        cannonData.push(cannon);
      });
      resolve(cannonData);

    //   //Code to get page navigation
    //   const paginationDiv = $("div.pagination");
    //   const kijiji_navigation = [];
    //   paginationDiv.find("a").each((i, elem) => {
    //     const href = $(elem).attr("href");
    //     kijiji_navigation.push(href);
    //   });
    });
  });
}

//CannonParser();

module.exports = CannonParser;
