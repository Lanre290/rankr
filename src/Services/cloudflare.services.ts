
import AWS from "aws-sdk";

const r2 = new AWS.S3({
  endpoint: process.env.R2_ENDPOINT,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
  region: "auto"
});


export async function uploadUserPicture(fileName: string, buffer: Buffer, mimeType: string) {
  await r2
    .putObject({
      Bucket: 'rankrusers',
      Key: fileName,
      Body: buffer,
      ContentType: mimeType,
      ACL: "public-read" // Optional: use with Cloudflare Pages/Workers to avoid egress cost
    })
    .promise();

  return `https://${process.env.RS_USERS_IMAGES_DOMAIN}/${fileName}`;
}

export async function uploadRankr(fileName: string, buffer: Buffer, mimeType: string) {
  await r2
    .putObject({
      Bucket: 'rankr',
      Key: fileName,
      Body: buffer,
      ContentType: mimeType,
      ACL: "public-read" // Optional: use with Cloudflare Pages/Workers to avoid egress cost
    })
    .promise();

  return `https://${process.env.R2_RANKR_IMAGES_BUCKET}/${fileName}`;
}