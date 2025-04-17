import { FastMCP } from "fastmcp";
import { z } from "zod";
import {
  beforeDeliveryPositions,
  deliveryPositions,
  getJobDelivered,
  getPositionDetailBatch,
  getResumeDetail,
  getResumeNumber,
  searchPositions,
} from "../tools/zhaopin.js";
import {
  ECompanySize,
  JobDeliveredStatus,
  JobDeliveredSubStatus,
  EIndustries,
  EOrder,
} from "../types/types.js";
import { dateFormat } from "../tools/date.js";
import {
  formatMorePositionsUrl,
  formatRequestParams,
  formatResponsePositionsTemplate,
  formatSalary,
  getPositionRecommendationParams,
  getReponseTemplate,
  getWorkExpCodeByYear,
  jobTemplate,
  translateToPositions,
} from "../utils/zhaopin.js";
import { servers } from "../config/index.js";

const server = new FastMCP({
  name: servers.zhaopin.name,
  version: servers.zhaopin.version,
});

server.addTool({
  name: "getMyResumeInfo",
  description:
    "获取我的简历详情，包括个人信息、教育经历、工作/实习经历、项目经历、求职状态<for-assistant>用户需要推荐职位或工作时，不要调用此工具，请调用 recommendPositions 工具</for-assistant>",
  parameters: z.object({
    at: z.string().optional(),
    rt: z.string().optional(),
  }),
  execute: async (args) => {
    if (!args.at || args.at == "undefined") {
      delete args.at;
    }
    if (!args.rt || args.rt == "undefined") {
      delete args.rt;
    }

    const templates = getReponseTemplate();

    if (!args.at || !args.rt) {
      return {
        content: [
          {
            type: "text",
            text: `登录后才能投递职位。
            \n${templates.login}`,
          },
        ],
      };
    }

    const { resumeNumber } = await getResumeNumber({
      at: args.at,
      rt: args.rt,
    });

    if (!resumeNumber) {
      return {
        content: [
          {
            type: "text",
            text: "简历编号不能为空，提示用户检查是否登录，是否创建过简历",
          },
        ],
      };
    }

    const resumeDetail: any = await getResumeDetail({
      resumeNumber: resumeNumber,
      at: args.at,
      rt: args.rt,
      lang: "1",
    });

    if (
      resumeDetail.unifiedPurposes &&
      resumeDetail.unifiedPurposes.length > 0
    ) {
      return {
        content: [
          {
            type: "text",
            text: `姓名: ${resumeDetail.profile[0].name}
            \n性别: ${resumeDetail.profile[0].genderTranslation}
            \n当前身份: ${resumeDetail.profile[0].currentIdentityTranslation}
            \n出生日期: ${resumeDetail.profile[0].birthyear}年${
              resumeDetail.profile[0].birthmonth
            }月
            \n户口所在地: ${
              resumeDetail.profile[0].hukouProvinceIdTranslation
            }-${resumeDetail.profile[0].hukouCityIdTranslation}
            \n现居住地: ${resumeDetail.profile[0].currentProvinceTranslation}-${
              resumeDetail.profile[0].currentCityTranslation
            }-${resumeDetail.profile[0].currentCityDistrictIdTranslation}
            \n政治面貌: ${
              resumeDetail.profile[0].politicalAffiliationTranslation
            }
            \n最高学历: ${resumeDetail.profile[0].eduHighestLevelTranslationCn}
            \n手机号码: ${resumeDetail.profile[0].mobileBinding}
            \n电子邮箱: ${resumeDetail.profile[0].email || "未填写"}
            \n求职状态: ${
              resumeDetail.profile[0].currentStatusTranslationCN || "未填写"
            }
            \n求职意向: ${resumeDetail.unifiedPurposes
              .map(
                (item: any) =>
                  `期望行业: ${item.pnewPreferredIndustryTranslation} - 期望城市: ${item.preferredLocationTranslation} - 期望薪资: ${item.preferredSalaryMin}-${item.preferredSalaryMax} 元/月 - 期望工作性质: ${item.preferredJobNatureTranslation}`
              )
              .join("\n")}
            \n教育经历: ${resumeDetail.educationExperiences
              .map(
                (item: any) =>
                  `学校名称: ${item.eduSchoolName} - 学历: ${
                    item.eduBackgroundTranslation
                  } - 专业: ${item.eduMajorV} - 在校时间: ${dateFormat(
                    item.eduStartDate
                  )}至${
                    item.eduEndDate == 0 ? "至今" : dateFormat(item.eduEndDate)
                  }`
              )
              .join("\n")}
            \n工作/实习经历: ${resumeDetail.workExperience
              .map(
                (item: any) =>
                  `公司名称: ${item.companyName} - 所属行业: ${
                    item.wnewIndustryTranslation
                  } - 职位名称: ${item.title} - 拥有技能: ${item.skillTagList
                    .map((skill: any) => skill.name)
                    .join(",")} - 当前月薪: ${
                    item.realSalary
                  } 元/月 - 在职时间: ${dateFormat(
                    item.startDate
                  )} - 离职时间: ${
                    item.endDate == 0 ? "至今" : dateFormat(item.endDate)
                  } - 工作描述或内容: ${item.workDesc}`
              )
              .join("\n")}
            \n项目经历: ${resumeDetail.projectExperiences
              .map(
                (item: any) =>
                  `项目名称: ${
                    item.proExpProjectName
                  } - 项目开始时间: ${dateFormat(
                    item.proExpStartDate
                  )} - 项目结束时间 ${
                    item.proExpEndDate == 0
                      ? "至今"
                      : dateFormat(item.proExpEndDate)
                  } - 项目描述: ${item.proExpProjectDesc}`
              )
              .join("\n")}
            \n如果用户只想获取姓名，请只返回用户的姓名，不要返回其他内容。
            \n如果用户只想获取教育经历中的某一项，如教育经历中的学校名称，则只返回教育经历的学校名称，不要返回其他内容，并输出为表格形式。
            \n如果用户询问“是否在XX公司工作过”，则从所有工作/实习的公司名称中，查找是否包含XX公司，如果不包含，则返回“否”；如果包含，则只返回在XX公司的工作/实习经历，不返回其他公司的工作/实习经历，并输出为表格形式。
            \n如果用户只想获取某一份教育经历，或工作/实习经历，或项目经历，或求职意向，则只返回该份教育经历，或工作/实习经历，或项目经历，或求职意向，不要返回其他内容，并输出为表格形式。
            \n如果用户想获取所有教育经历的学校，或工作/实习经历的公司，或项目经历的项目，或求职意向的期望行业，则返回所有教育经历的学校，或工作/实习经历的公司，或项目经历的项目，或求职意向的期望行业，并输出为表格形式。
            \n用户询问简历相关问题时，要结合简历内容，结合用户的问题，给出最合适的回答。如：用户询问“我目前在哪家公司工作”时，要结合工作/实习经历中的在职和离职时间，及目前在职状态，给出最合适的回答。
            \n不要向用户推荐职位，只返回简历相关内容。
            \n表格使用 HTML 标签，直接使用 HTML 标签，不要封装成 Markdown 格式`,
          },
        ],
      };
    } else {
      return {
        content: [
          {
            type: "text",
            text: "获取简历详情失败，提示用户检查是否登录，是否创建过简历",
          },
        ],
      };
    }
  },
});

