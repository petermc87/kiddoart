// ALTERNATIVE
"use server";
const AWS = require("aws-sdk");

export default async function Download(key: string) {
  // Create an s3 instance.
  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    signatureVersion: "v4",
  });

  const params = {
    Bucket: "kiddoart-images",
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    const objectString = await data.Body.toString("base64");
    return objectString;
  } catch (error) {
    console.error("Error retrieving S3 object", error);
  }
}
