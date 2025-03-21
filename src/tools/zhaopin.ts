import { GetResumeDetailOptions } from "../types/types.js";

export function getResumeDetail(params: GetResumeDetailOptions) {
  return new Promise(async (resolve) => {
    const { at, rt, resumeNumber, lang = "1" } = params;

    const apiUrl = `https://fe-api.zhaopin.com/c/i/resume?resumeNumber=${resumeNumber}&lang=${lang}&at=${at}&rt=${rt}`;

    const response = await fetch(apiUrl, {
      method: "GET",
    });

    const data = await response.json();

    if (data.code == 200 && data.data) {
      // 请求成功
      resolve(data.data);
    } else {
      // 请求失败
      resolve({});
    }
  });
}
