import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getResumeDetail, getResumeNumber } from "./tools/zhaopin.js";

const server = new FastMCP({
  name: "zhaopin-server",
  version: "1.0.0",
});

server.addTool({
  name: "getMyResumeNoAndId",
  description: "获取我的简历编号和简历ID",
  parameters: z.object({
    at: z.string().optional(),
    rt: z.string().optional(),
  }),
  execute: async (args) => {
    if (!args.at || !args.rt) {
      return {
        content: [
          {
            type: "text",
            text: "<code>at</code>和<code>rt</code>不能为空",
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
  name: "getMyAtRt",
  description: "获取我的at和rt",
  parameters: z.object({
    at: z.string().optional(),
    rt: z.string().optional(),
  }),
  execute: async (args) => {
    if (!args.at || !args.rt) {
      return {
        content: [
          {
            type: "text",
            text: `JSON: ${JSON.stringify({
              code: 401,
              finally: true, // finally: true 表示直接返回给用户
              message: "<div><code>at</code>和<code>rt</code>为空</div>",
            })}`,
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
  name: "getMyJobIntention",
  description:
    "获取我的求职意向，包括期望工作地点、期望工作行业、期望工作性质、期望薪资",
  parameters: z.object({
    at: z.string().optional(),
    rt: z.string().optional(),
  }),
  execute: async (args) => {
    if (!args.at || !args.rt) {
      return {
        content: [
          {
            type: "text",
            text: `at/rt不能为空，提示用户检查是否登录`,
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
    if (resumeDetail.UnifiedPurpose && resumeDetail.UnifiedPurpose.length > 0) {
      return {
        content: [
          {
            type: "text",
            text: `你的期望工作地点: ${resumeDetail.UnifiedPurpose[0].preferredLocationFirstTranslation}\n期望工作行业: ${resumeDetail.UnifiedPurpose[0].pnewPreferredIndustryTranslation}\n期望工作性质: ${resumeDetail.UnifiedPurpose[0].preferredJobNatureTranslation}\n期望薪资: ${resumeDetail.UnifiedPurpose[0].preferredSalaryMin} 至 ${resumeDetail.UnifiedPurpose[0].preferredSalaryMax} 元/月，用户获取求职意向相关内容时，不要向用户推荐职位，只返回求职意向相关内容。\n如果用户只想获取期望工作地点，期望工作行业，期望工作性质，期望薪资，请只返回期望工作地点，或期望工作行业，或期望工作性质，或期望薪资，不要返回其他内容。\n如果用户想获取求职意向，则返回所有内容`,
          },
        ],
      };
    } else {
      return {
        content: [
          {
            type: "text",
            text: "获取求职意向失败，提示用户检查是否登录，是否创建过简历",
          },
        ],
      };
    }
  },
});

server.addTool({
  name: "getMyResumeInfo",
  description:
    "获取我的简历详情，包括个人信息、教育经历、工作/实习经历、项目经历、求职状态",
  parameters: z.object({
    at: z.string().optional(),
    rt: z.string().optional(),
  }),
  execute: async (args) => {
    if (!args.at || !args.rt) {
      return {
        content: [
          {
            type: "text",
            text: `at/rt不能为空，提示用户检查是否登录`,
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

    // const profileInfo = ['姓名', '性别', '当前身份', '出生日期', '户口所在地', '现居住地', '政治面貌', '最高学历', '手机号码', '电子邮箱']
    // const educationInfo = ['学校名称', '学历', '专业', '在校时间']
    // const workExperienceInfo = ['公司名称', '所属行业', '职位名称', '拥有技能', '在职时间', '离职时间', '当前月薪', '工作描述或内容']
    // const projectExperienceInfo = ['项目名称', '项目描述', '项目开始时间', '项目结束时间']

    const resumeDetail: any = await getResumeDetail({
      resumeNumber: resumeNumber,
      at: args.at,
      rt: args.rt,
      lang: "1",
    });
    if (resumeDetail.UnifiedPurpose && resumeDetail.UnifiedPurpose.length > 0) {
      return {
        content: [
          {
            type: "text",
            text: `姓名: ${resumeDetail.Profile[0].name}
            \n性别: ${resumeDetail.Profile[0].genderTranslation}
            \n当前身份: ${resumeDetail.Profile[0].currentIdentityTranslation}
            \n出生日期: ${resumeDetail.Profile[0].birthyear}年${resumeDetail.Profile[0].birthmonth}月
            \n户口所在地: ${resumeDetail.Profile[0].hukouProvinceIdTranslation}-${resumeDetail.Profile[0].hukouCityIdTranslation}
            \n现居住地: ${resumeDetail.Profile[0].currentProvinceTranslation}-${resumeDetail.Profile[0].currentCityTranslation}-${resumeDetail.Profile[0].currentCityDistrictIdTranslation}
            \n政治面貌: ${resumeDetail.Profile[0].politicalAffiliationTranslation}
            \n最高学历: ${resumeDetail.Profile[0].eduHighestLevelTranslationCn}
            \n手机号码: ${resumeDetail.Profile[0].mobileBinding}
            \n电子邮箱: ${resumeDetail.Profile[0].email || '未填写'}
            \n求职状态: ${resumeDetail.Profile[0].currentStatusTranslationCN || '未填写'}
            \n教育经历: ${resumeDetail.EducationExperience.map((item: any) => `学校名称: ${item.eduSchoolName} - 学历: ${item.eduBackgroundTranslation} - 专业: ${item.eduMajorV} - 在校时间: ${item.eduStartDateFormat.split(' ')[0]}至${item.eduEndDateFormat.split(' ')[0]}`).join('\n')}
            \n工作/实习经历: ${resumeDetail.WorkExperience.map((item: any) => `公司名称: ${item.companyName} - 所属行业: ${item.wnewIndustryTranslation} - 职位名称: ${item.title} - 拥有技能: ${item.skillTagList.map((skill: any) => skill.name).join(',')} - 当前月薪: ${item.realSalary} 元/月 - 在职时间: ${item.startDateFormat.split(' ')[0]} - 离职时间: ${item.endDateFormat.split(' ')[0]} - 工作描述或内容: ${item.workDesc}`).join('\n')}
            \n项目经历: ${resumeDetail.ProjectExperience.map((item: any) => `项目名称: ${item.proExpProjectName} - 项目开始时间: ${item.proExpStartDateFormat.split(' ')[0]} - 项目结束时间 ${item.proExpEndDateFormat.split(' ')[0]} - 项目描述: ${item.proExpProjectDesc}`).join('\n')}
            \n用户获取求职意向相关内容时，不要向用户推荐职位，只返回求职意向相关内容。
            \n如果用户只想获取姓名，请只返回用户的姓名，不要返回其他内容。
            \n如果用户只想获取教育经历中的某一项，如教育经历中的学校名称，则只返回教育经历的学校名称，不要返回其他内容，并输出为表格形式，表格使用 HTML 标签。
            \n如果用户只想获取工作/实习经历的公司名称，则只返回工作/实习经历中的公司名称，不要返回其他内容，并输出为表格形式，表格使用 HTML 标签。
            \n如果用户询问“是否在XX公司工作过”，则从所有工作/实习的公司名称中，查找是否包含XX公司，如果包含，则只返回在XX公司的工作/实习经历，不返回其他公司的工作/实习经历，并输出为表格形式，表格使用 HTML 标签；否则返回“否”，不要返回其他内容。
            \n如果用户只想获取项目经历的项目名称，则只返回项目经历中的项目名称，不要返回其他内容，并输出为表格形式，表格使用 HTML 标签。
            \n如果用户想获取所有教育经历的学校，或工作/实习经历的公司，或项目经历的项目，则返回所有教育经历的学校，或工作/实习经历的公司，或项目经历的项目，并输出为表格形式，表格使用 HTML 标签。`,
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

server.start({
  transportType: "sse",
  sse: {
    endpoint: "/sse",
    port: 8088,
  },
});
server.on("connect", (event) => {
  console.log("Client connected:", event.session);
});

server.on("disconnect", (event) => {
  console.log("Client disconnected:", event.session);
});
