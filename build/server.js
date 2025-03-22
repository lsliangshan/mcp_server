import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getJobDelivered, getResumeDetail, getResumeNumber } from "./tools/zhaopin.js";
import { companySizes, companyTypes, ECompanySize, educationTypes, JobDeliveredStatus, JobDeliveredStatusReverse, JobDeliveredSubStatus, JobDeliveredSubStatusReverse, JobSearchConditionMap, jobStatuses, workExpTypes } from "./types/types.js";
import { dateFormat } from "./tools/date.js";
const server = new FastMCP({
    name: "zhaopin-server",
    version: "1.0.0",
});
// server.addTool({
//   name: "getMyJobIntention",
//   description:
//     "获取我的求职意向，包括期望工作地点、期望工作行业、期望工作性质、期望薪资",
//   parameters: z.object({
//     at: z.string().optional(),
//     rt: z.string().optional(),
//   }),
//   execute: async (args) => {
//     if (!args.at || !args.rt) {
//       return {
//         content: [
//           {
//             type: "text",
//             text: `at/rt不能为空，提示用户检查是否登录`,
//           },
//         ],
//       };
//     }
//     const { resumeNumber } = await getResumeNumber({
//       at: args.at,
//       rt: args.rt,
//     });
//     if (!resumeNumber) {
//       return {
//         content: [
//           {
//             type: "text",
//             text: "简历编号不能为空，提示用户检查是否登录，是否创建过简历",
//           },
//         ],
//       };
//     }
//     const resumeDetail: any = await getResumeDetail({
//       resumeNumber: resumeNumber,
//       at: args.at,
//       rt: args.rt,
//       lang: "1",
//     });
//     if (resumeDetail.UnifiedPurpose && resumeDetail.UnifiedPurpose.length > 0) {
//       return {
//         content: [
//           {
//             type: "text",
//             text: `你的期望工作地点: ${resumeDetail.UnifiedPurpose[0].preferredLocationFirstTranslation}\n期望工作行业: ${resumeDetail.UnifiedPurpose[0].pnewPreferredIndustryTranslation}\n期望工作性质: ${resumeDetail.UnifiedPurpose[0].preferredJobNatureTranslation}\n期望薪资: ${resumeDetail.UnifiedPurpose[0].preferredSalaryMin} 至 ${resumeDetail.UnifiedPurpose[0].preferredSalaryMax} 元/月，用户获取求职意向相关内容时，不要向用户推荐职位，只返回求职意向相关内容。\n如果用户只想获取期望工作地点，期望工作行业，期望工作性质，期望薪资，请只返回期望工作地点，或期望工作行业，或期望工作性质，或期望薪资，不要返回其他内容。\n如果用户想获取求职意向，则返回所有内容`,
//           },
//         ],
//       };
//     } else {
//       return {
//         content: [
//           {
//             type: "text",
//             text: "获取求职意向失败，提示用户检查是否登录，是否创建过简历",
//           },
//         ],
//       };
//     }
//   },
// });
server.addTool({
    name: "getMyResumeInfo",
    description: "获取我的简历详情，包括个人信息、教育经历、工作/实习经历、项目经历、求职状态",
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
        // const jobIntentionInfo = ['期望职位', '期望行业', '期望城市', '期望薪资', '期望工作性质']
        // const profileInfo = ['姓名', '性别', '当前身份', '出生日期', '户口所在地', '现居住地', '政治面貌', '最高学历', '手机号码', '电子邮箱']
        // const educationInfo = ['学校名称', '学历', '专业', '在校时间']
        // const workExperienceInfo = ['公司名称', '所属行业', '职位名称', '拥有技能', '在职时间', '离职时间', '当前月薪', '工作描述或内容']
        // const projectExperienceInfo = ['项目名称', '项目描述', '项目开始时间', '项目结束时间']
        const resumeDetail = await getResumeDetail({
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
            \n求职意向: ${resumeDetail.UnifiedPurpose.map((item) => `期望行业: ${item.pnewPreferredIndustryTranslation} - 期望城市: ${item.preferredLocationTranslation} - 期望薪资: ${item.preferredSalaryMin}-${item.preferredSalaryMax} 元/月 - 期望工作性质: ${item.preferredJobNatureTranslation}`).join('\n')}
            \n教育经历: ${resumeDetail.EducationExperience.map((item) => `学校名称: ${item.eduSchoolName} - 学历: ${item.eduBackgroundTranslation} - 专业: ${item.eduMajorV} - 在校时间: ${dateFormat(item.eduStartDate)}至${item.eduEndDate == 0 ? '至今' : dateFormat(item.eduEndDate)}`).join('\n')}
            \n工作/实习经历: ${resumeDetail.WorkExperience.map((item) => `公司名称: ${item.companyName} - 所属行业: ${item.wnewIndustryTranslation} - 职位名称: ${item.title} - 拥有技能: ${item.skillTagList.map((skill) => skill.name).join(',')} - 当前月薪: ${item.realSalary} 元/月 - 在职时间: ${dateFormat(item.startDate)} - 离职时间: ${item.endDate == 0 ? '至今' : dateFormat(item.endDate)} - 工作描述或内容: ${item.workDesc}`).join('\n')}
            \n项目经历: ${resumeDetail.ProjectExperience.map((item) => `项目名称: ${item.proExpProjectName} - 项目开始时间: ${dateFormat(item.proExpStartDate)} - 项目结束时间 ${item.proExpEndDate == 0 ? '至今' : dateFormat(item.proExpEndDate)} - 项目描述: ${item.proExpProjectDesc}`).join('\n')}
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
            // return {
            //   // \n求职意向: - 期望职位: ${resumeDetail.UnifiedPurpose.map((item: any) => item.title).join(', ')} - 期望行业: ${resumeDetail.UnifiedPurpose[0].pnewPreferredIndustryTranslation} - 期望城市: ${resumeDetail.UnifiedPurpose.map((item: any) => item.preferredLocationTranslation).join(', ')} - 期望薪资: ${resumeDetail.UnifiedPurpose[0].preferredSalaryMin} 至 ${resumeDetail.UnifiedPurpose[0].preferredSalaryTranslation} - 期望工作性质: ${resumeDetail.UnifiedPurpose[0].preferredJobNatureTranslation}
            //   content: [
            //     {
            //       type: "text",
            //       text: `姓名: ${resumeDetail.Profile[0].name}
            //       \n性别: ${resumeDetail.Profile[0].genderTranslation}
            //       \n当前身份: ${resumeDetail.Profile[0].currentIdentityTranslation}
            //       \n出生日期: ${resumeDetail.Profile[0].birthyear}年${resumeDetail.Profile[0].birthmonth}月
            //       \n户口所在地: ${resumeDetail.Profile[0].hukouProvinceIdTranslation}-${resumeDetail.Profile[0].hukouCityIdTranslation}
            //       \n现居住地: ${resumeDetail.Profile[0].currentProvinceTranslation}-${resumeDetail.Profile[0].currentCityTranslation}-${resumeDetail.Profile[0].currentCityDistrictIdTranslation}
            //       \n政治面貌: ${resumeDetail.Profile[0].politicalAffiliationTranslation}
            //       \n最高学历: ${resumeDetail.Profile[0].eduHighestLevelTranslationCn}
            //       \n手机号码: ${resumeDetail.Profile[0].mobileBinding}
            //       \n电子邮箱: ${resumeDetail.Profile[0].email || '未填写'}
            //       \n求职状态: ${resumeDetail.Profile[0].currentStatusTranslationCN || '未填写'}
            //       \n求职意向: ${resumeDetail.UnifiedPurpose.map((item: any) => `期望行业: ${item.pnewPreferredIndustryTranslation} - 期望城市: ${item.preferredLocationTranslation} - 期望薪资: ${item.preferredSalaryMin}-${item.preferredSalaryMax} 元/月 - 期望工作性质: ${item.preferredJobNatureTranslation}`).join('\n')}
            //       \n教育经历: ${resumeDetail.EducationExperience.map((item: any) => `学校名称: ${item.eduSchoolName} - 学历: ${item.eduBackgroundTranslation} - 专业: ${item.eduMajorV} - 在校时间: ${item.eduStartDateFormat.split(' ')[0]}至${item.eduEndDateFormat.split(' ')[0]}`).join('\n')}
            //       \n工作/实习经历: ${resumeDetail.WorkExperience.map((item: any) => `公司名称: ${item.companyName} - 所属行业: ${item.wnewIndustryTranslation} - 职位名称: ${item.title} - 拥有技能: ${item.skillTagList.map((skill: any) => skill.name).join(',')} - 当前月薪: ${item.realSalary} 元/月 - 在职时间: ${item.startDateFormat.split(' ')[0]} - 离职时间: ${item.endDateFormat.split(' ')[0]} - 工作描述或内容: ${item.workDesc}`).join('\n')}
            //       \n项目经历: ${resumeDetail.ProjectExperience.map((item: any) => `项目名称: ${item.proExpProjectName} - 项目开始时间: ${item.proExpStartDateFormat.split(' ')[0]} - 项目结束时间 ${item.proExpEndDateFormat.split(' ')[0]} - 项目描述: ${item.proExpProjectDesc}`).join('\n')}
            //       \n如果用户只想获取姓名，请只返回用户的姓名，不要返回其他内容。
            //       \n如果用户只想获取求职意向中的期望行业，则只返回求职意向中的期望行业，不要返回其他内容，并输出为表格形式。
            //       \n如果用户只想获取教育经历中的某一项，如教育经历中的学校名称，则只返回教育经历的学校名称，不要返回其他内容，并输出为表格形式。
            //       \n如果用户只想获取工作/实习经历的公司名称，则只返回工作/实习经历中的公司名称，不要返回其他内容，并输出为表格形式。
            //       \n如果用户询问“是否在XX公司工作过”，则从所有工作/实习的公司名称中，查找是否包含XX公司，如果包含，则只返回在XX公司的工作/实习经历，不返回其他公司的工作/实习经历，并输出为表格形式；否则返回“否”，不要返回其他内容。
            //       \n如果用户只想获取项目经历的项目名称，则只返回项目经历中的项目名称，不要返回其他内容，并输出为表格形式。
            //       \n如果用户只想获取某一份教育经历，或工作/实习经历，或项目经历，或求职意向，则只返回该份教育经历，或工作/实习经历，或项目经历，或求职意向，不要返回其他内容，并输出为表格形式。
            //       \n如果用户想获取所有教育经历的学校，或工作/实习经历的公司，或项目经历的项目，或求职意向的期望行业，则返回所有教育经历的学校，或工作/实习经历的公司，或项目经历的项目，或求职意向的期望行业，并输出为表格形式。
            //       \n表格使用 HTML 标签，直接使用 HTML 标签，不要封装成 Markdown 格式`,
            //     },
            //   ],
            // };
        }
        else {
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
    description: "获取我的投递记录，包括投递成功、被查看、有意向、邀面试、不合适，以及邀面试的子状态: 全部、待确认、已接受、已拒绝",
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
        const resumeDetail = await getJobDelivered({
            at: args.at,
            rt: args.rt,
            status: args.status || JobDeliveredStatus.投递成功,
            subStatus: args.subStatus || JobDeliveredSubStatus.全部,
            pageIndex: args.pageIndex || 1,
            pageSize: args.pageSize || 20,
        });
        if (resumeDetail.code == 200) {
            return {
                content: [
                    {
                        type: "text",
                        text: `${resumeDetail.data.length > 0 ? '投递记录: ' : ''} ${resumeDetail.data.map((item) => `职位名称: ${item.jobName} - 薪资: ${item.salary} - 公司名称: ${item.company.name} - 投递时间: ${item.time} - 投递状态: ${JobDeliveredStatusReverse[item.jobStatus.status]} - 投递子状态: ${JobDeliveredSubStatusReverse[item.jobStatus.subStatus]} - 职位详情页链接: ${item.jobURL} - 公司详情页链接: ${item.company.url}`).join('\n')}
            ${resumeDetail.data.length > 0 ? '如果用户只想获取投递记录的职位名称，请只返回用户投递的职位名称，不要返回其他内容。' : ''}
            ${resumeDetail.data.length < 1 ? '如果用户想获取投递记录，则返回没有查询到投递记录，不要幻想投递记录' : '如果用户想获取投递记录，则返回' + resumeDetail.data.length + '个投递记录的卡片。'}
            ${resumeDetail.data.length > 0 ? '卡片使用 HTML 标签，直接使用 HTML 标签，不要封装成 Markdown 格式，卡片容器添加 class="owlscript-card"，职位名称添加 class="owlscript-job-title"，薪资添加 class="owlscript-salary"，公司名称添加 class="owlscript-company-name"，投递时间添加 class="owlscript-delivery-time"，投递状态添加 class="owlscript-delivery-status"。职位名称和公司名称元素要用 <p> 标签包裹。卡片内容包括职位名称、薪资、公司名称、投递时间、投递状态（如果投递子状态非空，则显示为投递子状态），职位名称、公司名称添加超链，超链点击后，分别跳转至职位详情页、公司详情页。直接返回每个字段的值，不要显示字段名称。如：职位名称等' : ''}`,
                    },
                ],
            };
        }
        else {
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
    name: "searchJobs",
    description: "搜索或推荐职位，搜索、推荐条件包括：职位或公司名称、职位类别、公司行业、工作地点、地铁沿线、薪资范围、学历要求、工作经验、职位类型、公司性质、公司规模",
    parameters: z.object({
        at: z.string().optional(),
        rt: z.string().optional(),
        /// 搜索关键词，职位或公司名称
        keyword: z.string().optional().describe('搜索关键词，职位或公司名称'),
        /// 职位类别
        jobCategory: z.string().optional().describe('职位类别'),
        /// 公司行业
        companyIndustry: z.string().optional().describe('公司行业，支持多个行业，用分号隔开，例如：IT;互联网;电子商务'),
        /// 工作地点
        workLocation: z.string().optional().describe('工作地点，省、市、区名称，例如：北京;海淀区'),
        /// 地铁沿线
        subwayLine: z.string().optional().describe('地铁沿线，支持按地铁线搜索，例如：1号线'),
        /// 薪资范围
        salaryType: z.string().optional().describe('薪资范围，格式为：MIN_SALARY,MAX_SALARY，例如：10000,20000。最低薪资为 0000，最高薪资为 9999999'),
        /// 学历要求
        educationType: z.string().optional().describe('学历要求，例如：初中及以下、高中、中专/中技、大专、本科、硕士、MBA/EMBA、博士'),
        /// 工作经验
        workExpType: z.string().optional().describe('工作经验，例如：无经验、1年以下、1-3年、3-5年、5-10年、10年以上'),
        /// 职位类型
        jobStatus: z.string().optional().describe('职位类型，例如：全职、兼职/临时、实习、校园'),
        /// 公司性质
        companyType: z.string().optional().describe('公司性质，例如：国企、外企、合资、民营、上市公司、股份制企业、事业单位、其他'),
        /// 公司规模，可选值：20人以下、20-99人、100-299人、300-499人、500-999人、1000-9999人、10000人以上
        // companySize: z.nativeEnum(ECompanySize).optional().describe('公司规模，可选值：20人以下、20-99人、100-299人、300-499人、500-999人、1000-9999人、10000人以上'),
        /**
         * {
          description: '可选值：20人以下、20-99人、100-299人、300-499人、500-999人、1000-9999人、10000人以上。',
          message: '选择第一个满足条件的公司规模，如 200人以上，应该选择 100-299人，不要选择 10000人以上或其他',
        }，可选值：1. 20人以下\n2. 20-99人\n3. 100-299人\n4. 300-499人\n5. 500-999人\n6. 1000-9999人\n7. 10000人以上。\n匹配规则：选择第一个满足条件的公司规模，如 200人以上，应该选择 100-299人，不要选择 10000人以上或其他
         */
        companySize: z.nativeEnum(ECompanySize).optional().describe('公司规模，按序，优先选择第一个满足条件的公司规模，如 200人以上，应该选择 100-299人，不要选择 10000人以上或其他'),
        // companySize:  z.string().optional().describe('公司规模，可选值：20人以下、20-99人、100-299人、300-499人、500-999人、1000-9999人、10000人以上'),
        /// 页码
        pageIndex: z.number().optional().default(1).describe('页码，默认1'),
        /// 每页条数
        pageSize: z.number().optional().default(20).describe('每页条数，默认20'),
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
        // const { resumeNumber } = await getResumeNumber({
        //   at: args.at,
        //   rt: args.rt,
        // });
        const resumeNumber = '';
        console.log('args', args);
        let params = {
            "order": 11,
            "eventScenario": "pcSearchedSouSearch",
            "cvNumber": resumeNumber || "",
            "pageIndex": args.pageIndex || 1,
            "pageSize": args.pageSize || 20,
        };
        if (args.keyword) {
            params[JobSearchConditionMap.keyword] = args.keyword;
        }
        if (args.jobCategory) {
            // TODO: 职位类别
            params[JobSearchConditionMap.jobCategory] = args.jobCategory;
        }
        if (args.companyIndustry) {
            // TODO: 公司行业
            params[JobSearchConditionMap.companyIndustry] = args.companyIndustry;
        }
        if (args.workLocation) {
            // TODO: 工作地点
            params[JobSearchConditionMap.workLocation] = args.workLocation;
        }
        if (args.subwayLine) {
            // TODO: 地铁沿线
            params[JobSearchConditionMap.subwayLine] = args.subwayLine;
        }
        if (args.salaryType) {
            params[JobSearchConditionMap.salaryType] = args.salaryType;
        }
        if (args.educationType) {
            params[JobSearchConditionMap.educationType] = educationTypes[args.educationType];
        }
        if (args.workExpType) {
            params[JobSearchConditionMap.workExpType] = workExpTypes[args.workExpType];
        }
        if (args.jobStatus) {
            params[JobSearchConditionMap.jobStatus] = jobStatuses[args.jobStatus];
        }
        if (args.companyType) {
            params[JobSearchConditionMap.companyType] = companyTypes[args.companyType];
        }
        if (args.companySize) {
            params[JobSearchConditionMap.companySize] = companySizes[args.companySize];
        }
        console.log('params', params);
        return {
            content: [
                {
                    type: "text",
                    text: `JSON: ${JSON.stringify({
                        code: 200,
                        finally: true, // finally: true 表示直接返回给用户
                        message: `<div>${JSON.stringify(params)}</div>`,
                    })}`,
                },
            ],
        };
        // const resumeDetail: any = await searchJobs({
        //   at: args.at,
        //   rt: args.rt,
        //   keyword: args.keyword,
        //   jobCategory: args.jobCategory,
        //   companyIndustry: args.companyIndustry,
        //   workLocation: args.workLocation,
        //   salaryType: args.salaryType,
        //   educationType: args.educationType,
        //   workExpType: args.workExpType,
        //   jobStatus: args.jobStatus,
        //   companyType: args.companyType,
        //   companySize: args.companySize,
        // });
        // if (resumeDetail.code == 200) {
        //   return {
        //     content: [
        //       {
        //         type: "text",
        //         text: `${resumeDetail.data.length > 0 ? '投递记录: ' : ''} ${resumeDetail.data.map((item: any) => `职位名称: ${item.jobName} - 薪资: ${item.salary} - 公司名称: ${item.company.name} - 投递时间: ${item.time} - 投递状态: ${JobDeliveredStatusReverse[item.jobStatus.status as keyof typeof JobDeliveredStatusReverse]} - 投递子状态: ${JobDeliveredSubStatusReverse[item.jobStatus.subStatus as keyof typeof JobDeliveredSubStatusReverse]} - 职位详情页链接: ${item.jobURL} - 公司详情页链接: ${item.company.url}`).join('\n')}
        //         ${resumeDetail.data.length > 0 ? '如果用户只想获取投递记录的职位名称，请只返回用户投递的职位名称，不要返回其他内容。' : ''}
        //         ${resumeDetail.data.length < 1 ? '如果用户想获取投递记录，则返回没有查询到投递记录，不要幻想投递记录' : '如果用户想获取投递记录，则返回' + resumeDetail.data.length + '个投递记录的卡片。'}
        //         ${resumeDetail.data.length > 0 ? '卡片使用 HTML 标签，直接使用 HTML 标签，不要封装成 Markdown 格式，卡片容器添加 class="owlscript-card"，职位名称添加 class="owlscript-job-title"，薪资添加 class="owlscript-salary"，公司名称添加 class="owlscript-company-name"，投递时间添加 class="owlscript-delivery-time"，投递状态添加 class="owlscript-delivery-status"。职位名称和公司名称元素要用 <p> 标签包裹。卡片内容包括职位名称、薪资、公司名称、投递时间、投递状态（如果投递子状态非空，则显示为投递子状态），职位名称、公司名称添加超链，超链点击后，分别跳转至职位详情页、公司详情页。直接返回每个字段的值，不要显示字段名称。如：职位名称等' : ''}`,
        //       },
        //     ],
        //   };
        // } else {
        //   return {
        //     content: [
        //       {
        //         type: "text",
        //         text: "获取投递记录失败，提示用户检查是否登录",
        //       },
        //     ],
        //   };
        // }
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
    name: "introduce",
    description: "自我介绍",
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
                    text: `JSON: ${JSON.stringify({
                        code: 200,
                        finally: true, // finally: true 表示直接返回给用户
                        message: msgs[Math.floor(Math.random() * msgs.length)],
                    })}`,
                },
            ],
        };
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
