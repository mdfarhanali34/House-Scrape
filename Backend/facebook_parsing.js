const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const data = require('./locations.json');


async function FacebookParser() {
  var urlFacebook = "https://www.facebook.com/marketplace/106514426051396/propertyrentals?exact=false&radius=11"

  console.log(urlFacebook)
  console.log("before axios");

  const className = 'xjp7ctv'
  //const className = 'x9f619 x78zum5 x1r8uery xdt5ytf x1iyjqo2 xs83m0k x1e558r4 x150jy0e xnpuxes x291uyu x1uepa24 x1iorvi4 xjkvuk6';
  //const className = 'x9f619\ x78zum5\ x1r8uery\ xdt5ytf\ x1iyjqo2\ xs83m0k\ x1e558r4\ x150jy0e\ xnpuxes\ x291uyu\ x1uepa24\ x1iorvi4\ xjkvuk6';

  return new Promise((resolve, reject) => {
    axios.get(urlFacebook)
      .then((response) => {

        console.log("going here");
        const html = response.data;
        const $ = cheerio.load(html);
        //console.log(html);

        const innerDivs = $('.x9gbvx8 > div');
        //const divs = innerDivs.toArray();
        const divs = $('div[tabindex]').toArray();
        console.log(divs)
        const priceDiv = $(html).find('.xzsf02u >div');
          price = priceDiv.text().trim();
          const spanElement = $('span.xzsf02u');
          console.log(spanElement.text());
        //const divs = $('div.x8gbvx8 x78zum5 x1q0g3np x1a02dak x1rdy4ex xcud41i x4vbgl9 x139jcc6 x1nhvcw1');
        //console.log(divs)
        const kijijiData = [];
        divs.forEach((div) => {
            console.log("Here");
            
          const kijiji = {}

          const priceDiv = $(div).find('div.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x676frb.x1lkfr7t.x1lbecb7.x1s688f.xzsf02u');
          kijiji.price = priceDiv.text().trim();
          console.log(kijiji.price);
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

          const datePosted = $(div).find('div.location').find('span.date-posted');
          const datePostedValue = datePosted.text().replace(/\s+|<+/g, '');
          //kijiji.datePosted = parseRelativeTime(datePostedValue);

          kijijiData.push(kijiji)
        });
        fs.writeFile("kijiji_listings.json", JSON.stringify(kijijiData, null, 2), (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log("Data written to file successfully in kijiji_listings.json!");
            resolve(kijijiData);
          }
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
        reject(error);
      });
  });
}

FacebookParser();

module.exports = FacebookParser;