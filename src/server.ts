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
