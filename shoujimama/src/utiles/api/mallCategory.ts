import type { requestResult } from "../../types/request"
import { deletRequest, getRequest, jsonRequest, pustRequest } from "../request"

const url = "/back/mall-category"

// 获取商品信息
export const getCategoryInfo = <T, D>(params?: D): Promise<requestResult<T>> => {
    return getRequest<T, D>(url, params);
}

// 新增、修改商品分类信息
export const addCategoryInfo = <T, D>(method: string, data: D): Promise<requestResult<T>> => {
    return jsonRequest<T, D>(url, data, method);
}

// 删除商品分类
export const deletCategoryInfo = <T, D>(data: D): Promise<requestResult<T>> => {
    return deletRequest<T, D>(url, data);
}