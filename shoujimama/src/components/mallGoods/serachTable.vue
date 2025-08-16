<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import { statusManage } from '../../hooks/stateChange';
import { getGoodInfo } from '../../utiles/api/mallGoods';
import type { mallGoodsResponsType, mallGoodsSearchParamType } from '../../types/category';
import { IMG_URL } from '../../utiles/config';

let pageSize = ref(10)
let pageNumber = ref(1)
let total = ref(0)
const { loading, disableButton, statusChange } = statusManage()
// 商品信息请求参数
const searchCondition = reactive<mallGoodsSearchParamType>({
    goods_name: "",
    goods_no: "",
    categoryId: "",
    status: "",
    size: 10,
    current: 1
});

const mallGoodsInfo = reactive<Array<mallGoodsResponsType>>([])

// 获取表格数据
const getTableData = () => {
    statusChange(true);
    getGoodInfo<mallGoodsResponsType, mallGoodsSearchParamType>(searchCondition).then(res => {
        mallGoodsInfo.push(...res.result.data);
        console.log(mallGoodsInfo);
        statusChange(false);
    })
}


// 页数切换
const pageChang = (val: number) => {
    pageNumber.value = val;
};
// 每页数量切换
const pageSizeChang = (val: number) => {
    pageSize.value = val;
};

onMounted(() => {
    getTableData();
})
</script>

<template>
    <div class="container">
        <div class="max">
            咨询条件：
        </div>
        <div class="max">
            <el-row :gutter="10">
                <el-col :xl="6" :lg="6" :md="12" :sm="24">
                    <el-select placeholder="请输入分类名称"></el-select>
                </el-col>
                <el-col :xl="6" :lg="6" :md="12" :sm="24">
                    <el-input placeholder="请输入商品名称"></el-input>
                </el-col>
                <el-col :xl="6" :lg="6" :md="12" :sm="24">
                    <el-input placeholder="请输入货号"></el-input>
                </el-col>
                <el-col :xl="6" :lg="6" :md="12" :sm="24">
                    <el-select placeholder="请输选择状态"></el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-button type="success" :icon="Search">搜索</el-button>
                <el-button type="warning" :icon="Refresh">重置</el-button>
            </el-row>
        </div>
        <div class="max">
            咨询结果：
        </div>
        <div class="max">
            <el-button type="primary" :icon="Plus">新增</el-button>
            <el-button type="danger" :icon="Delete">批量删除</el-button>
            <el-button type="success" :icon="Edit" plain>批量上架</el-button>
            <el-button type="danger" :icon="Edit" plain>批量下架</el-button>
            <el-button type="warning" :icon="Edit" plain>批量缺货</el-button>
        </div>

        <el-table border ref="tableRef" :data="mallGoodsInfo" class="table" v-loading="loading">
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column type="selection" align="center" width="55"></el-table-column>
            <el-table-column label="图片" align="center" width="150" >
                <template #default="scope">
                    <img :src="IMG_URL + scope.row.goods_image" alt="tupian" style="width: 60px;">
                </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="goods_name" align="center" width="150" ></el-table-column>
            <el-table-column label="货号" prop="goods_no" align="center" width="150" ></el-table-column>
            <el-table-column label="分类" align="center" width="150" >
                <template #default="scope">
                    <el-tag v-for="item in scope.row.category">{{ item }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="库存" prop="stock_total" align="center" width="150" ></el-table-column>
            <el-table-column label="批发价" prop="wholesale_price" align="center" width="150" ></el-table-column>
            <el-table-column label="销售量" prop="sales_actual" align="center" width="150" ></el-table-column>
            <el-table-column label="排序" prop="sort" align="center" width="150" ></el-table-column>
            <el-table-column label="状态" align="center" width="150" >
                <template #default="scope">
                    <el-tag v-if="scope.row.status === 'hasBeenRemoved'" type="danger">已下架</el-tag>
                    <el-tag v-if="scope.row.status === 'nowOnShelf'" type="success">已上架</el-tag>
                    <el-tag v-if="scope.row.status === 'outOfStock'" type="warning">缺货中</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope" align="center" width="150">
                    <el-button type="primary" link>查看</el-button>
                    <el-button type="primary" link>编辑</el-button>
                    <el-button type="primary" link>上架</el-button>
                    <el-button type="primary" link>下架</el-button>
                    <el-button type="primary" link>缺货</el-button>
                    <el-button type="danger" link>删除</el-button>
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