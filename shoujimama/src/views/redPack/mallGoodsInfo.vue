<script setup lang="ts">
import serachTable from '../../components/mallGoods/serachTable.vue';
import mallInfo from '../../components/mallGoods/mallInfo.vue';
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
                    <mallInfo></mallInfo>
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