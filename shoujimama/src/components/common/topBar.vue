<script setup lang="ts">

</script>

<template>
    <div class="main">
        <el-row justify="space-between">
            <el-col :span="8">
                <div class="leftPart">
                    <el-button style="height: 50px;"><el-icon>
                            <Expand />
                        </el-icon></el-button>
                    手机商城后台管理系统
                </div>
            </el-col>
            <el-col :span="2" justify="end">
                <div class="rightPart">
                    <el-button text type="primary" class="rightPartButton">123<el-icon><arrow-down /></el-icon></el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.main {
    border-bottom: 2px solid #e2dddd;
    width: 100%;
}

.leftPart {
    display: flex;
    height: 50px;
    text-align: left;
    font-size: 20px;
    margin-left: 10px;
    align-items: center;
}
.rightPart {
    display: flex;
    height: 50px;
    text-align: right;
    font-size: 20px;
    text-align: center;
    align-items: center;
}
.rightPartButton {
    font-size: 15px;
}
.el-button {
  border: none !important;
  outline: none !important;
}

</style>