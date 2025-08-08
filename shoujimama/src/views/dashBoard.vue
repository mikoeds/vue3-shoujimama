<script setup lang="ts">
import { onMounted } from 'vue';
import { useTagStore } from '../store/tagStore';

const tagStore = useTagStore()
onMounted(() => {
    
})
</script>

<template>
    <div class="dashboard">
        <el-card> 123</el-card>
        <el-card> 123</el-card>
        <el-card> 123</el-card>
    </div>
</template>

<style scoped>
.el-card {
    height: 200px;
    width: 400px;
    margin: 20px;
    min-width: 100px;
}
</style>