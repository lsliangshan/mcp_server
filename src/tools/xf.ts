import axios from "axios";
import { XF_RECOGNIZE_IMAGE_RESPONSE, XF_URL } from "../types/types.js";
import { decode, encode, hmacSha256 } from "./crypto.js";
import dotenv from "dotenv";
import { imageToBase64 } from "./image.js";

dotenv.config();
// const XF_API_KEY = "6885f81ecfc316926d6fd3d8e3c12ebb";
// const XF_API_SECRET = "Mjc4OTQ0NjVkNGM5YWU1Yjg2NDQ1NDcx";
// const XF_APP_ID = "3613b71e";

export function getAuthorizationUrl(params: { type: XF_URL }) {
  const date = new Date().toUTCString();
  const requestLine = `POST /${params.type
    .split("//")[1]
    .split("/")
    .slice(1)
    .join("/")} HTTP/1.1`;

  const beforeSignature = `host: api.xf-yun.com\ndate: ${date}\n${requestLine}`;
  const signature = hmacSha256({
    data: beforeSignature,
    key: process.env.XF_API_SECRET || "",
  });

  const str = `api_key="${process.env.XF_API_KEY}",algorithm="hmac-sha256",headers="host date request-line",signature="${signature}"`;

  const s = encode({
    data: str,
    outputFormat: "base64",
  });

  return `${params.type}?authorization=${s}&host=api.xf-yun.com&date=${date
    .replaceAll(",", "%2C")
    .replaceAll(" ", "+")
    .replaceAll(":", "%3A")}`;
}

export async function recognizeText(params: { imagePath: string }) {
  const imageBase64 = await imageToBase64({ imagePath: params.imagePath });

  if (!imageBase64) {
    return [];
  }

  const results: XF_RECOGNIZE_IMAGE_RESPONSE[] = [];

  const authorizationUrl = getAuthorizationUrl({ type: XF_URL.recognizeImage });

  const response = await axios.post(authorizationUrl, {
    header: {
      app_id: process.env.XF_APP_ID || "",
      status: 3,
    },
    parameter: {
      sf8e6aca1: {
        category: "ch_en_public_cloud",
        result: {
          encoding: "utf8",
          compress: "raw",
          format: "json",
        },
      },
    },
    payload: {
      sf8e6aca1_data_1: {
        encoding: "jpg",
        status: 3,
        image: imageBase64,
      },
    },
  });
  if (
    response.status === 200 &&
    response.data &&
    response.data.header &&
    response.data.header.code === 0 &&
    response.data.payload &&
    response.data.payload.result &&
    response.data.payload.result.text
  ) {
    const text: string = decode({
      data: response.data.payload.result.text,
      inputFormat: "base64",
    });
    const info: any = JSON.parse(text);

    const pages = info.pages.filter((item: any) => item.exception === 0);

    pages.forEach((page: any) => {
      const lines = page.lines.filter((item: any) => item.exception === 0);
      lines.forEach((line: any) => {
        results.push({
          coord: line.coord,
          conf: line.conf,
          content: line.words.map((item: any) => item.content).join(" "),
        });
      });
    });
  }

  return results;
}
