import dotenv from "dotenv";
dotenv.config();
import express from "express";
// import mongoose from "mongoose";
import axios from "axios";
import cron from "node-cron";

import scrape from "./scrape.js";

const app = express();
const PORT = process.env.PORT || 5001;
// const CONNECTION_URL =
//   process.env.CONNECTION_URL || "mongodb://127.0.0.1:27017/nicepage";

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// mongoose
//   .connect(CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
app.listen(PORT, async () => {
  try {
    console.log(`Server running on port: ${PORT}`);
    const task = cron.schedule("*/5 * * * *", async () => {
      try {
        await axios.get(process.env.SERVER_URL);
      } catch (error) {
        console.log(error);
      }
    });
    task.start();
    await scrape();
  } catch (error) {
    console.log(error);
  }
});
// });
