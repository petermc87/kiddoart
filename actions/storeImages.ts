// Import typings for image object to be stored.
"use server";
import S3 from "aws-sdk/clients/s3";
import { randomUUID } from "crypto";
import db from "../app/modules/db";
import { ImageType } from "../models/typings";
import getAllImages from "./getAllImagesApi";

// Destructure the props passed into the function.
export default async function StoreImage({ prompt, url }: ImageType) {
  // Test data storing by retrieving from the database.
  await db.image.findMany({ orderBy: { createdAt: "desc" } });

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
    ACL: "public-read",
    Key,
    ContentType: `image/${type}`,
  };

  // @ts-expect-error
  const { Location, returnKey } = await s3.upload(s3Params).promise();
  const location = Location;
  const key = returnKey;

  // Posting to the database
  await db.image.create({
    data: {
      url: location,
      prompt: prompt,
    },
  });

  getAllImages();
}
