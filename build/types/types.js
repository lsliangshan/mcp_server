export var XF_URL;
(function (XF_URL) {
    XF_URL["recognizeImage"] = "https://api.xf-yun.com/v1/private/sf8e6aca1";
})(XF_URL || (XF_URL = {}));
export var JobDeliveredStatusReverse;
(function (JobDeliveredStatusReverse) {
    JobDeliveredStatusReverse["send"] = "\u6295\u9012\u6210\u529F";
    JobDeliveredStatusReverse["viewed"] = "\u88AB\u67E5\u770B";
    JobDeliveredStatusReverse["intersted"] = "\u6709\u610F\u5411";
    JobDeliveredStatusReverse["interviewed"] = "\u9080\u9762\u8BD5";
    JobDeliveredStatusReverse["unsuitable"] = "\u4E0D\u5408\u9002";
})(JobDeliveredStatusReverse || (JobDeliveredStatusReverse = {}));
export var JobDeliveredSubStatusReverse;
(function (JobDeliveredSubStatusReverse) {
    JobDeliveredSubStatusReverse["all"] = "\u5168\u90E8";
    JobDeliveredSubStatusReverse["toBeComfirm"] = "\u5F85\u786E\u8BA4";
    JobDeliveredSubStatusReverse["accepted"] = "\u5DF2\u63A5\u53D7";
    JobDeliveredSubStatusReverse["refused"] = "\u5DF2\u62D2\u7EDD";
})(JobDeliveredSubStatusReverse || (JobDeliveredSubStatusReverse = {}));
export var JobDeliveredStatus;
(function (JobDeliveredStatus) {
    JobDeliveredStatus["\u6295\u9012\u6210\u529F"] = "send";
    JobDeliveredStatus["\u88AB\u67E5\u770B"] = "viewed";
    JobDeliveredStatus["\u6709\u610F\u5411"] = "intersted";
    JobDeliveredStatus["\u9080\u9762\u8BD5"] = "interviewed";
    JobDeliveredStatus["\u4E0D\u5408\u9002"] = "unsuitable";
})(JobDeliveredStatus || (JobDeliveredStatus = {}));
export var JobDeliveredSubStatus;
(function (JobDeliveredSubStatus) {
    JobDeliveredSubStatus["\u5168\u90E8"] = "all";
    JobDeliveredSubStatus["\u5F85\u786E\u8BA4"] = "toBeComfirm";
    JobDeliveredSubStatus["\u5DF2\u63A5\u53D7"] = "accepted";
    JobDeliveredSubStatus["\u5DF2\u62D2\u7EDD"] = "refused";
})(JobDeliveredSubStatus || (JobDeliveredSubStatus = {}));
export var JobSearchCondition;
(function (JobSearchCondition) {
    JobSearchCondition["\u804C\u4F4D\u6216\u516C\u53F8\u540D\u79F0"] = "keyword";
    JobSearchCondition["\u804C\u4F4D\u7C7B\u522B"] = "jobCategory";
    JobSearchCondition["\u516C\u53F8\u884C\u4E1A"] = "companyIndustry";
    JobSearchCondition["\u5DE5\u4F5C\u5730\u70B9"] = "workLocation";
    JobSearchCondition["\u5730\u94C1\u6CBF\u7EBF"] = "subwayLine";
    JobSearchCondition["\u85AA\u8D44\u8303\u56F4"] = "salaryType";
    JobSearchCondition["\u5B66\u5386\u8981\u6C42"] = "educationType";
    JobSearchCondition["\u5DE5\u4F5C\u7ECF\u9A8C"] = "workExpType";
    JobSearchCondition["\u804C\u4F4D\u7C7B\u578B"] = "jobStatus";
    JobSearchCondition["\u516C\u53F8\u6027\u8D28"] = "companyType";
    JobSearchCondition["\u516C\u53F8\u89C4\u6A21"] = "companySize";
})(JobSearchCondition || (JobSearchCondition = {}));
export var JobSearchConditionReverse;
(function (JobSearchConditionReverse) {
    JobSearchConditionReverse["keyword"] = "\u804C\u4F4D\u6216\u516C\u53F8\u540D\u79F0";
    JobSearchConditionReverse["jobCategory"] = "\u804C\u4F4D\u7C7B\u522B";
    JobSearchConditionReverse["companyIndustry"] = "\u516C\u53F8\u884C\u4E1A";
    JobSearchConditionReverse["workLocation"] = "\u5DE5\u4F5C\u5730\u70B9";
    JobSearchConditionReverse["subwayLine"] = "\u5730\u94C1\u6CBF\u7EBF";
    JobSearchConditionReverse["salaryType"] = "\u85AA\u8D44\u8303\u56F4";
    JobSearchConditionReverse["educationType"] = "\u5B66\u5386\u8981\u6C42";
    JobSearchConditionReverse["workExpType"] = "\u5DE5\u4F5C\u7ECF\u9A8C";
    JobSearchConditionReverse["jobStatus"] = "\u804C\u4F4D\u7C7B\u578B";
    JobSearchConditionReverse["companyType"] = "\u516C\u53F8\u6027\u8D28";
    JobSearchConditionReverse["companySize"] = "\u516C\u53F8\u89C4\u6A21";
})(JobSearchConditionReverse || (JobSearchConditionReverse = {}));
export var JobSearchConditionMap;
(function (JobSearchConditionMap) {
    JobSearchConditionMap["keyword"] = "S_SOU_FULL_INDEX";
    JobSearchConditionMap["jobCategory"] = "S_SOU_JD_JOB_LEVEL3";
    JobSearchConditionMap["companyIndustry"] = "S_SOU_JD_INDUSTRY_LEVEL";
    JobSearchConditionMap["workLocation"] = "S_SOU_WORK_CITY";
    JobSearchConditionMap["subwayLine"] = "S_SOU_SUBWAY_LINE";
    JobSearchConditionMap["salaryType"] = "S_SOU_SALARY";
    JobSearchConditionMap["educationType"] = "S_SOU_EDUCATION_LOWESTLEVEL";
    JobSearchConditionMap["workExpType"] = "S_SOU_WORK_EXPERIENCE";
    JobSearchConditionMap["jobStatus"] = "S_SOU_POSITION_TYPE";
    JobSearchConditionMap["companyType"] = "S_SOU_COMPANY_TYPE";
    JobSearchConditionMap["companySize"] = "S_SOU_COMPANY_SCALE";
})(JobSearchConditionMap || (JobSearchConditionMap = {}));
export const companyTypes = {
    "国企": "1",
    "外企": "2;3",
    "合资": "4",
    "民营": "5",
    "上市公司": "9",
    "股份制企业": "8",
    "事业单位": "6;10",
    "其他": "11;12;13;14;15;16;7",
};
export const companySizes = {
    "20人以下": "1",
    "20-99人": "2",
    "100-299人": "3",
    "300-499人": "8",
    "500-999人": "4",
    "1000-9999人": "5",
    "10000人以上": "6",
};
export var ECompanySize;
(function (ECompanySize) {
    ECompanySize["20\u4EBA\u4EE5\u4E0B"] = "20\u4EBA\u4EE5\u4E0B";
    ECompanySize["20-99\u4EBA"] = "20-99\u4EBA";
    ECompanySize["100-299\u4EBA"] = "100-299\u4EBA";
    ECompanySize["300-499\u4EBA"] = "300-499\u4EBA";
    ECompanySize["500-999\u4EBA"] = "500-999\u4EBA";
    ECompanySize["1000-9999\u4EBA"] = "1000-9999\u4EBA";
    ECompanySize["10000\u4EBA\u4EE5\u4E0A"] = "10000\u4EBA\u4EE5\u4E0A";
})(ECompanySize || (ECompanySize = {}));
export const educationTypes = {
    "初中及以下": "9",
    "高中": "7",
    "中专/中技": "12",
    "大专": "5",
    "本科": "4",
    "硕士": "3",
    "MBA/EMBA": "10",
    "博士": "1",
};
export const workExpTypes = {
    "无经验": "0000",
    "1年以下": "0001",
    "1-3年": "0103",
    "3-5年": "0305",
    "5-10年": "0510",
    "10年以上": "1099",
};
export const jobStatuses = {
    "全职": "2",
    "兼职/临时": "1",
    "实习": "4",
    "校园": "5",
};
