# Craigslist Job Scraper

A Node.js web scraper that extracts job listings from Craigslist's software jobs section.

## Features

- Scrapes software job listings from Craigslist SF Bay Area
- Extracts job titles and URLs
- Uses Puppeteer for dynamic content loading
- Handles JavaScript-rendered content

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
- Extract job titles and URLs
- Display results in console

## Dependencies

- `puppeteer`: Browser automation
- `cheerio`: HTML parsing

## Project Structure

```
craigslist-scraper/
├── index.js          # Main scraper script
├── package.json      # Project dependencies
├── .gitignore        # Git ignore rules
└── README.md         # Project documentation
```

## Notes

- The scraper includes a 5-second wait to allow JavaScript content to load
- Results are filtered to exclude navigation links
- Browser runs in non-headless mode for debugging
