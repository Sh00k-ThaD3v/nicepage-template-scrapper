import axios from "axios";
import * as cheerio from "cheerio";
import templateV2 from "./models/templateV2.js";

const nicPageBaseApiUrl = "https://nicepage.com/c/";

const templateCategories = {
  1373: "art-design",
  1370: "technology",
  1361: "business-law",
  1368: "food-restaurant",
  1401: "architecture-building",
  1362: "fashion-beauty",
  1364: "education",
  1405: "industrial",
  1363: "interior",
  1403: "cars-transportation",
  1371: "travel-hotels",
  1406: "music-entertainment",
  1369: "sports",
  1412: "sale",
  1365: "medicine-science",
  1366: "nature",
  1367: "real-estate",
  1372: "wedding",
  1407: "pets-animals",
  1426: "portfolio",
};

const blockFunctions = {
  1374: "text-on-image",
  1377: "features",
  1413: "full-width-slider",
  1396: "contacts",
  1376: "about-us",
  1410: "wide",
  1388: "shapes",
  1378: "split",
  1387: "over-grid",
  1422: "group",
  1385: "layered-images",
  1383: "tiles",
  1414: "gallery",
  1382: "grid",
  1384: "overlap-block",
  1416: "grid-repeater",
  1420: "slider",
  1379: "thirds",
  1423: "modal-popup",
  1417: "blog-posts",
  1418: "product-list",
  1421: "product-details",
  1391: "video",
  1397: "brands",
  1393: "testimonials",
  1390: "counter",
  1398: "contact-form",
  1375: "text",
  1394: "text-button",
  1389: "team",
  1400: "pricing",
  1415: "table",
  1419: "tabs",
  1424: "accordian",
  1425: "faq",
  1399: "social",
};

const fetch = async (feed) => {
  try {
    for (let key in feed) {
      const { data } = await axios.get(
        `${nicPageBaseApiUrl}${feed[key]}-html-templates?page=${1}`
      );
      const $ = cheerio.load(data);
      const templates = $("a.thumbnail");
      for (let i = 0; i < templates.length; i++) {
        const id = templates[i]?.attribs?.href?.split("/")?.[2];
        const isTemplateExists = await templateV2.findOne({ id });
        if (!isTemplateExists) {
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchTemplatesByCategory = async () => {
  await fetch(templateCategories);
};

export const fetchTemplatesByBlockFunction = async () => {
  await fetch(blockFunctions);
};
