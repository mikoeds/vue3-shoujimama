import type { listResult, requestResult } from "../../types/request"
import { deletRequest, getRequest, jsonRequest } from "../request"

const url = "/back/mall-goods"

// 获取上传token
export const getUploadToken = <T, D>(params?: D): Promise<requestResult<T>> => {
    return getRequest<T, D>(url + "/get-up-token", params);
}

// 获取商品信息
export const getGoodInfo = <T, D>(params?: D): Promise<requestResult<listResult<T>>> => {
    return getRequest<listResult<T>, D>(url, params);
}

// 根据ID获取商品详细属性
export const getGoodInfoById = <T, D>(id: number, params?: D): Promise<requestResult<T>> => {
    return getRequest<T, D>(url + "/" + id, params);
}

// 新增、修改商品
export const pustNewGoodInfo = <T, D>(data: D, method: string): Promise<requestResult<T>> => {
    return jsonRequest<T, D>(url, data, method);
}

// 删除商品
export const deletGoodInfo = <T, D>(params: D): Promise<requestResult<T>> => {
    return deletRequest<T, D>(url, params);
}

// 状态修改
export const changeGoodStatus = <T, D>(data: D): Promise<requestResult<T>> => {
    return jsonRequest<T, D>(url + "/change-status", data, "PUT");
}