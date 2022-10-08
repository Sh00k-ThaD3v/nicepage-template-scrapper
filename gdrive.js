import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const client_secret = process.env.CLIENT_SECRET;
const client_id = process.env.CLIENT_ID;
const redirect_uris = JSON.parse(process.env.REDIRECT_URIS);
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);
const token = {
  access_token: process.env.ACCESS_TOKEN,
  refresh_token: process.env.REFRESH_TOKEN,
  token_type: process.env.TOKEN_TYPE,
  expiry_date: parseInt(process.env.EXPIRY_DATE),
};
oAuth2Client.setCredentials(token);
const drive = google.drive({ version: "v3", auth: oAuth2Client });

export const uploadFile = async (name, folderId, body, mimeType) => {
  const driveId = process.env.DRIVE_ID;
  const fileMetadata = {
    name,
    parents: [folderId],
    driveId,
  };
  const media = { mimeType, body };
  const uploadRes = await drive.files.create(
    {
      requestBody: fileMetadata,
      media: media,
      fields: "id",
      supportsTeamDrives: true,
    },
    {}
  );
  await drive.permissions.create(
    {
      fileId: uploadRes.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
      supportsTeamDrives: true,
    },
    {}
  );
  const result = await drive.files.get(
    {
      fileId: uploadRes.data.id,
      fields: "webViewLink, webContentLink",
      supportsTeamDrives: true,
    },
    {}
  );
  return {
    viewUrl: result.data.webViewLink,
    downloadUrl: result.data.webContentLink,
  };
};
