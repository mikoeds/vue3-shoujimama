<script setup lang="ts">
import { reactive, ref } from 'vue';
import { statusManage } from '../../hooks/stateChange';
import imgUpload from '../common/imgUpload.vue';
import videoUpload from '../common/videoUpload.vue';
import imgListUpload from '../common/imgListUpload.vue';

const { loading, disableButton, statusChange } = statusManage();
const imgUrl = ref("");
const vidUrl = ref("");
const imgList = reactive<Array<string>>([]);

</script>

<template>
    <div>
        <el-form label-width="150px">
            <el-divider content-position="left">用户基本信息</el-divider>
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-form-item label="商品分类">
                        <el-select></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button>刷新</el-button>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商品名称">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商品状态">
                        <el-select></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="运费模板">
                        <el-select></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button>刷新</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-form-item label="成本价">
                        <el-input>
                            <template v-slot:append>元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="批发价">
                        <el-input>
                            <template v-slot:append>元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="零售价">
                        <el-input>
                            <template v-slot:append>元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="淘宝价">
                        <el-input>
                            <template v-slot:append>元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-form-item label="货号">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否使用货号">
                        <el-select></el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="排序">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="最多可抵扣红包">
                        <el-input>
                            <template v-slot:append>个</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="发布平台">
                        <el-select></el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品卖点">
                        <el-input type="textarea" maxlength="60" show-word-limit :rows="3"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品主图">
                        <imgUpload v-model:disable-button="disableButton" v-model:img-url="imgUrl"
                            v-model:loading="loading">
                        </imgUpload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="轮播视频">
                        <videoUpload :disable-button="disableButton" :loading="loading" :vid-url="vidUrl"
                            :video-width="380" :video-height="190"></videoUpload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="商品轮播图">
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
</template>

<style>
.el-upload {
    width: 150px;
    height: 150px;
}
</style>