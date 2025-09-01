<script setup lang="ts">
import { onMounted, reactive, ref, useTemplateRef, watch } from 'vue';
import { statusManage } from '../../hooks/stateChange';
import imgUpload from '../common/imgUpload.vue';
import type { mallGoodsResponsType } from '../../types/category';
import { IMG_URL } from '../../utiles/config';
import { Delete } from '@element-plus/icons-vue';
import mallGoodAddDialog from '../mallGoods/mallGoodAddDialog.vue';
import { addActivityInfo, getActivityMoreInfo } from '../../utiles/api/selectSpecial';
import type { activityMoreInfoType } from '../../types/selectSpecial';

const { loading, disableButton, statusChange } = statusManage();
const formDisabled = ref(false);
const dialogShow = ref(false);
const method = ref("POST");
const emit = defineEmits(["successSubmit"]);
const formRef = useTemplateRef('formRef')
type status = "none" | "show" | "edit" | "add";

const formStatus = defineModel<status>("formStatus");
const id = defineModel<number>("id", { required: true });
let moreInfoData = reactive<activityMoreInfoType>({
    goods_list: [],
    id: 0,
    name: '',
    image: '',
    status: 0,
    create_time: '',
    index_image: ''
})

// 获取选中活动的详情信息
const getMoreInfo = async (id: number) => {
    statusChange(true);
    await getActivityMoreInfo<activityMoreInfoType, { id: number }>(id, { id }).then(res => {
        console.log(res);
        moreInfoData.goods_list = res.result.goods_list;
        moreInfoData.name = res.result.name;
        moreInfoData.id = res.result.id;
        moreInfoData.image = res.result.image;
        moreInfoData.status = res.result.status;
        moreInfoData.index_image = res.result.index_image;

    }).catch().finally(() => {
        statusChange(false);
    })
}

// 新增回调
const add = () => {
    dialogShow.value = true;
}

// 选择完成回调
const selectConfirm = (itemArray: Array<mallGoodsResponsType>) => {
    for (const item of itemArray) {
        moreInfoData.goods_list.push({
            goods_id: item.id,
            goods_image: item.goods_image,
            official_price: item.official_price,
            retail_price: item.retail_price,
            red_packet_price: item.red_packet_price,
            sales_actual: 0,
            sort: 0,
            goods_name: item.goods_name,
            sales_initial: item.sales_initial,
            stock_total: item.stock_total
        })
    };
    dialogShow.value = false;
}

// 格式化
const initFormData = () => {
    formRef.value.resetFields();
    moreInfoData.goods_list = [];
    moreInfoData.id = 0;
    moreInfoData.index_image = "";
    method.value = "POST";
}

// 提交回调
const submit = (method: string) => {
    statusChange(true);
    addActivityInfo<string, activityMoreInfoType>(moreInfoData, method).then(() => {
        formStatus.value = "none";
        emit("successSubmit")
    }).catch().finally(() => {
        statusChange(false);
    })
}

watch(formStatus, async newStatus => {
    if (newStatus === "show") {
        formDisabled.value = true;
        await getMoreInfo(id.value);
    };
    if (newStatus === "edit") {
        await getMoreInfo(id.value);
        method.value = "PUT";
    };
    if (newStatus === "add") {

    };
    if (newStatus === "none") {
        formDisabled.value = false;
        initFormData();
    };
})


onMounted(() => {

})

</script>

<template>
    <div>
        <el-form label-width="150px" v-loading="loading" :model="moreInfoData" :disabled="formDisabled" ref="formRef">
            <el-divider content-position="left">基本信息</el-divider>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form-item label="活动名称" prop="name">
                        <el-input v-model.trim="moreInfoData.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="首页图" prop="image">
                        <imgUpload v-model:disable-button="formDisabled" v-model:img-url="moreInfoData.index_image"
                            v-model:loading="loading">
                        </imgUpload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="主图" prop="image">
                        <imgUpload v-model:disable-button="formDisabled" v-model:img-url="moreInfoData.image"
                            v-model:loading="loading">
                        </imgUpload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">商品信息</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item>
                        <el-button @click="add">新增</el-button>
                        <el-button>批量删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item>
                        <el-table border :data="moreInfoData.goods_list">
                            <el-table-column label="图片" align="center">
                                <template #default="scope">
                                    <img :src="IMG_URL + scope.row.goods_image" alt="tupian" style="width: 100px;">
                                </template>
                            </el-table-column>
                            <el-table-column label="商品名称" align="center" prop="goods_name">
                                <template #default="scope">
                                    <el-input v-model="scope.row.goods_name"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="零售价" align="official_price" prop="official_price">
                                <template #default="scope">
                                    <el-input v-model="scope.row.official_price"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="最多可抵扣红包" align="center" prop="red_packet_price">
                                <template #default="scope">
                                    <el-input v-model="scope.row.red_packet_price"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="淘宝价" align="center" prop="retail_price">
                                <template #default="scope">
                                    <el-input v-model="scope.row.retail_price"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="已售数量" align="center" prop="sales_actual">
                                <template #default="scope">
                                    <el-input v-model="scope.row.sales_actual"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="排序" align="center" prop="sort">
                                <template #default="scope">
                                    <el-input v-model="scope.row.sort"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <el-button link :icon="Delete" type="danger">删除</el-button>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-button @click="formStatus = 'none'">取消</el-button>
            <el-button @click="submit(method)">确认</el-button>
        </el-form>
    </div>
    <mallGoodAddDialog v-model:dialog-show="dialogShow" @handle-select-confirm="selectConfirm"></mallGoodAddDialog>
</template>

<style scoped>
.el-upload {
    width: 150px;
    height: 150px;
}
</style>