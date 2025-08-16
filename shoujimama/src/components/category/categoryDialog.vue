<script setup lang="ts">
import { defineModel, reactive, ref, useTemplateRef, watch } from 'vue';
import type { dialogStatusType } from '../../types/common';
import type { categoryInfoType } from '../../types/category';
import imgUpload from '../common/imgUpload.vue';
import { addCategoryInfo } from '../../utiles/api/mallCategory';
import { ElMessage } from 'element-plus';

const dialogShow = ref(false)
const dialogStatus = defineModel<dialogStatusType>("dialogStatus", { required: true })
const formData = defineModel<categoryInfoType>("formData", { required: true })
const title = ref("")
const disabled = ref(false)
const loading = ref(false)
const method = ref("POST")

// 切换状态回调
const handleStatusChange = {
    none: () => {
        title.value = "";
        dialogShow.value = false;
        disabled.value = false;
        formData.value.name = "";
        formData.value.sort = 0;
        formData.value.is_vajra = 0;
        formData.value.status = 0;
        formData.value.image = "";
        formData.value.id = 0;
    },
    add: () => {
        title.value = "新增";
        dialogShow.value = true;
        disabled.value = false;
        method.value = "POST";
    },
    show: () => {
        title.value = "查看";
        dialogShow.value = true;
        disabled.value = true;
    },
    edit: () => {
        title.value = "编辑";
        dialogShow.value = true;
        disabled.value = false;
        method.value = "PUT";
    },
}

// 关闭模态框回调
const handleCloseDialog = () => {
    dialogStatus.value = "none";
}

// 保存提交回调
const handleSubmit = () => {
    // 表单校验
    if (checkFormInfo()) {
        // 提交数据
        
        addCategoryInfo(method.value, formData.value).then(res => {
            ElMessage.success(res.msg);
            dialogStatus.value = "none";
        })
    };
}

// 表单校验
// 校验规则
const rules = reactive({
    name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
    sort: [{ required: true, message: "请输入排序顺序", trigger: "blur" }]
});

const formRef = useTemplateRef("formRef");
const checkFormInfo = () => {
    if (formRef.value.validate()) {
        return true;
    }
    return false;
}

watch(dialogStatus, (newval) => {
    // 根据新值反应
    const newVoid = handleStatusChange[newval];
    newVoid()
})
</script>

<template>
    <el-dialog v-model="dialogShow" @close="handleCloseDialog" :title="title">
        <el-form :rules="rules" :model="formData" ref="formRef">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="分类名称：" prop="name">
                        <el-input v-model.trim="formData.name" :disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="排序：" prop="sort">
                        <el-input v-model="formData.sort" :disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="是否显示：">
                        <el-switch :disabled="disabled" v-model="formData.status" active-text="显示" inactive-text="隐藏"
                            :active-value="1" :inactive-value="0"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否在金刚区显示：">
                        <el-switch :disabled="disabled" v-model="formData.is_vajra" active-text="显示" inactive-text="隐藏"
                            :active-value="1" :inactive-value="0"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="图片：">
                <imgUpload v-model:img-url="formData.image" v-model:disable-button="disabled" v-model:loading="loading">
                </imgUpload>
            </el-form-item>
            <el-row>
                <el-button v-if="!disabled" @click="handleSubmit">保存</el-button>
                <el-button v-if="!disabled">取消</el-button>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<style scoped>
.el-form {
    padding: 20px;
}
</style>