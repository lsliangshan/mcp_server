import {
  findCity,
  findCounty,
  findProvince,
  findSubway,
  findSubwayStation,
} from "../tools/db.js";
import {
  companySizes,
  companyTypes,
  educationTypes,
  industries,
  jobDeliveredStatus,
  JobSearchConditionMap,
  jobStatuses,
  jobTypes,
  orders,
  salaryTypes,
  workExpTypes,
} from "../types/types.js";

const BASE32_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUV";

// 将字符转换为32进制
function toBase32Char(binaryStr: string) {
  const decimalValue = parseInt(binaryStr, 2);
  return BASE32_CHARS.charAt(decimalValue);
}

// 将字符串转换为32进制字符串
export function stringToBase32(str: string) {
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

export function getWorkExpCodeByYear(year: number) {
  if (year < 1) {
    return "0000";
  } else if (year >= 1 && year < 3) {
    return "0103";
  } else if (year >= 3 && year < 5) {
    return "0305";
  } else if (year >= 5 && year < 10) {
    return "0510";
  } else {
    return "1099";
  }
}

// 组装搜索用的请求参数
export function formatRequestParams(args: any, resumeNumber: string) {
  // 多返回一个  cityCode 和 cityAreaCode，用于后续拼装 全部职位链接，不用于接口请求
  let params: any = {
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
      jobTypes[args.jobType as keyof typeof jobTypes];
  }
  if (args.order) {
    params[JobSearchConditionMap.order] =
      orders[args.order as keyof typeof orders];
  }
  if (args.industry) {
    params[JobSearchConditionMap.industry] = args.industry
      .map((item: any) => industries[item as keyof typeof industries])
      .filter((item: any) => item)
      .join(";");
  }

  if (args.subwayStation) {
    const station: any = findSubwayStation(args.subwayStation, args.subway);
    if (station.type === "station") {
      params[JobSearchConditionMap.workLocation] = station.cityCode;
      params[JobSearchConditionMap.subway] = station.parentCode;
      params[JobSearchConditionMap.subwayStation] = station.code;
      params[
        JobSearchConditionMap.coordinate
      ] = `${station.latitude};${station.longitude};5`;
    }
  } else if (args.subway) {
    const subway: any = findSubway(args.subway, args.city);
    if (subway.type === "subway") {
      params[JobSearchConditionMap.workLocation] = subway.cityCode;
      params[JobSearchConditionMap.subway] = subway.code;
    }
  } else if (args.county) {
    const county: any = findCounty(args.county, args.city);
    if (county.type === "county") {
      params[JobSearchConditionMap.workLocation] = county.code;
      params.cityAreaCode = county.code;
    } else {
      if (county.type === "subway") {
        params[JobSearchConditionMap.workLocation] = county.cityCode;
        params[JobSearchConditionMap.subway] = county.code;
      } else if (county.type === "station") {
        params[JobSearchConditionMap.workLocation] = county.cityCode;
        params[JobSearchConditionMap.subway] = county.parentCode;
        params[JobSearchConditionMap.subwayStation] = county.code;
        params[
          JobSearchConditionMap.coordinate
        ] = `${county.latitude};${county.longitude};5`;
      }
    }
  } else if (args.city) {
    const city: any = findCity(args.city);
    if (city.type === "city") {
      params[JobSearchConditionMap.workLocation] = city.code;
    } else if (city.type === "county") {
      params[JobSearchConditionMap.workLocation] = city.code;
      params.cityAreaCode = city.code;
    } else if (city.type === "subway") {
      params[JobSearchConditionMap.subway] = city.code;
    } else if (city.type === "station") {
      params[JobSearchConditionMap.subwayStation] = city.code;
    }
  } else if (args.province) {
    const province: any = findProvince(args.province);
    params[JobSearchConditionMap.workLocation] = province.code;
  }

  if (args.city) {
    const city: any = findCity(args.city);
    if (city.type === "city") {
      params.cityCode = city.code;
    }
  } else if (args.province) {
    const province: any = findProvince(args.province);
    params.cityCode = province.code;
  }

  if (args.salaryType) {
    params[JobSearchConditionMap.salaryType] = args.salaryType;
  }
  if (args.educationType) {
    params[JobSearchConditionMap.educationType] =
      educationTypes[args.educationType as keyof typeof educationTypes];
  }
  if (args.workExpType) {
    params[JobSearchConditionMap.workExpType] =
      workExpTypes[args.workExpType as keyof typeof workExpTypes];
  }
  if (args.jobStatus) {
    params[JobSearchConditionMap.jobStatus] =
      jobStatuses[args.jobStatus as keyof typeof jobStatuses];
  }
  if (args.companyType) {
    params[JobSearchConditionMap.companyType] =
      companyTypes[args.companyType as keyof typeof companyTypes];
  }
  if (args.companySize) {
    params[JobSearchConditionMap.companySize] =
      companySizes[args.companySize as unknown as keyof typeof companySizes];
  }
  if (!params.at || params.at == "undefined") {
    delete params.at;
  }
  if (!params.rt || params.rt == "undefined") {
    delete params.rt;
  }
  return params;
}

export function formatSalaryType(salary: string) {
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
  } else {
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

export function formatMorePositionsUrl(
  params: any,
  cityCode: string,
  cityAreaCode: string
) {
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
export function formatMorePositionsUrlWithPurpose(
  params: any,
  cityCode: string,
  cityAreaCode: string,
  resumeDetail: any
) {
  const moreUrls: any[] = [];
  const baseUrl = `https://www.zhaopin.com/sou`;

  resumeDetail.UnifiedPurpose.forEach((item: any) => {
    let moreUrl = `${baseUrl}`;
    if (params.S_SOU_WORK_CITY) {
      moreUrl += `/jl${cityCode}`;
    } else {
      moreUrl += `/jl${item.preferredCityDistrict.split(":").pop()}`;
    }
    if (params.S_SOU_JD_JOB_LEVEL3) {
      moreUrl += `/jt${params.S_SOU_JD_JOB_LEVEL3}`;
    } else {
      moreUrl += `/jt${item.newPreferredJobType}`;
    }
    if (params.S_SOU_JD_INDUSTRY_LEVEL) {
      moreUrl += `/in${params.S_SOU_JD_INDUSTRY_LEVEL}`;
    } else {
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
    } else {
      const st2 = formatSalaryType(item.preferredSalary);
      queryParams.push(`sl=${st2}`);
    }

    if (params.S_SOU_EDUCATION_LOWESTLEVEL) {
      queryParams.push(`el=${params.S_SOU_EDUCATION_LOWESTLEVEL}`);
    } else {
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

export function translateToPositions(delivered: any, total: number) {
  return {
    data: {
      list: delivered.map((item: any) => ({
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
export function jobCardTemplate(
  jobInfo: any,
  type: "card-list" | "delivery-list" = "card-list"
) {
  let btn = "";
  if (type === "delivery-list") {
    btn = `<div class="owlscript-job-card-btn-status">${
      jobDeliveredStatus[jobInfo.msgType.toString()]
    }</div>`;
  } else {
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
        <div class="owlscript-job-card-line2-experience">${
          jobInfo.workingExp == "不限" ? "经验不限" : jobInfo.workingExp
        }</div>
        <div class="owlscript-job-card-line2-education">${
          jobInfo.education == "不限" ? "学历不限" : jobInfo.education
        }</div>
        ${
          jobInfo.jobSkillTags.length > 0
            ? `${jobInfo.jobSkillTags
                .map(
                  (itm: any) =>
                    `<div class="owlscript-job-card-line2-job-skill-tags">${itm.name}</div>`
                )
                .join("")}`
            : ""
        }
      </div>
      <div class="owlscript-job-card-line3">
        ${
          jobInfo.companyLogo
            ? `<div class="owlscript-job-card-line3-company-logo"><img src="${jobInfo.companyLogo}" alt="${jobInfo.companyName}" /></div>`
            : ""
        }
        <div class="owlscript-job-card-line3-company-name">
          <a href="${jobInfo.companyUrl}" target="_blank">${
    jobInfo.companyName
  }</a>
        </div>
      </div>
      <div class="owlscript-job-card-line4">
        <div class="owlscript-job-card-line4-left">
          <div class="owlscript-job-card-line4-left-top">
            <div class="owlscript-job-card-line4-left-top-company-industry">${
              jobInfo.industryName
            }</div>
            <div class="owlscript-job-card-line4-left-top-company-type">${
              jobInfo.propertyName
            }</div>
            <div class="owlscript-job-card-line4-left-top-company-size">${
              jobInfo.companySize
            }</div>
          </div>
          <div class="owlscript-job-card-line4-left-bottom">
            <div class="owlscript-job-card-line4-left-bottom-address">${
              jobInfo.workCity
            }${jobInfo.cityDistrict ? " " + jobInfo.cityDistrict : ""}${
    jobInfo.tradingArea ? " " + jobInfo.tradingArea : ""
  }${jobInfo.streetName ? " " + jobInfo.streetName : ""}</div>
              ${
                type === "delivery-list"
                  ? `<div class="owlscript-job-card-line4-left-bottom-time">${jobInfo.msgTime}</div>`
                  : ""
              }
          </div>
        </div>
        <div class="owlscript-job-card-line4-right">
          ${btn}
        </div>
      </div>
    </div>
    `;
}

export function formatResponsePositionsTemplate(params: {
  positionResponse: any;
  pageIndex: number;
  pageSize: number;
  moreUrl?: string;
  type: "card-list" | "delivery-list";
}) {
  const {
    positionResponse,
    pageIndex,
    pageSize,
    moreUrl,
    type = "card-list",
  } = params;

  let cardsTemplate = positionResponse.data.list
    .map((item: any) => jobCardTemplate(item, type))
    .join("")
    .replaceAll("\n", "");
  let tip1 = "";
  if (type === "delivery-list") {
    tip1 =
      "共查询到 <span class='primary-color'>" +
      positionResponse.data.count +
      "</span> 个投递记录";
  } else {
    tip1 =
      "共为您匹配到 <span class='primary-color'>" +
      positionResponse.data.count +
      "</span> 个符合要求的职位";
  }
  let tip2 = "";
  if (type === "delivery-list") {
    tip2 = "查看全部投递记录";
  } else {
    tip2 = "查看全部职位";
  }

  const beforeTemplate = `<div class="owlscript-positions-tip">
        <div class="owlscript-positions-tip-left">
          <div class="owlscript-positions-tip-left-top">${tip1}</div>
          <div class="owlscript-positions-tip-left-bottom">第 <p class="owlscript-positions-tip-left-bottom-page-index">${pageIndex}</p> 页，共 <p class="owlscript-positions-tip-left-bottom-page-total">${Math.ceil(
    positionResponse.data.count / pageSize
  )}</p> 页</div>
        </div>
        <div class="owlscript-positions-tip-right">
          ${
            moreUrl
              ? '<a class="owlscript-job-card-more" href="' +
                moreUrl +
                '" target="_blank">' +
                tip2 +
                "</a>"
              : '<a href="javascript:void(0)" target="_blank"></a>'
          }
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

export function formatSalary(salary: string) {
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
export function getHighestEducation(education: any) {
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
    .map((item: any) => `${item.eduBackground}`)
    .sort(
      (a: any, b: any) => educationList.indexOf(a) - educationList.indexOf(b)
    );
  return educationIndexs[0];
}
