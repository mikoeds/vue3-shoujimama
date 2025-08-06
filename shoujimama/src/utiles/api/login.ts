import type { requestResult } from "../../types/request";
import { getRequest, pustRequest } from "../request"

const url = "/back/login"
// 获取token
export const postLogin = <T, D>(data: D): Promise<requestResult<T>> => {
    return pustRequest(url + "/login", data, "post");
}
// 刷新token
export const refreshToken = <T, D>(data: D): Promise<requestResult<T>> => {
    return pustRequest(url + "/refresh-login", data, "post")
}

// 获取验证码
export const getLoginCode = <T, D>(data: D): Promise<requestResult<T>> => {
    return getRequest(url + "/get-mobile-sms-code", data);
}