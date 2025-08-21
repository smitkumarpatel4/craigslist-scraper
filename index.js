const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

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

async function Main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://sfbay.craigslist.org/search/sof");

  // Wait for the page to load
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const html = await page.content();
  const $ = cheerio.load(html);
  const results = [];

  // Try to find job listings with a broader selector
  $('a[href*="/sof/"]').each((index, element) => {
    const title = $(element).text().trim();
    const url = $(element).attr("href");
    //console.log(title);
    //console.log(url);
    results.push({ title, url });
  });
  console.log(results);
  //await browser.close();
}

Main();
