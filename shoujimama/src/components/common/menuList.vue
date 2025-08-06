<script setup lang="ts">
import { onMounted } from 'vue';
import { useMenuStore } from '../../store/menuStore';
import menuinner from './menuinner.vue';

const menuStore = useMenuStore()
const handleGetMenuList = async () => {
    await menuStore.getMenuInfo()
}

onMounted(() => {
    handleGetMenuList()
})
</script>

<template>
    <div class="main">
        <el-menu unique-opened router max-height="600px">
            <menuinner :data="menuStore.menuList"></menuinner>
        </el-menu>
    </div>
</template>

<style scoped>
.main {
    height: 100vh;
    width: 250px;
    overflow-y: scroll;
}

.el-menu {
    width: 100%;
}

::-webkit-scrollbar {
    width: 0px;
}
</style>