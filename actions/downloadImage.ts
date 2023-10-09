// ORIGINAL SOLUTION -- Access permissions issues on Vercel.
// "use server";
// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

// export default async function Download(key: string) {
//   const client = new S3Client({ region: "us-east-1" });

//   // First, test the function using an image without passing in params.
//   const input = {
//     Bucket: "kiddoart-images",
//     Key: key,
//   };

//   // TASK: Wrap this in a try catch to understand the error a bit more.
//   // ERROR: 500 interal server error - only in the vercel deployment. This works fine
//   // in local environment. NOTE: The image download in the front end does work
//   // correctly. This is because the download function works correctly for
//   // newly generated images.
//   // NOTE: This only happens through vercel. Maybe persmissions need to change in the bucket.
//   try {
//     const response = await client.send(new GetObjectCommand(input));
//     const objectString = await response.Body.transformToString("base64");
//     return objectString;
//   } catch (error) {
//     console.error(error);
//   }
// }

// ALTERNATIVE
"use server";
const AWS = require("aws-sdk");

export default async function Download(key: string) {
  console.log(key);
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
