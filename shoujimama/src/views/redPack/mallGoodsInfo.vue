<script setup lang="ts">
import serachTable from '../../components/mallGoods/serachTable.vue';
import mallInfo from '../../components/mallGoods/mallInfo.vue';
import { ref } from 'vue';
import type { categoryInfoType } from '../../types/category';
import type { dictDataType } from '../../types/dic.t';
import type { deliverDataType } from '../../types/deliver';

const id = ref(0);
const categoryClassList = ref<Array<categoryInfoType>>([]);
const categoryStatusList = ref<Array<dictDataType>>([]);
const platformList = ref<Array<dictDataType>>([]);
const isUseNoList = ref<Array<dictDataType>>([]);
const freightTemplateList = ref<Array<deliverDataType>>([]);
</script>

<template>
    <div class="tabs">
        <el-tabs>
            <el-tab-pane label="商品列表" name="one">
                <el-card class="tab-content">
                    <serachTable></serachTable>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="商品详情" name="two">
                <el-card class="tab-content">
                    <mallInfo
                    :category-class-list="categoryClassList"
                    :category-status-list="categoryStatusList"
                    :freight-template-list="freightTemplateList"
                    :platform-list="platformList"
                    :is-use-no-list="isUseNoList"
                    :id="id"
                    ></mallInfo>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style>
.tabs {
    margin-left: 5px;
    margin-right: 5px;
}

.tab-content {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 5px;
    margin: 5px;
}
</style>