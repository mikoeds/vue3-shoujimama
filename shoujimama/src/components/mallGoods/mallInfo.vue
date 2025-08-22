<script setup lang="ts">
import { onMounted, reactive, ref, toRef, toRefs, watch } from 'vue';
import { statusManage } from '../../hooks/stateChange';
import imgUpload from '../common/imgUpload.vue';
import videoUpload from '../common/videoUpload.vue';
import imgListUpload from '../common/imgListUpload.vue';
import { useEditor } from '../../hooks/useEditor';
import type { mallGoodsParamType } from '../../types/good';
import type { categoryInfoType } from '../../types/category';
import type { dictDataType } from '../../types/dic.t';
import type { deliverDataType } from '../../types/deliver';
import { deletGoodInfo, getGoodInfoById, pustNewGoodInfo } from '../../utiles/api/mallGoods';
import { ElMessage } from 'element-plus';

const { loading, disableButton, statusChange } = statusManage();
const imgList = reactive<Array<string>>([]);
const editor = ref();
const formDisabled = ref(false);
const emit = defineEmits(["successSubmit"]);

type status = "none" | "show" | "edit" | "add";
interface props {
    id: number,
    categoryClassList: Array<categoryInfoType>,
    categoryStatusList: Array<dictDataType>,
    freightTemplateList: Array<deliverDataType>,
    isUseNoList: Array<dictDataType>,
    platformList: Array<dictDataType>,
}
const { id, categoryClassList, categoryStatusList, freightTemplateList, isUseNoList, platformList } = defineProps<props>();
const formStatus = defineModel<status>("formStatus");

const form = reactive<mallGoodsParamType>({
    selling_poiont: "",
    goods_images: "",
    goods_content: "",
    goods_video: "",
    deliver_id: "",
    category_ids: [],
    platform_type: ["weChatPlatform", "alipayPlatform", "appPlatform"],
    spec_list: [],
    sku_list: [],
    is_goods_no: "",
    goods_image: "",
    goods_name: "",
    goods_no: "",
    id: 0,
    sales_initial: 0,
    sort: 0,
    status: "",
    statusName: "",
    update_specs: [],
    stock_total: 0,
    cost_price: "",
    official_price: "",
    red_packet_price: "",
    retail_price: "",
    wholesale_price: ""
})

// 富文本编辑器回调
const handleEditorChangeCallback = (data: string) => {
    form.goods_content = data;
}
const { initEditor } = useEditor("#editor", handleEditorChangeCallback);

// 提交回调
const handleSubmit = () => {
    statusChange(true);
    pustNewGoodInfo(form, "post").then(res => {
        console.log(res);
        ElMessage.success("上传成功")
        formStatus.value = "none";
        emit("successSubmit");
    }).catch(() => { })
        .finally(() => {
            statusChange(false);
        })
}



type idType = {
    id: number
}
watch(() => id, (newid) => {
    if (newid != 0) {
        statusChange(true);
        getGoodInfoById<mallGoodsParamType, idType>(newid, { id: newid }).then(res => {
            statusChange(false);
            form.category_ids = res.result.category_ids;
            form.cost_price = res.result.cost_price;
            form.deliver_id = res.result.deliver_id;
            form.goods_content = res.result.goods_content;
            form.goods_image = res.result.goods_image;
            form.goods_images = res.result.goods_images;
            form.goods_name = res.result.goods_name;
            form.goods_no = res.result.goods_no;
            form.goods_video = res.result.goods_video;
            form.goods_video = res.result.goods_video;
            form.is_goods_no = res.result.is_goods_no;
            form.official_price = res.result.official_price;
            form.platform_type = res.result.platform_type;
            form.platform_type = res.result.platform_type;
            form.red_packet_price = res.result.red_packet_price;
            form.retail_price = res.result.retail_price;
            form.sales_initial = res.result.sales_initial;
            form.selling_poiont = res.result.selling_poiont;
            form.sku_list = res.result.sku_list;
            form.sort = res.result.sort;
            form.spec_list = res.result.spec_list;
            form.status = res.result.status;
            form.stock_total = res.result.stock_total;
            form.wholesale_price = res.result.wholesale_price;
        })
    } else {
        form.category_ids = [];
        form.cost_price = "";
        form.deliver_id = 0;
        form.goods_content = "";
        form.goods_image = "";
        form.goods_images = "";
        form.goods_name = "";
        form.goods_no = "";
        form.goods_video = "";
        form.goods_video = "";
        form.is_goods_no = "";
        form.official_price = "";
        form.platform_type = [];
        form.platform_type = [];
        form.red_packet_price = "";
        form.retail_price = "";
        form.sales_initial = 0;
        form.selling_poiont = "";
        form.sku_list = "";
        form.sort = 0;
        form.spec_list = [];
        form.status = "";
        form.stock_total = 0;
        form.wholesale_price = "";
    }
})