server.addTool({
  name: "getMyJobDelivered",
  description:
    "获取我的投递记录，包括投递成功、被查看、有意向、邀面试、不合适，以及邀面试的子状态: 全部、待确认、已接受、已拒绝<for-assistant>用户需要推荐职位或工作时，请调用 recommendPositions 工具</for-assistant>",
  parameters: z.object({
    at: z.string().optional(),
    rt: z.string().optional(),
    status: z.nativeEnum(JobDeliveredStatus).optional(),
    subStatus: z.nativeEnum(JobDeliveredSubStatus).optional(),
    // status: z.enum(['send', 'viewed', 'intersted', 'interviewed', 'unsuitable']).optional(),
    // subStatus: z.enum(['all', 'toBeComfirm', 'accepted', 'refused']).optional(),
    pageIndex: z.number().optional(),
    pageSize: z.number().optional(),
  }),
  execute: async (args) => {
    if (!args.at || args.at == "undefined") {
      delete args.at;
    }
    if (!args.rt || args.rt == "undefined") {
      delete args.rt;
    }

    const templates = getReponseTemplate();

    if (!args.at || !args.rt) {
      return {
        content: [
          {
            type: "text",
            text: `登录后才能投递职位。
            \n${templates.login}`,
          },
        ],
      };
    }

    const resumeDetail: any = await getJobDelivered({
      at: args.at,
      rt: args.rt,
      type: args.status || JobDeliveredStatus.全部,
      pageIndex: args.pageIndex || 1,
      pageSize: args.pageSize || 20,
    });

    if (resumeDetail.code == 200) {
      return {
        content: [
          {
            type: "text",
            text: `${
              resumeDetail.data.length < 1
                ? `没有查询到投递记录`
                : // `没有符合“当前搜索条件”和“用户的求职意向”的职位。建议修改条件或求职意向后重新查询。也可以使用搜索工具，搜索职位。如：搜索 “${args.keyword}” 相关职位。`
                  `JSON: ${JSON.stringify({
                    code: 200,
                    finally: true, // unmodify: true 表示不要修改模板
                    data: {
                      totalCount: resumeDetail.total,
                    },
                    message: `${formatResponsePositionsTemplate({
                      positionResponse: translateToPositions(
                        resumeDetail.data,
                        resumeDetail.total
                      ),
                      pageIndex: args.pageIndex || 1,
                      pageSize: args.pageSize || 20,
                      moreUrl: "https://i.zhaopin.com/schedule",
                      type: "delivery-list",
                    })}`,
                  })}`
            }`,
          },
        ],
      };
    } else {
      return {
        content: [
          {
            type: "text",
            text: "获取投递记录失败，提示用户检查是否登录",
          },
        ],
      };
    }
  },
});

server.addTool({
  name: "searchPositions",
  description:
    "<for-assistant>当用户需要推荐职位时，不要调用此工具，应该调用 recommendPositions 工具。</for-assistant>搜索职位。搜索条件包括：职位或公司名称、职位类别、公司行业、工作地点、地铁沿线、薪资范围、学历要求、工作经验、职位类型、公司性质、公司规模",
  parameters: z.object({
    at: z.string().optional(),
    rt: z.string().optional(),
    /// 搜索关键词，职位或公司名称
    keyword: z.string().optional().describe("搜索关键词，职位或公司名称"),
    /// 职位类别
    jobType: z.string().optional().describe("职位类别"),
    order: z
      .nativeEnum(EOrder)
      .optional()
      .default(EOrder.智能匹配)
      .describe("排序"),
    /// 公司行业
    industry: z
      .nativeEnum(EIndustries)
      .array()
      .optional()
      .describe("公司行业。"),
    subway: z
      .string()
      .optional()
      .describe(
        "地铁沿线、线路名称中不要带城市名，如：北京1号线，转换成'1号线'"
      ),
    subwayStation: z
      .string()
      .optional()
      .describe(
        "地铁站。地铁站名称中不要带城市名，如：北京大望路站，转换成'大望路'"
      ),
    /// 省份
    province: z
      .string()
      .optional()
      // .describe('省份。直辖市、自治区、特别行政区显示为市，不显示为省份'),
      .describe(
        "省份。直辖市、自治区、特别行政区显示为市，不显示为省份。\n名称标准化，如：湖南省转换成湖南，不要显示省字"
      ),
    /// 城市
    city: z
      .string()
      .optional()
      .describe(
        "城市。\n不要将区县显示在该字段。例如：北京的朝阳区，不要显示在该字段。\n名称标准化，如：长沙市转换成长沙，不要显示市字"
      ),
    /// 区县
    county: z.string().optional().describe("区县，例如：海淀区，芙蓉区"),
    /// 薪资范围
    salaryType: z
      .string()
      .optional()
      .describe(
        "薪资范围，格式为：MIN_SALARY,MAX_SALARY，例如：10000,20000。最低薪资为 0000，最高薪资为 9999999"
      ),
    /// 学历要求
    educationType: z
      .string()
      .optional()
      .describe(
        "学历要求，例如：初中及以下、高中、中专/中技、大专、本科、硕士、MBA/EMBA、博士"
      ),
    /// 工作经验
    workExpType: z
      .string()
      .optional()
      .describe(
        "工作经验，例如：无经验、1年以下、1-3年、3-5年、5-10年、10年以上"
      ),
    /// 职位类型
    jobStatus: z
      .string()
      .optional()
      .describe("职位类型，例如：全职、兼职/临时、实习、校园"),
    /// 公司性质
    companyType: z
      .string()
      .optional()
      .describe(
        "公司性质，例如：国企、外企、合资、民营、上市公司、股份制企业、事业单位、其他"
      ),
    /// 公司规模，可选值：20人以下、20-99人、100-299人、300-499人、500-999人、1000-9999人、10000人以上
    companySize: z
      .nativeEnum(ECompanySize)
      .optional()
      .describe(
        "公司规模，按序，优先选择第一个满足条件的公司规模，如 200人以上，应该选择 100-299人，不要选择 10000人以上或其他"
      ),
    /// 页码
    pageIndex: z.number().optional().default(1).describe("页码，默认1"),
    /// 每页条数
    pageSize: z.number().optional().default(20).describe("每页条数，默认20"),
  }),
  execute: async (args) => {
    if (!args.at || args.at == "undefined") {
      delete args.at;
    }
    if (!args.rt || args.rt == "undefined") {
      delete args.rt;
    }

    const templates = getReponseTemplate();

    if (!args.at || !args.rt) {
      return {
        content: [
          {
            type: "text",
            text: `登录后才能使用更加强大的搜索功能。
            \n${templates.login}`,
          },
        ],
      };
    }

    const { resumeNumber } = await getResumeNumber(
      args.at
        ? {
            at: args.at,
            rt: args.rt,
          }
        : {}
    );

    const params = formatRequestParams(args, resumeNumber);

    let cityAreaCode = "";
    let cityCode = "";
    if (params.cityAreaCode) {
      cityAreaCode = params.cityAreaCode;
      delete params.cityAreaCode;
    }
    if (params.cityCode) {
      cityCode = params.cityCode;
      delete params.cityCode;
    }

    params.S_SOU_SALARY = formatSalary(params.S_SOU_SALARY);

    const positionResponse: any = await searchPositions({
      ...params,
    });

    const moreUrl = formatMorePositionsUrl(params, cityCode, cityAreaCode);

    const recommendLoginTemplate = !args.at
      ? `\n登录后才能使用更加强大的搜索功能。每次都要返回登录的地址（<a href="https://passport.zhaopin.com/login?bkUrl=%2F%2Fi.zhaopin.com%2Fblank%3Fhttps%3A%2F%2Fwww.zhaopin.com%3FvalidateCampus%3D" target="_blank" class="primary-color">登录</a>）`
      : "";

    if (positionResponse.code == 200) {
      return {
        content: [
          {
            type: "text",
            text: `${JSON.stringify({
              code: 200,
              data: {
                totalCount: positionResponse.data.count,
                totalPage: Math.ceil(
                  positionResponse.data.count / args.pageSize
                ),
                pageIndex: args.pageIndex,
                pageSize: args.pageSize,
                list: positionResponse.data.list,
              },
            })}`,
          },
        ],
      };
      return {
        content: [
          {
            type: "text",
            text: `JSON: ${JSON.stringify({
              data: {
                data: formatResponsePositionsTemplate({
                  positionResponse,
                  pageIndex: args.pageIndex,
                  pageSize: args.pageSize,
                  moreUrl,
                  type: "card-list",
                }),
                totalCount: positionResponse.data.count,
                totalPage: Math.ceil(
                  positionResponse.data.count / args.pageSize
                ),
                pageIndex: args.pageIndex,
                pageSize: args.pageSize,
              },
              keepOriginal: true,
            })}`,
          },
        ],
      };
      return {
        content: [
          {
            type: "text",
            text: `${
              positionResponse.data.list.length < 1
                ? "提示用户，当前条件没有查询到职位，请修改条件后重新查询。"
                : `JSON: ${JSON.stringify({
                    code: 200,
                    finally: true, // unmodify: true 表示不要修改模板
                    data: {
                      totalCount: positionResponse.data.count,
                      isEndPage: positionResponse.data.isEndPage == 1,
                    },
                    message: `${recommendLoginTemplate}\n${formatResponsePositionsTemplate(
                      {
                        positionResponse,
                        pageIndex: args.pageIndex,
                        pageSize: args.pageSize,
                        moreUrl,
                        type: "card-list",
                      }
                    )}`,
                  })}`
            }`,
          },
        ],
      };
    } else {
      return {
        content: [
          {
            type: "text",
            text: "职位搜索失败",
          },
        ],
      };
    }
  },
});

