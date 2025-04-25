import allJobTypes from "../data/job_types.json" with { type: "json" };
import allIndustries from "../data/industries.json" with { type: "json" };
// import allSubways from '../data/subways.json' with { type: "json" };
// import allSubwayStations from '../data/subway_stations.json' with { type: "json" };
export var Urls;
(function (Urls) {
    Urls["zhaopin"] = "https://fe-api.zhaopin.com";
    Urls["zhaopin_m"] = "https://m.zhaopin.com";
})(Urls || (Urls = {}));
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
export const jobDeliveredStatus = {
    "1": "已投递",
    "10": "被查看",
    "22": "有意向",
    "356": "邀面试",
    "4": "不合适",
};
export const jobDeliveredStatusReverse = {
    "全部": "0",
    "已投递": "1",
    "被查看": "10",
    "有意向": "22",
    "邀面试": "356",
    "不合适": "4",
};
export var JobDeliveredStatus;
(function (JobDeliveredStatus) {
    JobDeliveredStatus["\u5168\u90E8"] = "0";
    JobDeliveredStatus["\u5DF2\u6295\u9012"] = "1";
    JobDeliveredStatus["\u88AB\u67E5\u770B"] = "10";
    JobDeliveredStatus["\u6709\u610F\u5411"] = "22";
    JobDeliveredStatus["\u9080\u9762\u8BD5"] = "356";
    JobDeliveredStatus["\u4E0D\u5408\u9002"] = "4";
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
    JobSearchCondition["\u804C\u4F4D\u7C7B\u522B"] = "jobType";
    JobSearchCondition["\u6392\u5E8F"] = "order";
    JobSearchCondition["\u516C\u53F8\u884C\u4E1A"] = "industry";
    JobSearchCondition["\u5DE5\u4F5C\u5730\u70B9"] = "workLocation";
    JobSearchCondition["\u5730\u94C1\u6CBF\u7EBF"] = "subway";
    JobSearchCondition["\u5730\u94C1\u7AD9"] = "subwayStation";
    JobSearchCondition["\u5750\u6807"] = "coordinate";
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
    JobSearchConditionReverse["jobType"] = "\u804C\u4F4D\u7C7B\u522B";
    JobSearchConditionReverse["order"] = "\u6392\u5E8F";
    JobSearchConditionReverse["industry"] = "\u516C\u53F8\u884C\u4E1A";
    JobSearchConditionReverse["workLocation"] = "\u5DE5\u4F5C\u5730\u70B9";
    JobSearchConditionReverse["subway"] = "\u5730\u94C1\u6CBF\u7EBF";
    JobSearchConditionReverse["subwayStation"] = "\u5730\u94C1\u7AD9";
    JobSearchConditionReverse["coordinate"] = "\u5750\u6807";
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
    JobSearchConditionMap["jobType"] = "S_SOU_JD_JOB_LEVEL3";
    JobSearchConditionMap["order"] = "order";
    JobSearchConditionMap["industry"] = "S_SOU_JD_INDUSTRY_LEVEL";
    JobSearchConditionMap["workLocation"] = "S_SOU_WORK_CITY";
    JobSearchConditionMap["subway"] = "S_SOU_SUBWAY_LINE";
    JobSearchConditionMap["subwayStation"] = "S_SOU_SUBWAY_STATION";
    JobSearchConditionMap["coordinate"] = "S_SOU_COORDINATE";
    JobSearchConditionMap["salaryType"] = "S_SOU_SALARY";
    JobSearchConditionMap["educationType"] = "S_SOU_EDUCATION_LOWESTLEVEL";
    JobSearchConditionMap["workExpType"] = "S_SOU_WORK_EXPERIENCE";
    JobSearchConditionMap["jobStatus"] = "S_SOU_POSITION_TYPE";
    JobSearchConditionMap["companyType"] = "S_SOU_COMPANY_TYPE";
    JobSearchConditionMap["companySize"] = "S_SOU_COMPANY_SCALE";
})(JobSearchConditionMap || (JobSearchConditionMap = {}));
export const orders = {
    "智能匹配": 11,
    "薪酬最高": 2,
    "最新发布": 4,
};
export var EOrder;
(function (EOrder) {
    EOrder["\u667A\u80FD\u5339\u914D"] = "\u667A\u80FD\u5339\u914D";
    EOrder["\u85AA\u916C\u6700\u9AD8"] = "\u85AA\u916C\u6700\u9AD8";
    EOrder["\u6700\u65B0\u53D1\u5E03"] = "\u6700\u65B0\u53D1\u5E03";
})(EOrder || (EOrder = {}));
export const companyTypes = {
    国企: "1",
    外企: "2;3",
    合资: "4",
    民营: "5",
    上市公司: "9",
    股份制企业: "8",
    事业单位: "6;10",
    其他: "11;12;13;14;15;16;7",
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
    初中及以下: "9",
    高中: "7",
    "中专/中技": "12",
    大专: "5",
    本科: "4",
    硕士: "3",
    "MBA/EMBA": "10",
    博士: "1",
};
export const workExpTypes = {
    无经验: "0000",
    "1年以下": "0001",
    "1-3年": "0103",
    "3-5年": "0305",
    "5-10年": "0510",
    "10年以上": "1099",
};
export const jobStatuses = {
    全职: "2",
    "兼职/临时": "1",
    实习: "4",
    校园: "5",
};
export var EProvinces;
(function (EProvinces) {
    EProvinces["\u5B89\u5FBD"] = "\u5B89\u5FBD";
    EProvinces["\u798F\u5EFA"] = "\u798F\u5EFA";
    EProvinces["\u7518\u8083"] = "\u7518\u8083";
    EProvinces["\u5E7F\u4E1C"] = "\u5E7F\u4E1C";
    EProvinces["\u5E7F\u897F"] = "\u5E7F\u897F";
    EProvinces["\u8D35\u5DDE"] = "\u8D35\u5DDE";
    EProvinces["\u6D77\u5357"] = "\u6D77\u5357";
    EProvinces["\u6CB3\u5317"] = "\u6CB3\u5317";
    EProvinces["\u9ED1\u9F99\u6C5F"] = "\u9ED1\u9F99\u6C5F";
    EProvinces["\u6CB3\u5357"] = "\u6CB3\u5357";
    EProvinces["\u6E56\u5317"] = "\u6E56\u5317";
    EProvinces["\u6E56\u5357"] = "\u6E56\u5357";
    EProvinces["\u6C5F\u82CF"] = "\u6C5F\u82CF";
    EProvinces["\u6C5F\u897F"] = "\u6C5F\u897F";
    EProvinces["\u5409\u6797"] = "\u5409\u6797";
    EProvinces["\u8FBD\u5B81"] = "\u8FBD\u5B81";
    EProvinces["\u5185\u8499\u53E4"] = "\u5185\u8499\u53E4";
    EProvinces["\u5B81\u590F"] = "\u5B81\u590F";
    EProvinces["\u9752\u6D77"] = "\u9752\u6D77";
    EProvinces["\u5C71\u4E1C"] = "\u5C71\u4E1C";
    EProvinces["\u9655\u897F"] = "\u9655\u897F";
    EProvinces["\u5C71\u897F"] = "\u5C71\u897F";
    EProvinces["\u56DB\u5DDD"] = "\u56DB\u5DDD";
    EProvinces["\u65B0\u7586"] = "\u65B0\u7586";
    EProvinces["\u897F\u85CF"] = "\u897F\u85CF";
    EProvinces["\u4E91\u5357"] = "\u4E91\u5357";
    EProvinces["\u6D59\u6C5F"] = "\u6D59\u6C5F";
})(EProvinces || (EProvinces = {}));
// export const industries = '互联网/IT/电子/通信;电子商务;企业服务;人工智能;智能硬件;在线教育;在线医疗;新媒体;物联网;新零售;区块链;游戏;社交网络;在线招聘/求职;云计算/大数据;网络/信息安全;在线生活服务（O2O）;在线音乐/视频/阅读;互联网;IT服务;计算机软件;计算机硬件;通信/网络设备;运营商/增值服务;电子/半导体/集成电路;消费电子产品;光电子行业;房地产/建筑;房地产开发;土地与公共设施管理;房地产中介;物业管理;建筑设计;工程施工;建筑设备安装;装饰装修;建材;建筑工程检测;金融业;银行;保险;基金;信托;证券/期货;投资/融资;汽车金融;互联网金融/小额贷款;租赁/拍卖/典当/担保;教育培训/科研;培训/辅导服务;学校/学历教育;学术/科研;科学技术推广;广告/传媒/文化/体育;广告/营销;广播/影视;会议/展览;文化艺术/娱乐;体育;新闻/出版;生物医药/医疗;医院;卫生服务;生物工程;医药制造;医疗检测;医药批发/零售;医疗设备/器械;IVD;医美/健康服务;批发/零售/贸易;快速消费品;耐用消费品;零售/批发;食品/饮料;烟草/酒业;日化;服装/纺织/皮革;奢侈品;玩具/礼品;珠宝/首饰;办公用品/设备;工艺品/收藏品/艺术品;家具/家居/家电;贸易/进出口;制造业;船舶/航空/航天/火车制造;电气机械/电力设备;电子设备制造;机器人;钢铁/有色金属冶炼及加工;专用设备制造;军工制造;金属制品业;通用设备制造;仪器仪表制造;摩托车/自行车制造;非金属矿物制品业;新材料;化学纤维制造业;化学原料/化学制品;日化产品制造;纺织业/服饰产品加工制造;农副产品加工制造;燃料资源加工制造;橡胶和塑料制品;文体/办公设备制造;家具制造;印刷/包装/造纸;工业自动化;汽车;汽车研发/制造;新能源汽车;汽车智能互联;汽车零部件;汽车4S店/经销商;汽车后市场;交通运输/仓储/物流;火车站/港口/汽车站/路政;客运服务;货运/物流/仓储;邮政/快递;专业服务;法律服务;咨询服务;翻译服务;人力资源服务;财务/审计/税务;工程技术与设计服务;检测/认证;景区/商业/市场等综合管理;商业代理服务;专利/商标/知识产权;租赁服务;专业技术服务;生活服务;餐饮服务;酒店/民宿;旅游服务;婚庆/摄影;美发/美容/保健;宠物服务;家政服务;回收/维修;休闲/娱乐;搬家/生活配送;居民服务;能源/环保/矿产;石油/石化;化工;电力/水利/热力/燃气;新能源;环保;矿产/采掘;政府/非盈利机构;政府/公共事业;社团/组织/社会保障;养老/孤儿/看护;农/林/牧/渔;农/林/牧/渔'
export const industries = allIndustries;
export var EIndustries;
(function (EIndustries) {
    EIndustries["\u4E92\u8054\u7F51/IT/\u7535\u5B50/\u901A\u4FE1"] = "\u4E92\u8054\u7F51/IT/\u7535\u5B50/\u901A\u4FE1";
    EIndustries["\u7535\u5B50\u5546\u52A1"] = "\u7535\u5B50\u5546\u52A1";
    EIndustries["\u4F01\u4E1A\u670D\u52A1"] = "\u4F01\u4E1A\u670D\u52A1";
    EIndustries["\u4EBA\u5DE5\u667A\u80FD"] = "\u4EBA\u5DE5\u667A\u80FD";
    EIndustries["\u667A\u80FD\u786C\u4EF6"] = "\u667A\u80FD\u786C\u4EF6";
    EIndustries["\u5728\u7EBF\u6559\u80B2"] = "\u5728\u7EBF\u6559\u80B2";
    EIndustries["\u5728\u7EBF\u533B\u7597"] = "\u5728\u7EBF\u533B\u7597";
    EIndustries["\u65B0\u5A92\u4F53"] = "\u65B0\u5A92\u4F53";
    EIndustries["\u7269\u8054\u7F51"] = "\u7269\u8054\u7F51";
    EIndustries["\u65B0\u96F6\u552E"] = "\u65B0\u96F6\u552E";
    EIndustries["\u533A\u5757\u94FE"] = "\u533A\u5757\u94FE";
    EIndustries["\u6E38\u620F"] = "\u6E38\u620F";
    EIndustries["\u793E\u4EA4\u7F51\u7EDC"] = "\u793E\u4EA4\u7F51\u7EDC";
    EIndustries["\u5728\u7EBF\u62DB\u8058/\u6C42\u804C"] = "\u5728\u7EBF\u62DB\u8058/\u6C42\u804C";
    EIndustries["\u4E91\u8BA1\u7B97/\u5927\u6570\u636E"] = "\u4E91\u8BA1\u7B97/\u5927\u6570\u636E";
    EIndustries["\u7F51\u7EDC/\u4FE1\u606F\u5B89\u5168"] = "\u7F51\u7EDC/\u4FE1\u606F\u5B89\u5168";
    EIndustries["\u5728\u7EBF\u751F\u6D3B\u670D\u52A1\uFF08O2O\uFF09"] = "\u5728\u7EBF\u751F\u6D3B\u670D\u52A1\uFF08O2O\uFF09";
    EIndustries["\u5728\u7EBF\u97F3\u4E50/\u89C6\u9891/\u9605\u8BFB"] = "\u5728\u7EBF\u97F3\u4E50/\u89C6\u9891/\u9605\u8BFB";
    EIndustries["\u4E92\u8054\u7F51"] = "\u4E92\u8054\u7F51";
    EIndustries["IT\u670D\u52A1"] = "IT\u670D\u52A1";
    EIndustries["\u8BA1\u7B97\u673A\u8F6F\u4EF6"] = "\u8BA1\u7B97\u673A\u8F6F\u4EF6";
    EIndustries["\u8BA1\u7B97\u673A\u786C\u4EF6"] = "\u8BA1\u7B97\u673A\u786C\u4EF6";
    EIndustries["\u901A\u4FE1/\u7F51\u7EDC\u8BBE\u5907"] = "\u901A\u4FE1/\u7F51\u7EDC\u8BBE\u5907";
    EIndustries["\u8FD0\u8425\u5546/\u589E\u503C\u670D\u52A1"] = "\u8FD0\u8425\u5546/\u589E\u503C\u670D\u52A1";
    EIndustries["\u7535\u5B50/\u534A\u5BFC\u4F53/\u96C6\u6210\u7535\u8DEF"] = "\u7535\u5B50/\u534A\u5BFC\u4F53/\u96C6\u6210\u7535\u8DEF";
    EIndustries["\u6D88\u8D39\u7535\u5B50\u4EA7\u54C1"] = "\u6D88\u8D39\u7535\u5B50\u4EA7\u54C1";
    EIndustries["\u5149\u7535\u5B50\u884C\u4E1A"] = "\u5149\u7535\u5B50\u884C\u4E1A";
    EIndustries["\u623F\u5730\u4EA7/\u5EFA\u7B51"] = "\u623F\u5730\u4EA7/\u5EFA\u7B51";
    EIndustries["\u623F\u5730\u4EA7\u5F00\u53D1"] = "\u623F\u5730\u4EA7\u5F00\u53D1";
    EIndustries["\u571F\u5730\u4E0E\u516C\u5171\u8BBE\u65BD\u7BA1\u7406"] = "\u571F\u5730\u4E0E\u516C\u5171\u8BBE\u65BD\u7BA1\u7406";
    EIndustries["\u623F\u5730\u4EA7\u4E2D\u4ECB"] = "\u623F\u5730\u4EA7\u4E2D\u4ECB";
    EIndustries["\u7269\u4E1A\u7BA1\u7406"] = "\u7269\u4E1A\u7BA1\u7406";
    EIndustries["\u5EFA\u7B51\u8BBE\u8BA1"] = "\u5EFA\u7B51\u8BBE\u8BA1";
    EIndustries["\u5DE5\u7A0B\u65BD\u5DE5"] = "\u5DE5\u7A0B\u65BD\u5DE5";
    EIndustries["\u5EFA\u7B51\u8BBE\u5907\u5B89\u88C5"] = "\u5EFA\u7B51\u8BBE\u5907\u5B89\u88C5";
    EIndustries["\u88C5\u9970\u88C5\u4FEE"] = "\u88C5\u9970\u88C5\u4FEE";
    EIndustries["\u5EFA\u6750"] = "\u5EFA\u6750";
    EIndustries["\u5EFA\u7B51\u5DE5\u7A0B\u68C0\u6D4B"] = "\u5EFA\u7B51\u5DE5\u7A0B\u68C0\u6D4B";
    EIndustries["\u91D1\u878D\u4E1A"] = "\u91D1\u878D\u4E1A";
    EIndustries["\u94F6\u884C"] = "\u94F6\u884C";
    EIndustries["\u4FDD\u9669"] = "\u4FDD\u9669";
    EIndustries["\u57FA\u91D1"] = "\u57FA\u91D1";
    EIndustries["\u4FE1\u6258"] = "\u4FE1\u6258";
    EIndustries["\u8BC1\u5238/\u671F\u8D27"] = "\u8BC1\u5238/\u671F\u8D27";
    EIndustries["\u6295\u8D44/\u878D\u8D44"] = "\u6295\u8D44/\u878D\u8D44";
    EIndustries["\u6C7D\u8F66\u91D1\u878D"] = "\u6C7D\u8F66\u91D1\u878D";
    EIndustries["\u4E92\u8054\u7F51\u91D1\u878D/\u5C0F\u989D\u8D37\u6B3E"] = "\u4E92\u8054\u7F51\u91D1\u878D/\u5C0F\u989D\u8D37\u6B3E";
    EIndustries["\u79DF\u8D41/\u62CD\u5356/\u5178\u5F53/\u62C5\u4FDD"] = "\u79DF\u8D41/\u62CD\u5356/\u5178\u5F53/\u62C5\u4FDD";
    EIndustries["\u6559\u80B2\u57F9\u8BAD/\u79D1\u7814"] = "\u6559\u80B2\u57F9\u8BAD/\u79D1\u7814";
    EIndustries["\u57F9\u8BAD/\u8F85\u5BFC\u670D\u52A1"] = "\u57F9\u8BAD/\u8F85\u5BFC\u670D\u52A1";
    EIndustries["\u5B66\u6821/\u5B66\u5386\u6559\u80B2"] = "\u5B66\u6821/\u5B66\u5386\u6559\u80B2";
    EIndustries["\u5B66\u672F/\u79D1\u7814"] = "\u5B66\u672F/\u79D1\u7814";
    EIndustries["\u79D1\u5B66\u6280\u672F\u63A8\u5E7F"] = "\u79D1\u5B66\u6280\u672F\u63A8\u5E7F";
    EIndustries["\u5E7F\u544A/\u4F20\u5A92/\u6587\u5316/\u4F53\u80B2"] = "\u5E7F\u544A/\u4F20\u5A92/\u6587\u5316/\u4F53\u80B2";
    EIndustries["\u5E7F\u544A/\u8425\u9500"] = "\u5E7F\u544A/\u8425\u9500";
    EIndustries["\u5E7F\u64AD/\u5F71\u89C6"] = "\u5E7F\u64AD/\u5F71\u89C6";
    EIndustries["\u4F1A\u8BAE/\u5C55\u89C8"] = "\u4F1A\u8BAE/\u5C55\u89C8";
    EIndustries["\u6587\u5316\u827A\u672F/\u5A31\u4E50"] = "\u6587\u5316\u827A\u672F/\u5A31\u4E50";
    EIndustries["\u4F53\u80B2"] = "\u4F53\u80B2";
    EIndustries["\u65B0\u95FB/\u51FA\u7248"] = "\u65B0\u95FB/\u51FA\u7248";
    EIndustries["\u751F\u7269\u533B\u836F/\u533B\u7597"] = "\u751F\u7269\u533B\u836F/\u533B\u7597";
    EIndustries["\u533B\u9662"] = "\u533B\u9662";
    EIndustries["\u536B\u751F\u670D\u52A1"] = "\u536B\u751F\u670D\u52A1";
    EIndustries["\u751F\u7269\u5DE5\u7A0B"] = "\u751F\u7269\u5DE5\u7A0B";
    EIndustries["\u533B\u836F\u5236\u9020"] = "\u533B\u836F\u5236\u9020";
    EIndustries["\u533B\u7597\u68C0\u6D4B"] = "\u533B\u7597\u68C0\u6D4B";
    EIndustries["IVD"] = "IVD";
    EIndustries["\u533B\u7F8E/\u5065\u5EB7\u670D\u52A1"] = "\u533B\u7F8E/\u5065\u5EB7\u670D\u52A1";
    EIndustries["\u6279\u53D1/\u96F6\u552E/\u8D38\u6613"] = "\u6279\u53D1/\u96F6\u552E/\u8D38\u6613";
    EIndustries["\u5FEB\u901F\u6D88\u8D39\u54C1"] = "\u5FEB\u901F\u6D88\u8D39\u54C1";
    EIndustries["\u8010\u7528\u6D88\u8D39\u54C1"] = "\u8010\u7528\u6D88\u8D39\u54C1";
    EIndustries["\u96F6\u552E/\u6279\u53D1"] = "\u96F6\u552E/\u6279\u53D1";
    EIndustries["\u98DF\u54C1/\u996E\u6599"] = "\u98DF\u54C1/\u996E\u6599";
    EIndustries["\u70DF\u8349/\u9152\u4E1A"] = "\u70DF\u8349/\u9152\u4E1A";
    EIndustries["\u65E5\u5316"] = "\u65E5\u5316";
    EIndustries["\u670D\u88C5/\u7EBA\u7EC7/\u76AE\u9769"] = "\u670D\u88C5/\u7EBA\u7EC7/\u76AE\u9769";
    EIndustries["\u5962\u4F88\u54C1"] = "\u5962\u4F88\u54C1";
    EIndustries["\u73A9\u5177/\u793C\u54C1"] = "\u73A9\u5177/\u793C\u54C1";
    EIndustries["\u73E0\u5B9D/\u9996\u9970"] = "\u73E0\u5B9D/\u9996\u9970";
    EIndustries["\u529E\u516C\u7528\u54C1/\u8BBE\u5907"] = "\u529E\u516C\u7528\u54C1/\u8BBE\u5907";
    EIndustries["\u5DE5\u827A\u54C1/\u6536\u85CF\u54C1/\u827A\u672F\u54C1"] = "\u5DE5\u827A\u54C1/\u6536\u85CF\u54C1/\u827A\u672F\u54C1";
    EIndustries["\u5BB6\u5177/\u5BB6\u5C45/\u5BB6\u7535"] = "\u5BB6\u5177/\u5BB6\u5C45/\u5BB6\u7535";
    EIndustries["\u8D38\u6613/\u8FDB\u51FA\u53E3"] = "\u8D38\u6613/\u8FDB\u51FA\u53E3";
    EIndustries["\u5236\u9020\u4E1A"] = "\u5236\u9020\u4E1A";
    EIndustries["\u8239\u8236/\u822A\u7A7A/\u822A\u5929/\u706B\u8F66\u5236\u9020"] = "\u8239\u8236/\u822A\u7A7A/\u822A\u5929/\u706B\u8F66\u5236\u9020";
    EIndustries["\u7535\u6C14\u673A\u68B0/\u7535\u529B\u8BBE\u5907"] = "\u7535\u6C14\u673A\u68B0/\u7535\u529B\u8BBE\u5907";
    EIndustries["\u7535\u5B50\u8BBE\u5907\u5236\u9020"] = "\u7535\u5B50\u8BBE\u5907\u5236\u9020";
    EIndustries["\u673A\u5668\u4EBA"] = "\u673A\u5668\u4EBA";
    EIndustries["\u94A2\u94C1/\u6709\u8272\u91D1\u5C5E\u51B6\u70BC\u53CA\u52A0\u5DE5"] = "\u94A2\u94C1/\u6709\u8272\u91D1\u5C5E\u51B6\u70BC\u53CA\u52A0\u5DE5";
    EIndustries["\u4E13\u7528\u8BBE\u5907\u5236\u9020"] = "\u4E13\u7528\u8BBE\u5907\u5236\u9020";
    EIndustries["\u519B\u5DE5\u5236\u9020"] = "\u519B\u5DE5\u5236\u9020";
    EIndustries["\u91D1\u5C5E\u5236\u54C1\u4E1A"] = "\u91D1\u5C5E\u5236\u54C1\u4E1A";
    EIndustries["\u901A\u7528\u8BBE\u5907\u5236\u9020"] = "\u901A\u7528\u8BBE\u5907\u5236\u9020";
    EIndustries["\u4EEA\u5668\u4EEA\u8868\u5236\u9020"] = "\u4EEA\u5668\u4EEA\u8868\u5236\u9020";
    EIndustries["\u6469\u6258\u8F66/\u81EA\u884C\u8F66\u5236\u9020"] = "\u6469\u6258\u8F66/\u81EA\u884C\u8F66\u5236\u9020";
    EIndustries["\u975E\u91D1\u5C5E\u77FF\u7269\u5236\u54C1\u4E1A"] = "\u975E\u91D1\u5C5E\u77FF\u7269\u5236\u54C1\u4E1A";
    EIndustries["\u65B0\u6750\u6599"] = "\u65B0\u6750\u6599";
    EIndustries["\u5316\u5B66\u7EA4\u7EF4\u5236\u9020\u4E1A"] = "\u5316\u5B66\u7EA4\u7EF4\u5236\u9020\u4E1A";
    EIndustries["\u5316\u5B66\u539F\u6599/\u5316\u5B66\u5236\u54C1"] = "\u5316\u5B66\u539F\u6599/\u5316\u5B66\u5236\u54C1";
    EIndustries["\u65E5\u5316\u4EA7\u54C1\u5236\u9020"] = "\u65E5\u5316\u4EA7\u54C1\u5236\u9020";
    EIndustries["\u7EBA\u7EC7\u4E1A/\u670D\u9970\u4EA7\u54C1\u52A0\u5DE5\u5236\u9020"] = "\u7EBA\u7EC7\u4E1A/\u670D\u9970\u4EA7\u54C1\u52A0\u5DE5\u5236\u9020";
    EIndustries["\u519C\u526F\u4EA7\u54C1\u52A0\u5DE5\u5236\u9020"] = "\u519C\u526F\u4EA7\u54C1\u52A0\u5DE5\u5236\u9020";
    EIndustries["\u71C3\u6599\u8D44\u6E90\u52A0\u5DE5\u5236\u9020"] = "\u71C3\u6599\u8D44\u6E90\u52A0\u5DE5\u5236\u9020";
    EIndustries["\u6A61\u80F6\u548C\u5851\u6599\u5236\u54C1"] = "\u6A61\u80F6\u548C\u5851\u6599\u5236\u54C1";
    EIndustries["\u6587\u4F53/\u529E\u516C\u8BBE\u5907\u5236\u9020"] = "\u6587\u4F53/\u529E\u516C\u8BBE\u5907\u5236\u9020";
    EIndustries["\u5BB6\u5177\u5236\u9020"] = "\u5BB6\u5177\u5236\u9020";
    EIndustries["\u5370\u5237/\u5305\u88C5/\u9020\u7EB8"] = "\u5370\u5237/\u5305\u88C5/\u9020\u7EB8";
    EIndustries["\u5DE5\u4E1A\u81EA\u52A8\u5316"] = "\u5DE5\u4E1A\u81EA\u52A8\u5316";
    EIndustries["\u6C7D\u8F66"] = "\u6C7D\u8F66";
    EIndustries["\u6C7D\u8F66\u7814\u53D1/\u5236\u9020"] = "\u6C7D\u8F66\u7814\u53D1/\u5236\u9020";
    EIndustries["\u65B0\u80FD\u6E90\u6C7D\u8F66"] = "\u65B0\u80FD\u6E90\u6C7D\u8F66";
    EIndustries["\u6C7D\u8F66\u667A\u80FD\u4E92\u8054"] = "\u6C7D\u8F66\u667A\u80FD\u4E92\u8054";
    EIndustries["\u6C7D\u8F66\u96F6\u90E8\u4EF6"] = "\u6C7D\u8F66\u96F6\u90E8\u4EF6";
    EIndustries["\u6C7D\u8F664S\u5E97/\u7ECF\u9500\u5546"] = "\u6C7D\u8F664S\u5E97/\u7ECF\u9500\u5546";
    EIndustries["\u6C7D\u8F66\u540E\u5E02\u573A"] = "\u6C7D\u8F66\u540E\u5E02\u573A";
    EIndustries["\u4EA4\u901A\u8FD0\u8F93/\u4ED3\u50A8/\u7269\u6D41"] = "\u4EA4\u901A\u8FD0\u8F93/\u4ED3\u50A8/\u7269\u6D41";
    EIndustries["\u706B\u8F66\u7AD9/\u6E2F\u53E3/\u6C7D\u8F66\u7AD9/\u8DEF\u653F"] = "\u706B\u8F66\u7AD9/\u6E2F\u53E3/\u6C7D\u8F66\u7AD9/\u8DEF\u653F";
    EIndustries["\u5BA2\u8FD0\u670D\u52A1"] = "\u5BA2\u8FD0\u670D\u52A1";
    EIndustries["\u8D27\u8FD0/\u7269\u6D41/\u4ED3\u50A8"] = "\u8D27\u8FD0/\u7269\u6D41/\u4ED3\u50A8";
    EIndustries["\u90AE\u653F/\u5FEB\u9012"] = "\u90AE\u653F/\u5FEB\u9012";
    EIndustries["\u4E13\u4E1A\u670D\u52A1"] = "\u4E13\u4E1A\u670D\u52A1";
    EIndustries["\u6CD5\u5F8B\u670D\u52A1"] = "\u6CD5\u5F8B\u670D\u52A1";
    EIndustries["\u54A8\u8BE2\u670D\u52A1"] = "\u54A8\u8BE2\u670D\u52A1";
    EIndustries["\u7FFB\u8BD1\u670D\u52A1"] = "\u7FFB\u8BD1\u670D\u52A1";
    EIndustries["\u4EBA\u529B\u8D44\u6E90\u670D\u52A1"] = "\u4EBA\u529B\u8D44\u6E90\u670D\u52A1";
    EIndustries["\u8D22\u52A1/\u5BA1\u8BA1/\u7A0E\u52A1"] = "\u8D22\u52A1/\u5BA1\u8BA1/\u7A0E\u52A1";
    EIndustries["\u5DE5\u7A0B\u6280\u672F\u4E0E\u8BBE\u8BA1\u670D\u52A1"] = "\u5DE5\u7A0B\u6280\u672F\u4E0E\u8BBE\u8BA1\u670D\u52A1";
    EIndustries["\u68C0\u6D4B/\u8BA4\u8BC1"] = "\u68C0\u6D4B/\u8BA4\u8BC1";
    EIndustries["\u666F\u533A/\u5546\u4E1A/\u5E02\u573A\u7B49\u7EFC\u5408\u7BA1\u7406"] = "\u666F\u533A/\u5546\u4E1A/\u5E02\u573A\u7B49\u7EFC\u5408\u7BA1\u7406";
    EIndustries["\u5546\u4E1A\u4EE3\u7406\u670D\u52A1"] = "\u5546\u4E1A\u4EE3\u7406\u670D\u52A1";
    EIndustries["\u4E13\u5229/\u5546\u6807/\u77E5\u8BC6\u4EA7\u6743"] = "\u4E13\u5229/\u5546\u6807/\u77E5\u8BC6\u4EA7\u6743";
    EIndustries["\u79DF\u8D41\u670D\u52A1"] = "\u79DF\u8D41\u670D\u52A1";
    EIndustries["\u4E13\u4E1A\u6280\u672F\u670D\u52A1"] = "\u4E13\u4E1A\u6280\u672F\u670D\u52A1";
    EIndustries["\u751F\u6D3B\u670D\u52A1"] = "\u751F\u6D3B\u670D\u52A1";
    EIndustries["\u9910\u996E\u670D\u52A1"] = "\u9910\u996E\u670D\u52A1";
    EIndustries["\u9152\u5E97/\u6C11\u5BBF"] = "\u9152\u5E97/\u6C11\u5BBF";
    EIndustries["\u65C5\u6E38\u670D\u52A1"] = "\u65C5\u6E38\u670D\u52A1";
    EIndustries["\u5A5A\u5E86/\u6444\u5F71"] = "\u5A5A\u5E86/\u6444\u5F71";
    EIndustries["\u7F8E\u53D1/\u7F8E\u5BB9/\u4FDD\u5065"] = "\u7F8E\u53D1/\u7F8E\u5BB9/\u4FDD\u5065";
    EIndustries["\u5BA0\u7269\u670D\u52A1"] = "\u5BA0\u7269\u670D\u52A1";
    EIndustries["\u5BB6\u653F\u670D\u52A1"] = "\u5BB6\u653F\u670D\u52A1";
    EIndustries["\u56DE\u6536/\u7EF4\u4FEE"] = "\u56DE\u6536/\u7EF4\u4FEE";
    EIndustries["\u4F11\u95F2/\u5A31\u4E50"] = "\u4F11\u95F2/\u5A31\u4E50";
    EIndustries["\u642C\u5BB6/\u751F\u6D3B\u914D\u9001"] = "\u642C\u5BB6/\u751F\u6D3B\u914D\u9001";
    EIndustries["\u5C45\u6C11\u670D\u52A1"] = "\u5C45\u6C11\u670D\u52A1";
    EIndustries["\u80FD\u6E90/\u73AF\u4FDD/\u77FF\u4EA7"] = "\u80FD\u6E90/\u73AF\u4FDD/\u77FF\u4EA7";
    EIndustries["\u77F3\u6CB9/\u77F3\u5316"] = "\u77F3\u6CB9/\u77F3\u5316";
    EIndustries["\u5316\u5DE5"] = "\u5316\u5DE5";
    EIndustries["\u7535\u529B/\u6C34\u5229/\u70ED\u529B/\u71C3\u6C14"] = "\u7535\u529B/\u6C34\u5229/\u70ED\u529B/\u71C3\u6C14";
    EIndustries["\u65B0\u80FD\u6E90"] = "\u65B0\u80FD\u6E90";
    EIndustries["\u73AF\u4FDD"] = "\u73AF\u4FDD";
    EIndustries["\u77FF\u4EA7/\u91C7\u6398"] = "\u77FF\u4EA7/\u91C7\u6398";
    EIndustries["\u653F\u5E9C/\u975E\u76C8\u5229\u673A\u6784"] = "\u653F\u5E9C/\u975E\u76C8\u5229\u673A\u6784";
    EIndustries["\u653F\u5E9C/\u516C\u5171\u4E8B\u4E1A"] = "\u653F\u5E9C/\u516C\u5171\u4E8B\u4E1A";
    EIndustries["\u793E\u56E2/\u7EC4\u7EC7/\u793E\u4F1A\u4FDD\u969C"] = "\u793E\u56E2/\u7EC4\u7EC7/\u793E\u4F1A\u4FDD\u969C";
    EIndustries["\u517B\u8001/\u5B64\u513F/\u770B\u62A4"] = "\u517B\u8001/\u5B64\u513F/\u770B\u62A4";
    EIndustries["\u519C/\u6797/\u7267/\u6E14"] = "\u519C/\u6797/\u7267/\u6E14";
})(EIndustries || (EIndustries = {}));
export const jobTypes = allJobTypes;
// export const salaryTypes = {
//   "0000-4000": "0000,4000",
//   "4000-6000": "4001,6000",
//   "6000-8000": "6001,8000",
//   "8000-10000": "8001,10000",
//   "10000-15000": "10001,15000",
//   "15000-25000": "15001,25000",
//   "25000-35000": "25001,35000",
//   "35000-50000": "35001,50000",
//   "50000以上": "50001,9999999",
// };
export const salaryTypes = [
    "0000,4000",
    "4001,6000",
    "6001,8000",
    "8001,10000",
    "10001,15000",
    "15001,25000",
    "25001,35000",
    "35001,50000",
    "50001,9999999",
];
export var ESalaryType;
(function (ESalaryType) {
    ESalaryType["\u4E0D\u9650"] = "\u4E0D\u9650";
    ESalaryType["0000-4000"] = "0000-4000";
    ESalaryType["4000-6000"] = "4000-6000";
    ESalaryType["6000-8000"] = "6000-8000";
    ESalaryType["8000-10000"] = "8000-10000";
    ESalaryType["10000-15000"] = "10000-15000";
    ESalaryType["15000-25000"] = "15000-25000";
    ESalaryType["25000-35000"] = "25000-35000";
    ESalaryType["35000-50000"] = "35000-50000";
    ESalaryType["50000\u4EE5\u4E0A"] = "50000\u4EE5\u4E0A";
})(ESalaryType || (ESalaryType = {}));
export const ETimeTypeReverse = {
    "今日": "today",
    "昨日": "yesterday",
    "前天": "beforeYesterday",
    "本周": "week",
    "上周": "lastWeek",
    "上上周": "beforeLastWeek",
    "本月": "month",
    "上个月": "lastMonth",
    "上上个月": "beforeLastMonth",
    "本季度": "quarter",
    "上季度": "lastQuarter",
    "上上季度": "beforeLastQuarter",
    "本年": "year",
    "去年": "lastYear",
    "前年": "beforeLastYear",
    "本周一": "monday",
    "本周二": "tuesday",
    "本周三": "wednesday",
    "本周四": "thursday",
    "本周五": "friday",
    "本周六": "saturday",
    "本周日": "sunday",
    "最近1周": "last1Weeks",
    "最近2周": "last2Weeks",
    "最近3周": "last3Weeks",
    "最近4周": "last4Weeks",
    "最近5周": "last5Weeks",
    "最近6周": "last6Weeks",
    "最近7周": "last7Weeks",
    "最近8周": "last8Weeks",
    "最近9周": "last9Weeks",
    "最近10周": "last10Weeks",
    "最近11周": "last11Weeks",
    "最近12周": "last12Weeks",
    "最近13周": "last13Weeks",
    "最近14周": "last14Weeks",
    "最近15周": "last15Weeks",
    "最近16周": "last16Weeks",
    "最近17周": "last17Weeks",
    "最近18周": "last18Weeks",
    "最近19周": "last19Weeks",
    "最近20周": "last20Weeks",
    "最近1个月": "last1Months",
    "最近2个月": "last2Months",
    "最近3个月": "last3Months",
    "最近4个月": "last4Months",
    "最近5个月": "last5Months",
    "最近6个月": "last6Months",
    "最近7个月": "last7Months",
    "最近8个月": "last8Months",
    "最近9个月": "last9Months",
    "最近10个月": "last10Months",
    "最近11个月": "last11Months",
    "最近12个月": "last12Months",
    "最近13个月": "last13Months",
    "最近14个月": "last14Months",
    "最近15个月": "last15Months",
    "最近16个月": "last16Months",
    "最近17个月": "last17Months",
    "最近18个月": "last18Months",
    "最近19个月": "last19Months",
    "最近20个月": "last20Months",
    "最近1年": "last1Year",
    "最近2年": "last2Years",
    "最近3年": "last3Years",
    "最近4年": "last4Years",
    "最近5年": "last5Years",
    "最近6年": "last6Years",
    "最近7年": "last7Years",
    "最近8年": "last8Years",
    "最近9年": "last9Years",
    "最近10年": "last10Years",
    "最近2天": "last2Days",
    "最近3天": "last3Days",
    "最近4天": "last4Days",
    "最近5天": "last5Days",
    "最近6天": "last6Days",
    "最近7天": "last7Days",
    "最近8天": "last8Days",
    "最近9天": "last9Days",
    "最近10天": "last10Days",
    "最近11天": "last11Days",
    "最近12天": "last12Days",
    "最近13天": "last13Days",
    "最近14天": "last14Days",
    "最近15天": "last15Days",
    "最近16天": "last16Days",
    "最近17天": "last17Days",
    "最近18天": "last18Days",
    "最近19天": "last19Days",
    "最近20天": "last20Days",
    "最近21天": "last21Days",
    "最近22天": "last22Days",
    "最近23天": "last23Days",
    "最近24天": "last24Days",
    "最近25天": "last25Days",
    "最近26天": "last26Days",
    "最近27天": "last27Days",
    "最近28天": "last28Days",
    "最近29天": "last29Days",
    "最近30天": "last30Days",
    "最近31天": "last31Days",
};
