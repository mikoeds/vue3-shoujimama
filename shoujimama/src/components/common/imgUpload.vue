<!-- 图片上传组件 -->
<script setup lang="ts">

const imgUrl = defineModel<string>("imgUrl", {required: true})
</script>

<template>
    {{ imgUrl }}
    <img :src="imgUrl" :alt="imgUrl">
</template>

<style scoped>

</style>