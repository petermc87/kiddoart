// Import typings for image object to be stored.
"use server";
import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import db from "../app/modules/db";
import { Image } from "../models/typings";

// Destructure the props passed into the function.
export default async function StoreImage({ prompt, url }: Image) {
  // Creating S3 instance and connecting to my account.
  const s3 = new S3({
    apiVersion: "2006-03-01",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    signatureVersion: "v4",
  });

  // Split prompt string by spaces and then join as a whole string.
  const splitPrompt = prompt.split(" ");
  const joinPrompt = splitPrompt.join("");

  const base64Data = Buffer.from(
    url.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  // The type from the string passed in
  const type = url.split(";")[0].split("/")[1];

  // Creating a random key identifier for each image.
  const Key = `${randomUUID()}${joinPrompt}.${type}`;

  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Body: base64Data,
    ContentEncoding: "base64",
    Key,
    ContentType: `image/${type}`,
  };

  // @ts-expect-error
  const { Location, returnKey } = await s3.upload(s3Params).promise();
  const location = Location;
  const key = returnKey;

  console.log(location, key);

  // Posting to the database
  await db.image.create({
    data: {
      url: location,
      prompt: prompt,
    },
  });
  revalidatePath("/");

  // Test data storing by retrieving from the database.
  const images = await db.image.findMany({ orderBy: { createdAt: "desc" } });

  console.log(images);
}

// // Require packages
// const aws = require("aws-sdk");
// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const uuid = require("uuid").v4;
// const path = require("path");

// // Create a new object from the Amazon SDK
// // AWS credentials
// const s3 = new aws.S3({ apiVersion: "2006-03-01" });

// // Upload to S3 bucket
// const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: "kiddoart-images",
//     metadata: (req: any, file: any, cb: any) => {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: (req: any, file: any, cb: any) => {
//       const ext = path.extname(file.originalname);
//       cb(null, `${uuid()}${ext}`);
//     },
//   }),
// });

// // Passing the image URL into the upload variable.
// const imageUpload = upload.single(url);

// console.log(imageUpload);
