<script setup lang="ts">
import type { menuInfoType } from '../../types/menu';

defineProps({
    data: Array<menuInfoType>
})
</script>

<template>
    <template v-for="item in data">
        <template v-if="item.type === 1">
            <el-sub-menu :index="item.path" :key="item.id">
                <menuinner :data="item.items"></menuinner>
                <template #title>
                    <span>{{ item.title }}</span>
                </template>
            </el-sub-menu>
        </template>
        <template v-if="item.type === 2">
            <el-menu-item :index="item.path" :key="item.id">
                <template #title>
                    <span>{{ item.title }}</span>
                </template>
            </el-menu-item>
        </template>
    </template>
</template>

<style scoped></style>