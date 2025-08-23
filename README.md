# Craigslist Scraper

A web scraper for Craigslist job listings built with Node.js, Puppeteer, and Cheerio. Extracts job information and exports to CSV format.

## Features

- **Web Scraping**: Uses Puppeteer to scrape Craigslist software engineering job listings
- **Data Extraction**: Extracts title, URL, date posted, neighborhood, and compensation
- **CSV Export**: Automatically saves scraped data to a CSV file
- **Fast Processing**: Optimized to scrape listings quickly without individual job descriptions

## Installation

```bash
npm install
```

## Dependencies

- **puppeteer**: Browser automation for web scraping
- **cheerio**: HTML parsing and manipulation
- **objects-to-csv**: CSV file generation and export

## Usage

### Basic Scraping (Fast Mode)

```bash
node index.js
```

This will:
1. Open a browser window
2. Navigate to Craigslist software engineering jobs
3. Extract listing information
4. Save data to `listings.csv`
5. Close the browser

### Output

The scraper creates a `listings.csv` file with the following columns:
- `title`: Job title
- `url`: Direct link to the job posting
- `datePosted`: Date when the job was posted
- `neighborhood`: Location/neighborhood information
- `compensation`: Salary/compensation details

## Project Structure

```
craigslist-scraper/
├── index.js              # Main scraping logic
├── package.json          # Dependencies and scripts
├── listings.csv          # Generated CSV file (after running)
└── README.md             # This file
```

## Scraping Functions

### `scrapeCraigslist(page)`
- Navigates to Craigslist software engineering jobs
- Extracts basic listing information
- Returns array of job objects

### `scrapeJobDescription(listings, page)` (Optional)
- Visits each individual job posting
- Extracts full job descriptions
- **Note**: Currently disabled for speed

### `createCsvFile(listings)`
- Converts scraped data to CSV format
- Saves to `listings.csv` file

## Sample Output

```csv
title,url,datePosted,neighborhood,compensation
"Data Engineer [Remote]","https://sfbay.craigslist.org/pen/sof/d/redwood-city-data-engineer-remote/7874859703.html","2025-08-19T14:04:00.000Z","8/19130K",""
"Machine Vision Engineer","https://sfbay.craigslist.org/sby/sof/d/cupertino-machine-vision-engineer/7874789268.html","2025-08-19T01:47:09.000Z","8/18Competitive package including base sala...OPT Machine Vision Inc",""
```

## Configuration

### Target URL
Currently scrapes: `https://sfbay.craigslist.org/search/sof`

### Wait Times
- Page load wait: 5 seconds
- Individual job description wait: 5 seconds (when enabled)

## Performance

- **Fast Mode**: ~30 seconds for 20+ listings
- **Full Mode**: ~2-3 minutes per listing (when job descriptions enabled)

## Troubleshooting

### Common Issues

1. **Browser not opening**: Make sure you have Chrome/Chromium installed
2. **No data extracted**: Check if Craigslist structure has changed
3. **CSV file not created**: Ensure write permissions in the directory

### Error Handling

The scraper includes basic error handling for:
- Network timeouts
- Missing elements
- Invalid dates

## Development

### Adding New Fields

To extract additional data, modify the `scrapeCraigslist` function:

```javascript
const listings = $(".cl-search-result")
  .map((index, element) => {
    // Add new field extraction here
    const newField = $(element).find(".new-selector").text().trim();
    return { 
      title, 
      url, 
      datePosted, 
      neighborhood, 
      compensation,
      newField  // Add to return object
    };
  })
  .get();
```

### Changing Target Category

To scrape different job categories, modify the URL in `scrapeCraigslist`:

```javascript
await page.goto("https://sfbay.craigslist.org/search/YOUR_CATEGORY");
```

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

