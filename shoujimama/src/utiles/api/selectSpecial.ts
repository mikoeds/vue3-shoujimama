import type { listResult, requestResult } from "../../types/request";
import { deletRequest, getRequest, jsonRequest } from "../request";

const url = "/back/mall-special";


// 获取活动信息
export const getActivityInfo = <T, D>(params?: D): Promise<requestResult<listResult<T>>> => {
    return getRequest<listResult<T>, D>(url, params);
}

// 获取活动详情信息
export const getActivityMoreInfo = <T, D>(id: number, params?: D): Promise<requestResult<T>> => {
    return getRequest<T, D>(url + "/" + id, params);
}

// 增加、修改活动信息
export const addActivityInfo = <T, D>(data: D, method: string): Promise<requestResult<T>> => {
    return jsonRequest<T, D>(url, data, method);
}

// 删除活动信息
export const deletActivityInfo = <T, D>(params: D): Promise<requestResult<T>> => {
    return deletRequest<T, D>(url, params);
}