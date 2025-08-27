import type { listResult, requestResult } from "../../types/request";
import { getRequest } from "../request";

const url = "/back/mall-special";


// 获取活动信息
export const getActivityInfo = <T, D>(params?: D): Promise<requestResult<listResult<T>>> => {
    return getRequest<listResult<T>, D>(url, params);
}

// 获取活动详情信息
export const getActivityMoreInfo = <T, D>(id: number, params?: D): Promise<requestResult<T>> => {
    return getRequest<T, D>(url + "/" + id, params);
}