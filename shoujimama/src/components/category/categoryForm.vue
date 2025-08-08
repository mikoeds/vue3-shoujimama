<script setup lang="ts">
import { Delete, Plus, Refresh, Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

let pageSize = ref(0)
let pageNumber = ref(0)
let total = ref(0)

</script>

<template>
    <div class="container">
        <div class="max">
            咨询条件：
        </div>
        <div class="max">
            <el-input></el-input>
            <el-button type="success" :icon="Search">搜索</el-button>
            <el-button type="warning" :icon="Refresh">重置</el-button>
        </div>
        <div class="max">
            咨询结果
        </div>
        <div class="max">
            <el-button type="primary" :icon="Plus">新增</el-button>
            <el-button type="danger" :icon="Delete">批量删除</el-button>
        </div>

        <el-table border>
            <el-table-column type="index"></el-table-column>
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="分类名称"></el-table-column>
            <el-table-column label="页面上分类是否显示"></el-table-column>
            <el-table-column label="金刚区是否显示"></el-table-column>
            <el-table-column label="排序"></el-table-column>
            <el-table-column label="操作"></el-table-column>
            <div class="pagination">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-size="pageSize"
                    :current-page="pageNumber" :page-sizes="[10, 20, 30, 40, 50, 100]" :total="total"
                    :hide-on-single-page="false">
                    ></el-pagination>
            </div>
        </el-table>
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
</style>