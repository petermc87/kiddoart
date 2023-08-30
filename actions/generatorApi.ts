import { Generate } from "@/models/GeneratedImage";
import OpenAI from "openai";

// Create a new openai object and pass in the key.
// To make it available for use in NextJS client side rendering,
// you need to add the second paramater after the key.
const openai = new OpenAI({
  apiKey: `${process.env.NEXT_PUBLIC_KEY}`,
  dangerouslyAllowBrowser: true,
});

export default async function createImage(e: String) {
  // Giving the event a proper identifier.
  const urlQuery = e;

  // If there is nothing returned, output an error.
  if (!urlQuery) {
    return console.error("Please input an image to be generated.");
  }

  //  Fetch the an iamge from OpenAI
  try {
    const response = await openai.images.generate({
      prompt: `${urlQuery}`,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    // const data: GeneratedResponse = response;
    const allUrls: Generate[] = response.data;

    return allUrls;
  } catch (error) {
    console.error(error);
  }
}
