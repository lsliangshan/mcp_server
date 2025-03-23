export function collectIndustryNames(data) {
    const result = {};
    const traverse = (nodes) => {
        for (const node of nodes) {
            // 跳过已删除项和"不限"项
            if (node.deleted || node.name === '不限')
                continue;
            // 添加当前节点名称
            result[node.name] = node.code;
            // 递归处理子列表
            if (node.sublist?.length) {
                traverse(node.sublist);
            }
        }
    };
    traverse(data);
    return result;
}
