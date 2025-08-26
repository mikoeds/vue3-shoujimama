import type { listResult, requestResult } from "../../types/request";
import { deletRequest, getRequest, jsonRequest } from "../request";

const url = "/back/mall-activity-red-packet-purchase";


// 获取活动信息
export const getMallRedEnvelopeInfo = <T, D>(params?: D): Promise<requestResult<listResult<T>>> => {
    return getRequest<listResult<T>, D>(url, params);
}

// 获取活动详情信息
export const getMallRedEnvelopemoreInfo = <T, D>(id:number, params?: D): Promise<requestResult<T>> => {
    return getRequest<T, D>(url + '/' + id, params);
}

// 新增、修改活动
export const addMallRedEnvelopeGood = <T, D>(data: D, method:string): Promise<requestResult<T>> => {
    return jsonRequest<T, D>(url, data, method);
}

// 删除活动
export const deletMallRedEnvelope = <T, D>(params: D): Promise<requestResult<T>> => {
    return deletRequest<T, D>(url, params);
}

