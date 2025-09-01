import type { requestResult } from "../../types/request";
import { getRequest } from "../request";

const url = "/back/mall-deliver"

// 获取运费数据
export const getDeliverData = <T, D>(params?: D): Promise<requestResult<T>> => {
    return getRequest<T, D>(url, params);
}

// 获取运费详情数据
export const getDeliverMoreData = <T, D>(id:number,params?: D): Promise<requestResult<T>> => {
    return getRequest<T, D>(url + "/" + id, params);
}