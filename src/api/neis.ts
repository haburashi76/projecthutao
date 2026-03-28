//https://github.com/my-school-info/neis-api

//MIT License

//Copyright (c) 2021 MY-SCHOOL.INFO

//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:

//    The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.

//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.

//MIT License
//Copyright (c) 2021 MY-SCHOOL.INFO
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//    The above copyright notice and this permission notice shall be included in all
//copies or substantial portions of the Software.
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//SOFTWARE.

import type {IMealInfoRequest, ISchoolInfoRequest} from "@my-school.info/neis-api/src/interpaces/request.js";
import type {IConfig} from "@my-school.info/neis-api/src/interpaces/index.js";
import type {
    IMealInfoResponse, IMealInfoRow,
    ISchoolInfoResponse,
    ISchoolInfoRow
} from "@my-school.info/neis-api/src/interpaces/response.js";
import axios, {type AxiosInstance } from "axios";
import {authKey} from "../privateInformations.js"
import {schoolName} from "../openInformations.js";


const api: AxiosInstance = axios.default.create({
    baseURL: "https://open.neis.go.kr/hub",
    params: { authKey: authKey, Type: "json" }
})

async function getSchoolInfo(args: ISchoolInfoRequest, config?: IConfig): Promise<ISchoolInfoRow[]> {
    if (Object.keys(args).length <= 0) throw new Error("최소 1개 이상의 신청인자가 필요합니다.");

    const {data} = await api.get("/schoolInfo", {params: {...config, ...args}});
    const schoolInfo: ISchoolInfoResponse = data.schoolInfo;

    if (schoolInfo) {
        return schoolInfo[1].row;
    } else {
        throw new Error(data.RESULT.CODE + " " + data.RESULT.MESSAGE);
    }
}

async function getMealInfo(args: IMealInfoRequest, config?: IConfig): Promise<IMealInfoRow[]> {
    if (!args.ATPT_OFCDC_SC_CODE || !args.SD_SCHUL_CODE) throw new Error("시도교육청코드, 표준학교코드 인자 값이 필요합니다.");

    const {data} = await api.get("/mealServiceDietInfo", {params: {...config, ...args}});

    const mealInfo: IMealInfoResponse = data.mealServiceDietInfo;

    if (mealInfo) {
        return mealInfo[1].row;
    } else {
        throw new Error(data.RESULT.CODE + " " + data.RESULT.MESSAGE);
    }
}

const school = await getSchoolInfo({
    SCHUL_NM: schoolName
})

export const getMealInformation = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()+1
    return info(month, year)
}

export const getMealInformationCustom = (year: number, month: number) => {
    return info(month, year)
}
function info(month: number, year: number) {
    let monthString
    if (month.toString().length == 1) monthString = `0${month.toString()}`; else monthString = month.toString();
    return getMealInfo({
        ATPT_OFCDC_SC_CODE: school[0]!.ATPT_OFCDC_SC_CODE!,
        SD_SCHUL_CODE: school[0]!.SD_SCHUL_CODE!,
        MLSV_FROM_YMD: `${year}${monthString}01`,
        MLSV_TO_YMD: `${year}${monthString}${lastDay(year, month)}`
    })
}

function lastDay(year: number, month: number) {
    return new Date(year, month+1, 0).getDate();
}

