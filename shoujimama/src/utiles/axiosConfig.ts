import axios, { type AxiosResponse, type AxiosStatic, type InternalAxiosRequestConfig } from "axios"
import { AUTHORIZATION, WHITE_LIST } from "./config"
import { ref } from "vue";
import { refreshToken } from "./api/login";
import type { refreshParamType, refreshTokenType } from "../types/login";

export const axiosConfig = () => {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    // axios 请求拦截器
    handleAxiosRequestInterceptors(axios);
    // axios 响应拦截器
    handleAxiosResponseInterceptors(axios);
};

// 请求列表，解决重复请求问题
const requestMap: Map<string, AbortController> = new Map();

// 请求、响应拦截器具体实现
function handleAxiosRequestInterceptors(axios: AxiosStatic) {
    axios.interceptors.request.use(
        function (config: InternalAxiosRequestConfig) {
            if (!config.method || !config.url) {
                return config
            }
            // token添加
            const token = localStorage.getItem(AUTHORIZATION);
            if (token) {
                config.headers[AUTHORIZATION] = token
                return config;
            }
            // 加密算法
            // 取消重复请求
            const key = config.method + config.url;
            const controller = new AbortController();
            if (!handleMultiAxiosJudgment(config)) {
                config.signal = controller.signal
                if (requestMap.has(key)) {
                    requestMap.get(key)?.abort();
                    requestMap.set(key, controller);
                } else {
                    requestMap.set(key, controller);
                }
            }
            return config
        },
        // 处理请求错误
        function (error) {
            return Promise.reject(error)
        }
    )
};
function handleAxiosResponseInterceptors(axios: AxiosStatic) {
    axios.interceptors.response.use(async (response: AxiosResponse) => {
        if (!response.config.method || !response.config.url) {
            return response
        }
        // 请求列表删除
        const key = response.config.method + response.config.url;
        if (!handleMultiAxiosJudgment(response.config)) {
            requestMap.delete(key)
        }
        // 返回code处理
        // Token过期处理
        let refreshing = false
        const refreshParam = {
            refreshToken: ""
        }
        if (response.data.status === 2) {
            if (!refreshing) {
                refreshParam.refreshToken = localStorage.getItem("refreshToken") || ""
                refreshing = true;
                await refreshToken<refreshTokenType, refreshParamType>(refreshParam)
                .then((response)=>{
                    console.log(response);
                })
            }
        }
        // 错误处理
        return response
    })

};

// 检测请求是否为可多次请求的对象
function handleMultiAxiosJudgment({ method, url = "" }: InternalAxiosRequestConfig) {
    if (WHITE_LIST.includes(url)) return true
    if (method === "get") return false
    return true
};