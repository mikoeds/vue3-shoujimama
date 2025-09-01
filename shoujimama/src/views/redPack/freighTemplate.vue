<script setup lang="ts">
import { reactive, ref, useTemplateRef, watch } from 'vue';
import type { activityInfoType } from '../../types/selectSpecial';
import searchTable from '../../components/freighTemplate/searchTable.vue';
import freighTemplateInfo from '../../components/freighTemplate/freighTemplateInfo.vue';

const tabStatus = ref("one");
const id = ref(0);
type status = "add" | "show" | "edit" | "none"
const dialogStatus = ref<status>("none");


// 接收列表数据
const getTableData = (data:activityInfoType) => {
    id.value = data.id;
}

// 成功上传回调
const successSubmit = () => {

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
            <el-tab-pane label="运费模板列表" name="one">
                <el-card class="tab-content">
                    <searchTable
                    v-model:dialog-status="dialogStatus"
                    @get-form-data="getTableData"
                    ></searchTable>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="运费模板详情" name="two">
                <el-card class="tab-content">
                    <freighTemplateInfo
                    v-model:id="id"
                    v-model:form-status="dialogStatus"
                    ></freighTemplateInfo>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped>
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