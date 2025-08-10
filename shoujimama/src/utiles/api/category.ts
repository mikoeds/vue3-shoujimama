import type { requestResult } from "../../types/request"
import { getRequest } from "../request"

const url = "/back/mall-category"

export const getCategoryInfo = <T, D>(params?: D): Promise<requestResult<T>> => {
    return getRequest<T, D>(url, params);
}