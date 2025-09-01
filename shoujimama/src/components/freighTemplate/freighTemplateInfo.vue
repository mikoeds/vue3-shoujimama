<script setup lang="ts">
import { onMounted, reactive, ref, useTemplateRef, watch } from 'vue';
import { statusManage } from '../../hooks/stateChange';
import { Delete } from '@element-plus/icons-vue';
import { addActivityInfo } from '../../utiles/api/selectSpecial';
import { getDeliverMoreData } from '../../utiles/api/freighTemplate';
import type { deliverMoreInfoDataType, regionInfo } from '../../types/freighTemplate';
import freighTemplateDialog from './freighTemplateDialog.vue';
import { getRegionInfo } from '../../utiles/api/region';

const { loading, disableButton, statusChange } = statusManage();
const formDisabled = ref(false);
const dialogShow = ref(false);
const selectAll = ref(false);
const method = ref("POST");
const editIndex = ref(0);
const regionSelectDataArray = ref<Array<Array<number>>>([]);
let regionSelectDataChosen = ref<Array<number>>([]);
const emit = defineEmits(["successSubmit"]);
const formRef = useTemplateRef('formRef')
type status = "none" | "show" | "edit" | "add";

const formStatus = defineModel<status>("formStatus");
const id = defineModel<number>("id", { required: true });
let moreInfoData = reactive<deliverMoreInfoDataType>({
    regionArray: [],
    create_time: '',
    deliver_name: '',
    id: 0,
    update_time: ''
})
let regionInfoData = reactive<Array<regionInfo>>([])

// 地址映射
const getRegionName = (idArray: Array<number>) => {
    const resultArray: Array<string> = [];
    for (const item of idArray) {
        regionInfoData.map(data => {
            if (data.id === item) {
                resultArray.push(data.name);
            }
        })
    }
    return resultArray;
}

// 获取地区名称
// const getRegionName = () => {

// }

// 获取选中活动的详情信息
const getMoreInfo = async (id: number) => {
    statusChange(true);
    await getDeliverMoreData<deliverMoreInfoDataType, { id: number }>(id, { id }).then(res => {
        console.log(res);
        moreInfoData.regionArray = res.result.regionArray;
        moreInfoData.deliver_name = res.result.deliver_name;
        moreInfoData.id = res.result.id;
        moreInfoData.update_time = res.result.update_time;
        moreInfoData.create_time = res.result.create_time;
        regionSelectDataArray.value = [];
        for (const item of moreInfoData.regionArray) {
            regionSelectDataArray.value.push(item.regions);
        };
    }).catch().finally(() => {
        statusChange(false);
    })
}

// 新增回调
const add = () => {
    moreInfoData.regionArray.push({
        first_price: 0,
        first_unit: 0,
        id: 1,
        regions: [],
        renew_price: 0,
        renew_unit: 0
    })
}

// 格式化
const initFormData = () => {
    formRef.value.resetFields();
    moreInfoData.regionArray = [];
    moreInfoData.id = 0;
    method.value = "POST";
}

// 提交回调
const submit = (method: string) => {
    statusChange(true);
    addActivityInfo<string, deliverMoreInfoDataType>(moreInfoData, method).then(() => {
        formStatus.value = "none";
        emit("successSubmit")
    }).catch().finally(() => {
        statusChange(false);
    })
}

// 编辑回调
const handleEdit = (index: number) => {
    dialogShow.value = true;
    editIndex.value = index;
    regionSelectDataChosen.value = moreInfoData.regionArray[index].regions;
}

// 选择改变回调
const selectChange = (selectArry: Array<number>) => {
    moreInfoData.regionArray[editIndex.value].regions = selectArry;
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
    getRegionInfo<Array<regionInfo>, undefined>().then(res => {
        regionInfoData.push(...res.result);
    });

})

</script>

<template>
    <div>
        <el-form label-width="150px" v-loading="loading" :model="moreInfoData" :disabled="formDisabled" ref="formRef">
            <el-divider content-position="left">基本信息</el-divider>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form-item label="模板名称" prop="name">
                        <el-input v-model.trim="moreInfoData.deliver_name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">配送区域及运费</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item>
                        <el-button @click="add">新增</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item>
                        <el-table border :data="moreInfoData.regionArray">
                            <el-table-column label="可配送区域" align="center">
                                <template #default="scope">
                                    <span v-if="moreInfoData.regionArray[scope.$index].regions.length === regionInfoData.length">
                                        全国
                                    </span>
                                    <span v-else>
                                        {{ getRegionName(moreInfoData.regionArray[scope.$index].regions).join(',') }}
                                    </span>
                                    <el-button @click="handleEdit(scope.$index)" link>编辑</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column label="首件（个）" align="center" prop="first_unit">
                                <template #default="scope">
                                    <el-input v-model="scope.row.first_unit"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="首费（元）" align="center" prop="first_price">
                                <template #default="scope">
                                    <el-input v-model="scope.row.first_price"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="续件（个）" align="center" prop="renew_unit">
                                <template #default="scope">
                                    <el-input v-model="scope.row.renew_unit"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="续费（元）" align="center" prop="renew_price">
                                <template #default="scope">
                                    <el-input v-model="scope.row.renew_price"></el-input>
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
        <freighTemplateDialog v-if="dialogShow" v-model:region-select-data="regionSelectDataChosen" v-model:show-dialog="dialogShow"
            v-model:region-data="regionInfoData" v-model:select-all="selectAll" @select-change="selectChange">
        </freighTemplateDialog>
    </div>
</template>

<style scoped>
.el-upload {
    width: 150px;
    height: 150px;
}
</style>