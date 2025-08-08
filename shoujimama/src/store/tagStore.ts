import { defineStore } from "pinia";
import type { tagListType } from "../types/menu";
import { reactive } from "vue";

// 打开标签列表
export const useTagStore = defineStore("tag", () => {

    let tagList = reactive<Array<tagListType>>([]);

    const addTag = (path:string, title:string) => {
        tagList.push({
            path,
            title
        })
    }

    const delTag = (index:number) => {
        tagList.splice(index, 1)
    }

    return { addTag, tagList, delTag }
})