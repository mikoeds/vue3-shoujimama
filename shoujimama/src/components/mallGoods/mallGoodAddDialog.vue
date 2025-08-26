<script setup lang="ts">
import { Refresh, Search } from '@element-plus/icons-vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { statusManage } from '../../hooks/stateChange';
import {  getGoodInfo } from '../../utiles/api/mallGoods';
import type { categoryInfoType, mallGoodsResponsType, mallGoodsSearchParamType } from '../../types/category';
import { IMG_URL } from '../../utiles/config';

import { getCategoryInfo } from '../../utiles/api/mallCategory';

let pageSize = ref(10)
let pageNumber = ref(1)
let total = ref(0)
const { loading, disableButton, statusChange } = statusManage()
const needGetNewInfo = defineModel<boolean>("needGetNewInfo");
const dialogShow = defineModel<boolean>("dialogShow");
const categoryList = ref<Array<categoryInfoType>>([]);
const emit = defineEmits<{
    handleSelectConfirm:[Array<mallGoodsResponsType>]
}>()

// 商品信息请求参数
const searchCondition = reactive<mallGoodsSearchParamType>({
    goods_name: "",
    goods_no: "",
    categoryId: "",
    status: "",
    size: 10,
    current: 1
});

let mallGoodsInfo = reactive<Array<mallGoodsResponsType>>([])

// 获取表格数据
const getTableData = () => {
    statusChange(true);
    getGoodInfo<mallGoodsResponsType, mallGoodsSearchParamType>(searchCondition).then(res => {
        mallGoodsInfo = [];
        mallGoodsInfo.push(...res.result.data);
        console.log(mallGoodsInfo);
        total.value = res.result.total;
        statusChange(false);
    })
}

// 选择回调
const selectList = ref<Array<mallGoodsResponsType>>([]);
const idList = ref<Array<number>>([]);
const handleSelect = (res: Array<mallGoodsResponsType>) => {
    selectList.value = res;
    idList.value = [];
    for (const item of selectList.value) {
        idList.value.push(item.id);
    }
}



// 重置回调
const handleReset = () => {
    searchCondition.categoryId = "";
    searchCondition.status = "";
    searchCondition.goods_no = "";
    searchCondition.goods_name = "";
    getTableData();
}

// 页数切换
const pageChange = (val: number) => {
    pageNumber.value = val;
    searchCondition.current = val;
    getTableData();
};

// 每页数量切换
const pageSizeChange = (val: number) => {
    pageSize.value = val;
    searchCondition.size = val;
    getTableData();
};

// 确认回调
const handleSeleted = () => {
    emit("handleSelectConfirm", selectList.value);
}

watch(needGetNewInfo, (newvalue) => {
    if (newvalue === true) {
        getTableData();
        needGetNewInfo.value === false
    }
})

onMounted(() => {
    getTableData();
    getCategoryInfo<Array<categoryInfoType>, undefined>().then(res => {
        categoryList.value = res.result;
    })
})
</script>

<template>
    <div>
        <el-dialog v-model="dialogShow" width="70%" top="2vh" draggable title="商品信息">
            <div class="max">
                咨询条件：
            </div>
            <div class="max">
                <el-row :gutter="10">
                    <el-col :xl="6" :lg="6" :md="12" :sm="24">
                        <el-select placeholder="请输入分类名称" v-model="searchCondition.categoryId">
                            <el-option v-for="item in categoryList" :value="item.id" :label="item.name">{{ item.name
                                }}</el-option>
                        </el-select>
                    </el-col>
                    <el-col :xl="6" :lg="6" :md="12" :sm="24">
                        <el-input placeholder="请输入商品名称" v-model="searchCondition.goods_name"></el-input>
                    </el-col>
                    <el-col :xl="6" :lg="6" :md="12" :sm="24">
                        <el-input placeholder="请输入货号" v-model="searchCondition.goods_no"></el-input>
                    </el-col>
                    <el-button type="success" :icon="Search" @click="getTableData()">搜索</el-button>
                    <el-button type="warning" :icon="Refresh" @click="handleReset">重置</el-button>
                </el-row>
            </div>
            <div class="max">
                咨询结果：
            </div>
            <el-table border ref="tableRef" :data="mallGoodsInfo" class="table" v-loading="loading"
                @selection-change="handleSelect">
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column type="selection" align="center" width="55"></el-table-column>
                <el-table-column label="图片" align="center" width="150">
                    <template #default="scope">
                        <img :src="IMG_URL + scope.row.goods_image" alt="tupian" style="width: 60px;">
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" prop="goods_name" align="center" width="150"></el-table-column>
                <el-table-column label="货号" prop="goods_no" align="center" width="150"></el-table-column>
                <el-table-column label="分类" align="center" width="150">
                    <template #default="scope">
                        <el-tag v-for="item in scope.row.category">{{ item }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="库存" prop="stock_total" align="center" width="150"></el-table-column>
                <el-table-column label="批发价" prop="wholesale_price" align="center" width="150"></el-table-column>
                <el-table-column label="销售量" prop="sales_actual" align="center" width="150"></el-table-column>
                <el-table-column label="状态" align="center" width="150">
                    <template #default="scope">
                        <el-tag v-if="scope.row.status === 'hasBeenRemoved'" type="danger">已下架</el-tag>
                        <el-tag v-if="scope.row.status === 'nowOnShelf'" type="success">已上架</el-tag>
                        <el-tag v-if="scope.row.status === 'outOfStock'" type="warning">缺货中</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="total"
                    :current-page="pageNumber" @update:current-page="pageChange" :page-size="pageSize"
                    @update:page-size="pageSizeChange"></el-pagination>
            </div>
            <el-button @click="dialogShow = false">取消</el-button>
            <el-button @click="handleSeleted">确认</el-button>
        </el-dialog>
    </div>
</template>

<style scoped>
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

.el-row {
    margin-bottom: 10px;
}

.table {
    width: 100%;
    font-size: 14px;
}
</style>