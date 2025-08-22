import type { requestResult } from "../../types/request"
import { getRequest } from "../request"

const url = "/back/dict-config"

// 获取字典数据
export const getDicData = <T, D>(params?: D): Promise<requestResult<T>> => {
    return getRequest<T, D>(url, params);
}
