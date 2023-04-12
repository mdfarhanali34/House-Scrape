const cheerio = require('cheerio');
const request = require('request');

const url = 'https://www.realtor.ca/';
request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  } else {
    console.log(body);
    const $ = cheerio.load(body);
    const parentDiv = $('.parentClassName');
    parentDiv.children().each(function (index, childDiv) {
      console.log($(childDiv).text());
    });
  }
});