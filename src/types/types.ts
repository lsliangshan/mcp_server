import allJobTypes from "../data/job_types.json" with { type: "json" };
import allIndustries from "../data/industries.json" with { type: "json" };
// import allSubways from '../data/subways.json' with { type: "json" };
// import allSubwayStations from '../data/subway_stations.json' with { type: "json" };

export enum Urls {
  zhaopin = "https://fe-api.zhaopin.com",
  zhaopin_m = "https://m.zhaopin.com",
}

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

export interface LoginStatus {
  at?: string;
  rt?: string;
}

export interface GetResumeDetailOptions extends LoginStatus {
  resumeNumber: string;
  lang?: "1";
}

export interface GetResumeNumberOptions extends LoginStatus {
}

export interface GetJobDeliveredOptions extends LoginStatus {
  type: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface GetJobDeliveredDetailOptions extends LoginStatus {
  jobId: string;
  resumeId: string;
}

export interface SearchPositionsOptions extends LoginStatus {
  /// 职位或公司名称
  S_SOU_FULL_INDEX?: string;
  /// 职位类别
  S_SOU_JD_JOB_LEVEL3?: string;
  /// 公司行业
  S_SOU_JD_INDUSTRY_LEVEL?: string;
  /// 工作地点
  S_SOU_WORK_CITY?: string;
  /// 地铁沿线
  S_SOU_SUBWAY_LINE?: string;
  /// 地铁站
  S_SOU_SUBWAY_STATION?: string;
  /// 坐标
  S_SOU_COORDINATE?: string;
  /// 薪资范围
  S_SOU_SALARY?: string;
  /// 学历要求
  S_SOU_EDUCATION_LOWESTLEVEL?: string;
  /// 工作经验
  S_SOU_WORK_EXPERIENCE?: string;
  /// 职位类型
  S_SOU_POSITION_TYPE?: string;
  /// 公司性质
  S_SOU_COMPANY_TYPE?: string;
  /// 公司规模
  S_SOU_COMPANY_SCALE?: string;
  cvNumber?: string;
  order?: number;
  anonymous?: number;
  eventScenario?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface DeliveryPositionsOptions extends LoginStatus {
  /// 职位编号
  positionNumbers: string;
  /// 城市编号
  cityIds?: string;
  /// 简历编号
  resumeNumber?: string;
}

export interface BeforeDeliveryPositionsOptions extends LoginStatus {
  /// 职位编号
  jobCount: number;
  /// 是否显示附件选择
  isShowAttachmentSelect?: boolean;
  /// 投递动作ID
  actionId?: string;
  /// 根组织ID
  rootOrgId?: string | number;
  /// 员工ID
  staffId?: string | number;
}

export interface GetPositionDetailOptions extends LoginStatus {
  /// 职位编号
  number: string;
  /// 简历编号
  cvNumber: string;
}

export interface GetPositionDetailBatchOptions extends LoginStatus {
  /// 职位编号
  numbers: string[];
  /// 简历编号
  cvNumber: string;
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

export const jobDeliveredStatus: { [key: string]: string } = {
  "1": "已投递",
  "10": "被查看",
  "22": "有意向",
  "356": "邀面试",
  "4": "不合适",
}

export enum JobDeliveredStatus {
  "全部" = "0",
  "被查看" = "10",
  "有意向" = "22",
  "邀面试" = "356",
  "不合适" = "4",
}

export enum JobDeliveredSubStatus {
  "全部" = "all",
  "待确认" = "toBeComfirm",
  "已接受" = "accepted",
  "已拒绝" = "refused",
}

export enum JobSearchCondition {
  "职位或公司名称" = "keyword",
  "职位类别" = "jobType",
  "排序" = "order",
  "公司行业" = "industry",
  "工作地点" = "workLocation",
  "地铁沿线" = "subway",
  "地铁站" = "subwayStation",
  "坐标" = "coordinate",
  "薪资范围" = "salaryType",
  "学历要求" = "educationType",
  "工作经验" = "workExpType",
  "职位类型" = "jobStatus",
  "公司性质" = "companyType",
  "公司规模" = "companySize",
}

export enum JobSearchConditionReverse {
  "keyword" = "职位或公司名称",
  "jobType" = "职位类别",
  "order" = "排序",
  "industry" = "公司行业",
  "workLocation" = "工作地点",
  "subway" = "地铁沿线",
  "subwayStation" = "地铁站",
  "coordinate" = "坐标",
  "salaryType" = "薪资范围",
  "educationType" = "学历要求",
  "workExpType" = "工作经验",
  "jobStatus" = "职位类型",
  "companyType" = "公司性质",
  "companySize" = "公司规模",
}

export enum JobSearchConditionMap {
  "keyword" = "S_SOU_FULL_INDEX",
  "jobType" = "S_SOU_JD_JOB_LEVEL3",
  "order" = "order",
  "industry" = "S_SOU_JD_INDUSTRY_LEVEL", // "xxxx;xxxx"
  "workLocation" = "S_SOU_WORK_CITY",
  "subway" = "S_SOU_SUBWAY_LINE",
  "subwayStation" = "S_SOU_SUBWAY_STATION",
  "coordinate" = "S_SOU_COORDINATE", // "latitude;longitude"
  "salaryType" = "S_SOU_SALARY", // "MIN_SALARY,MAX_SALARY"
  "educationType" = "S_SOU_EDUCATION_LOWESTLEVEL",
  "workExpType" = "S_SOU_WORK_EXPERIENCE",
  "jobStatus" = "S_SOU_POSITION_TYPE",
  "companyType" = "S_SOU_COMPANY_TYPE",
  "companySize" = "S_SOU_COMPANY_SCALE",
}

export const orders = {
  "智能匹配": 11,
  "薪酬最高": 2,
  "最新发布": 4,
}

export enum EOrder {
  "智能匹配" = "智能匹配",
  "薪酬最高" = "薪酬最高",
  "最新发布" = "最新发布",
}

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

export enum EProvinces {
  "安徽" = "安徽",
  "福建" = "福建",
  "甘肃" = "甘肃",
  "广东" = "广东",
  "广西" = "广西",
  "贵州" = "贵州",
  "海南" = "海南",
  "河北" = "河北",
  "黑龙江" = "黑龙江",
  "河南" = "河南",
  "湖北" = "湖北",
  "湖南" = "湖南",
  "江苏" = "江苏",
  "江西" = "江西",
  "吉林" = "吉林",
  "辽宁" = "辽宁",
  "内蒙古" = "内蒙古",
  "宁夏" = "宁夏",
  "青海" = "青海",
  "山东" = "山东",
  "陕西" = "陕西",
  "山西" = "山西",
  "四川" = "四川",
  "新疆" = "新疆",
  "西藏" = "西藏",
  "云南" = "云南",
  "浙江" = "浙江",
}

// export const industries = '互联网/IT/电子/通信;电子商务;企业服务;人工智能;智能硬件;在线教育;在线医疗;新媒体;物联网;新零售;区块链;游戏;社交网络;在线招聘/求职;云计算/大数据;网络/信息安全;在线生活服务（O2O）;在线音乐/视频/阅读;互联网;IT服务;计算机软件;计算机硬件;通信/网络设备;运营商/增值服务;电子/半导体/集成电路;消费电子产品;光电子行业;房地产/建筑;房地产开发;土地与公共设施管理;房地产中介;物业管理;建筑设计;工程施工;建筑设备安装;装饰装修;建材;建筑工程检测;金融业;银行;保险;基金;信托;证券/期货;投资/融资;汽车金融;互联网金融/小额贷款;租赁/拍卖/典当/担保;教育培训/科研;培训/辅导服务;学校/学历教育;学术/科研;科学技术推广;广告/传媒/文化/体育;广告/营销;广播/影视;会议/展览;文化艺术/娱乐;体育;新闻/出版;生物医药/医疗;医院;卫生服务;生物工程;医药制造;医疗检测;医药批发/零售;医疗设备/器械;IVD;医美/健康服务;批发/零售/贸易;快速消费品;耐用消费品;零售/批发;食品/饮料;烟草/酒业;日化;服装/纺织/皮革;奢侈品;玩具/礼品;珠宝/首饰;办公用品/设备;工艺品/收藏品/艺术品;家具/家居/家电;贸易/进出口;制造业;船舶/航空/航天/火车制造;电气机械/电力设备;电子设备制造;机器人;钢铁/有色金属冶炼及加工;专用设备制造;军工制造;金属制品业;通用设备制造;仪器仪表制造;摩托车/自行车制造;非金属矿物制品业;新材料;化学纤维制造业;化学原料/化学制品;日化产品制造;纺织业/服饰产品加工制造;农副产品加工制造;燃料资源加工制造;橡胶和塑料制品;文体/办公设备制造;家具制造;印刷/包装/造纸;工业自动化;汽车;汽车研发/制造;新能源汽车;汽车智能互联;汽车零部件;汽车4S店/经销商;汽车后市场;交通运输/仓储/物流;火车站/港口/汽车站/路政;客运服务;货运/物流/仓储;邮政/快递;专业服务;法律服务;咨询服务;翻译服务;人力资源服务;财务/审计/税务;工程技术与设计服务;检测/认证;景区/商业/市场等综合管理;商业代理服务;专利/商标/知识产权;租赁服务;专业技术服务;生活服务;餐饮服务;酒店/民宿;旅游服务;婚庆/摄影;美发/美容/保健;宠物服务;家政服务;回收/维修;休闲/娱乐;搬家/生活配送;居民服务;能源/环保/矿产;石油/石化;化工;电力/水利/热力/燃气;新能源;环保;矿产/采掘;政府/非盈利机构;政府/公共事业;社团/组织/社会保障;养老/孤儿/看护;农/林/牧/渔;农/林/牧/渔'

export const industries = allIndustries;

export enum EIndustries {
  "互联网/IT/电子/通信" = "互联网/IT/电子/通信",
  "电子商务" = "电子商务",
  "企业服务" = "企业服务",
  "人工智能" = "人工智能",
  "智能硬件" = "智能硬件",
  "在线教育" = "在线教育",
  "在线医疗" = "在线医疗",
  "新媒体" = "新媒体",
  "物联网" = "物联网",
  "新零售" = "新零售",
  "区块链" = "区块链",
  "游戏" = "游戏",
  "社交网络" = "社交网络",
  "在线招聘/求职" = "在线招聘/求职",
  "云计算/大数据" = "云计算/大数据",
  "网络/信息安全" = "网络/信息安全",
  "在线生活服务（O2O）" = "在线生活服务（O2O）",
  "在线音乐/视频/阅读" = "在线音乐/视频/阅读",
  "互联网" = "互联网",
  "IT服务" = "IT服务",
  "计算机软件" = "计算机软件",
  "计算机硬件" = "计算机硬件",
  "通信/网络设备" = "通信/网络设备",
  "运营商/增值服务" = "运营商/增值服务",
  "电子/半导体/集成电路" = "电子/半导体/集成电路",
  "消费电子产品" = "消费电子产品",
  "光电子行业" = "光电子行业",
  "房地产/建筑" = "房地产/建筑",
  "房地产开发" = "房地产开发",
  "土地与公共设施管理" = "土地与公共设施管理",
  "房地产中介" = "房地产中介",
  "物业管理" = "物业管理",
  "建筑设计" = "建筑设计",
  "工程施工" = "工程施工",
  "建筑设备安装" = "建筑设备安装",
  "装饰装修" = "装饰装修",
  "建材" = "建材",
  "建筑工程检测" = "建筑工程检测",
  "金融业" = "金融业",
  "银行" = "银行",
  "保险" = "保险",
  "基金" = "基金",
  "信托" = "信托",
  "证券/期货" = "证券/期货",
  "投资/融资" = "投资/融资",
  "汽车金融" = "汽车金融",
  "互联网金融/小额贷款" = "互联网金融/小额贷款",
  "租赁/拍卖/典当/担保" = "租赁/拍卖/典当/担保",
  "教育培训/科研" = "教育培训/科研",
  "培训/辅导服务" = "培训/辅导服务",
  "学校/学历教育" = "学校/学历教育",
  "学术/科研" = "学术/科研",
  "科学技术推广" = "科学技术推广",
  "广告/传媒/文化/体育" = "广告/传媒/文化/体育",
  "广告/营销" = "广告/营销",
  "广播/影视" = "广播/影视",
  "会议/展览" = "会议/展览",
  "文化艺术/娱乐" = "文化艺术/娱乐",
  "体育" = "体育",
  "新闻/出版" = "新闻/出版",
  "生物医药/医疗" = "生物医药/医疗",
  "医院" = "医院",
  "卫生服务" = "卫生服务",
  "生物工程" = "生物工程",
  "医药制造" = "医药制造",
  "医疗检测" = "医疗检测",
  "IVD" = "IVD",
  "医美/健康服务" = "医美/健康服务",
  "批发/零售/贸易" = "批发/零售/贸易",
  "快速消费品" = "快速消费品",
  "耐用消费品" = "耐用消费品",
  "零售/批发" = "零售/批发",
  "食品/饮料" = "食品/饮料",
  "烟草/酒业" = "烟草/酒业",
  "日化" = "日化",
  "服装/纺织/皮革" = "服装/纺织/皮革",
  "奢侈品" = "奢侈品",
  "玩具/礼品" = "玩具/礼品",
  "珠宝/首饰" = "珠宝/首饰",
  "办公用品/设备" = "办公用品/设备",
  "工艺品/收藏品/艺术品" = "工艺品/收藏品/艺术品",
  "家具/家居/家电" = "家具/家居/家电",
  "贸易/进出口" = "贸易/进出口",
  "制造业" = "制造业",
  "船舶/航空/航天/火车制造" = "船舶/航空/航天/火车制造",
  "电气机械/电力设备" = "电气机械/电力设备",
  "电子设备制造" = "电子设备制造",
  "机器人" = "机器人",
  "钢铁/有色金属冶炼及加工" = "钢铁/有色金属冶炼及加工",
  "专用设备制造" = "专用设备制造",
  "军工制造" = "军工制造",
  "金属制品业" = "金属制品业",
  "通用设备制造" = "通用设备制造",
  "仪器仪表制造" = "仪器仪表制造",
  "摩托车/自行车制造" = "摩托车/自行车制造",
  "非金属矿物制品业" = "非金属矿物制品业",
  "新材料" = "新材料",
  "化学纤维制造业" = "化学纤维制造业",
  "化学原料/化学制品" = "化学原料/化学制品",
  "日化产品制造" = "日化产品制造",
  "纺织业/服饰产品加工制造" = "纺织业/服饰产品加工制造",
  "农副产品加工制造" = "农副产品加工制造",
  "燃料资源加工制造" = "燃料资源加工制造",
  "橡胶和塑料制品" = "橡胶和塑料制品",
  "文体/办公设备制造" = "文体/办公设备制造",
  "家具制造" = "家具制造",
  "印刷/包装/造纸" = "印刷/包装/造纸",
  "工业自动化" = "工业自动化",
  "汽车" = "汽车",
  "汽车研发/制造" = "汽车研发/制造",
  "新能源汽车" = "新能源汽车",
  "汽车智能互联" = "汽车智能互联",
  "汽车零部件" = "汽车零部件",
  "汽车4S店/经销商" = "汽车4S店/经销商",
  "汽车后市场" = "汽车后市场",
  "交通运输/仓储/物流" = "交通运输/仓储/物流",
  "火车站/港口/汽车站/路政" = "火车站/港口/汽车站/路政",
  "客运服务" = "客运服务",
  "货运/物流/仓储" = "货运/物流/仓储",
  "邮政/快递" = "邮政/快递",
  "专业服务" = "专业服务",
  "法律服务" = "法律服务",
  "咨询服务" = "咨询服务",
  "翻译服务" = "翻译服务",
  "人力资源服务" = "人力资源服务",
  "财务/审计/税务" = "财务/审计/税务",
  "工程技术与设计服务" = "工程技术与设计服务",
  "检测/认证" = "检测/认证",
  "景区/商业/市场等综合管理" = "景区/商业/市场等综合管理",
  "商业代理服务" = "商业代理服务",
  "专利/商标/知识产权" = "专利/商标/知识产权",
  "租赁服务" = "租赁服务",
  "专业技术服务" = "专业技术服务",
  "生活服务" = "生活服务",
  "餐饮服务" = "餐饮服务",
  "酒店/民宿" = "酒店/民宿",
  "旅游服务" = "旅游服务",
  "婚庆/摄影" = "婚庆/摄影",
  "美发/美容/保健" = "美发/美容/保健",
  "宠物服务" = "宠物服务",
  "家政服务" = "家政服务",
  "回收/维修" = "回收/维修",
  "休闲/娱乐" = "休闲/娱乐",
  "搬家/生活配送" = "搬家/生活配送",
  "居民服务" = "居民服务",
  "能源/环保/矿产" = "能源/环保/矿产",
  "石油/石化" = "石油/石化",
  "化工" = "化工",
  "电力/水利/热力/燃气" = "电力/水利/热力/燃气",
  "新能源" = "新能源",
  "环保" = "环保",
  "矿产/采掘" = "矿产/采掘",
  "政府/非盈利机构" = "政府/非盈利机构",
  "政府/公共事业" = "政府/公共事业",
  "社团/组织/社会保障" = "社团/组织/社会保障",
  "养老/孤儿/看护" = "养老/孤儿/看护",
  "农/林/牧/渔" = "农/林/牧/渔",
}

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

export enum ESalaryType {
  "不限" = "不限",
  "0000-4000" = "0000-4000",
  "4000-6000" = "4000-6000",
  "6000-8000" = "6000-8000",
  "8000-10000" = "8000-10000",
  "10000-15000" = "10000-15000",
  "15000-25000" = "15000-25000",
  "25000-35000" = "25000-35000",
  "35000-50000" = "35000-50000",
  "50000以上" = "50000以上",
}

export enum ETimeType {
  "today" = "今日",
  "yesterday" = "昨日",
  "week" = "本周",
  "lastWeek" = "上周",
  "month" = "本月",
  "lastMonth" = "上月",
  "quarter" = "本季度",
  "lastQuarter" = "上季度",
  "year" = "本年",
  "lastYear" = "去年",
  "last2Days" = "最近2天",
  "last3Days" = "最近3天",
  "last4Days" = "最近4天",
  "last5Days" = "最近5天",
  "last6Days" = "最近6天",
  "last7Days" = "最近7天",
  "last8Days" = "最近8天",
  "last9Days" = "最近9天",
  "last10Days" = "最近10天",
  "last11Days" = "最近11天",
  "last12Days" = "最近12天",
  "last2Month" = "最近2个月",
  "last3Month" = "最近3个月",
  "last4Month" = "最近4个月",
  "last5Month" = "最近5个月",
  "last6Month" = "最近6个月",
  "last7Month" = "最近7个月",
  "last8Month" = "最近8个月",
  "last9Month" = "最近9个月",
  "last10Month" = "最近10个月",
  "last11Month" = "最近11个月",
  "last12Month" = "最近12个月",
}

export enum ETimeTypeReverse {
  "今日" = "today",
  "昨日" = "yesterday",
  "前天" = "beforeYesterday",
  "本周" = "week",
  "上周" = "lastWeek",
  "上上周" = "beforeLastWeek",
  "本月" = "month",
  "上月" = "lastMonth",
  "本季度" = "quarter",
  "上季度" = "lastQuarter",
  "本年" = "year",
  "去年" = "lastYear",
  "最近2天" = "last2Days",
  "最近3天" = "last3Days",
  "最近4天" = "last4Days",
  "最近5天" = "last5Days",
  "最近6天" = "last6Days",
  "最近7天" = "last7Days",
  "最近8天" = "last8Days",
  "最近9天" = "last9Days",
  "最近10天" = "last10Days",
  "最近11天" = "last11Days",
  "最近12天" = "last12Days",
  "最近13天" = "last13Days",
  "最近14天" = "last14Days",
  "最近15天" = "last15Days",
  "最近16天" = "last16Days",
  "最近17天" = "last17Days",
  "最近18天" = "last18Days",
  "最近19天" = "last19Days",
  "最近20天" = "last20Days",
  "最近21天" = "last21Days",
  "最近22天" = "last22Days",
  "最近23天" = "last23Days",
  "最近24天" = "last24Days",
  "最近25天" = "last25Days",
  "最近26天" = "last26Days",
  "最近27天" = "last27Days",
  "最近28天" = "last28Days",
  "最近29天" = "last29Days",
  "最近30天" = "last30Days",
  "最近31天" = "last31Days",
  
  "最近2个月" = "last2Month",
  "最近3个月" = "last3Month",
  "最近4个月" = "last4Month",
  "最近5个月" = "last5Month",
  "最近6个月" = "last6Month",
  "最近7个月" = "last7Month",
  "最近8个月" = "last8Month",
  "最近9个月" = "last9Month",
  "最近10个月" = "last10Month",
  "最近11个月" = "last11Month",
  "最近12个月" = "last12Month",

  "其他" = "other",
};
export const ETimeTypeReverse2 = {
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

  "最近1周": "last1Week",
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
  "最近10年": "last10Years"
} as const;