<script setup lang="ts">
import serachTable from '../../components/mallGoods/serachTable.vue';
import mallInfo from '../../components/mallGoods/mallInfo.vue';
import { ref, watch } from 'vue';
import type { categoryInfoType } from '../../types/category';
import type { dictDataType } from '../../types/dic.t';
import type { deliverDataType } from '../../types/deliver';
import { getCategoryInfo } from '../../utiles/api/mallCategory';
import { useDicData } from '../../hooks/dicData';

const id = ref(0);
const categoryClassList = ref<Array<categoryInfoType>>([]);
const categoryStatusList = ref<Array<dictDataType>>([]);
const platformList = ref<Array<dictDataType>>([]);
const isUseNoList = ref<Array<dictDataType>>([]);
const freightTemplateList = ref<Array<deliverDataType>>([]);

const { handleGetDicDta } = useDicData()

const tabStatus = ref("one");
type status = "none" | "show" | "edit";
const formStatus = ref<status>("none");
const getnewinfo = ref<boolean>(false);

// 查看编辑回调
const showEditCategory = (getId: number) => {
    id.value = getId;
}

// 获取商品分类列表
const getGoodCategory = async () => {
    await getCategoryInfo<Array<categoryInfoType>, undefined>().then(res => {
        categoryClassList.value = res.result;
    }).finally(() => { })
}
getGoodCategory();

// 获取商品状态列表
handleGetDicDta("GOODS_TYPE", categoryStatusList)
handleGetDicDta("WHETHER", isUseNoList)
handleGetDicDta("PLATFORM_TYPE", platformList)

// 获取运费模板列表
// 获取发布平台列表

// 提交成功
const successSubmit = () => {
    getnewinfo.value = true;
}

// 监视表单状态
watch(formStatus, (newStatus) => {
    if (newStatus != "none") {
        tabStatus.value = "two";
    }else{
        tabStatus.value = "one";
    }
})

// 监视栏位状态
watch(tabStatus, (newStatus) => {
    if (newStatus === "one") {
        formStatus.value = "none";
        id.value = 0;
    }
})
</script>

<template>
    <div class="tabs">
        <el-tabs v-model="tabStatus">
            <el-tab-pane label="商品列表" name="one">
                <el-card class="tab-content">
                    <serachTable v-model:form-status="formStatus" v-model:need-get-new-info="getnewinfo" @show-edit-category="showEditCategory"></serachTable>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="商品详情" name="two">
                <el-card class="tab-content">
                    <mallInfo :category-class-list="categoryClassList" :category-status-list="categoryStatusList"
                        :freight-template-list="freightTemplateList" :platform-list="platformList"
                        :is-use-no-list="isUseNoList" :id="id" v-model:form-status="formStatus" @success-submit="successSubmit"></mallInfo>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style>
.tabs {
    margin-left: 5px;
    margin-right: 5px;
}

.tab-content {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    padding: 5px;
    margin: 5px;
}
</style>