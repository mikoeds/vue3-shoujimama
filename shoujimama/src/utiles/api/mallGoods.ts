import type { requestResult } from "../../types/request"
import { getRequest } from "../request"

const url = "/back/mall-goods"

// 获取上传token
export const getUploadToken = <T, D>(params?: D): Promise<requestResult<T>> => {
    return getRequest<T, D>(url + "/get-up-token", params);
}