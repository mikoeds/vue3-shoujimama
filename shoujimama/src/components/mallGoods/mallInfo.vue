<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { statusManage } from '../../hooks/stateChange';
import imgUpload from '../common/imgUpload.vue';
import videoUpload from '../common/videoUpload.vue';
import imgListUpload from '../common/imgListUpload.vue';
import { useEditor } from '../../hooks/useEditor';
import type { mallGoodsParamType } from '../../types/good';
import type { categoryInfoType } from '../../types/category';
import type { dictDataType } from '../../types/dic.t';
import type { deliverDataType } from '../../types/deliver';

const { loading, disableButton, statusChange } = statusManage();
const imgList = reactive<Array<string>>([]);
const editor = ref();
const editorContent = ref("");
interface props {
    id: number,
    categoryClassList: Array<categoryInfoType>,
    categoryStatusList: Array<dictDataType>,
    freightTemplateList: Array<deliverDataType>,
    isUseNoList: Array<dictDataType>,
    platformList: Array<dictDataType>
}
const { id, categoryClassList, categoryStatusList, freightTemplateList, isUseNoList, platformList} = defineProps<props>();

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
    editorContent.value = data;
}
const { initEditor, deletEditor } = useEditor("#editor", handleEditorChangeCallback);

onMounted(() => {
    editor.value = initEditor();
})
</script>

<template>
    <div>
        <el-form label-width="150px" :model="form">
            <el-divider content-position="left">用户基本信息</el-divider>
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-form-item label="商品分类" prop="category_ids">
                        <el-select v-model="form.category_ids">
                            <el-option v-for="item in categoryClassList">{{ item.name }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button>刷新</el-button>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model.trim="form.goods_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商品状态" prop="status">
                        <el-select v-model="form.status">
                            <el-option v-for="item in categoryStatusList">{{ item.dictLabel }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="运费模板" prop="deliver_id">
                        <el-select v-model="form.deliver_id">
                            <el-option v-for="item in freightTemplateList">{{ item.deliver_name }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button>刷新</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-form-item label="成本价" prop="cost_price">
                        <el-input v-model.trim="form.cost_price">
                            <template v-slot:append>元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="批发价" prop="wholesale_price">
                        <el-input v-model.trim="form.wholesale_price">
                            <template v-slot:append>元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="零售价" prop="retail_price">
                        <el-input v-model.trim="form.retail_price">
                            <template v-slot:append>元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="淘宝价" prop="official_price">
                        <el-input v-model.trim="form.official_price">
                            <template v-slot:append>元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-form-item label="货号" prop="goods_no">
                        <el-input v-model.trim="form.goods_no" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否使用货号" prop="is_goods_no">
                        <el-select v-model="form.is_goods_no">
                            <el-option v-for="item in isUseNoList">{{ item.dictLabel }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="排序" prop="sort">
                        <el-input v-model.trim="form.sort"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="最多可抵扣红包" prop="red_packet_price">
                        <el-input v-model.trim="form.red_packet_price">
                            <template v-slot:append>个</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="发布平台" prop="platform_type">
                        <el-select v-model="form.platform_type">
                            <el-option v-for="item in platformList">{{ item.dictLabel }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品卖点" prop="selling_poiont">
                        <el-input type="textarea" maxlength="60" show-word-limit :rows="3" v-model.trim="form.selling_poiont"></el-input>
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
        <el-button>确认</el-button>
    </div>
    <div>
        {{ form }}
    </div>
</template>

<style>
.el-upload {
    width: 150px;
    height: 150px;
}
</style>