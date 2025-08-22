import type { Ref } from "vue"
import { getDicData } from "../utiles/api/dicData"
import type { dicParamsType } from "../types/dic.t"

// 获取字典数据代码复用片段
export const useDicData = () => {
    // 获取字典数据，赋值选择对象
    const handleGetDicDta = <T>(dictKey: string, accept: Ref<T>, callBack?: (data: T) => void) => {
        getDicData<T, dicParamsType>({ dictKey }).then(res => {
            console.log(res);
            accept.value = res.result;
        })
    }

    return {handleGetDicDta}
}