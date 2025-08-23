const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const ObjectsToCsv = require("objects-to-csv");

const scrapingResults = [
  {
    title: "Software Engineer",
    datePosted: new Date("2025-08-20 12:00:00"),
    neighborhood: "(San Francisco)",
    url: "https://sfbay.craigslist.org/sfc/apa/d/san-francisco-2-bedroom-2-bath-in-the-heart-of-the-mission/7910101110.html",
    jobDescription:
      "2 bedroom, 2 bath in the heart of the mission. 1000 sq ft. 1 block from the 24th street bart station. 1 block from the 24th street muni stop. 1 block from the 24th street bus stop. 1 block from the 24th street light rail stop. 1 block from the 24th street cable car stop. 1 block from the 24th street streetcar stop. 1 block from the 24th street trolley stop. 1 block from the 24th street bus stop. 1 block from the 24th street light rail stop. 1 block from the 24th street cable car stop. 1 block from the 24th street streetcar stop. 1 block from the 24th street trolley stop.",
    compensation: "$5000/month",
  },
];

async function scrapeCraigslist(page) {
  await page.goto("https://sfbay.craigslist.org/search/sof");
  await sleep(5000);
  const html = await page.content();
  const $ = cheerio.load(html);

  const listings = $(".cl-search-result")
    .map((index, element) => {
      const title = $(element).find(".posting-title .label").text().trim();
      const url = $(element).find(".posting-title").attr("href").trim();
      const datePosted = new Date(
        $(element).find(".meta span[title]").attr("title")
      );
      const neighborhood = $(element).find(".meta").first().text().trim(); // JQuery Selector not working
      const compensation = $(element).find(".meta .salary-meta").text().trim(); // JQuery Selector not working
      return { title, url, datePosted, neighborhood, compensation };
    })
    .get();
  console.log(listings);
  return listings;
}

async function scrapeJobDescription(listings, page) {
  for (const listing of listings) {
    await page.goto(listing.url);
    await sleep(5000);
    const html = await page.content();    
    const $ = cheerio.load(html);
    const jobDescription = $("#postingbody").text();
    listing.jobDescription = jobDescription;
    console.log(listing.jobDescription);
  }
}

async function sleep(milliSeconds) {
  return new Promise((resolve) => setTimeout(resolve, milliSeconds));
}

async function createCsvFile(listings) {
  const csv = new ObjectsToCsv(listings);
  await csv.toDisk("./listings.csv");
}

async function Main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const listings = await scrapeCraigslist(page);
  
  // Skip job description scraping for speed
  // const listingsWithJobDescription = await scrapeJobDescription(listings, page);

  //Downlaod to csv file
  await createCsvFile(listings);
  await browser.close();

}

Main();
