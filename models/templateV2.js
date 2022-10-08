import mongoose from "mongoose";

const templateV2Schema = new mongoose.Schema({
  id: String,
  category: String,
  categoryId: String,
  publicUrl: String,
  previewWithStyleUrl: String,
  publishUrl: String,
  headerUrl: String,
  footerUrl: String,
  smallestThumbnailUrl: String,
  smallThumbnailUrl: String,
  mediumThumbnailUrl: String,
  previewThumbnailUrl: String,
  dateReviewed: Date,
});

const templateV2 = mongoose.model("templateV2", templateV2Schema);
export default templateV2;
