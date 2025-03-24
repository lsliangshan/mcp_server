import {
  GetJobDeliveredOptions,
  GetResumeDetailOptions,
  GetResumeNumberOptions,
  SearchPositionsOptions,
} from "../types/types.js";

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

export function getResumeNumber(params: GetResumeNumberOptions): Promise<{
  resumeNumber: string;
  resumeId: string;
}> {
  return new Promise(async (resolve) => {
    const { at, rt } = params;
    const apiUrl = `https://fe-api.zhaopin.com/c/i/user/detail?detail=true&at=${at}&rt=${rt}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (
      data.code == 200 &&
      data.data &&
      data.data.Resume &&
      data.data.Resume.ResumeNumber
    ) {
      resolve({
        resumeNumber: data.data.Resume.ResumeNumber,
        resumeId: data.data.Resume.Id,
      });
    } else {
      resolve({
        resumeNumber: "",
        resumeId: "",
      });
    }
  });
}

export function getJobDelivered(params: GetJobDeliveredOptions): Promise<{
  code: number;
  data: any[];
  total: number;
}> {
  return new Promise(async (resolve) => {
    const { at, rt, status, pageIndex = 1, pageSize = 20 } = params;
    const apiUrl = `https://fe-api-pre.zhaopin.com/c/i/schedule/feedback?index=${pageIndex}&pageSize=${pageSize}&status=${status}&storeViewCount=false&at=${at}&rt=${rt}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (
      data.code == 200 &&
      data.data &&
      data.data.code == 200 &&
      data.data.data
    ) {
      resolve({
        code: 200,
        data: data.data.data,
        total: data.data.total,
      });
    } else {
      resolve({
        code: data.code,
        data: [],
        total: 0,
      });
    }
  });
}

export function searchPositions(params: SearchPositionsOptions): Promise<{
  code: number;
  data: any;
}> {
  return new Promise(async (resolve) => {
    const apiUrl = `https://fe-api.zhaopin.com/c/i/search/positions`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await response.json();

    if (data.code == 200 && data.data) {
      resolve({
        code: 200,
        data: data.data,
      });
    } else {
      resolve({
        code: data.code,
        data: [],
      });
    }
  });
}
