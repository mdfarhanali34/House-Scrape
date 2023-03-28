const puppeteer = require('puppeteer');


async function searchGoogle(query) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://www.kijiji.ca');

  
  // Type the query in the search box
  await page.type('input[name="keywords"]', "rent");
  
  // Press the Enter key
  await page.keyboard.press('Enter');

  // //category
  // const liElement = await page.$('ul.categoryList-3798401611 li:nth-child(3)');
  // // clicking on the element
  // await liElement.click();
  // Select the ul element by class
  // console.log("Here1");
  // const liElement = await page.$('ul.categoryList-3798401611');
  // console.log("Here3");
  // const ulElement = await page.$('.catogoryList-3798401611');
  // console.log("Here2");
  // const thirdLiElement = await ulElement.$$('li')[2];
  // await thirdLiElement.click();
  
  

  // Wait for the search results to load
  await page.waitForNavigation();

  // Get the page title and URL
  const title = await page.title();
  const url = page.url();

  console.log(`Title: ${title}`);
  console.log(`URL: ${url}`);

  await browser.close();
}

searchGoogle('puppeteer')