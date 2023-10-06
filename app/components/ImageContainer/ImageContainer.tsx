import Download from "@/actions/downloadImage";
import { Image } from "react-bootstrap";
import styles from "./ImageContainer.module.scss";

type ImageContainerTypes = {
  url: any;
  imagePrompt: any;
  id: any;
};

export default function ImageContainer({
  url,
  imagePrompt,
  id,
}: ImageContainerTypes) {
  const downloadImage = async (e: any) => {
    // Creating a file name for the image to be downloaded without spaces.
    const fileName = imagePrompt.split(" ").join("_");
    const link = document.createElement("a");
    // If the url is a link to the bucket (i.e contains), then perform the next four
    // variable storage ops. Otherwise skip to the rest of the steps.
    if (url.includes("https://")) {
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
      <a href="" target="_blank" rel="noopener noreferrer">
        <div
          className={styles.download}
          onClick={(e) => {
            downloadImage(e);
          }}
        >
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
        </div>
      </a>
    </div>
  );
}

// USING AXIOS AND RXJS -> import { Observable } from "rxjs";
// const downloadImage = (e: any) => {
//   e.preventDefault();
//   new Observable((observer) => {
//     var xhr = new XMLHttpRequest();
//     xhr.open("get", url, true);
//     xhr.responseType = "blob";
//     xhr.onload = function () {
//       if (xhr.readyState === 4) {
//         observer.next(xhr.response);
//         observer.complete();
//       }
//     };
//     xhr.send();
//   }).subscribe((blob: any) => {
//     let link = document.createElement("a");
//     link.href = window.URL.createObjectURL(blob);
//     link.download = imagePrompt;
//     link.click();
//   });
// };

// const downloadImage = (e: any) => {
//   let headers = new Headers();

//   headers.append("Origin", "http://localhost:3000");
//   fetch(url, {
//     mode: "cors",
//     credentials: "include",
//     method: "GET",
//     headers: headers,
//   })
//     .then((response) => response.blob())
//     .then((blob) => {
//       console.log(blob);
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = imagePrompt;
//       link.click();
//     });

// TRIED THIS ONE - didnt WORK : https://stackoverflow.com/questions/3916191/download-data-url-file
// const downloadImage = async (e: any) => {
//   if (id) {
//     await Download(id)
//       .then((response: any) => response.blob())
//       .then((blob) => {
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(blob);
//         link.download = imagePrompt;
//         link.click();
//       });
//   }
// };

// const downloadImage = async (e: any) => {
//   if (id) {
//     const response: any = await Download(id);

//     const link = document.createElement("a");

//     link.href = response.url;

//     link.click();
//   }
// };

// const downloadImage = async (e: any) => {
//   if (id) {
//     const response: any = await Download(id);

//     const newurl = response.url;

//     return new Promise(function (resolve, reject) {
//       try {
//         var xhr = new XMLHttpRequest();
//         xhr.open("GET", newurl);
//         xhr.responseType = "blob";
//         xhr.onerror = function () {
//           reject("Network error.");
//         };
//         xhr.onload = function () {
//           if (xhr.status === 200) {
//             resolve(xhr.response);
//           } else {
//             reject("Loading error:" + xhr.statusText);
//           }
//         };
//         xhr.send();
//       } catch (err: any) {
//         reject(err.message);
//       }
//     });
//   }
// };

// TREID THIS: https://www.reddit.com/r/node/comments/wvlhpn/is_there_a_way_to_convert_the_s3_image_url_to/
// const downloadImage = async (url: any) =>
//   await fetch(url)
//     .then((response: any) => response.isBuffer())

//     .then((buffer) => {
//       return buffer.toString("base64");
//     })

//     .catch(console.error);

// downloadImage("URL").then((dataUrl) => {
//   console.log("RESULT:", dataUrl);
// });

// const downloadImage = async (e: any) => {
//   if (id) {
//     const response: any = await Download(id);

//     const base64 = new Buffer(response.url, "base64");

//     const link = document.createElement("a");

//     link.href = base64;

//     link.click();
//   }
// };
// SOURCE FROM HERE: https://www.youtube.com/watch?v=io2blfAlO6E
// const downloadImage = async (e: any) => {
//   if (id) {
//     const response: any = await Download(id);

//     const blob = new Blob([response.url], { type: "image/jpeg" });

//     const href = URL.createObjectURL(blob);
//     const a = Object.assign(document.createElement("a"), {
//       href,
//       style: "display:none",
//       download: "Myimage",
//     });
//     document.body.appendChild(a);
//     a.click();
//     URL.revokeObjectURL(href);
//     a.remove();
//   }
// };

// ANOTHER EXAMPLE.
// const downloadImage = async (e: any, callback: any) => {
//   let response;
//   if (id) {
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       var reader = new FileReader();
//       reader.onloadend = function () {
//         callback(reader.result);
//       };
//       reader.readAsDataURL(xhr.response);
//     };
//     xhr.open("GET", {
//       await Download(id)
//     });
//     xhr.responseType = "blob";
//     xhr.send();
//   }

// FROM: Sources on GitHub
// const downloadImage = async (e: any) => {
//   try {
//     const newdata = await Download();

//     const url = window.URL.createObjectURL(new Blob([newdata]));
//     console.log(url);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "image.jpeg";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   } catch (error) {
//     console.error(error);
//   }
// };
