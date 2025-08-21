# Craigslist Job Scraper

A Node.js web scraper that extracts job listings from Craigslist's software jobs section using Puppeteer and Cheerio.

## Features

- Scrapes software job listings from Craigslist SF Bay Area
- Extracts comprehensive job data: titles, URLs, salaries, dates, and locations
- Uses Puppeteer for dynamic content loading
- Handles JavaScript-rendered content
- Supports custom CSS selectors for data extraction
- Includes debugging tools for selector testing

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd craigslist-scraper
```

2. Install dependencies:
```bash
npm install
```

## Usage

Run the scraper:
```bash
node index.js
```

The scraper will:
- Open a browser window (non-headless mode)
- Navigate to Craigslist software jobs
- Wait for content to load
- Extract job data using CSS selectors
- Display results in console

## Data Extraction

The scraper extracts the following data from each job listing:

- **Job Title**: `.cl-search-result .posting-title .label`
- **Job URL**: `.cl-search-result .posting-title` (href attribute)
- **Salary**: `.cl-search-result .meta .salary-meta`
- **Date Posted**: `.cl-search-result .meta span[title]` (title attribute)
- **Location**: Parsed from `.cl-search-result .meta` text content

## CSS Selectors Reference

### Primary Selectors
```javascript
// Job title
$('.cl-search-result .posting-title .label')

// Job URL
$('.cl-search-result .posting-title').attr('href')

// Salary
$('.cl-search-result .meta .salary-meta')

// Date posted
$('.cl-search-result .meta span[title]').attr('title')

// Location
$('.cl-search-result .meta').text().trim()
```

### Alternative Selectors
```javascript
// Alternative salary selectors
$('.cl-search-result .meta .result-price')
$('.cl-search-result .meta span[class*="salary"]')

// All job listings
$('.cl-search-result')
```

## Dependencies

- `puppeteer`: Browser automation and dynamic content handling
- `cheerio`: HTML parsing and CSS selector support

## Project Structure

```
craigslist-scraper/
├── index.js          # Main scraper script
├── package.json      # Project dependencies
├── .gitignore        # Git ignore rules
└── README.md         # Project documentation
```

## Development

### Debugging Selectors
The scraper includes debugging functionality to test CSS selectors:
- Test individual selectors
- Compare alternative selectors
- Validate data extraction

### Customization
- Modify selectors in `index.js` to target different data fields
- Adjust wait times for different page load speeds
- Change target URL for different Craigslist sections

## Notes

- The scraper includes a 5-second wait to allow JavaScript content to load
- Browser runs in non-headless mode for debugging
- Results are logged to console in JSON format
- CSS selectors are based on Craigslist's current HTML structure

## Troubleshooting

### Common Issues
- **Empty salary field**: Check if `.salary-meta` class exists in current HTML
- **Missing data**: Verify CSS selectors match current page structure
- **Slow loading**: Increase wait time in the script

### Selector Debugging
Use browser developer tools to:
1. Inspect job listing elements
2. Copy CSS selectors
3. Test selectors in console
4. Update selectors in code as needed

