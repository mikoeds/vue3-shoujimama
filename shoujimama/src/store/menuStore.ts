import { defineStore } from 'pinia'
import { getMenuInfoRequest } from '../utiles/api/menu'
import type { menuInfoType } from '../types/menu'
import { reactive } from 'vue'

export const useMenuStore = defineStore("menu", () => {
    
    let menuList = reactive<Array<menuInfoType>>([])

    const getMenuInfo = async() => {
        await getMenuInfoRequest<Array<menuInfoType>>().then((response)=>{
            menuList.push(...response.result)
        })
    }
    return {getMenuInfo, menuList}
})