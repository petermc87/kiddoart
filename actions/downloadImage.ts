"use server";
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
// const { sdkStreamMixin } = require("@smithy/util-stream");
// import S3 from "aws-sdk/clients/s3";

export default async function Download(key: string) {
  const client = new S3Client({ region: "us-east-1" });

  // First, test the function using an image without passing in params.
  const input = {
    Bucket: "kiddoart-images",
    Key: key,
  };

  const response = await client.send(new GetObjectCommand(input));

  const objectString = await response.Body.transformToString("base64");
  return objectString;
}
