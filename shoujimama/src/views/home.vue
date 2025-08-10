<script setup lang="ts">
import topBar from '../components/common/topBar.vue';
import menulist from '../components/common/menuList.vue';
import flowBar from '../components/common/flowBar.vue';
import { onMounted } from 'vue';

onMounted(() => {
    
})
</script>

<template>
    <div>
        <topBar></topBar>
        <div class="mainpart">
            <menulist></menulist>
            <div class="flowPart">
                <flowBar></flowBar>
                <RouterView ></RouterView>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mainpart {
    scroll-behavior: auto;
    display: flex;
}

.flowPart {
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    padding-bottom: 20px;
}
::-webkit-scrollbar {
    width: 0px;
}

</style>