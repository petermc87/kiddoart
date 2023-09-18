import { ImageType } from "@/models/typings";
import { Image } from "react-bootstrap";
import styles from "../page.module.css";
import componentStyle from "./GeneratedImages.module.css";

type AllImagesProps = {
  images: ImageType[];
};

export default function GeneratedImages({ images }: AllImagesProps) {
  return (
    <>
      {/* Placholder - create separate component */}
      {images
        ? images &&
          images.map((image: any) => {
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

// ALTERNATIVE TO GETTING IMAGES //
// try {
//   const images = await getAllImages();
//   setAllImages(images);
// } catch (error) {
//   console.error(error);
// }

// ORIGINAL SETUP FOR GETTING ALL IMAGES //
// // Create state for images.
// const [allImages, setAllImages] = useState<ImageType[] | void | null | any>(
//   null
// );

// // ORIGINAL CODE FOR FETCHING ALL IMAGES //
// // Create a hook for fetching.
// useEffect(() => {
//   // Create an async function within the hook.
//   const images = async () => {
//     try {
//       // Return a promise and store the results in a variable.
//       const results = await getAllImages();
//       // Set the state
//       setAllImages(results);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   // Call the function
//   images();
// }, []);
