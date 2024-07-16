// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer");
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function FetchResults() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // Set a longer navigation timeout (e.g., 60 seconds)
  //   await page.setDefaultNavigationTimeout(60000);
  await page.goto(`https://open.spotify.com/search/mai bhi/tracks`);
  await delay(5000);
  const SongArray = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll("._iQpvk1c9OgRAc8KRTlH a div")
    ).map((x) => x.textContent);
  });
  const imgSrc = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(".w46g_LQVSLE9xK399VYf img")
    ).map((x) => x.src);
  });
  const SingerArray = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll("._iQpvk1c9OgRAc8KRTlH span")
    ).map((x) => x.textContent);
  });

  console.log(SongArray);
  console.log(imgSrc);
  console.log(SingerArray);

  await browser.close();
}
FetchResults();
//w46g_LQVSLE9xK399VYf
