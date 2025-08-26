<script setup lang="ts">
import { onMounted, reactive, ref, toRef, toRefs, useTemplateRef, watch } from 'vue';
import { statusManage } from '../../hooks/stateChange';
import imgUpload from '../common/imgUpload.vue';
import type { categoryInfoType, mallGoodsResponsType } from '../../types/category';
import { addMallRedEnvelopeGood, getMallRedEnvelopemoreInfo } from '../../utiles/api/mallRedEnvelope';
import type { IMallRedPacketPurchaseInfoList } from '../../types/redEnvelopeRush';
import { IMG_URL } from '../../utiles/config';
import { Delete } from '@element-plus/icons-vue';
import mallGoodAddDialog from '../mallGoods/mallGoodAddDialog.vue';


const { loading, disableButton, statusChange } = statusManage();
const formDisabled = ref(false);
const dialogShow = ref(false);
const method = ref("POST");
const dateArray = ref<Array<number>>([]);
const emit = defineEmits(["successSubmit"]);
const formRef = useTemplateRef('formRef')
type status = "none" | "show" | "edit" | "add";

const formStatus = defineModel<status>("formStatus");
const formData = defineModel<categoryInfoType>("formData", { required: true });
const id = defineModel<number>("id", { required: true });
let moreInfoData = reactive<IMallRedPacketPurchaseInfoList>({
    goods_list: [],
    id: 0,
    name: '',
    image: '',
    start_time: '',
    end_time: '',
    status: 0
})

// 获取选中活动的详情信息
const getMoreInfo = async (id: number) => {
    statusChange(true);
    await getMallRedEnvelopemoreInfo<IMallRedPacketPurchaseInfoList, { id: number }>(id, { id }).then(res => {
        console.log(res);
        moreInfoData.goods_list = res.result.goods_list;
        moreInfoData.name = res.result.name;
        moreInfoData.id = res.result.id;
        moreInfoData.image = res.result.image;
        moreInfoData.start_time = new Date(res.result.start_time).valueOf() / 1000;
        moreInfoData.end_time = new Date(res.result.end_time).valueOf() / 1000;
        moreInfoData.status = res.result.status;
        dateArray.value.push(moreInfoData.start_time);
        dateArray.value.push(moreInfoData.end_time);
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
            red_packet_price: item.red_packet_price,
            sales: 0,
            sort: 0,
            stock: 0,
            subtitle: '',
            title: item.goods_name
        })
    };
    dialogShow.value = false;
}

// 格式化
const initFormData = () => {
    formRef.value.resetFields();
    moreInfoData.goods_list = [];
    moreInfoData.id = 0;
    method.value = "POST";
}

// 提交回调
const submit = (method: string) => {
    moreInfoData.start_time = dateArray.value[0];
    moreInfoData.end_time = dateArray.value[1];
    moreInfoData.id = formData.value.id;
    moreInfoData.name = formData.value.name;
    moreInfoData.image = formData.value.image;
    moreInfoData.status = formData.value.status;
    statusChange(true);
    addMallRedEnvelopeGood<string, IMallRedPacketPurchaseInfoList>(moreInfoData, method).then(res => {
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
        {{ moreInfoData }}
        <el-form label-width="150px" v-loading="loading" :model="formData" :disabled="formDisabled" ref="formRef">
            <el-divider content-position="left">基本信息</el-divider>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form-item label="活动名称" prop="name">
                        <el-input v-model.trim="formData.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="是否开始活动" prop="status">
                        <el-switch v-model.trim="formData.status" active-text="开启" inactive-text="关闭" :active-value="1"
                            :inactive-value="0"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form-item label="活动时间" prop="cost_price">
                        <el-date-picker v-model="dateArray" type="datetimerange" range-separator="至"
                            format="YYYY-MM-DD HH:mm:ss" value-format="X" start-placeholder="开始时间"
                            end-placeholder="结束时间"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品主图" prop="image">
                        <imgUpload v-model:disable-button="formDisabled" v-model:img-url="formData.image"
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
                            <el-table-column label="商品名称" align="center" prop="title">
                                <template #default="scope">
                                    <el-input v-model="scope.row.title"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="副标题" align="center" prop="subtitle">
                                <template #default="scope">
                                    <el-input v-model="scope.row.subtitle"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="活动商品数量" align="center" prop="stock">
                                <template #default="scope">
                                    <el-input v-model="scope.row.stock"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="需付红包" align="center" prop="red_packet_price">
                                <template #default="scope">
                                    <el-input v-model="scope.row.red_packet_price"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="排序" align="center" prop="sort">
                                <template #default="scope">
                                    <el-input v-model="scope.row.sort"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="已售数量" align="center" prop="sales">
                                <template #default="scope">
                                    <el-input v-model="scope.row.sales"></el-input>
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