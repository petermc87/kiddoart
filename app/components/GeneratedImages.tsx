import getAllImages from "@/actions/getAllImagesApi";
import { Image } from "@/models/typings";
import { useEffect, useState } from "react";

export default function GeneratedImages() {
  // Create state for images.
  const [allImages, setAllImages] = useState<Image[] | void | null | any>(null);

  // Create a hook for fetching.
  useEffect(() => {
    // Create an async function within the hook.
    const images = async () => {
      try {
        const results = await getAllImages();
        setAllImages(results);
      } catch (error) {
        console.error(error);
      }
    };
    images();
  }, []);
  console.log(allImages);
  return (
    <>
      <h3>Generated Images</h3>
    </>
  );
}
