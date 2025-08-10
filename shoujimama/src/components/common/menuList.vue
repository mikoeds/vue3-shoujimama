<script setup lang="ts">
import { onMounted } from 'vue';
import { useMenuStore } from '../../store/menuStore';
import menuinner from './menuinner.vue';

const menuStore = useMenuStore()
const handleGetMenuList = async () => {
    await menuStore.getMenuInfo()
}
const handleSelectRout = (index:string) => {
    
}

onMounted(() => {
    handleGetMenuList()
})
</script>

<template>
    <div class="mainPart">
        <el-menu unique-opened router max-height="600px" @select="handleSelectRout">
            <menuinner :data="menuStore.menuList"></menuinner>
        </el-menu>
    </div>
</template>

<style scoped>
.mainPart {
    height: 100vh;
    width: 300px;
    overflow-y: scroll;
}

.el-menu {
    width: 100%;
    height: 100%;
}

::-webkit-scrollbar {
    width: 0px;
}
</style>