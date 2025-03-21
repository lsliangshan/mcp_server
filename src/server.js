import { FastMCP } from "fastmcp";
import { z } from "zod";
import { getResumeDetail } from "./tools/zhaopin.js";

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

    const apiUrl = `https://fe-api.zhaopin.com/c/i/user/detail?detail=true&at=${args.at}&rt=${args.rt}`;
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
      return {
        content: [
          {
            type: "text",
            text: `简历编号是 ${data.data.Resume.ResumeNumber}, 简历ID是 ${data.data.Resume.Id}`,
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
            message: `<div><code>at</code>: <code>${args.at}</code>\n<code>rt</code>: <code>${args.rt}</code></div>`,
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
    resumeNumber: z.string(),
    at: z.string().optional(),
    rt: z.string().optional(),
    lang: z.string().optional(),
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
    if (!args.resumeNumber) {
      return {
        content: [
          {
            type: "text",
            text: "简历编号不能为空，提示用户检查是否登录，是否创建过简历",
          },
        ],
      };
    }
    const resumeDetail = await getResumeDetail({
      resumeNumber: args.resumeNumber,
      at: args.at,
      rt: args.rt,
      lang: args.lang,
    });
    if (resumeDetail.UnifiedPurpose && resumeDetail.UnifiedPurpose.length > 0) {
      return {
        content: [
          {
            type: "text",
            text: `期望工作地点: ${resumeDetail.UnifiedPurpose[0].preferredLocationFirstTranslation}\n期望工作行业: ${resumeDetail.UnifiedPurpose[0].pnewPreferredIndustryTranslation}\n期望工作性质: ${resumeDetail.UnifiedPurpose[0].preferredJobNatureTranslation}\n期望薪资: ${resumeDetail.UnifiedPurpose[0].preferredSalaryMin} 至 ${resumeDetail.UnifiedPurpose[0].preferredSalaryMax} 元`,
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
