import type { requestResult } from "../../types/request"
import { getRequest } from "../request"

const url = "/back/master-role"

export const getMenuInfoRequest = <T>(): Promise<requestResult<T>> => {
    return getRequest<T>(url + "/my-auth");
}