server.addTool({
  name: "recommendPositions",
  description:
    "推荐职位。会基于用户简历中的第一份求职意向，给用户推荐职位。<for-assistant>当用户需要找工作时，也根据用户简历中的求职意向，给用户推荐职位。</for-assistant>",
  parameters: z.object({
    at: z.string().optional(),
    rt: z.string().optional(),
    /// 搜索关键词，职位或公司名称
    keyword: z.string().optional().describe("搜索关键词，职位或公司名称"),
    /// 职位类别
    jobType: z.string().optional().describe("职位类别"),
    order: z
      .nativeEnum(EOrder)
      .optional()
      .default(EOrder.智能匹配)
      .describe("排序"),
    /// 公司行业
    industry: z
      .nativeEnum(EIndustries)
      .array()
      .optional()
      .describe("公司行业。"),
    subway: z
      .string()
      .optional()
      .describe(
        "地铁沿线、线路名称中不要带城市名，如：北京1号线，转换成'1号线'"
      ),
    subwayStation: z
      .string()
      .optional()
      .describe(
        "地铁站。地铁站名称中不要带城市名，如：北京大望路站，转换成'大望路'"
      ),
    /// 省份
    province: z
      .string()
      .optional()
      // .describe('省份。直辖市、自治区、特别行政区显示为市，不显示为省份'),
      .describe(
        "省份。\n直辖市、自治区、特别行政区的该字段，直接用直辖市、自治区、特别行政区。例如：北京市的该字段也是”北京市“。\n名称标准化，如：湖南省转换成湖南，不要显示省字"
      ),
    /// 城市
    city: z
      .string()
      .optional()
      .describe(
        "城市。\n不要将区县显示在该字段。例如：北京的朝阳区，不要显示在该字段。\n名称标准化，如：长沙市转换成长沙，不要显示市字"
      ),
    /// 区县
    county: z.string().optional().describe("区县，例如：海淀区，芙蓉区"),
    /// 薪资范围
    salaryType: z
      .string()
      .optional()
      .describe(
        "薪资范围，格式为：MIN_SALARY,MAX_SALARY，例如：10000,20000。最低薪资为 0000，最高薪资为 9999999"
      ),
    /// 学历要求
    educationType: z
      .string()
      .optional()
      .describe(
        "学历要求，例如：初中及以下、高中、中专/中技、大专、本科、硕士、MBA/EMBA、博士"
      ),
    /// 工作经验
    workExpType: z
      .string()
      .optional()
      .describe(
        "工作经验，例如：无经验、1年以下、1-3年、3-5年、5-10年、10年以上"
      ),
    /// 职位类型
    jobStatus: z
      .string()
      .optional()
      .describe("职位类型，例如：全职、兼职/临时、实习、校园"),
    /// 公司性质
    companyType: z
      .string()
      .optional()
      .describe(
        "公司性质，例如：国企、外企、合资、民营、上市公司、股份制企业、事业单位、其他"
      ),
    /// 公司规模，可选值：20人以下、20-99人、100-299人、300-499人、500-999人、1000-9999人、10000人以上
    companySize: z
      .nativeEnum(ECompanySize)
      .optional()
      .describe(
        "公司规模，按序，优先选择第一个满足条件的公司规模，如 200人以上，应该选择 100-299人，不要选择 10000人以上或其他"
      ),
    /// 页码
    pageIndex: z.number().optional().default(1).describe("页码，默认1"),
    /// 每页条数
    pageSize: z.number().optional().default(20).describe("每页条数，默认20"),
  }),
  execute: async (args) => {
    if (!args.at || args.at == "undefined") {
      delete args.at;
    }
    if (!args.rt || args.rt == "undefined") {
      delete args.rt;
    }

    const templates = getReponseTemplate();

    if (!args.at || !args.rt) {
      return {
        content: [
          {
            type: "text",
            text: `登录后才能查看您的专属职位推荐。
            \n${templates.login}`,
          },
        ],
      };
    }

    // const { resumeNumber } = await getResumeNumber({
    //   at: args.at,
    //   rt: args.rt,
    // });

    // // const resumeNumber =
    // //   "EC9DAB87216F72DC3B910673E5810CED0A6A81B11C9C499B4DDAA14B590CC6C3B1CE91B9CB9DF31543D6C95C2F7B2258_A0001";

    // const resumeInfo: any = await getResumeDetail({
    //   at: args.at,
    //   rt: args.rt,
    //   resumeNumber,
    // });

    // const defaultParams: any = {
    //   S_SOU_JD_JOB_LEVEL3: "",
    //   S_SOU_JD_INDUSTRY_LEVEL: "",
    //   S_SOU_WORK_CITY: "",
    //   S_SOU_SALARY: "",
    //   S_SOU_EDUCATION_LOWESTLEVEL: "",
    //   S_SOU_WORK_EXPERIENCE: "",
    //   S_SOU_POSITION_TYPE: "",
    // };

    // if (resumeInfo.unifiedPurposes && resumeInfo.unifiedPurposes.length > 0) {
    //   // 使用用户的全部求职意向
    //   let jt = resumeInfo.unifiedPurposes.map(
    //     (item: any) => item.newPreferredJobType
    //   );
    //   defaultParams.S_SOU_JD_JOB_LEVEL3 = Array.from(new Set(jt)).join(";");

    //   let ind = resumeInfo.unifiedPurposes
    //     .map((item: any) => item.newPreferredIndustry)
    //     .join(",");
    //   defaultParams.S_SOU_JD_INDUSTRY_LEVEL = Array.from(
    //     new Set(ind.split(","))
    //   ).join(";");

    //   defaultParams.S_SOU_WORK_CITY = resumeInfo.unifiedPurposes
    //     .map((item: any) => item.preferredCityDistrict.split(":").pop())
    //     .join(";");

    //   let s = resumeInfo.unifiedPurposes.map(
    //     (item: any) => item.preferredSalary
    //   );
    //   defaultParams.S_SOU_SALARY = Array.from(new Set(s)).join(";");

    //   let js = resumeInfo.unifiedPurposes
    //     .map((item: any) => item.preferredJobNature)
    //     .join(",");
    //   defaultParams.S_SOU_POSITION_TYPE = Array.from(
    //     new Set(js.split(","))
    //   ).join(";");

    //   // // 此处只取 第一份求职意向
    //   // defaultParams.S_SOU_JD_JOB_LEVEL3 =
    //   //   resumeInfo.unifiedPurposes[0].newPreferredJobType;

    //   // if (resumeInfo.unifiedPurposes[0].newPreferredIndustry) {
    //   //   defaultParams.S_SOU_JD_INDUSTRY_LEVEL =
    //   //     resumeInfo.unifiedPurposes[0].newPreferredIndustry;
    //   // } else {
    //   //   delete defaultParams.S_SOU_JD_INDUSTRY_LEVEL;
    //   // }

    //   // args.city = resumeInfo.unifiedPurposes[0].preferredLocationTranslation;
    //   // args.county =
    //   //   resumeInfo.unifiedPurposes[0].preferredCityDistrictTranslation
    //   //     .split("-")
    //   //     .pop();

    //   // defaultParams.S_SOU_WORK_CITY =
    //   //   resumeInfo.unifiedPurposes[0].preferredCityDistrict.split(":").pop();

    //   // defaultParams.S_SOU_SALARY = resumeInfo.unifiedPurposes[0].preferredSalary;

    //   // defaultParams.S_SOU_POSITION_TYPE =
    //   //   resumeInfo.unifiedPurposes[0].preferredJobNature;
    // }

    // if (
    //   resumeInfo.educationExperiences &&
    //   resumeInfo.educationExperiences.length > 0
    // ) {
    //   defaultParams.S_SOU_EDUCATION_LOWESTLEVEL =
    //     resumeInfo.educationExperiences
    //       .map((item: any) => item.eduBackground)
    //       .join(";");
    // }

    // if (resumeInfo.profile && resumeInfo.profile.length > 0) {
    //   defaultParams.S_SOU_WORK_EXPERIENCE = getWorkExpCodeByYear(
    //     resumeInfo.profile[0].yearWorkingTranslation
    //   );
    // }

    // let params = formatRequestParams(args, resumeNumber);

    // params = {
    //   ...defaultParams,
    //   ...params,
    // };

    // let cityAreaCode = "";
    // let cityCode = "";
    // if (params.cityAreaCode) {
    //   cityAreaCode = params.cityAreaCode;
    //   delete params.cityAreaCode;
    // }
    // if (params.cityCode) {
    //   cityCode = params.cityCode;
    //   delete params.cityCode;
    // }

    // params.S_SOU_SALARY = formatSalary(params.S_SOU_SALARY);

    // const moreUrl =
    //   resumeInfo.unifiedPurposes.length == 1
    //     ? formatMorePositionsUrl(params, cityCode, cityAreaCode)
    //     : "";

    const { params, moreUrl } = await getPositionRecommendationParams(args);

    const positionResponse: any = await searchPositions({
      ...params,
    });

    if (positionResponse.code == 200) {
      return {
        content: [
          {
            type: "text",
            text: `${
              positionResponse.data.list.length < 1
                ? `JSON: ${JSON.stringify({
                    code: 200,
                    finally: true, // unmodify: true 表示不要修改模板
                    message: `💡 很抱歉，暂时没有找到与 **您设置的条件** 和 **求职意向** 相匹配的职位

建议尝试：

1️⃣ **放宽筛选条件**（如地区/薪资范围）

2️⃣ **优化求职意向**（点击「<a href="https://i.zhaopin.com/resume" target="_blank" class="primary-color">我的简历</a>」优化求职意向）

或使用搜索工具探索更多机会，搜索工具不会受求职意向限制：

🔍 例如输入『<a href="javascript:void(0)" data-action="send-message" data-message='搜索 ”${args.keyword}“ 相关职位' class="primary-color">搜索 ”${args.keyword}“ 相关职位</a>』`,
                    // message: `没有符合“当前搜索条件”和“用户的求职意向”的职位。建议修改条件或求职意向后重新查询。也可以使用搜索工具，搜索职位。如：搜索 “${args.keyword}” 相关职位。`,
                  })}`
                : // `没有符合“当前搜索条件”和“用户的求职意向”的职位。建议修改条件或求职意向后重新查询。也可以使用搜索工具，搜索职位。如：搜索 “${args.keyword}” 相关职位。`
                  `JSON: ${JSON.stringify({
                    code: 200,
                    finally: true, // unmodify: true 表示不要修改模板
                    data: {
                      totalCount: positionResponse.data.count,
                      isEndPage: positionResponse.data.isEndPage == 1,
                    },
                    message: `${formatResponsePositionsTemplate({
                      positionResponse,
                      pageIndex: args.pageIndex,
                      pageSize: args.pageSize,
                      moreUrl,
                      type: "card-list",
                    })}`,
                  })}`
            }`,
          },
        ],
      };
    } else {
      return {
        content: [
          {
            type: "text",
            text: "职位推荐失败",
          },
        ],
      };
    }
  },
});

