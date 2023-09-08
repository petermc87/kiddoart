import getAllImages from "@/actions/getAllImagesApi";
import { ImageType } from "@/models/typings";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import styles from "../page.module.css";
import componentStyle from "./GeneratedImages.module.css";

export default function GeneratedImages() {
  // Create state for images.
  const [allImages, setAllImages] = useState<ImageType[] | void | null | any>(
    null
  );

  // Create a hook for fetching.
  useEffect(() => {
    // Create an async function within the hook.
    const images = async () => {
      try {
        // Return a promise and store the results in a variable.
        const results = await getAllImages();
        // Set the state
        setAllImages(results);
      } catch (error) {
        console.error(error);
      }
    };
    // Call the function
    images();
  }, []);
  return (
    <>
      {/* Placholder - create separate component */}
      {allImages
        ? allImages.map((image: any) => {
            return (
              <>
                <div
                  className={styles.container}
                  key={image.id}
                  id={componentStyle.container}
                >
                  <p>{image.prompt}</p>
                  <Image key={image.id} src={image.url} alt="images" />
                </div>
                <br />
              </>
            );
          })
        : ""}
    </>
  );
}
