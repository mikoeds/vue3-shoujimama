<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search, View } from '@element-plus/icons-vue';
import { onMounted, reactive, ref, defineEmits, useTemplateRef } from 'vue';
import type { categoryInfoType } from '../../types/category';
import type { dialogStatusType } from '../../types/common';
import { ElMessage } from 'element-plus';
import { deletMallRedEnvelope, getMallRedEnvelopeInfo } from '../../utiles/api/mallRedEnvelope';
import { statusManage } from '../../hooks/stateChange';
import type { IMallRedPacketPurchaseList, ISearchMallRedPacketPurchase } from '../../types/redEnvelopeRush';
import { IMG_URL } from '../../utiles/config';
import { getActivityInfo } from '../../utiles/api/selectSpecial';
import type { activityInfoType } from '../../types/selectSpecial';

let pageSize = ref(10)
let pageNumber = ref(1)
let total = ref(0)
let activityList = reactive<activityInfoType[]>([])
// 获取数据参数
let getInfoData = reactive<ISearchMallRedPacketPurchase>({
    name:"",
    current:1,
    size:10
})

// 绑定模态框状态变化
const dialogStatus = defineModel<dialogStatusType>("dialogStatus", { required: true })
// 表单数据传输
const emit = defineEmits<{ "getFormData": [row: activityInfoType, status: dialogStatusType, name: string] }>()
const {loading, disableButton, statusChange} = statusManage()

// 获得活动信息
const handleGetInfo = async () => {
    statusChange(true)
    await getActivityInfo<activityInfoType,ISearchMallRedPacketPurchase>(getInfoData).then(res => {
        console.log(res);
        activityList.push(...res.result.data);
    }).finally(()=>{
        statusChange(false);
    });
};

// 页数切换
const pageChang = (val: number) => {
    pageNumber.value = val;
};
// 每页数量切换
const pageSizeChang = (val: number) => {
    pageSize.value = val;
};

// 新增回调
const handleDiaologAdd = () => {
    dialogStatus.value = "add";
    handleGetInfo();
}

// 查看回调
const handleDialogShow = (row: activityInfoType) => {
    dialogStatus.value = "show";
    emit("getFormData", row, "show", row.name)
}

// 编辑回调
const handleDialogEdit = (row: activityInfoType) => {
    dialogStatus.value = "edit";
    emit("getFormData", row, "edit", row.name)

}

// 删除方法
const handleDelete = (idArray: Array<number>) => {
    statusChange(true);
    deletMallRedEnvelope({ idArray }).then((res) => {
        console.log(res);
        handleGetInfo();
    }).catch().finally(()=>{
        statusChange(false);
    })
}
// 删除回调
const handleDialogDelet = (row: categoryInfoType) => {
    handleDelete([row.id]);
}
// 批量删除
let tableRef = useTemplateRef("tableRef")
const handleDeletChosen = () => {
    const deleteList: Array<categoryInfoType> = tableRef.value!.store.states.selection.value;
    if (deleteList.length === 0) {
        ElMessage.warning("请选择分类");
        return;
    }
    let deleteIdArry = [];
    for (const item of deleteList) {
        deleteIdArry.push(item.id)
    }
    handleDelete(deleteIdArry);
}

// 搜索回调
const handleSearch = () => {
    handleGetInfo();
    pageChang(1);
}
// 重置回调
const handleReset = () => {
    getInfoData.name = ""
    handleGetInfo();
    pageChang(1);
}

defineExpose({
    handleGetInfo
});

onMounted(async () => {
    handleGetInfo();
});
</script>

<template>
    <div>
        <div class="max">
            咨询条件：
        </div>
        <div class="max">
            <el-input v-model="getInfoData.name" palceholder="请输入分类名称"></el-input>
            <el-button type="success" :icon="Search" @click="handleSearch" :disabled="disableButton">搜索</el-button>
            <el-button type="warning" :icon="Refresh" @click="handleReset" :disabled="disableButton">重置</el-button>
        </div>
        <div class="max">
            咨询结果
        </div>
        <div class="max">
            <el-button type="primary" :icon="Plus" @click="handleDiaologAdd" :disabled="disableButton">新增</el-button>
            <el-button type="danger" :icon="Delete" @click="handleDeletChosen" :disabled="disableButton">批量删除</el-button>
        </div>

        <el-table border :data="activityList.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)" ref="tableRef" v-loading="loading">
            <el-table-column type="index"></el-table-column>
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="首页图">
                <template #default="scope" >
                    <img :src="IMG_URL + '/' + scope.row.index_image" alt="tupian" style="width: 50px;">
                </template>
            </el-table-column>
            <el-table-column label="主图">
                <template #default="scope" >
                    <img :src="IMG_URL + '/' + scope.row.image" alt="tupian" style="width: 50px;">
                </template>
            </el-table-column>
            <el-table-column label="活动名称" prop="name"></el-table-column>
            <el-table-column label="创建时间" prop="create_time"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" link :icon="View" @click="handleDialogShow(scope.row)">查看</el-button>
                    <el-button type="primary" link :icon="Edit" @click="handleDialogEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" link :icon="Delete" @click="handleDialogDelet(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="total"
                :current-page="pageNumber" @update:current-page="pageChang" :page-size="pageSize"
                @update:page-size="pageSizeChang"></el-pagination>
        </div>
    </div>

</template>

<style scoped>
.el-input {
    width: 25%;
    margin-right: 13px;
}

.max {
    width: 100%;
    text-align: left;
    margin-bottom: 5px;
}

.el-table {
    margin-top: 20px;
}

.pagination {
    display: flex;
    justify-content: end;
    width: 100%;
}

.el-pagination {
    margin-right: 10px;
    margin-top: 10px;
}
</style>