export enum XF_URL {
  recognizeImage = "https://api.xf-yun.com/v1/private/sf8e6aca1",
}

export interface XF_COORD {
  x: number;
  y: number;
}

export interface XF_RECOGNIZE_IMAGE_RESPONSE {
  coord: XF_COORD[];
  conf: number;
  content: string;
}

export interface GetResumeDetailOptions {
  at: string;
  rt: string;
  resumeNumber: string;
  lang?: "1";
}

export interface GetResumeNumberOptions {
  at: string;
  rt: string;
}

export interface GetJobDeliveredOptions {
  at: string;
  rt: string;
  // 投递状态: 投递成功、被查看、有意向、邀面试、不合适
  status: string;
  /// 投递子状态: 全部、待确认、已接受、已拒绝
  /// 投递状态为 邀面试 时有效
  subStatus?: string;
  pageIndex?: number;
  pageSize?: number;
}

export enum JobDeliveredStatusReverse {
  "send" = "投递成功",
  "viewed" = "被查看",
  "intersted" = "有意向",
  "interviewed" = "邀面试",
  "unsuitable" = "不合适",
}
export enum JobDeliveredSubStatusReverse {
  "all" = "全部",
  "toBeComfirm" = "待确认",
  "accepted" = "已接受",
  "refused" = "已拒绝",
}

export enum JobDeliveredStatus {
  "投递成功" = "send",
  "被查看" = "viewed",
  "有意向" = "intersted",
  "邀面试" = "interviewed",
  "不合适" = "unsuitable",
}

export enum JobDeliveredSubStatus {
  "全部" = "all",
  "待确认" = "toBeComfirm",
  "已接受" = "accepted",
  "已拒绝" = "refused",
}
