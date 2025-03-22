export function getResumeDetail(params) {
    return new Promise(async (resolve) => {
        const { at, rt, resumeNumber, lang = "1" } = params;
        const apiUrl = `https://fe-api.zhaopin.com/c/i/resume?resumeNumber=${resumeNumber}&lang=${lang}&at=${at}&rt=${rt}`;
        const response = await fetch(apiUrl, {
            method: "GET",
        });
        const data = await response.json();
        if (data.code == 200 && data.data) {
            // 请求成功
            resolve(data.data);
        }
        else {
            // 请求失败
            resolve({});
        }
    });
}
export function getResumeNumber(params) {
    return new Promise(async (resolve) => {
        const { at, rt } = params;
        const apiUrl = `https://fe-api.zhaopin.com/c/i/user/detail?detail=true&at=${at}&rt=${rt}`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (data.code == 200 &&
            data.data &&
            data.data.Resume &&
            data.data.Resume.ResumeNumber) {
            resolve({
                resumeNumber: data.data.Resume.ResumeNumber,
                resumeId: data.data.Resume.Id,
            });
        }
        else {
            resolve({
                resumeNumber: "",
                resumeId: "",
            });
        }
    });
}
export function getJobDelivered(params) {
    return new Promise(async (resolve) => {
        const { at, rt, status, pageIndex = 1, pageSize = 20 } = params;
        const apiUrl = `https://fe-api-pre.zhaopin.com/c/i/schedule/feedback?index=${pageIndex}&pageSize=${pageSize}&status=${status}&storeViewCount=false&at=${at}&rt=${rt}`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (data.code == 200 &&
            data.data &&
            data.data.code == 200 &&
            data.data.data) {
            resolve({
                code: 200,
                data: data.data.data,
                total: data.data.total,
            });
        }
        else {
            resolve({
                code: data.code,
                data: [],
                total: 0,
            });
        }
    });
}
