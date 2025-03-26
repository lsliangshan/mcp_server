import {
  BeforeDeliveryPositionsOptions,
  DeliveryPositionsOptions,
  GetJobDeliveredOptions,
  GetPositionDetailBatchOptions,
  GetPositionDetailOptions,
  GetResumeDetailOptions,
  GetResumeNumberOptions,
  SearchPositionsOptions,
} from "../types/types.js";
import { v4 as uuidv4 } from "uuid";

export function getResumeDetail(params: GetResumeDetailOptions) {
  return new Promise(async (resolve) => {
    const { at, rt, resumeNumber, lang = "1" } = params;

    const apiUrl = `https://fe-api-pre.zhaopin.com/c/i/resume?resumeNumber=${resumeNumber}&lang=${lang}&at=${at}&rt=${rt}`;

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
    const apiUrl = `https://fe-api-pre.zhaopin.com/c/i/user/detail?detail=true&at=${at}&rt=${rt}`;
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
    const apiUrl = `https://fe-api-pre.zhaopin.com/c/i/search/positions${
      params.at
        ? ""
        : "?MmEwMD=5NhjSxyTnsuDHzbm7TZTxPFoCalLdx3Xp1zZW8lOXcAnhYul6aRs.i3d70XS3re.GHJgMiYrS_AL_OF6NNX1tQZQvEU_lnq.8aXuGP4zLcIH8Uouo708dyiZIgC5vuo0uanNXr_IAE4rmSVe0YD25VvdAkCsrE6EQhvTBBsNmAIzpK.uQCBwUSZcVLuswCBplJlfPTZee.LvJxbGZuD7FhzYK7gfqNB.BwOiQTeo7und6fFBeZ8ZsYCR9iIOgKNMkoDhujlOF7IncQzCJM3VJxEKuREHPXLpeIQ9_V2BaIOtL7bmVcw.O5AK1X2WjiFQZzSvVnb9fUHkMKvTlyM54DGNIbWI87UAujpGSEtz0NvT7R.dQ4dtpQDKc6araLB4VPtIdrN9TclYsdQD7lWn_VG&c1K5tw0w6_=4Tf6wtpCkTUgA26XCmdnnJVKFe2Enprz0WcsiznNwgGjC.f97qE0M97.pbwW2M1pgAdKwb5HR0YsweMgvHTr2kuX.qb6jj.F9NbtbjeFp63.nNLee3cXCQeYHH_dG2M5B1jnOLAnhSdPOUvmAElNAx5YY5BOeSPreXuwvJ7kZv3DXUcAEMkfAUwi_iGNspcAs5A8sTtpPphM7eh2XumAJgaM_WoLctZ1lz80EKit.oS0XaYWj3AJiri9mOeR8z00TeO1q45nSlP6W9JBn1JtIDTIETtY0tsXrvAD57Bo4BGPFj9QqZrFyJqUMLfY2I_s1bRhkuS9VZy9cRQIhlj3nvY0eCVSodH.GMPBfTu0zcTGgTmJ1pvlbw1kCSLbwc6SZHpj0rzalEiBCdtN.Y83BeHOkRTL1ayqczewnQvUHsjYBBT1h7_xWrLk3H21emynIQ7nkjnU054RRvt1znFuFPG"
    }`;
    console.log("... searchPositions params: ", params);
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await response.json();
    console.log("... searchPositions: ", data);
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

// 投递前，检查职位是否可以投递
export function beforeDeliveryPositions(
  params: BeforeDeliveryPositionsOptions
): Promise<{
  code: number;
  message?: string;
  data: any;
}> {
  return new Promise(async (resolve) => {
    const apiUrl = `https://fe-api-pre.zhaopin.com/c/pc/alan/jobs/application/preparation?at=${params.at}&rt=${params.rt}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const data = await response.json();

    if (data.data && !data.error) {
      resolve({
        code: 200,
        data: data.data,
      });
    } else {
      resolve({
        code: 1001,
        message: data.message || "职位不可投递，请检查是否登录，且包含完整简历",
        data: {},
      });
    }
  });
}

export function deliveryPositions(params: DeliveryPositionsOptions): Promise<{
  code: number;
  message?: string;
  data: any;
}> {
  return new Promise(async (resolve) => {
    const apiUrl = `https://fe-api-pre.zhaopin.com/c/pc/alan/jobs/application?at=${params.at}&rt=${params.rt}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: 3,
        batched: false,
        inviteCode: params.jobNumbers.length > 1,
        ignoreIntention: 1,
        ignoreBlackType: "",
        deliveryChannelType: 1,
        extraApplyParams: {},
        actionId: uuidv4(),
        businessSystem: "1",
        stSourceCode: 0,
        businessPlatformSub: 0,
        businessTagId: "",
        businessPlatformLabel: 0,
        pageCode: 4019,
        jobSource: "SEARCH",
        attachmentDefaultType: "online",
        ...params,
      }),
    });
    const data = await response.json();
    console.log("... deliveryPositions: ", data);
    if (data && !data.error) {
      resolve({
        code: 200,
        data: data,
      });
    } else {
      resolve({
        code: 1001,
        message: data.message || "投递失败，请检查是否登录，且包含完整简历",
        data: {},
      });
    }
  });
}

export function getPositionDetail(params: GetPositionDetailOptions): Promise<{
  code: number;
  message?: string;
  data: any;
}> {
  return new Promise(async (resolve) => {
    const apiUrl = `https://fe-api-pre.zhaopin.com/c/i/jobs/position-detailv2?number=${params.number}&cvNumber=${params.cvNumber}&at=${params.at}&rt=${params.rt}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("... deliveryPositions: ", data);
    if (data && data.code == 200 && data.data) {
      resolve({
        code: 200,
        data: data.data,
      });
    } else {
      resolve({
        code: 1001,
        message: data.message || "获取职位详情失败",
        data: {},
      });
    }
  });
}

// 批量获取职位详情
export function getPositionDetailBatch(
  params: GetPositionDetailBatchOptions
): Promise<{
  code: number;
  message?: string;
  data: any;
}> {
  return new Promise(async (resolve) => {
    const ps: any[] = [];
    let result: any[] = [];

    params.numbers.forEach((number) => {
      ps.push(
        fetch(
          `https://fe-api-pre.zhaopin.com/c/i/jobs/position-detailv2?number=${number}&cvNumber=${params.cvNumber}&at=${params.at}&rt=${params.rt}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      );
    });

    const responses = await Promise.all(ps);

    result = await Promise.all(
      responses.map(async (response, index) => {
        const data = await response.json();
        if (data && data.code == 200 && data.data) {
          return data;
        } else {
          return {
            code: data.code || 1001,
            message: data.message
              ? Object.prototype.toString.call(data.message) ==
                "[object String]"
                ? data.message
                : data.message.message || "获取职位详情失败"
              : "获取职位详情失败",
            data: {
              number: params.numbers[index],
            },
          };
        }
      })
    );

    resolve({
      code: 200,
      data: result,
    });
  });
}
