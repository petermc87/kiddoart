import { Generate } from "@/models/GeneratedImage";
import OpenAI from "openai";
import StoreImage from "./storeImages";

// Create a new openai object and pass in the key.
// To make it available for use in NextJS client side rendering,
// you need to add the second paramater after the key.
const openai = new OpenAI({
  apiKey: `${process.env.NEXT_PUBLIC_KEY}`,
  dangerouslyAllowBrowser: true,
});

export default async function createImage(e: string) {
  // Giving the event a proper identifier.
  const prompt = e;

  // If there is nothing returned, output an error.
  if (!prompt) {
    return console.error("Please input an image to be generated.");
  }

  //  Fetch the an iamge from OpenAI
  try {
    const response = await openai.images.generate({
      prompt: `${prompt}`,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    // Store the url (or many) in the Generate type format.
    const allUrls: Generate[] = response.data;

    // Call another server action within here
    // 1. Create a function call that instigates a 'storeImage' server action.
    // 2. Pass in URL & Prompt.
    //    a) check if ID needs to be stored or if its automatic (symptologix). - its auto
    //    b) convert the URL from b64 to a string.

    // Check the data coming back and save the url string
    // const url = `data:image/jpeg;base64,${allUrls[0].b64_json}`;

    const url = `${allUrls[0]}`;

    // Pass props into store image function
    StoreImage({ url, prompt });

    return allUrls;
  } catch (error) {
    console.error(error);
  }
}
