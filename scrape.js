import scrape from "website-scraper";
import archiver from "archiver";
import fs from "fs";
import dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config();
import { uploadFile } from "./gdrive.js";

class MyPlugin {
  apply(registerAction) {
    registerAction("afterResponse", async ({ response }) => {
      if (response.statusCode === 404) {
        return null;
      }
      return Promise.resolve(response.body);
    });
  }
}

const scrapePage = async (url, directory) => {
  try {
    return await scrape({
      urls: [url],
      directory: `./templates/${directory}`,
      urlFilter: function (url) {
        if (url.includes("capp.nicepge.com")) {
          return true;
        }
        if (
          url.includes("https://nicepage") ||
          url.includes("freepik") ||
          (url.includes("nicepage.io") && !url.includes("html"))
        ) {
          return false;
        }
        return true;
      },
      recursive: true,
      maxRecursiveDepth: 1,
      plugins: [new MyPlugin()],
    });
  } catch (error) {
    console.log(error);
  }
};

async function zipDirectory(sourceDir, outPath) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);
  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}

const main = async () => {
  try {
    for (let i = process.env.START_INDEX; i < process.env.END_INDEX; i++) {
      const url = `website${i}.nicepage.io/`;
      const data = await scrapePage(`https://${url}`, url.split(".")[0]);
      if (data?.[0]?.saved) {
        fs.copyFileSync(
          "./nicepage.css",
          `./templates/${url.split(".")[0]}/nicepage.css`
        );
        await zipDirectory(
          `./templates/${url.split(".")[0]}/`,
          `./templates/${url.split(".")[0]}.zip`
        );
        fs.rmSync(`./templates/${url.split(".")[0]}/`, {
          recursive: true,
          force: true,
        });
        const buffer = fs.readFileSync(`./templates/${url.split(".")[0]}.zip`);
        await uploadFile(
          `${url.split(".")[0]}.zip`,
          "1htMc4FxcoHWgmoKdeQb1WLGShuVsuILp",
          Readable.from(buffer),
          "application/zip"
        );
        fs.rmSync(`./templates/${url.split(".")[0]}.zip`);
      }
      console.log(i);
    }
  } catch (error) {
    console.log(error);
  }
};

export default main;
