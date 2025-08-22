<script setup lang="ts">
import { Delete, Edit, Plus, Refresh, Search } from '@element-plus/icons-vue';
import { onMounted, reactive, ref, watch } from 'vue';
import { statusManage } from '../../hooks/stateChange';
import { changeGoodStatus, deletGoodInfo, getGoodInfo } from '../../utiles/api/mallGoods';
import type { categoryInfoType, mallGoodsResponsType, mallGoodsSearchParamType } from '../../types/category';
import { IMG_URL } from '../../utiles/config';
import { ElMessage } from 'element-plus';
import type { changeGoodStatusParamType } from '../../types/good';
import { getCategoryInfo } from '../../utiles/api/mallCategory';

let pageSize = ref(10)
let pageNumber = ref(1)
let total = ref(0)
const { loading, disableButton, statusChange } = statusManage()
type status = "none" | "show" | "edit" | "add"
const formStatus = defineModel<status>("formStatus", { required: true });
const needGetNewInfo = defineModel<boolean>("needGetNewInfo");
const categoryList = ref<Array<categoryInfoType>>([]);

// 自定义事件
const emit = defineEmits<{
    showEditCategory: [number],

}>()

// 状态列表
const statusList = [
    {
        status: "hasBeenRemoved",
        statusName: "已下架"
    },
    {
        status: "nowOnShelf",
        statusName: "已上架"
    },
    {
        status: "outOfStock",
        statusName: "缺货中"
    },
]

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

// 表单状态切换
const changeStatus = (status: status, id?: number) => {
    formStatus.value = status;
    console.log(formStatus.value);
    if (id) {
        emit("showEditCategory", id);
    }
}

// 新增回调
const handleAdd = () => {
    formStatus.value = "add";
    emit("showEditCategory", 0);

}

// 状态修改回调
const handleGoodStatusChange = (idArray: Array<number>, status: string) => {
    changeGoodStatus<Array<undefined>, changeGoodStatusParamType>({ idArray, status }).then(res => {
        console.log(res);
        getTableData();
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

// 删除回调
const deletGood = (idArray: Array<number>) => {
    deletGoodInfo({ idArray }).then(res => {
        ElMessage.success(res.msg)
        getTableData();
    })
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
    <div class="container">
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
                <el-col :xl="6" :lg="6" :md="12" :sm="24">
                    <el-select placeholder="请输选择状态" v-model="searchCondition.status">
                        <el-option v-for="item in statusList" :value="item.status" :label="item.statusName">{{ item.statusName
                        }}</el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row>
                <el-button type="success" :icon="Search" @click="getTableData()">搜索</el-button>
                <el-button type="warning" :icon="Refresh" @click="handleReset">重置</el-button>
            </el-row>
        </div>
        <div class="max">
            咨询结果：
        </div>
        <div class="max">
            <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
            <el-button type="danger" :icon="Delete" @click="deletGood(idList)">批量删除</el-button>
            <el-button type="success" :icon="Edit" plain
                @click="handleGoodStatusChange(idList, 'nowOnShelf')">批量上架</el-button>
            <el-button type="danger" :icon="Edit" plain
                @click="handleGoodStatusChange(idList, 'hasBeenRemoved')">批量下架</el-button>
            <el-button type="warning" :icon="Edit" plain
                @click="handleGoodStatusChange(idList, 'outOfStock')">批量缺货</el-button>
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
            <el-table-column label="排序" prop="sort" align="center" width="150"></el-table-column>
            <el-table-column label="状态" align="center" width="150">
                <template #default="scope">
                    <el-tag v-if="scope.row.status === 'hasBeenRemoved'" type="danger">已下架</el-tag>
                    <el-tag v-if="scope.row.status === 'nowOnShelf'" type="success">已上架</el-tag>
                    <el-tag v-if="scope.row.status === 'outOfStock'" type="warning">缺货中</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope" align="center" width="150">
                    <el-button type="primary" link @click="changeStatus('show', scope.row.id)">查看</el-button>
                    <el-button type="primary" link @click="changeStatus('edit', scope.row.id)">编辑</el-button>
                    <el-button type="primary" link
                        @click="handleGoodStatusChange([scope.row.id], 'nowOnShelf')">上架</el-button>
                    <el-button type="primary" link
                        @click="handleGoodStatusChange([scope.row.id], 'hasBeenRemoved')">下架</el-button>
                    <el-button type="primary" link
                        @click="handleGoodStatusChange([scope.row.id], 'outOfStock')">缺货</el-button>
                    <el-button type="danger" link @click="deletGood([scope.row.id])">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="total"
                :current-page="pageNumber" @update:current-page="pageChange" :page-size="pageSize"
                @update:page-size="pageSizeChange"></el-pagination>
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