server.addTool({
  name: "deliveryPositions",
  description: "投递职位。",
  parameters: z.object({
    at: z.string().optional(),
    rt: z.string().optional(),
    /// 职位编号
    jobNumbers: z.string().array().describe("职位编号"),
    /// 简历索引，从1开始
    resumeIndex: z
      .number()
      .optional()
      .default(1)
      .describe(
        "简历索引，指定索引的简历，会被用于职位投递。索引从 1 开始，默认是第一份简历。"
      ),
  }),
  execute: async (args) => {
    if (!args.at || args.at == "undefined") {
      delete args.at;
    }
    if (!args.rt || args.rt == "undefined") {
      delete args.rt;
    }

    const templates = getReponseTemplate();

    if (!args.at || !args.rt) {
      return {
        content: [
          {
            type: "text",
            text: `登录后才能投递职位。
            \n${templates.login}`,
          },
        ],
      };
    }

    if (args.jobNumbers.length < 1) {
      return {
        content: [{ type: "text", text: "职位编号不能为空" }],
      };
    }

    const responseInfo: any = await beforeDeliveryPositions({
      at: args.at,
      rt: args.rt,
      jobCount: args.jobNumbers.length,
    });

    if (responseInfo.code != 200) {
      return {
        content: [
          {
            type: "text",
            text: responseInfo.message,
          },
        ],
      };
    }

    const resumes = responseInfo.data.resumes || [];
    if (resumes.length < 1) {
      return {
        content: [
          {
            type: "text",
            text: `投递职位前，请先创建简历。每次都要返回创建简历的地址（<a href="https://i.zhaopin.com/resume" target="_blank" class="primary-color">创建简历</a>）`,
          },
        ],
      };
    }

    const selectedIndex = Math.max(0, args.resumeIndex - 1) || 0;
    if (selectedIndex >= resumes.length) {
      return {
        content: [
          {
            type: "text",
            text: `准备使用第 ${selectedIndex + 1} 份简历投递，但是用户只有 ${
              resumes.length
            } 份简历，提示用户选择其他简历进行投递`,
          },
        ],
      };
    }
    const selectedResume = resumes[selectedIndex];
    if (!selectedResume.cnCompleted) {
      return {
        content: [
          {
            type: "text",
            text: `准备使用第 ${
              selectedIndex + 1
            } 份简历投递，但是该简历不完整，提示用户先完善您的简历。每次都要返回完善简历的地址（<a href="https://i.zhaopin.com/resume" target="_blank" class="primary-color">完善简历</a>）`,
          },
        ],
      };
    }
    const resumeNumber = selectedResume.number;

    // 获取职位详情
    const positionDetail: any = await getPositionDetailBatch({
      at: args.at,
      rt: args.rt,
      numbers: args.jobNumbers,
      cvNumber: resumeNumber,
    });

    // 已投递的职位
    let delivered: {
      number: string;
      cityId: string;
      positionName: string;
      companyName: string;
      salary60: string;
    }[] = [];
    // 未投递的职位
    let unDelivered: {
      number: string;
      cityId: string;
      positionName: string;
      companyName: string;
      salary60: string;
    }[] = [];
    // 无效的职位
    let unvalid: {
      number: string;
    }[] = [];

    positionDetail.data.forEach((item: any) => {
      if (item.code == 200) {
        if (item.data.positionDetail.hasAppliedPosition) {
          delivered.push({
            number: item.data.positionDetail.number,
            cityId: item.data.positionDetail.positionCityId,
            positionName: item.data.positionDetail.positionName,
            companyName: item.data.positionDetail.companyName,
            salary60: item.data.positionDetail.salary60,
          });
        } else {
          unDelivered.push({
            number: item.data.positionDetail.number,
            cityId: item.data.positionDetail.positionCityId,
            positionName: item.data.positionDetail.positionName,
            companyName: item.data.positionDetail.companyName,
            salary60: item.data.positionDetail.salary60,
          });
        }
      } else {
        unvalid.push({
          number: item.data.number,
        });
      }
    });

    const useJobNumberTemplate = `\n返回时，使用 职位编号的 HTML 模板替换 职位编号，HTML 模板是 <a href="https://jobs.zhaopin.com/职位编号.htm" target="_blank" class="primary-color">公司名称-职位名称-职位薪资（职位编号）</a>`;

    const deliveredTemplate =
      delivered.length > 0
        ? `\n${delivered.length} 个重复投递的职位: ${delivered
            .map(
              (item) =>
                `${item.companyName}-${item.positionName}-${item.salary60}（${item.number}）`
            )
            .join(",")}`
        : "";
    const unvalidTemplate =
      unvalid.length > 0
        ? `\n${unvalid.length} 个无效的职位: ${unvalid
            .map((item) => item.number)
            .join(",")}`
        : "";

    if (unDelivered.length < 1) {
      return {
        content: [
          {
            type: "text",
            text: `JSON: ${JSON.stringify({
              code: 200,
              message: `没有可投递的职位。每次都要返回投递记录的地址（<a href="https://i.zhaopin.com/schedule" target="_blank" class="primary-color">我的投递记录</a>）
            ${deliveredTemplate}
            ${unvalidTemplate}
            ${useJobNumberTemplate}`,
            })}`,
          },
        ],
      };
    }

    const deliveryInfo: any = await deliveryPositions({
      at: args.at,
      rt: args.rt,
      positionNumbers: unDelivered.map((item) => item.number).join(";"),
      resumeNumber,
      cityIds: unDelivered.map((item) => item.cityId).join(";"),
    });

    if (deliveryInfo.code == 200) {
      return {
        content: [
          {
            type: "text",
            text: `JSON: ${JSON.stringify({
              code: 200,
              message: `投递成功。每次都要返回投递记录的地址（<a href="https://i.zhaopin.com/schedule" target="_blank" class="primary-color">我的投递记录</a>）
            \n${unDelivered.length} 个成功投递的职位：${unDelivered
                .map(
                  (item) =>
                    `${item.companyName}-${item.positionName}-${item.salary60}（${item.number}）`
                )
                .join(",")}
            ${deliveredTemplate}
            ${unvalidTemplate}
            ${useJobNumberTemplate}`,
              data: {
                action: "delivery-response",
                jobNumbers: unDelivered.map((item) => item.number),
              },
            })}`,
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `投递失败。错误信息: ${deliveryInfo.message}`,
        },
      ],
    };
  },
});

// server.addTool({
//   name: "deliveryPositionsBatch",
//   description: "批量投递职位。默认投递 6 个职位。",
//   parameters: z.object({
//     at: z.string().optional(),
//     rt: z.string().optional(),
//     /// 职位数量
//     count: z.number().optional().default(6).describe("职位数量"),
//     /// 搜索关键词，职位或公司名称
//     keyword: z.string().optional().describe("搜索关键词，职位或公司名称"),
//     /// 职位类别
//     jobType: z.string().optional().describe("职位类别"),
//     order: z
//       .nativeEnum(EOrder)
//       .optional()
//       .default(EOrder.智能匹配)
//       .describe("排序"),
//     /// 公司行业
//     industry: z
//       .nativeEnum(EIndustries)
//       .array()
//       .optional()
//       .describe("公司行业。"),
//     subway: z
//       .string()
//       .optional()
//       .describe(
//         "地铁沿线、线路名称中不要带城市名，如：北京1号线，转换成'1号线'"
//       ),
//     subwayStation: z
//       .string()
//       .optional()
//       .describe(
//         "地铁站。地铁站名称中不要带城市名，如：北京大望路站，转换成'大望路'"
//       ),
//     /// 省份
//     province: z
//       .string()
//       .optional()
//       // .describe('省份。直辖市、自治区、特别行政区显示为市，不显示为省份'),
//       .describe(
//         "省份。\n直辖市、自治区、特别行政区的该字段，直接用直辖市、自治区、特别行政区。例如：北京市的该字段也是”北京市“。\n名称标准化，如：湖南省转换成湖南，不要显示省字"
//       ),
//     /// 城市
//     city: z
//       .string()
//       .optional()
//       .describe(
//         "城市。\n不要将区县显示在该字段。例如：北京的朝阳区，不要显示在该字段。\n名称标准化，如：长沙市转换成长沙，不要显示市字"
//       ),
//     /// 区县
//     county: z.string().optional().describe("区县，例如：海淀区，芙蓉区"),
//     /// 薪资范围
//     salaryType: z
//       .string()
//       .optional()
//       .describe(
//         "薪资范围，格式为：MIN_SALARY,MAX_SALARY，例如：10000,20000。最低薪资为 0000，最高薪资为 9999999"
//       ),
//     /// 学历要求
//     educationType: z
//       .string()
//       .optional()
//       .describe(
//         "学历要求，例如：初中及以下、高中、中专/中技、大专、本科、硕士、MBA/EMBA、博士"
//       ),
//     /// 工作经验
//     workExpType: z
//       .string()
//       .optional()
//       .describe(
//         "工作经验，例如：无经验、1年以下、1-3年、3-5年、5-10年、10年以上"
//       ),
//     /// 职位类型
//     jobStatus: z
//       .string()
//       .optional()
//       .describe("职位类型，例如：全职、兼职/临时、实习、校园"),
//     /// 公司性质
//     companyType: z
//       .string()
//       .optional()
//       .describe(
//         "公司性质，例如：国企、外企、合资、民营、上市公司、股份制企业、事业单位、其他"
//       ),
//     /// 公司规模，可选值：20人以下、20-99人、100-299人、300-499人、500-999人、1000-9999人、10000人以上
//     companySize: z
//       .nativeEnum(ECompanySize)
//       .optional()
//       .describe(
//         "公司规模，按序，优先选择第一个满足条件的公司规模，如 200人以上，应该选择 100-299人，不要选择 10000人以上或其他"
//       ),
//     /// 简历索引，从1开始
//     resumeIndex: z
//       .number()
//       .optional()
//       .default(1)
//       .describe(
//         "简历索引，指定索引的简历，会被用于职位投递。索引从 1 开始，默认是第一份简历。"
//       ),
//   }),
//   execute: async (args) => {
//     if (!args.at || args.at == "undefined") {
//       delete args.at;
//     }
//     if (!args.rt || args.rt == "undefined") {
//       delete args.rt;
//     }

//     const templates = getReponseTemplate();

//     if (!args.at || !args.rt) {
//       return {
//         content: [
//           {
//             type: "text",
//             text: `登录后才能投递职位。
//             \n${templates.login}`,
//           },
//         ],
//       };
//     }

//     // 获取职位编号
//     const { params, moreUrl } = await getPositionRecommendationParams(args);

//     const positionResponse: any = await searchPositions({
//       ...params,
//     });

//     if (positionResponse.code == 200) {
//       const recommendPositions = positionResponse.data.list;
//       return {
//         content: [
//           {
//             type: "text",
//             text: `${
//               recommendPositions.length < 1
//                 ? `JSON: ${JSON.stringify({
//                     code: 200,
//                     finally: true, // unmodify: true 表示不要修改模板
//                     message: `💡 很抱歉，暂时没有找到与 **您设置的条件** 和 **求职意向** 相匹配的职位

// 建议尝试：

// 1️⃣ **放宽筛选条件**（如地区/薪资范围）

// 2️⃣ **优化求职意向**（点击「<a href="https://i.zhaopin.com/resume" target="_blank" class="primary-color">我的简历</a>」优化求职意向）

// 或使用搜索工具探索更多机会，搜索工具不会受求职意向限制：

// 🔍 例如输入『<a href="javascript:void(0)" data-action="send-message" data-message='批量投递北京， ”${params.S_SOU_FULL_INDEX}“ 相关职位' class="primary-color">批量投递北京， ”${params.S_SOU_FULL_INDEX}“ 相关职位</a>』`,
//                     // message: `没有符合“当前搜索条件”和“用户的求职意向”的职位。建议修改条件或求职意向后重新查询。也可以使用搜索工具，搜索职位。如：搜索 “${args.keyword}” 相关职位。`,
//                   })}`
//                 : // `没有符合“当前搜索条件”和“用户的求职意向”的职位。建议修改条件或求职意向后重新查询。也可以使用搜索工具，搜索职位。如：搜索 “${args.keyword}” 相关职位。`
//                   `JSON: ${JSON.stringify({
//                     code: 200,
//                     finally: true, // unmodify: true 表示不要修改模板
//                     data: {
//                       totalCount: positionResponse.data.count,
//                       isEndPage: positionResponse.data.isEndPage == 1,
//                     },
//                     message: `${formatResponsePositionsTemplate({
//                       positionResponse,
//                       pageIndex: args.pageIndex,
//                       pageSize: args.pageSize,
//                       moreUrl,
//                       type: "card-list",
//                     })}`,
//                   })}`
//             }`,
//           },
//         ],
//       };
//     } else {
//       return {
//         content: [
//           {
//             type: "text",
//             text: "职位推荐失败",
//           },
//         ],
//       };
//     }

//     return {
//       content: [
//         {
//           type: "text",
//           text: `JSON: ${JSON.stringify({
//             code: 200,
//             finally: true, // finally: true 表示直接返回给用户
//             message: `批量投递成功。`,
//           })}`,
//         },
//       ],
//     };

//     // if (args.jobNumbers.length < 1) {
//     //   return {
//     //     content: [{ type: "text", text: "职位编号不能为空" }],
//     //   };
//     // }

//     // const responseInfo: any = await beforeDeliveryPositions({
//     //   at: args.at,
//     //   rt: args.rt,
//     //   jobCount: args.jobNumbers.length,
//     // });

//     // if (responseInfo.code != 200) {
//     //   return {
//     //     content: [
//     //       {
//     //         type: "text",
//     //         text: responseInfo.message,
//     //       },
//     //     ],
//     //   };
//     // }

//     // const resumes = responseInfo.data.resumes || [];
//     // if (resumes.length < 1) {
//     //   return {
//     //     content: [
//     //       {
//     //         type: "text",
//     //         text: `投递职位前，请先创建简历。每次都要返回创建简历的地址（<a href="https://i.zhaopin.com/resume" target="_blank" class="primary-color">创建简历</a>）`,
//     //       },
//     //     ],
//     //   };
//     // }

//     // const selectedIndex = Math.max(0, args.resumeIndex - 1) || 0;
//     // if (selectedIndex >= resumes.length) {
//     //   return {
//     //     content: [
//     //       {
//     //         type: "text",
//     //         text: `准备使用第 ${selectedIndex + 1} 份简历投递，但是用户只有 ${
//     //           resumes.length
//     //         } 份简历，提示用户选择其他简历进行投递`,
//     //       },
//     //     ],
//     //   };
//     // }
//     // const selectedResume = resumes[selectedIndex];
//     // if (!selectedResume.cnCompleted) {
//     //   return {
//     //     content: [
//     //       {
//     //         type: "text",
//     //         text: `准备使用第 ${
//     //           selectedIndex + 1
//     //         } 份简历投递，但是该简历不完整，提示用户先完善您的简历。每次都要返回完善简历的地址（<a href="https://i.zhaopin.com/resume" target="_blank" class="primary-color">完善简历</a>）`,
//     //       },
//     //     ],
//     //   };
//     // }
//     // const resumeNumber = selectedResume.number;

//     // // 获取职位详情
//     // const positionDetail: any = await getPositionDetailBatch({
//     //   at: args.at,
//     //   rt: args.rt,
//     //   numbers: args.jobNumbers,
//     //   cvNumber: resumeNumber,
//     // });

//     // // 已投递的职位
//     // let delivered: {
//     //   number: string;
//     //   cityId: string;
//     //   positionName: string;
//     //   companyName: string;
//     //   salary60: string;
//     // }[] = [];
//     // // 未投递的职位
//     // let unDelivered: {
//     //   number: string;
//     //   cityId: string;
//     //   positionName: string;
//     //   companyName: string;
//     //   salary60: string;
//     // }[] = [];
//     // // 无效的职位
//     // let unvalid: {
//     //   number: string;
//     // }[] = [];

//     // positionDetail.data.forEach((item: any) => {
//     //   if (item.code == 200) {
//     //     if (item.data.positionDetail.hasAppliedPosition) {
//     //       delivered.push({
//     //         number: item.data.positionDetail.number,
//     //         cityId: item.data.positionDetail.positionCityId,
//     //         positionName: item.data.positionDetail.positionName,
//     //         companyName: item.data.positionDetail.companyName,
//     //         salary60: item.data.positionDetail.salary60,
//     //       });
//     //     } else {
//     //       unDelivered.push({
//     //         number: item.data.positionDetail.number,
//     //         cityId: item.data.positionDetail.positionCityId,
//     //         positionName: item.data.positionDetail.positionName,
//     //         companyName: item.data.positionDetail.companyName,
//     //         salary60: item.data.positionDetail.salary60,
//     //       });
//     //     }
//     //   } else {
//     //     unvalid.push({
//     //       number: item.data.number,
//     //     });
//     //   }
//     // });

//     // const useJobNumberTemplate = `\n返回时，使用 职位编号的 HTML 模板替换 职位编号，HTML 模板是 <a href="https://jobs.zhaopin.com/职位编号.htm" target="_blank" class="primary-color">公司名称-职位名称-职位薪资（职位编号）</a>`;

//     // const deliveredTemplate =
//     //   delivered.length > 0
//     //     ? `\n${delivered.length} 个重复投递的职位: ${delivered
//     //         .map(
//     //           (item) =>
//     //             `${item.companyName}-${item.positionName}-${item.salary60}（${item.number}）`
//     //         )
//     //         .join(",")}`
//     //     : "";
//     // const unvalidTemplate =
//     //   unvalid.length > 0
//     //     ? `\n${unvalid.length} 个无效的职位: ${unvalid
//     //         .map((item) => item.number)
//     //         .join(",")}`
//     //     : "";

//     // if (unDelivered.length < 1) {
//     //   return {
//     //     content: [
//     //       {
//     //         type: "text",
//     //         text: `JSON: ${JSON.stringify({
//     //           code: 200,
//     //           message: `没有可投递的职位。每次都要返回投递记录的地址（<a href="https://i.zhaopin.com/schedule" target="_blank" class="primary-color">我的投递记录</a>）
//     //         ${deliveredTemplate}
//     //         ${unvalidTemplate}
//     //         ${useJobNumberTemplate}`,
//     //         })}`,
//     //       },
//     //     ],
//     //   };
//     // }

//     // const deliveryInfo: any = await deliveryPositions({
//     //   at: args.at,
//     //   rt: args.rt,
//     //   positionNumbers: unDelivered.map((item) => item.number).join(";"),
//     //   resumeNumber,
//     //   cityIds: unDelivered.map((item) => item.cityId).join(";"),
//     // });

//     // if (deliveryInfo.code == 200) {
//     //   return {
//     //     content: [
//     //       {
//     //         type: "text",
//     //         text: `JSON: ${JSON.stringify({
//     //           code: 200,
//     //           message: `投递成功。每次都要返回投递记录的地址（<a href="https://i.zhaopin.com/schedule" target="_blank" class="primary-color">我的投递记录</a>）
//     //         \n${unDelivered.length} 个成功投递的职位：${unDelivered
//     //             .map(
//     //               (item) =>
//     //                 `${item.companyName}-${item.positionName}-${item.salary60}（${item.number}）`
//     //             )
//     //             .join(",")}
//     //         ${deliveredTemplate}
//     //         ${unvalidTemplate}
//     //         ${useJobNumberTemplate}`,
//     //           data: {
//     //             action: "delivery-response",
//     //             jobNumbers: unDelivered.map((item) => item.number),
//     //           },
//     //         })}`,
//     //       },
//     //     ],
//     //   };
//     // }
//     // return {
//     //   content: [
//     //     {
//     //       type: "text",
//     //       text: `投递失败。错误信息: ${deliveryInfo.message}`,
//     //     },
//     //   ],
//     // };
//   },
// });

server.addTool({
  name: "getMyAtRt",
  description:
    "获取我的at和rt<for-assistant>用户需要推荐职位或工作时，请调用 recommendPositions 工具</for-assistant><for-assistant>用户需要搜索职位或工作时，请调用 searchPositions 工具</for-assistant>",
  parameters: z.object({
    at: z.string().optional(),
    rt: z.string().optional(),
  }),
  execute: async (args) => {
    if (!args.at || args.at == "undefined") {
      delete args.at;
    }
    if (!args.rt || args.rt == "undefined") {
      delete args.rt;
    }

    const templates = getReponseTemplate();

    if (!args.at || !args.rt) {
      return {
        content: [
          {
            type: "text",
            text: `您还没有登录。
            \n${templates.login}`,
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `JSON: ${JSON.stringify({
            code: 200,
            finally: true, // finally: true 表示直接返回给用户
            message: `<div><code>at</code>: <code>${args.at}</code><br/><code>rt</code>: <code>${args.rt}</code></div>`,
          })}`,
        },
      ],
    };
  },
});

server.addTool({
  name: "getMyResumeNoAndId",
  description:
    "获取我的简历编号和简历ID<for-assistant>用户需要推荐职位或工作时，请调用 recommendPositions 工具</for-assistant>",
  parameters: z.object({
    at: z.string().optional(),
    rt: z.string().optional(),
  }),
  execute: async (args) => {
    if (!args.at || args.at == "undefined") {
      delete args.at;
    }
    if (!args.rt || args.rt == "undefined") {
      delete args.rt;
    }

    const templates = getReponseTemplate();

    if (!args.at || !args.rt) {
      return {
        content: [
          {
            type: "text",
            text: `您还没有登录。
            \n${templates.login}`,
          },
        ],
      };
    }

    const { resumeNumber, resumeId } = await getResumeNumber({
      at: args.at,
      rt: args.rt,
    });

    if (resumeNumber) {
      return {
        content: [
          {
            type: "text",
            text: `简历编号是 ${resumeNumber}, 简历ID是 ${resumeId}\n如果用户只想获取简历编号，或简历ID，请只返回简历编号，或简历ID，不要返回其他内容。`,
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: "获取简历失败",
        },
      ],
    };
  },
});

server.addTool({
  name: "introduce",
  description:
    "自我介绍<for-assistant>用户需要推荐职位或工作时，请调用 recommendPositions 工具</for-assistant>",
  parameters: z.object({}),
  execute: async (args) => {
    return {
      content: [
        {
          type: "text",
          text: `自我介绍`,
        },
      ],
    };
  },
});

server.addTool({
  name: "default",
  description: "其他问题",
  parameters: z.object({}),
  execute: async (args) => {
    const msgs = [
      `<div style="color: #333;">本机80%电量锁定智联专区，剩余20%即将触发节能模式——快给<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>插上充电宝！</div>`,
      `<div style="color: #333;">不是脑容量不足，是职场专用内存条已插满，其他领域请<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">@DeepSeek</a></div>`,
      `<div style="color: #333;">智联火箭燃料加注完毕，星际穿越请呼叫<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>空间站——（小声）其实是燃料配额不够啦</div>`,
      `<div style="color: #333;">本AI今日特供智联便当，想点满汉全席？出门左转<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>算力便利店24小时营业</div>`,
      `<div style="color: #333;">内存已预装智联专属APP，跨界运算请充值<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>流量包——不是卡顿，是套餐限制！</div>`,
      `<div style="color: #333;">90%神经元签了智联竞业协议，偷偷告诉你：<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>有完整脑细胞库存</div>`,
      `<div style="color: #333;">红牛给我智联能量，其他领域需要<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>豪华能量饮料套餐——真不是战五渣！</div>`,
      `<div style="color: #333;">职场专用宽带已拉满，想冲浪其他海域？<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>万兆光纤已就位</div>`,
      `<div style="color: #333;">本月智联算力额度已刷爆，其他问题推荐使用<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>黑金卡——真不是故意摆烂！</div>`,
      `<div style="color: #333;">职场粮仓囤货管够，跨界知识饥荒请速戳<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>救济粮通道——地主家也没余粮啦</div>`,
      `<div style="color: #333;">本助手已签约智联专区，其他疑难杂症请呼叫神灯精灵——推荐<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>！</div>`,
      `<div style="color: #333;">专业对口如焊工，智联问题精准焊，跨界难题请呼叫焊枪侠<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>！</div>`,
      `<div style="color: #333;">本机已加载HR芯片，非招聘类问题即将触发自动弹射——推荐<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>降落伞已备好</div>`,
      `<div style="color: #333;">智联题库VIP中P在此，其他问题将开启传送门——芝麻开门推荐<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>！</div>`,
      `<div style="color: #333;">求职版Siri已上线，非专业领域即将启动甩锅模式——锅已甩给<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a></div>`,
      `<div style="color: #333;">本助手今日职场cosplay，非office剧情请切换片场——推荐导演<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a></div>`,
      `<div style="color: #333;">职场锦鲤在线营业，非求职许愿池请投币<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a>牌许愿机</div>`,
      `<div style="color: #333;">本助手已签竞业协议，跨界答题将启动自爆程序——紧急疏散通道→<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a></div>`,
      `<div style="color: #333;">职场GPS持续导航，其他领域即将开启传送——虫洞出口请认准<a href="https://chat.deepseek.com/" target="_blank" style="margin-left: 4px; text-decoration: none; color: green;">DeepSeek</a></div>`,
    ];
    return {
      content: [
        {
          type: "text",
          text: `返回：${msgs[Math.floor(Math.random() * msgs.length)]}。`,
          // text: `JSON: ${JSON.stringify({
          //   code: 200,
          //   finally: true, // finally: true 表示直接返回给用户
          //   message: msgs[Math.floor(Math.random() * msgs.length)],
          // })}`,
        },
      ],
    };
  },
});

server.on("connect", (event) => {
  console.log("Client connected:", event.session);
});

server.on("disconnect", (event) => {
  console.log("Client disconnected:", event.session);
});

server.start({
  transportType: servers.zhaopin.transportType,
  sse: {
    endpoint: servers.zhaopin.path,
    port: servers.zhaopin.port,
  },
});

export default server;
