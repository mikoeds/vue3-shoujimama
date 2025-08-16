<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search, View } from '@element-plus/icons-vue';
import { onMounted, reactive, ref, defineEmits, useTemplateRef } from 'vue';
import { deletCategoryInfo, getCategoryInfo } from '../../utiles/api/mallCategory';
import type { categoryInfoType, categoryParamType } from '../../types/category';
import type { dialogStatusType } from '../../types/common';
import { ElMessage } from 'element-plus';

let pageSize = ref(10)
let pageNumber = ref(1)
let total = ref(0)
let categoryList = reactive<categoryInfoType[]>([])
// 绑定模态框状态变化
const dialogStatus = defineModel<dialogStatusType>("dialogStatus", { required: true })
// 表单数据传输
const emit = defineEmits<{ "getFormData": [row: categoryInfoType, status: dialogStatusType, name: string] }>()

// 表格显示格式化
const handleCategoryShow = (data: categoryInfoType) => {
    return data.status === 1 ? "显示" : data.status === 0 ? "隐藏" : "未知";
};
const handleJinggangShow = (data: categoryInfoType) => {
    return data.is_vajra === 1 ? "显示" : data.is_vajra === 0 ? "隐藏" : "未知";
};

// 获得分类信息
const handleGetCategoryInfo = async () => {
    await getCategoryInfo<Array<categoryInfoType>, categoryParamType>({ name: searchData.value }).then((res) => {
        categoryList = [];
        categoryList.push(...res.result);
        total.value = res.result.length;
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
    handleGetCategoryInfo();
}

// 查看回调
const handleDialogShow = (row: categoryInfoType) => {
    dialogStatus.value = "show";
    emit("getFormData", row, "show", row.name)
}

// 编辑回调
const handleDialogEdit = (row: categoryInfoType) => {
    dialogStatus.value = "edit";
    emit("getFormData", row, "edit", row.name)

}

// 删除方法
const handleDelete = (idArray: Array<number>) => {
    deletCategoryInfo({ idArray }).then((res) => {
        console.log(res);
        for (const data of idArray) {
            categoryList.splice(categoryList.findIndex(item => item.id === data), 1);
        }
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
const searchData = ref("")
const handleSearch = () => {
    handleGetCategoryInfo();
    pageChang(1);
}
// 搜索回调
const handleReset = () => {
    searchData.value = ""
    handleGetCategoryInfo();
    pageChang(1);
}

onMounted(async () => {
    handleGetCategoryInfo();
});
</script>

<template>
    <div class="container">
        <div class="max">
            咨询条件：
        </div>
        <div class="max">
            <el-input v-model="searchData" palceholder="请输入分类名称"></el-input>
            <el-button type="success" :icon="Search" @click="handleSearch">搜索</el-button>
            <el-button type="warning" :icon="Refresh" @click="handleReset">重置</el-button>
        </div>
        <div class="max">
            咨询结果
        </div>
        <div class="max">
            <el-button type="primary" :icon="Plus" @click="handleDiaologAdd">新增</el-button>
            <el-button type="danger" :icon="Delete" @click="handleDeletChosen">批量删除</el-button>
        </div>

        <el-table border :data="categoryList.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)" ref="tableRef">
            <el-table-column type="index"></el-table-column>
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="分类名称" prop="name"></el-table-column>
            <el-table-column label="页面上分类是否显示" :formatter="handleCategoryShow"></el-table-column>
            <el-table-column label="金刚区是否显示" :formatter="handleJinggangShow"></el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
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

.container {
    margin: 5px;
    display: flex;
    flex-wrap: wrap;
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