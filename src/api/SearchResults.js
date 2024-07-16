// const puppeteer = require("puppeteer");
import puppeteer from "puppeteer";

export async function FetchResults() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Set a longer navigation timeout (e.g., 60 seconds)
  await page.setDefaultNavigationTimeout(60000);
  await page.goto(`https://open.spotify.com/search/sanam/tracks`);
  await delay(2000);
}
