const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];


async function rentBoardScraper() {
  const urlBoard = 'https://www.rentboard.ca/guelph-on';
  const browser = await puppeteer.launch({
    headless: true,
    args: minimal_args
  })
  //const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urlBoard, { waitUntil: 'networkidle0' });
  const html = await page.content();
  await browser.close();

  const $ = cheerio.load(html);
  const divs = $('div.listing-container').toArray();

  const rentboardData = [];
  divs.forEach((div) => {

    const rentboard = {}

    const priceDiv = $(div).find('div.rate');
    rentboard.price = priceDiv.text().trim();
    const beds = $(div).find('.beds-value').text().trim();
    const baths = $(div).find('.baths-value').text().trim();
    rentboard.description = beds + " " + baths;

    //const link = $('a.listing.hover-pointer').attr('href');
    const url = $(div).find('a.listing.hover-pointer ').attr('href');
    let appendString = 'https://www.rentboard.ca/' + url;
    rentboard.url = appendString;

    const titlediv = $(div).find('div.address');
    const title = titlediv.text().trim();
    rentboard.title = title;

    const imgSrc = $(div).find('div.image img').attr('data-src');
    rentboard.img = imgSrc;

    rentboard.datePosted = "";

    rentboardData.push(rentboard)
  });
  fs.writeFile("kijiji_listings.json", JSON.stringify(rentboardData, null, 2), (err) => {
    if (err) {
      console.error(err);
      reject(err);
    } else {
      console.log("Data written to file successfully in kijiji_listings.json!");
    }
  });
}

rentBoardScraper();