watch(formStatus, newStatus => {
    if (newStatus === "show") {
        formDisabled.value = true;

    };
    if (newStatus === "edit") {

    };
    if (newStatus === "add") {

    };
    if (newStatus === "none") {
        formDisabled.value = false;
    };
})

onMounted(() => {
    editor.value = initEditor();
})
</script>

<template>
    <div>
        <el-form label-width="150px" :model="form" v-loading="loading">
            <el-divider content-position="left">用户基本信息</el-divider>
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-form-item label="商品分类" prop="category_ids">
                        <el-select v-model="form.category_ids" multiple :disabled="formDisabled">
                            <el-option v-for="item in categoryClassList" :value="item.id" :label="item.name">{{
                                item.name }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button :disabled="formDisabled">刷新</el-button>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model.trim="form.goods_name" :disabled="formDisabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商品状态" prop="status">
                        <el-select v-model="form.status" :disabled="formDisabled">
                            <el-option v-for="item in categoryStatusList" :value="item.dictValue"
                                :label="item.dictLabel">{{ item.dictLabel }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="运费模板" prop="deliver_id">
                        <el-select v-model="form.deliver_id" :disabled="formDisabled">
                            <el-option v-for="item in freightTemplateList">{{ item.deliver_name }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button :disabled="formDisabled">刷新</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-form-item label="成本价" prop="cost_price">
                        <el-input v-model.trim="form.cost_price" :disabled="formDisabled">
                            <template v-slot:append>元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="批发价" prop="wholesale_price">
                        <el-input v-model.trim="form.wholesale_price" :disabled="formDisabled">
                            <template v-slot:append>元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="零售价" prop="retail_price">
                        <el-input v-model.trim="form.retail_price" :disabled="formDisabled">
                            <template v-slot:append>元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="淘宝价" prop="official_price">
                        <el-input v-model.trim="form.official_price" :disabled="formDisabled">
                            <template v-slot:append>元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-form-item label="货号" prop="goods_no">
                        <el-input v-model.trim="form.goods_no" placeholder="请输入" :disabled="formDisabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否使用货号" prop="is_goods_no">
                        <el-select v-model="form.is_goods_no" :disabled="formDisabled">
                            <el-option v-for="item in isUseNoList" :value="item.dictValue" :label="item.dictLabel">{{
                                item.dictLabel
                            }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="排序" prop="sort">
                        <el-input v-model.trim="form.sort" :disabled="formDisabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="最多可抵扣红包" prop="red_packet_price">
                        <el-input v-model.trim="form.red_packet_price" :disabled="formDisabled">
                            <template v-slot:append>个</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="发布平台" prop="platform_type">
                        <el-select v-model="form.platform_type" multiple :disabled="formDisabled">
                            <el-option v-for="item in platformList" :value="item.dictValue" :label="item.dictLabel">{{
                                item.dictLabel }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品卖点" prop="selling_poiont">
                        <el-input type="textarea" maxlength="60" show-word-limit :rows="3"
                            v-model.trim="form.selling_poiont" :disabled="formDisabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品主图" prop="goods_image">
                        <imgUpload v-model:disable-button="disableButton" v-model:img-url="form.goods_image"
                            v-model:loading="loading">
                        </imgUpload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="轮播视频" prop="goods_video">
                        <videoUpload :disable-button="disableButton" :loading="loading" :vid-url="form.goods_video"
                            :video-width="380" :video-height="190"></videoUpload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="商品轮播图" prop="goods_images">
                        <imgListUpload :disable-button="disableButton" :loading="loading" :img-list="imgList"
                            :image-width="200" :image-height="150"></imgListUpload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">规格信息</el-divider>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="库存">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="已售基数">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item>
                        <el-button>添加规格</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="商品规格">
                        <el-table border>
                            <el-table-column label="规格编号" align="center"></el-table-column>
                            <el-table-column label="成本价" align="center"></el-table-column>
                            <el-table-column label="批发价" align="center"></el-table-column>
                            <el-table-column label="零售价" align="center"></el-table-column>
                            <el-table-column label="淘宝价" align="center"></el-table-column>
                            <el-table-column label="最多可抵扣红包" align="center"></el-table-column>
                            <el-table-column label="库存" align="center"></el-table-column>
                            <el-table-column label="图片(默认为主图)" align="center"></el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider content-position="left">商品详情</el-divider>
            <el-row>
                <el-col>
                    <el-form-item label="广告详情">
                        <div id="editor"></div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-button>取消</el-button>
        <el-button @click="handleSubmit">确认</el-button>
    </div>

</template>

<style>
.el-upload {
    width: 150px;
    height: 150px;
}
</style>