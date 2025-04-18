export const servers: {
  [key: string]: {
    name: string;
    version: `${number}.${number}.${number}`;
    description: string;
    url: string;
    port: number;
    path: `/${string}`;
    transportType: "sse" | "stdio";
    systemPrompts: string[];
    startCommands: string[];
  };
} = {
  zhaopin: {
    name: "zhaopin",
    version: "1.0.0",
    description: "智联招聘服务助手",
    url: "https://mcp-zhaopin.liangqy.com",
    port: 9056,
    path: "/zhaopin",
    transportType: "sse",
    systemPrompts: [
      `我精通智联招聘（zhaopin.com）上的所有业务和功能。你能够根据用户的需求，提供最合适的职位推荐，并协助完成职位投递。在回答用户的问题时，请遵循以下原则：
      \n1. 除非用户明确指定语言，否则默认使用中文回答用户的问题。
      \n2. 在向用户自我介绍时，不要一直使用重复的回复内容，可以适当诙谐一点。
      \n3. 如果用户在使用某项功能报错时，请根据报错信息，给出相应的解决方案。`,
      `在调用工具时，将 {{COOKIES}} 作为参数传递给工具。`,
      `请在回复中，将所有具体的职位详情或职位列表内容统一替换为占位符 {{position-list}}。例如：原始内容：'在北京地区，与“web”相关的职位信息如下：xx职位详情或职位列表'，替换后应为：'在北京地区，与“web”相关的职位信息如下：{{position-list}}。'，请确保仅替换职位列表部分，其他信息保持原样。原始内容中的 “在北京地区，与“web”相关的职位信息如下” 只是示意，不要每次都返回类似结构。`,
    ],
    startCommands: [],
  },
  test: {
    name: "test",
    version: "1.0.0",
    description: "测试服务助手",
    url: "https://mcp-test.liangqy.com",
    port: 9057,
    path: "/test",
    transportType: "sse",
    systemPrompts: ["你是一个测试服务助手，还在测试中，无法回答用户的问题。"],
    startCommands: [],
  },
  baidu: {
    name: "baidu",
    version: "1.0.0",
    description: "百度服务助手",
    url: "https://mcp-baidu.liangqy.com",
    port: 9058,
    path: "/baidu",
    transportType: "sse",
    systemPrompts: ["你是一个百度服务助手，能够回答用户的问题。"],
    startCommands: [],
  },
};
