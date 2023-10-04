import { Image } from "react-bootstrap";
import styles from "./ImageContainer.module.scss";

type ImageContainerTypes = {
  url: any;
  imagePrompt: any;
};

export default function ImageContainer({
  url,
  imagePrompt,
}: ImageContainerTypes) {
  return (
    <>
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
    </>
  );
}
