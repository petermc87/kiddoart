"use server";
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

export default async function Download(key: string) {
  const client = new S3Client({ region: "us-east-1" });

  // First, test the function using an image without passing in params.
  const input = {
    Bucket: "kiddoart-images",
    Key: key,
  };

  // TASK: Wrap this in a try catch to understand the error a bit more.
  // ERROR: 500 interal server error - only in the vercel deployment. This works fine
  // in local environment. NOTE: The image download in the front end does work
  // correctly. This is because the download function works correctly for
  // newly generated images.
  // NOTE: This only happens through vercel. Maybe persmissions need to change in the bucket.
  try {
    const response = await client.send(new GetObjectCommand(input));
    const objectString = await response.Body.transformToString("base64");
    return objectString;
  } catch (error) {
    console.error(error);
  }
}
