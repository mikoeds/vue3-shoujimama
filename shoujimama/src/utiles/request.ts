import axios from "axios"
import type { requestResult } from "../types/request"

/**
 * GET公共请求
 * @param {*} url 请求地址
 * @param {*} params 请求参数
 */
export const getRequest = <T, D = undefined>(url: string, parmas?: D) => {
    return new Promise<requestResult<T>>((resolve, reject) => {
        axios({
            method: "GET",
            url,
            params: parmas || {}
        }).then((response) => {
            console.log(response);
            
            if (response.status !== 200) {
                reject(response)
            }
            else {
                if (response.data.status === 0) {
                    reject(response.data.msg)
                } else {
                    resolve(response.data)
                }
            }
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}
/**
 * PUT\POST公共请求
 * @param {*} url 请求地址
 * @param {*} data 请求参数
 * @param {*} method 请求方法
 */
export const pustRequest = <T, D = undefined>(url: string, data: D, method:string) => {
    return new Promise<requestResult<T>>((resolve, reject) => {
        axios({
            method,
            url,
            data,
            // 编码转换(key=data&...)
            transformRequest :[
                (data)=>{
                    let result = "";
                    for(const item in data){
                        result += encodeURIComponent(item) + "=" + encodeURIComponent(data[item]) + "&";
                    }
                    return result;
                }
            ]
        }).then((response) => {
            console.log(response);
            
            if (response.status !== 200) {
                reject(response)
            }
            else {
                if (response.data.status === 0) {
                    reject(response.data.msg)
                } else {
                    resolve(response.data)
                }
            }
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

/**
 * JSON公共请求(post/put)
 * @param {*} url 请求地址
 * @param {*} data 请求参数
 */
export const jsonRequest = <T, D = undefined>(url: string, data: D, method:string) => {
    return new Promise<requestResult<T>>((resolve, reject) => {
        axios({
            method,
            url,
            data
        }).then((response) => {
            console.log(response);
            
            if (response.status !== 200) {
                reject(response)
            }
            else {
                if (response.data.status === 0) {
                    reject(response.data.msg)
                } else {
                    resolve(response.data)
                }
            }
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

/**
 * DELETE公共请求
 * @param {*} url 请求地址
 * @param {*} data 请求参数
 */
export const deletRequest = <T, D>(url: string, params: D) => {
    return new Promise<requestResult<T>>((resolve, reject) => {
        axios({
            method: "DELETE",
            url,
            params
        }).then((response) => {
            console.log(response);
            
            if (response.status !== 200) {
                reject(response)
            }
            else {
                if (response.data.status === 0) {
                    reject(response.data.msg)
                } else {
                    resolve(response.data)
                }
            }
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}