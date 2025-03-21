import { FastMCP } from "fastmcp";
import { z } from "zod";

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
