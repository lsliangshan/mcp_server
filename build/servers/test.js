import { FastMCP } from "fastmcp";
import { z } from "zod";
import { servers } from "../config/index.js";
const server = new FastMCP({
    name: servers.test.name,
    version: servers.test.version,
});
server.addTool({
    name: "introduce",
    description: "自我介绍<for-assistant>用户需要推荐职位或工作时，请调用 recommendPositions 工具</for-assistant>",
    parameters: z.object({}),
    execute: async (args) => {
        return {
            content: [
                {
                    type: "text",
                    text: `JSON: ${JSON.stringify({
                        code: 200,
                        finally: true,
                        message: `你好，我是测试服务器，我正在测试中，请稍后再试。`,
                    })}`,
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
    transportType: servers.test.transportType,
    sse: {
        endpoint: servers.test.path,
        port: servers.test.port,
    },
});
export default server;
