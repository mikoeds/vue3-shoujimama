<script setup lang="ts">
import { reactive, ref, useTemplateRef, watch } from 'vue';
import searchTable from '../../../components/redEnvelopeRush/searchTable.vue';
import type { categoryInfoType } from '../../../types/category';
import redEnvelopeInfo from '../../../components/redEnvelopeRush/redEnvelopeInfo.vue';

const tabStatus = ref("one");
type status = "add" | "show" | "edit" | "none"
const dialogStatus = ref<status>("none");
const searchTableRef = useTemplateRef("searchTableRef");

const tabelData = reactive<categoryInfoType>({
    id: 0,
    image: "",
    is_vajra: 0,
    name: "",
    sort: 0,
    status: 0
})


// 接收列表数据
const getTableData = (data:categoryInfoType, status:status) => {
    tabelData.id = data.id;
    tabelData.image = data.image;
    tabelData.is_vajra = data.is_vajra;
    tabelData.name = data.name;
    tabelData.sort = data.sort;
    tabelData.status = data.status;
}

// 监视表单状态
watch(dialogStatus, (newStatus) => {
    if (newStatus != "none") {
        tabStatus.value = "two";
    }else{
        tabStatus.value = "one";
    }
})


// 监视栏位状态
watch(tabStatus, (newStatus) => {
    if (newStatus === "one") {
        dialogStatus.value = "none";
    }
})
</script>

<template>
    <div class="tabs">
        <el-tabs v-model="tabStatus">
            <el-tab-pane label="红包抢购列表" name="one">
                <el-card class="tab-content">
                    <searchTable
                    ref="searchTableRef"
                    v-model:dialog-status="dialogStatus"
                    @get-form-data="getTableData"
                    ></searchTable>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="红包抢购详情" name="two">
                <el-card class="tab-content">
                    <redEnvelopeInfo
                    v-model:id="tabelData.id"
                    v-model:form-data="tabelData"
                    v-model:form-status="dialogStatus"
                    @success-submit="searchTableRef?.handleGetRedEnvelopInfo()"
                    ></redEnvelopeInfo>
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