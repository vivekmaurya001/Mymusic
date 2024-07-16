const express = require("express");
const puppeteer = require("puppeteer");
var cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.post("/api", async (req, res) => {
  try {
    console.log(req.body);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Set a longer navigation timeout (e.g., 60 seconds)
    //   await page.setDefaultNavigationTimeout(60000);
    await page.goto(
      `https://open.spotify.com/search/${req.body.search}/tracks`
    );
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
    const NewSingerArray = SingerArray.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    await browser.close();
    res.send({
      SongArray,
      imgSrc,
      NewSingerArray,
    });
  } catch (error) {
    console.error("Error getting results:", error);
    res.status(500).send("Internal server error");
  }
});

app.post("/download", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await Promise.all([
      page.goto(
        `https://www.youtube.com/results?app=desktop&search_query=${req.body.name}`
      ),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    await delay(3000); // Wait for 3 seconds
    let url = await page.evaluate(() => {
      let anchor = document.querySelector("#dismissible a");
      let href = anchor.getAttribute("href");
      let compUrl = "https://www.youtube.com" + href;
      return compUrl;
    });
    const YTUrl = url;
    console.log(YTUrl);
    await delay(4000);

    await page.goto("https://mp3juices.kim/en8");
    await page.type("#query", YTUrl);
    await delay(4000);
    await page.click("#button");
    await delay(4000);
    await page.click(".options .download");
    await delay(4000);
    const iframe = await page.$(".button-api-frame"); // Replace with the actual selector

    // Get the iframe's content document
    const innerDoc = await iframe.contentFrame();

    // Select the button inside the iframe
    const button = await innerDoc.$("#downloadButton"); // Replace with the actual selector

    // Perform actions on the button (e.g., click)
    await button.click();
    await delay(8000);
    await browser.close();

    res.send("Downloaded Succesfully");
  } catch (error) {
    console.error("Error getting results:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
