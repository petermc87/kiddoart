import Download from "@/actions/downloadImage";
import { MutableRefObject, useState } from "react";
import { Image } from "react-bootstrap";
import styles from "./ImageContainer.module.scss";

type ImageContainerTypes = {
  url: any;
  imagePrompt: any;
  id: any;
  imageRef: MutableRefObject<null>;
};

export default function ImageContainer({
  url,
  imagePrompt,
  imageRef,
}: ImageContainerTypes) {
  //State variable that shows either show its downlaoding within the button container.
  const [downloading, setDownloading] = useState(false);

  const downloadImage = async (e: any) => {
    // We are setting the downloading state on click
    setDownloading(true);
    // Creating a file name for the image to be downloaded without spaces.
    const fileName = imagePrompt.split(" ").join("_");
    const link = document.createElement("a");
    // If the url is a link to the bucket (i.e contains), then perform the next four
    // variable storage ops. Otherwise skip to the rest of the steps.
    // console.log(url);
    if (url.includes("https://kiddoart-images.s3.amazonaws.com/")) {
      // Convert url to key that gets passed into the donwload function.
      const key: string = url.split("/")[3];
      const response: any = await Download(key);

      const convertedUrl = `data:image/jpeg;base64,${response}`;

      link.href = convertedUrl;
    } else {
      link.href = url;
    }
    link.download = fileName;
    link.click();
    // Right after the image has downloaded, setDownloading to false.
    setDownloading(false);
  };
  return (
    // Create a reference here for when an image is clicked.
    <div className={styles.currentImageWrapper} ref={imageRef}>
      <h4 className={styles.heading}>Current Image</h4>
      <strong>Prompt: </strong>
      {imagePrompt}
      <div className={styles.container} key={url}>
        <Image
          className={styles.image}
          key={url}
          src={url}
          alt={imagePrompt}
          rounded
        />
      </div>

      <div
        className={styles.download}
        // Create a state variable that will change the name below.
        // Add a conditional to check if its downloading. If it is, then block
        // another download while one is in progress.
        onClick={(e) => {
          if (!downloading) downloadImage(e);
        }}
      >
        {/* For state that is not true (i.e, not downloading), then show the icon. Otherwise, */}
        {/* we want to show 'downloading' and progress dots afterwards. */}
        {!downloading ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#e0a738"
              className="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </>
        ) : (
          <div className={styles.downloadingWrapper}>
            <div className={styles.text}>Downloading</div>
            <div className={styles.dotFlashing}></div>
          </div>
        )}
      </div>
    </div>
  );
}
