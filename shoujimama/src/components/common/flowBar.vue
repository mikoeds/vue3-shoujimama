<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter, type RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import { useTagStore } from '../../store/tagStore';

const tagStore = useTagStore()
const list = tagStore.tagList
const router = useRouter()
const route = useRoute()

// 获取路由属性
const getRouterInfo = (route: RouteLocationNormalizedLoadedGeneric) => {
    if (!tagStore.tagList.some(item => item.path === route.path)) {
        tagStore.addTag(route.path, route.meta.title as string)
    }
}

getRouterInfo(route);

// 获取跳转路由属性
onBeforeRouteUpdate((to) => {
    getRouterInfo(to);
});

// 标签关闭回调
const handleCloseTag = (index: string) => {
    if (list.length === 1 && route.path === "/dashboard") {
        return
    }
    const matchTag = list.find(item => item.path === index);
    if (matchTag) {
        const delindex = list.indexOf(matchTag);
        tagStore.delTag(delindex);
    };
    if (list.length === 0) {
        router.push("/");
    } else {
        if (index === route.path) {
            router.push(list[0])
        };
    };

}
</script>

<template>
    <div class="mainPart">
        <el-card>
            <div>
                <el-tag closable v-for="item in list" @close="handleCloseTag(item.path)">
                    <router-link :to="item.path">
                        {{ item.title }}
                    </router-link>
                </el-tag>
            </div>
            <el-dropdown>
                <el-button>标签选项</el-button>
                <template #dropdown>
                    <el-dropdown-item>关闭其他页面</el-dropdown-item>
                    <el-dropdown-item>关闭所有页面</el-dropdown-item>
                </template>
            </el-dropdown>
        </el-card>
    </div>
</template>

<style scoped>
.mainPart {
    width: 100%;
    height: 40px;
}

.el-card {
    height: 30px;
    margin: 5px;
}

.el-tag {
    margin: 4px;
    height: 22px;
}

.el-button {
    margin: 4px;
    width: 80px;
    height: 22px;
}

::v-deep .el-card__body {
    padding: 0;
    /* 去除内边距 */
    width: 100%;
    justify-content: space-between;
    display: flex;
}
</style>