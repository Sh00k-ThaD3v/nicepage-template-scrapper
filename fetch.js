import axios from "axios";
import template from "./models/template.js";

const catId = [
  1361, 1362, 1363, 1364, 1365, 1366, 1367, 1368, 1369, 1370, 1371, 1372, 1373,
  1401, 1403, 1405, 1406, 1407, 1412,
];

const nicPageBaseApiUrl =
  "https://np-index.nicepagesrv.com/api/page/publicpages";

const fetch = async () => {
  try {
    for (let i = 0; i < catId.length; i++) {
      let pageNumber = 1;
      while (true) {
        const { data } = await axios.get(
          `${nicPageBaseApiUrl}?pageNumber=${pageNumber}&catId=${catId[i]}`
        );
        for (let j = 0; j < data.pages.length; j++) {
          const templateData = data.pages[j];
          await template.create({
            id: templateData.id,
            categoryId: catId[i],
            publicUrl: templateData.publicUrl,
            previewWithStyleUrl: templateData.previewWithStyleUrl,
            publishUrl: templateData.publishUrl,
            headerUrl: templateData.headerUrl,
            footerUrl: templateData.footerUrl,
            smallestThumbnailUrl: templateData.smallestThumbnailUrl,
            smallThumbnailUrl: templateData.smallThumbnailUrl,
            mediumThumbnailUrl: templateData.mediumThumbnailUrl,
            previewThumbnailUrl: templateData.previewThumbnailUrl,
            dateReviewed: templateData.dateReviewed,
          });
        }
        console.log(catId[i], pageNumber);
        if (!data.showMore) {
          break;
        }
        pageNumber++;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetch;
