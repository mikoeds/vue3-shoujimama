import type { requestResult } from "../../types/request";
import { getRequest } from "../request";

/* 获取 省市县 地址 */
const url = "/back/region/get-region-list";
/* 省市县数据：获取 市县信息 */
export const getRegionInfo = <T, D>(params?: D): Promise<requestResult<T>> => {
    return getRequest<T, D>(url, params);
};
