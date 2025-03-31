import axios from "axios";
import {
  BeforeDeliveryPositionsOptions,
  DeliveryPositionsOptions,
  GetJobDeliveredDetailOptions,
  GetJobDeliveredOptions,
  GetPositionDetailBatchOptions,
  GetPositionDetailOptions,
  GetResumeDetailOptions,
  GetResumeNumberOptions,
  SearchPositionsOptions,
  Urls,
} from "../types/types.js";
import { v4 as uuidv4 } from "uuid";

export function getResumeDetailPC(params: GetResumeDetailOptions) {
  return new Promise(async (resolve) => {
    const { at, rt, resumeNumber, lang = "1" } = params;

    const apiUrl = `${Urls.zhaopin}/c/i/resume?resumeNumber=${resumeNumber}&lang=${lang}&at=${at}&rt=${rt}`;

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

export function getResumeDetail(params: GetResumeDetailOptions) {
  return new Promise(async (resolve) => {
    const { at, rt, resumeNumber, lang = "1" } = params;

    const apiUrl = `${Urls.zhaopin_m}/api/resume/preview?resumeNumber=${resumeNumber}&lang=${lang}&at=${at}&rt=${rt}`;

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

export function getResumeNumberPC(params: GetResumeNumberOptions): Promise<{
  resumeNumber: string;
  resumeId: string;
}> {
  return new Promise(async (resolve) => {
    const { at, rt } = params;
    const apiUrl = `${Urls.zhaopin}/c/i/user/detail?detail=true&at=${at}&rt=${rt}`;
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

export function getResumeNumber(params: GetResumeNumberOptions): Promise<{
  resumeNumber: string;
  resumeId: string;
}> {
  return new Promise(async (resolve) => {
    const { at, rt } = params;
    const apiUrl = `${Urls.zhaopin_m}/api/user/detail-hide-mobile-and-email?at=${at}&rt=${rt}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.resumes && data.resumes.length > 0) {
      resolve({
        resumeNumber: data.resumes[0].number,
        resumeId: data.resumes[0].id,
      });
    } else {
      resolve({
        resumeNumber: "",
        resumeId: "",
      });
    }
  });
}

export function getJobDeliveredDetail(
  params: GetJobDeliveredDetailOptions
): Promise<{
  code: number;
  data: any;
}> {
  return new Promise(async (resolve) => {
    const { at, rt, jobId, resumeId } = params;
    const apiUrl = `${Urls.zhaopin_m}/api/feedbackv2/feedback-detail?jobId=${jobId}&resumeId=${resumeId}&at=${at}&rt=${rt}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
        data: {},
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
    const { at, rt, type, pageIndex = 1, pageSize = 20 } = params;
    const apiUrl = `${Urls.zhaopin_m}/api/feedbackv2/feedback-list?pageIndex=${pageIndex}&pageSize=${pageSize}&type=${type}&storeViewCount=false&at=${at}&rt=${rt}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.code == 200 && data.data && data.data.list) {
      const ps: any[] = [];
      data.data.list.forEach((item: any) => {
        ps.push(
          getJobDeliveredDetail({
            at,
            rt,
            jobId: item.jobId,
            resumeId: item.resumeId,
          })
        );
      });
      const results = await Promise.all(ps);

      const list = data.data.list.map((item: any) => {
        item.jobDetail = results.find(
          (result: any) =>
            result.code == 200 &&
            result.data &&
            result.data.feedbackInfo &&
            result.data.feedbackInfo.jobId == item.jobId
        ).data;
        return item;
      });

      resolve({
        code: 200,
        data: list,
        total: data.data.count,
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

export function searchPositionsPC(params: SearchPositionsOptions): Promise<{
  code: number;
  data: any;
}> {
  return new Promise(async (resolve) => {
    const apiUrl = `${Urls.zhaopin}/c/i/search/positions`;

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

export function searchPositions(params: SearchPositionsOptions): Promise<{
  code: number;
  data: any;
}> {
  return new Promise(async (resolve) => {
    const apiUrl = `${Urls.zhaopin_m}/api/sou/search-position`;

    const response = await axios.get(apiUrl, {
      params: {
        ...params,
        platform: 7,
        _v: Math.random(),
      },
    });
    const data = response.data;

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
export function beforeDeliveryPositionsPC(
  params: BeforeDeliveryPositionsOptions
): Promise<{
  code: number;
  message?: string;
  data: any;
}> {
  return new Promise(async (resolve) => {
    const apiUrl = `${Urls.zhaopin}/c/pc/alan/jobs/application/preparation?at=${params.at}&rt=${params.rt}`;
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

// 投递前，检查职位是否可以投递
export function beforeDeliveryPositions(
  params: BeforeDeliveryPositionsOptions
): Promise<{
  code: number;
  message?: string;
  data: any;
}> {
  return new Promise(async (resolve) => {
    const { at, rt } = params;
    const apiUrl = `${Urls.zhaopin_m}/api/user/detail-hide-mobile-and-email?at=${at}&rt=${rt}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.resumes && data.resumes.length > 0) {
      resolve({
        code: 200,
        data: data,
      });
    } else {
      resolve({
        code: 1001,
        message: "职位不可投递，请检查是否登录，且包含完整简历",
        data: {},
      });
    }
  });
}

export function deliveryPositionsPC(params: DeliveryPositionsOptions): Promise<{
  code: number;
  message?: string;
  data: any;
}> {
  return new Promise(async (resolve) => {
    const apiUrl = `${Urls.zhaopin}/c/pc/alan/jobs/application?at=${params.at}&rt=${params.rt}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: 3,
        batched: false,
        // inviteCode: params.jobNumbers.length > 1,
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

export function deliveryPositions(params: DeliveryPositionsOptions): Promise<{
  code: number;
  message?: string;
  data: any;
}> {
  return new Promise(async (resolve) => {
    const apiUrl = `${Urls.zhaopin_m}/api/position/apply?at=${params.at}&rt=${params.rt}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: 3,
        batched: false,
        inviteCode: params.positionNumbers.length > 1,
        // ignoreIntention: 1,
        // ignoreBlackType: "",
        // deliveryChannelType: 1,
        // extraApplyParams: {},
        actionId: uuidv4(),
        // businessSystem: "1",
        // stSourceCode: 0,
        // businessPlatformSub: 0,
        // businessTagId: "",
        // businessPlatformLabel: 0,
        // pageCode: 4019,
        // jobSource: "SEARCH",
        // attachmentDefaultType: "online",
        ...params,
      }),
    });
    const data = await response.json();

    if (data && data.statusCode == 200) {
      resolve({
        code: 200,
        data: data,
      });
    } else {
      resolve({
        code: 1001,
        message:
          data.statusDescription || "投递失败，请检查是否登录，且包含完整简历",
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
    const apiUrl = `${Urls.zhaopin}/c/i/jobs/position-detailv2?number=${params.number}&cvNumber=${params.cvNumber}&at=${params.at}&rt=${params.rt}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

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
          `${Urls.zhaopin_m}/api/position/detail?number=${number}&cvNumber=${params.cvNumber}&at=${params.at}&rt=${params.rt}`,
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
