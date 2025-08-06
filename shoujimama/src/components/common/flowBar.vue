<script setup lang="ts">
import router from '../../router';


</script>

<template>
    <div class="mainPart">
        <el-card>
            <el-tag colsable>{{ router.currentRoute.value.meta.title }}</el-tag>
            <el-button>标签选项</el-button>
        </el-card>
    </div>
</template>

<style scoped>
.mainPart {
    width: 100%;
    height: 40px;
}

.el-card {
    width: 100;
    height: 30px;
    margin: 5px;
    display: flex;
}

::v-deep .el-card__body {
  padding: 0; /* 去除内边距 */
}
</style>