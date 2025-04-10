import { findCity, findCounty, findProvince, findSubway, findSubwayStation, } from "../tools/db.js";
import { getResumeDetail, getResumeNumber } from "../tools/zhaopin.js";
import { companySizes, companyTypes, educationTypes, industries, jobDeliveredStatus, JobSearchConditionMap, jobStatuses, jobTypes, orders, salaryTypes, workExpTypes, } from "../types/types.js";
const BASE32_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUV";
// 将字符转换为32进制
function toBase32Char(binaryStr) {
    const decimalValue = parseInt(binaryStr, 2);
    return BASE32_CHARS.charAt(decimalValue);
}
// 将字符串转换为32进制字符串
export function stringToBase32(str) {
    let binaryStr = "";
    for (let i = 0; i < str.length; i++) {
        const binaryChar = str.charCodeAt(i).toString(2).padStart(16, "0");
        binaryStr += binaryChar;
    }
    // 补齐至5的倍数长度
    binaryStr = binaryStr.padEnd(Math.ceil(binaryStr.length / 5) * 5, "0");
    let base32Str = "";
    for (let i = 0; i < binaryStr.length; i += 5) {
        const chunk = binaryStr.substring(i, i + 5);
        base32Str += toBase32Char(chunk);
    }
    return base32Str;
}
export function getWorkExpCodeByYear(year) {
    if (year < 1) {
        return "0000";
    }
    else if (year >= 1 && year < 3) {
        return "0103";
    }
    else if (year >= 3 && year < 5) {
        return "0305";
    }
    else if (year >= 5 && year < 10) {
        return "0510";
    }
    else {
        return "1099";
    }
}
// 组装搜索用的请求参数
export function formatRequestParams(args, resumeNumber) {
    // 多返回一个  cityCode 和 cityAreaCode，用于后续拼装 全部职位链接，不用于接口请求
    let params = {
        // eventScenario: "pcSearchedSouSearch",
        at: args.at,
        rt: args.rt,
        cvNumber: resumeNumber || "",
        pageIndex: args.pageIndex || 1,
        pageSize: args.pageSize || 20,
        cityCode: "",
        cityAreaCode: "",
    };
    if (args.keyword) {
        params[JobSearchConditionMap.keyword] = args.keyword;
    }
    if (args.jobType) {
        params[JobSearchConditionMap.jobType] =
            jobTypes[args.jobType];
    }
    if (args.order) {
        params[JobSearchConditionMap.order] =
            orders[args.order];
    }
    if (args.industry) {
        params[JobSearchConditionMap.industry] = args.industry
            .map((item) => industries[item])
            .filter((item) => item)
            .join(";");
    }
    if (args.subwayStation) {
        const station = findSubwayStation(args.subwayStation, args.subway);
        if (station.type === "station") {
            params[JobSearchConditionMap.workLocation] = station.cityCode;
            params[JobSearchConditionMap.subway] = station.parentCode;
            params[JobSearchConditionMap.subwayStation] = station.code;
            params[JobSearchConditionMap.coordinate] = `${station.latitude};${station.longitude};5`;
        }
    }
    else if (args.subway) {
        const subway = findSubway(args.subway, args.city);
        if (subway.type === "subway") {
            params[JobSearchConditionMap.workLocation] = subway.cityCode;
            params[JobSearchConditionMap.subway] = subway.code;
        }
    }
    else if (args.county) {
        const county = findCounty(args.county, args.city);
        if (county.type === "county") {
            params[JobSearchConditionMap.workLocation] = county.code;
            params.cityAreaCode = county.code;
        }
        else {
            if (county.type === "subway") {
                params[JobSearchConditionMap.workLocation] = county.cityCode;
                params[JobSearchConditionMap.subway] = county.code;
            }
            else if (county.type === "station") {
                params[JobSearchConditionMap.workLocation] = county.cityCode;
                params[JobSearchConditionMap.subway] = county.parentCode;
                params[JobSearchConditionMap.subwayStation] = county.code;
                params[JobSearchConditionMap.coordinate] = `${county.latitude};${county.longitude};5`;
            }
        }
    }
    else if (args.city) {
        const city = findCity(args.city);
        if (city.type === "city") {
            params[JobSearchConditionMap.workLocation] = city.code;
        }
        else if (city.type === "county") {
            params[JobSearchConditionMap.workLocation] = city.code;
            params.cityAreaCode = city.code;
        }
        else if (city.type === "subway") {
            params[JobSearchConditionMap.subway] = city.code;
        }
        else if (city.type === "station") {
            params[JobSearchConditionMap.subwayStation] = city.code;
        }
    }
    else if (args.province) {
        const province = findProvince(args.province);
        params[JobSearchConditionMap.workLocation] = province.code;
    }
    if (args.city) {
        const city = findCity(args.city);
        if (city.type === "city") {
            params.cityCode = city.code;
        }
    }
    else if (args.province) {
        const province = findProvince(args.province);
        params.cityCode = province.code;
    }
    if (args.salaryType) {
        params[JobSearchConditionMap.salaryType] = args.salaryType;
    }
    if (args.educationType) {
        params[JobSearchConditionMap.educationType] =
            educationTypes[args.educationType];
    }
    if (args.workExpType) {
        params[JobSearchConditionMap.workExpType] =
            workExpTypes[args.workExpType];
    }
    if (args.jobStatus) {
        params[JobSearchConditionMap.jobStatus] =
            jobStatuses[args.jobStatus];
    }
    if (args.companyType) {
        params[JobSearchConditionMap.companyType] =
            companyTypes[args.companyType];
    }
    if (args.companySize) {
        params[JobSearchConditionMap.companySize] =
            companySizes[args.companySize];
    }
    if (!params.at || params.at == "undefined") {
        delete params.at;
    }
    if (!params.rt || params.rt == "undefined") {
        delete params.rt;
    }
    return params;
}
export function formatSalaryType(salary) {
    // let salaryType = salary;
    // if (salary.indexOf(",") < 0) {
    //   salaryType =
    //     salary.slice(0, salary.length / 2) +
    //     "," +
    //     salary.slice(salary.length / 2);
    // }
    let salaryType = formatSalary(salary);
    if (salaryTypes.indexOf(salaryType) >= 0) {
        // 合法的 salaryType
        return salaryType;
    }
    // 不合法的 salaryType
    let s;
    const minSalary = Number(salary.split(",")[0]);
    const maxSalary = Number(salary.split(",")[1]);
    if (maxSalary >= 9999999) {
        s = minSalary;
    }
    else {
        s = maxSalary;
    }
    for (let i = 0; i < salaryTypes.length; i++) {
        const _minSalary = Number(salaryTypes[i].split(",")[0]);
        const _maxSalary = Number(salaryTypes[i].split(",")[1]);
        if (s >= _minSalary - 1 && s < _maxSalary) {
            salaryType = salaryTypes[i];
            break;
        }
    }
    return salaryType;
}
export function formatMorePositionsUrl(params, cityCode, cityAreaCode) {
    let moreUrl = `https://www.zhaopin.com/sou`;
    if (params.S_SOU_WORK_CITY) {
        moreUrl += `/jl${cityCode}`;
        // moreUrl += `/jl${params.S_SOU_WORK_CITY}`;
    }
    if (params.S_SOU_JD_JOB_LEVEL3) {
        moreUrl += `/jt${params.S_SOU_JD_JOB_LEVEL3}`;
    }
    if (params.S_SOU_JD_INDUSTRY_LEVEL) {
        moreUrl += `/in${params.S_SOU_JD_INDUSTRY_LEVEL}`;
    }
    if (params.S_SOU_FULL_INDEX) {
        moreUrl += `/kw${stringToBase32(params.S_SOU_FULL_INDEX)}`;
    }
    if (params.pageIndex) {
        moreUrl += `/p${params.pageIndex}`;
    }
    const paramsMap = {
        li: "S_SOU_SUBWAY_LINE",
        sc: "S_SOU_SUBWAY_STATION",
        sl: "S_SOU_SALARY",
        el: "S_SOU_EDUCATION_LOWESTLEVEL",
        we: "S_SOU_WORK_EXPERIENCE",
        et: "S_SOU_POSITION_TYPE",
        ct: "S_SOU_COMPANY_TYPE",
        cs: "S_SOU_COMPANY_SCALE",
        order: "order",
    };
    const queryParams = [];
    if (cityAreaCode) {
        queryParams.push(`re=${cityAreaCode}`);
    }
    if (params.S_SOU_SALARY) {
        const st = formatSalaryType(params.S_SOU_SALARY);
        queryParams.push(`sl=${st}`);
    }
    Object.entries(paramsMap).forEach(([key, value]) => {
        if (params[value] && key !== "sl") {
            queryParams.push(`${key}=${params[value]}`);
        }
    });
    moreUrl += `?${queryParams.join("&")}`;
    return moreUrl;
}
// 根据求职意向，组装搜索链接
// 多份求职意向，组装多个链接
export function formatMorePositionsUrlWithPurpose(params, cityCode, cityAreaCode, resumeDetail) {
    const moreUrls = [];
    const baseUrl = `https://www.zhaopin.com/sou`;
    resumeDetail.UnifiedPurpose.forEach((item) => {
        let moreUrl = `${baseUrl}`;
        if (params.S_SOU_WORK_CITY) {
            moreUrl += `/jl${cityCode}`;
        }
        else {
            moreUrl += `/jl${item.preferredCityDistrict.split(":").pop()}`;
        }
        if (params.S_SOU_JD_JOB_LEVEL3) {
            moreUrl += `/jt${params.S_SOU_JD_JOB_LEVEL3}`;
        }
        else {
            moreUrl += `/jt${item.newPreferredJobType}`;
        }
        if (params.S_SOU_JD_INDUSTRY_LEVEL) {
            moreUrl += `/in${params.S_SOU_JD_INDUSTRY_LEVEL}`;
        }
        else {
            moreUrl += `/in${item.newPreferredIndustry}`;
        }
        if (params.S_SOU_FULL_INDEX) {
            moreUrl += `/kw${params.S_SOU_FULL_INDEX}`;
        }
        if (params.pageIndex) {
            moreUrl += `/p${params.pageIndex}`;
        }
        const paramsMap = {
            li: "S_SOU_SUBWAY_LINE",
            sc: "S_SOU_SUBWAY_STATION",
            sl: "S_SOU_SALARY",
            el: "S_SOU_EDUCATION_LOWESTLEVEL",
            we: "S_SOU_WORK_EXPERIENCE",
            et: "S_SOU_POSITION_TYPE",
            ct: "S_SOU_COMPANY_TYPE",
            cs: "S_SOU_COMPANY_SCALE",
            order: "order",
        };
        const queryParams = [];
        if (cityAreaCode) {
            queryParams.push(`re=${cityAreaCode}`);
        }
        if (params.S_SOU_SALARY) {
            const st = formatSalaryType(params.S_SOU_SALARY);
            queryParams.push(`sl=${st}`);
        }
        else {
            const st2 = formatSalaryType(item.preferredSalary);
            queryParams.push(`sl=${st2}`);
        }
        if (params.S_SOU_EDUCATION_LOWESTLEVEL) {
            queryParams.push(`el=${params.S_SOU_EDUCATION_LOWESTLEVEL}`);
        }
        else {
            queryParams.push(`el=${getHighestEducation(item.education)}`);
        }
        Object.entries(paramsMap).forEach(([key, value]) => {
            if (params[value] && key !== "sl") {
                queryParams.push(`${key}=${params[value]}`);
            }
        });
        moreUrl += `?${queryParams.join("&")}`;
        moreUrls.push(moreUrl);
    });
    return moreUrls;
}
export function translateToPositions(delivered, total) {
    return {
        data: {
            list: delivered.map((item) => ({
                positionUrl: `https://jobs.zhaopin.com/${item.jobDetail.feedbackInfo.jobNumber}.htm`,
                name: item.jobTitle,
                salary60: item.salary,
                workingExp: item.jobDetail.feedbackInfo.workExperience,
                education: item.education,
                jobSkillTags: [],
                companyLogo: item.companyLogUrl,
                companyName: item.companyName,
                msgType: item.msgType,
                msgTime: item.jobDetail.feedbackInfo.msgTime,
                companyUrl: "",
                industryName: "",
                propertyName: "",
                companySize: "",
                workCity: item.city,
                cityDistrict: "",
                tradingArea: "",
                streetName: "",
                number: item.jobDetail.feedbackInfo.jobNumber,
            })),
            count: total,
        },
    };
    // return {
    //   positionUrl: `https://jobs.zhaopin.com/${delivered.jobDetail.feedbackInfo.jobNumber}.htm`,
    //   name: delivered.jobTitle,
    //   salary60: delivered.salary,
    //   workingExp: delivered.jobDetail.feedbackInfo.workExperience,
    //   education: delivered.education,
    //   jobSkillTags: [],
    //   companyLogo: delivered.companyLogUrl,
    //   companyName: delivered.companyName,
    //   companyUrl: '',
    //   industryName: '',
    //   propertyName: '',
    //   companySize: '',
    //   workCity: '',
    //   cityDistrict: '',
    //   tradingArea: '',
    //   streetName: '',
    //   number: delivered.jobDetail.feedbackInfo.jobNumber,
    // };
}
export function jobCardTemplate(jobInfo, type = "card-list") {
    let btn = "";
    if (type === "delivery-list") {
        btn = `<div class="owlscript-job-card-btn-status">${jobDeliveredStatus[jobInfo.msgType.toString()]}</div>`;
    }
    else {
        btn = `<div class="owlscript-job-card-btn-delivery" data-number="${jobInfo.number}" data-city="${jobInfo.workCity}">立即投递</div>`;
    }
    return `
    <div class="owlscript-job-card">
      <div class="owlscript-job-card-line1">
          <p class="owlscript-job-card-line1-title">
            <a href="${jobInfo.positionUrl}" target="_blank">${jobInfo.name}</a>
          </p>
          <p class="owlscript-job-card-line1-salary">${jobInfo.salary60}</p>
        </div>
      <div class="owlscript-job-card-line2">
        <div class="owlscript-job-card-line2-experience">${jobInfo.workingExp == "不限" ? "经验不限" : jobInfo.workingExp}</div>
        <div class="owlscript-job-card-line2-education">${jobInfo.education == "不限" ? "学历不限" : jobInfo.education}</div>
        ${jobInfo.jobSkillTags.length > 0
        ? `${jobInfo.jobSkillTags
            .map((itm) => `<div class="owlscript-job-card-line2-job-skill-tags">${itm.name}</div>`)
            .join("")}`
        : ""}
      </div>
      <div class="owlscript-job-card-line3">
        ${jobInfo.companyLogo
        ? `<div class="owlscript-job-card-line3-company-logo"><img src="${jobInfo.companyLogo}" alt="${jobInfo.companyName}" /></div>`
        : ""}
        <div class="owlscript-job-card-line3-company-name">
          <a href="${jobInfo.companyUrl}" target="_blank">${jobInfo.companyName}</a>
        </div>
      </div>
      <div class="owlscript-job-card-line4">
        <div class="owlscript-job-card-line4-left">
          <div class="owlscript-job-card-line4-left-top">
            <div class="owlscript-job-card-line4-left-top-company-industry">${jobInfo.industryName}</div>
            <div class="owlscript-job-card-line4-left-top-company-type">${jobInfo.propertyName}</div>
            <div class="owlscript-job-card-line4-left-top-company-size">${jobInfo.companySize}</div>
          </div>
          <div class="owlscript-job-card-line4-left-bottom">
            <div class="owlscript-job-card-line4-left-bottom-address">${jobInfo.workCity}${jobInfo.cityDistrict ? " " + jobInfo.cityDistrict : ""}${jobInfo.tradingArea ? " " + jobInfo.tradingArea : ""}${jobInfo.streetName ? " " + jobInfo.streetName : ""}</div>
              ${type === "delivery-list"
        ? `<div class="owlscript-job-card-line4-left-bottom-time">${jobInfo.msgTime}</div>`
        : ""}
          </div>
        </div>
        <div class="owlscript-job-card-line4-right">
          ${btn}
        </div>
      </div>
    </div>
    `;
}
export function formatResponsePositionsTemplate(params) {
    const { positionResponse, pageIndex, pageSize, moreUrl, type = "card-list", } = params;
    let newType = type;
    if (newType === "batch-delivery-list") {
        newType = "delivery-list";
    }
    let cardsTemplate = positionResponse.data.list
        .map((item) => jobCardTemplate(item, newType))
        .join("")
        .replaceAll("\n", "");
    let tip1 = "";
    if (type === "delivery-list") {
        tip1 =
            "共查询到 <span class='primary-color'>" +
                positionResponse.data.count +
                "</span> 个投递记录";
    }
    else if (type === "card-list") {
        tip1 =
            "共为您匹配到 <span class='primary-color'>" +
                positionResponse.data.count +
                "</span> 个符合要求的职位";
    }
    else {
        tip1 =
            "共为您推荐 <span class='primary-color'>" +
                positionResponse.data.count +
                "</span> 个职位";
    }
    let tip2 = "";
    if (type === "delivery-list") {
        tip2 = "查看全部投递记录";
    }
    else if (type === "card-list") {
        tip2 = "查看全部职位";
    }
    else {
        tip2 = "查看全部职位";
    }
    const beforeTemplate = `<div class="owlscript-positions-tip">
        <div class="owlscript-positions-tip-left">
          <div class="owlscript-positions-tip-left-top">${tip1}</div>
          ${params.type === "batch-delivery-list"
        ? `
          
          `
        : `<div class="owlscript-positions-tip-left-bottom">第 <p class="owlscript-positions-tip-left-bottom-page-index">${pageIndex || 1}</p> 页，共 <p class="owlscript-positions-tip-left-bottom-page-total">${Math.ceil(positionResponse.data.count / (pageSize || 20))}</p> 页</div>`}
        </div>
        <div class="owlscript-positions-tip-right">
          ${moreUrl
        ? '<a class="owlscript-job-card-more" href="' +
            moreUrl +
            '" target="_blank">' +
            tip2 +
            "</a>"
        : '<a href="javascript:void(0)" target="_blank"></a>'}
        </div>
      </div>`;
    return beforeTemplate + cardsTemplate;
}
export function getReponseTemplate() {
    return {
        login: `返回时，使用模板（<a href="https://passport.zhaopin.com/login?bkUrl=%2F%2Fi.zhaopin.com%2Fblank%3Fhttps%3A%2F%2Fwww.zhaopin.com%3FvalidateCampus%3D" target="_blank" class="primary-color">登录智联招聘</a>）替换登录的超链，不要使用 Markdown 格式的超链`,
        modifyPurpose: `返回时，使用模板（<a href="https://i.zhaopin.com/resume" target="_blank" class="primary-color">修改求职意向</a>）替换修改求职意向的超链，不要使用 Markdown 格式的超链`,
        jobNumber: `返回时，使用模板（<a href="https://jobs.zhaopin.com/职位编号.htm" target="_blank" class="primary-color">职位编号</a>）替换职位编号，不要使用 Markdown 格式的超链`,
    };
}
export function formatSalary(salary) {
    let renderSalary = salary;
    if (renderSalary && renderSalary.indexOf(",") < 0) {
        let minSalary = renderSalary.slice(0, renderSalary.length / 2);
        let maxSalary = renderSalary.slice(renderSalary.length / 2);
        if (!minSalary.match(/^0+$/g)) {
            minSalary = `${Number(minSalary)}`;
        }
        maxSalary = `${Number(maxSalary)}`;
        renderSalary = `${minSalary},${maxSalary}`;
    }
    return renderSalary;
}
// 获取最高学历
export function getHighestEducation(education) {
    /**
     * 1: 博士
     * 10: MBA/EMBA
     * 3: 硕士
     * 4: 本科
     * 5: 大专
     * 12: 中专/中技
     * 7: 高中
     * 9: 初中及以下
     */
    const educationList = ["1", "10", "3", "4", "5", "12", "7", "9"];
    const educationIndexs = education
        .map((item) => `${item.eduBackground}`)
        .sort((a, b) => educationList.indexOf(a) - educationList.indexOf(b));
    return educationIndexs[0];
}
export async function getPositionRecommendationParams(args) {
    const { resumeNumber } = await getResumeNumber({
        at: args.at,
        rt: args.rt,
    });
    // const resumeNumber =
    //   "EC9DAB87216F72DC3B910673E5810CED0A6A81B11C9C499B4DDAA14B590CC6C3B1CE91B9CB9DF31543D6C95C2F7B2258_A0001";
    const resumeInfo = await getResumeDetail({
        at: args.at,
        rt: args.rt,
        resumeNumber,
    });
    const defaultParams = {
        // S_SOU_JD_JOB_LEVEL3: "",
        S_SOU_FULL_INDEX: "", // M站接口用 S_SOU_FULL_INDEX，不用 S_SOU_JD_JOB_LEVEL3
        S_SOU_JD_INDUSTRY_LEVEL: "",
        S_SOU_WORK_CITY: "",
        S_SOU_SALARY: "",
        S_SOU_EDUCATION_LOWESTLEVEL: "",
        S_SOU_WORK_EXPERIENCE: "",
        S_SOU_POSITION_TYPE: "",
    };
    let workCity = "";
    let workCityArea = "";
    if (resumeInfo.unifiedPurposes && resumeInfo.unifiedPurposes.length > 0) {
        // 使用用户的全部求职意向
        let jt = resumeInfo.unifiedPurposes.map((item) => item.newPreferredJobType);
        defaultParams.S_SOU_JD_JOB_LEVEL3 = Array.from(new Set(jt)).join(";");
        let jt2 = resumeInfo.unifiedPurposes.map((item) => item.pnewPreferredJobTypeTranslation);
        defaultParams.S_SOU_FULL_INDEX = Array.from(new Set(jt2)).join(";");
        let ind = resumeInfo.unifiedPurposes
            .map((item) => item.newPreferredIndustry)
            .join(",");
        defaultParams.S_SOU_JD_INDUSTRY_LEVEL = Array.from(new Set(ind.split(","))).join(";");
        // M站搜索，S_SOU_WORK_CITY 用 市，不用区
        defaultParams.S_SOU_WORK_CITY = resumeInfo.unifiedPurposes
            .map((item) => item.preferredCityDistrict.split(":")[0])
            .join(";");
        // defaultParams.S_SOU_WORK_CITY = resumeInfo.unifiedPurposes
        //   .map((item: any) => item.preferredCityDistrict.split(":").pop())
        //   .join(";");
        [workCity, workCityArea = ""] =
            resumeInfo.unifiedPurposes[0].preferredCityDistrictTranslation.split("-");
        let s = resumeInfo.unifiedPurposes.map((item) => item.preferredSalary);
        defaultParams.S_SOU_SALARY = Array.from(new Set(s)).join(";");
        let js = resumeInfo.unifiedPurposes
            .map((item) => item.preferredJobNature)
            .join(",");
        defaultParams.S_SOU_POSITION_TYPE = Array.from(new Set(js.split(","))).join(";");
        // // 此处只取 第一份求职意向
        // defaultParams.S_SOU_JD_JOB_LEVEL3 =
        //   resumeInfo.unifiedPurposes[0].newPreferredJobType;
        // if (resumeInfo.unifiedPurposes[0].newPreferredIndustry) {
        //   defaultParams.S_SOU_JD_INDUSTRY_LEVEL =
        //     resumeInfo.unifiedPurposes[0].newPreferredIndustry;
        // } else {
        //   delete defaultParams.S_SOU_JD_INDUSTRY_LEVEL;
        // }
        // args.city = resumeInfo.unifiedPurposes[0].preferredLocationTranslation;
        // args.county =
        //   resumeInfo.unifiedPurposes[0].preferredCityDistrictTranslation
        //     .split("-")
        //     .pop();
        // defaultParams.S_SOU_WORK_CITY =
        //   resumeInfo.unifiedPurposes[0].preferredCityDistrict.split(":").pop();
        // defaultParams.S_SOU_SALARY = resumeInfo.unifiedPurposes[0].preferredSalary;
        // defaultParams.S_SOU_POSITION_TYPE =
        //   resumeInfo.unifiedPurposes[0].preferredJobNature;
    }
    if (resumeInfo.educationExperiences &&
        resumeInfo.educationExperiences.length > 0) {
        defaultParams.S_SOU_EDUCATION_LOWESTLEVEL = resumeInfo.educationExperiences
            .map((item) => item.eduBackground)
            .join(";");
    }
    if (resumeInfo.profile && resumeInfo.profile.length > 0) {
        defaultParams.S_SOU_WORK_EXPERIENCE = getWorkExpCodeByYear(resumeInfo.profile[0].yearWorkingTranslation);
    }
    let params = formatRequestParams({ ...args, city: workCity, county: workCityArea }, resumeNumber);
    params = {
        ...defaultParams,
        ...params,
    };
    let cityAreaCode = "";
    let cityCode = "";
    if (params.cityAreaCode) {
        cityAreaCode = params.cityAreaCode;
        delete params.cityAreaCode;
    }
    if (params.cityCode) {
        cityCode = params.cityCode;
        delete params.cityCode;
    }
    params.S_SOU_SALARY = formatSalary(params.S_SOU_SALARY);
    const moreUrl = resumeInfo.unifiedPurposes.length == 1
        ? formatMorePositionsUrl(params, cityCode, cityAreaCode)
        : "";
    return {
        params,
        moreUrl,
    };
}
