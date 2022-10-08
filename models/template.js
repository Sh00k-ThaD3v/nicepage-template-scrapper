import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  id: String,
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

const template = mongoose.model("template", templateSchema);
export default template;
