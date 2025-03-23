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
export function collect2(data) {
    const result = {};
    for (const node of data) {
        if (node.deleted || node.name === '不限')
            continue;
        if (node.sublist?.length) {
            for (const subNode of node.sublist) {
                if (subNode.deleted || subNode.name === '不限')
                    continue;
                result[`${node.name}-${subNode.name}`] = subNode.code;
            }
        }
    }
    return result;
}
export function collect3(data) {
    const result = {};
    for (const node of data) {
        if (node.deleted || node.name === '不限')
            continue;
        if (node.sublist?.length) {
            for (const subNode of node.sublist) {
                if (subNode.deleted || subNode.name === '不限')
                    continue;
                result[`${node.name}-${subNode.name}`] = `${node.name}-${subNode.name}`;
            }
        }
    }
    return result;
}
function generateMetroMap(data) {
    const result = {};
    // 遍历第一级（城市）
    for (const level1 of data) {
        if (level1.deleted || level1.name === '不限')
            continue;
        // 遍历第二级（地铁线）
        for (const level2 of level1.sublist || []) {
            if (level2.deleted || level2.name === '不限')
                continue;
            // 遍历第三级（站点）
            for (const level3 of level2.sublist || []) {
                if (level3.deleted || level3.name === '不限')
                    continue;
                // 构造键和值
                const key = `${level1.name}-${level2.name}-${level3.name}`;
                const value = `${level3.code}-${level3.latitude}-${level3.longitude}`;
                result[key] = value;
            }
        }
    }
    return result;
}
