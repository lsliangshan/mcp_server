import fs from "fs";
import https from "https";
import http from "http";
import mime from "mime-types";
/**
 * 将图片转换为base64
 * 支持本地图片和网络图片
 * @param params
 * @param params.imagePath 图片路径
 * @returns base64
 */
export async function imageToBase64(params) {
    if (params.imagePath.startsWith("http://") ||
        params.imagePath.startsWith("https://")) {
        return new Promise((resolve, reject) => {
            const client = params.imagePath.startsWith("https://") ? https : http;
            const req = client.get(params.imagePath, (response) => {
                if (response.statusCode !== 200) {
                    // reject(new Error(`HTTP请求失败，状态码：${response.statusCode}`));
                    resolve("");
                    return;
                }
                const chunks = [];
                response.on("data", (chunk) => chunks.push(chunk));
                response.on("end", () => {
                    const buffer = Buffer.concat(chunks);
                    const contentType = response.headers["content-type"] || "application/octet-stream";
                    const base64 = buffer.toString("base64");
                    resolve(`${base64}`);
                    // resolve(`data:${contentType};base64,${base64}`);
                });
            });
            req.on("error", (err) => {
                // reject(err);
                resolve("");
            });
        });
    }
    else {
        try {
            const buffer = await fs.promises.readFile(params.imagePath);
            const contentType = mime.lookup(params.imagePath) || "application/octet-stream";
            const base64 = buffer.toString("base64");
            return `${base64}`;
            // return `data:${contentType};base64,${base64}`;
        }
        catch (err) {
            // throw new Error(`无法读取本地文件：${err.message}`);
            return "";
        }
    }
}
