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
  const downloadImage = async (e: any, callback: any) => {
    if (id) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    }
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
      <div
        onClick={(e) => {
          downloadImage(e, function (myBase64: any) {
            console.log(myBase64);
          });
        }}
      >
        Download
      </div>
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
