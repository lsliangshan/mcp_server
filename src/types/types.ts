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

export enum JobSearchCondition {
  "职位或公司名称" = "keyword",
  "职位类别" = "jobCategory",
  "公司行业" = "companyIndustry",
  "工作地点" = "workLocation",
  "地铁沿线" = "subwayLine",
  "薪资范围" = "salaryType",
  "学历要求" = "educationType",
  "工作经验" = "workExpType",
  "职位类型" = "jobStatus",
  "公司性质" = "companyType",
  "公司规模" = "companySize",
}

export enum JobSearchConditionReverse {
  "keyword" = "职位或公司名称",
  "jobCategory" = "职位类别",
  "companyIndustry" = "公司行业",
  "workLocation" = "工作地点",
  "subwayLine" = "地铁沿线",
  "salaryType" = "薪资范围",
  "educationType" = "学历要求",
  "workExpType" = "工作经验",
  "jobStatus" = "职位类型",
  "companyType" = "公司性质",
  "companySize" = "公司规模",
}

export enum JobSearchConditionMap {
  "keyword" = "S_SOU_FULL_INDEX",
  "jobCategory" = "S_SOU_JD_JOB_LEVEL3",
  "companyIndustry" = "S_SOU_JD_INDUSTRY_LEVEL", // "xxxx;xxxx"
  "workLocation" = "S_SOU_WORK_CITY",
  "subwayLine" = "S_SOU_SUBWAY_LINE",
  "salaryType" = "S_SOU_SALARY", // "MIN_SALARY,MAX_SALARY"
  "educationType" = "S_SOU_EDUCATION_LOWESTLEVEL",
  "workExpType" = "S_SOU_WORK_EXPERIENCE",
  "jobStatus" = "S_SOU_POSITION_TYPE",
  "companyType" = "S_SOU_COMPANY_TYPE",
  "companySize" = "S_SOU_COMPANY_SCALE",
}

export const companyTypes = {
  "国企": "1",
  "外企": "2;3",
  "合资": "4",
  "民营": "5",
  "上市公司": "9",
  "股份制企业": "8",
  "事业单位": "6;10",
  "其他": "11;12;13;14;15;16;7",
}

export const companySizes = {
  "20人以下": "1",
  "20-99人": "2",
  "100-299人": "3",
  "300-499人": "8",
  "500-999人": "4",
  "1000-9999人": "5",
  "10000人以上": "6",
}

export enum ECompanySize {
  "20人以下" = "20人以下",
  "20-99人" = "20-99人",
  "100-299人" = "100-299人",
  "300-499人" = "300-499人",
  "500-999人" = "500-999人",
  "1000-9999人" = "1000-9999人",
  "10000人以上" = "10000人以上",
}

export const educationTypes = {
  "初中及以下": "9",
  "高中": "7",
  "中专/中技": "12",
  "大专": "5",
  "本科": "4",
  "硕士": "3",
  "MBA/EMBA": "10",
  "博士": "1",
}

export const workExpTypes = {
  "无经验": "0000",
  "1年以下": "0001",
  "1-3年": "0103",
  "3-5年": "0305",
  "5-10年": "0510",
  "10年以上": "1099",
}

export const jobStatuses = {
  "全职": "2",
  "兼职/临时": "1",
  "实习": "4",
  "校园": "5",
}
