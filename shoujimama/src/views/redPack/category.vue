<script setup lang="ts">
import categoryForm from '../../components/category/categoryForm.vue';
import categoryDialog from '../../components/category/categoryDialog.vue';
import { reactive, ref } from 'vue';
import type { dialogStatusType } from '../../types/common';
import type { categoryInfoType } from '../../types/category';

const dialogStatus = ref<dialogStatusType>("none");
// 传递模态框内容
const formData = reactive<categoryInfoType>({
    id:0,
    name:"",
    sort: 0,
    status: 0,
    is_vajra:0,
    image:""
});

const getFormData = (row: categoryInfoType, status: dialogStatusType, name: string) => {
    formData.name = row.name;
    formData.sort = row.sort;
    formData.status = row.status;
    formData.is_vajra = row.is_vajra;
    formData.image = row.image;
    console.log(formData);
    
}

</script>

<template>
    <div class="category">
        <categoryForm v-model:dialogStatus="dialogStatus" @getFormData="getFormData"></categoryForm>
        <categoryDialog v-model:dialogStatus="dialogStatus" v-model:formData="formData"></categoryDialog>
    </div>
</template>

<style scoped>
.category{
    overflow-y: scroll;
    height: 100%;
}
</style>