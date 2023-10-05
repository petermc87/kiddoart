import { Image } from "react-bootstrap";
import { Observable } from "rxjs";
import styles from "./ImageContainer.module.scss";

type ImageContainerTypes = {
  url: any;
  imagePrompt: any;
};

export default function ImageContainer({
  url,
  imagePrompt,
}: ImageContainerTypes) {
  const downloadImage = (e: any) => {
    e.preventDefault();
    new Observable((observer) => {
      var xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (xhr.readyState === 4) {
          observer.next(xhr.response);
          observer.complete();
        }
      };
      xhr.send();
    }).subscribe((blob: any) => {
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = imagePrompt;
      link.click();
    });
  };

  return (
    <div className={styles.currentImageWrapper}>
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
      {/* <a href={url} download rel="noopener noreferrer" target="_blank">
        Download
      </a> */}
      <div
        onClick={(e) => {
          downloadImage(e);
        }}
      >
        Download
      </div>
    </div>
  );
}
