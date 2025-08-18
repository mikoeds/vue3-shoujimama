<!-- 图片上传组件(多图片) -->
<script setup lang="ts">
import type { UploadRawFile } from 'element-plus';
import { useUpload } from '../../hooks/uploadHooks';
import { IMG_URL, UPLOAD_URL } from '../../utiles/config';
import type { uploadSuccessResponsType } from '../../types/upload';
import { computed, ref } from 'vue';

interface props {
    // 图片类型限制列表
    acceptList?: Array<string>;
    // 图片大小限制
    limit?: number;
    imageWidth?: number;
    imageHeight?: number;
}
const imgList = defineModel<Array<string>>("imgList", { required: true });
const disableButton = defineModel<boolean>("disableButton", { required: true });
const loading = defineModel<boolean>("loading", { required: true });
const { uploadSuccess, uploadFail, imgBeforeupload, uploadData } = useUpload({ disableButton, loading });
const { acceptList = [".png", ".jpg", ".jpeg", ".gif"], limit, imageWidth, imageHeight } = defineProps<props>();
const accepet = acceptList?.join(",");

// 上传成功回调
const successCallback = (response: uploadSuccessResponsType, file: UploadRawFile) => {
    console.log(response);
    console.log(file);
    imgList.value.push("/" + response.key);
}
// 放大回调
const dialogShow = ref(false)
const handleEnlarge = () => {
    dialogShow.value = true;
}

// 删除回调
const handleDelet = (item: string) => {
    imgList.value.splice(imgList.value.indexOf(item), 1);
}

</script>

<template>
    <div class="pic-contain" v-for="item in imgList">
        <img :src="IMG_URL + item" alt="tupian" class="imgShow">
        <div class="hoverPic">
            <el-icon class="icon-close" @click="handleEnlarge">
                <ZoomIn />
            </el-icon>
            <el-icon class="icon-close" @click="handleDelet(item)" v-if="!disableButton">
                <Delete />
            </el-icon>
        </div>
        <el-dialog v-model="dialogShow">
            <img :src="IMG_URL + item" alt="tupian" class="imgShow">
        </el-dialog>
    </div>
    <el-upload :accepet="accepet" :action="UPLOAD_URL" v-if="!disableButton"
        :on-success="(response: uploadSuccessResponsType, file: UploadRawFile) => uploadSuccess({ response, file, successCallback })"
        :on-error="uploadFail" :data="uploadData"
        :before-upload="(file: UploadRawFile) => imgBeforeupload({ file, limit, fileType: accepet })">
        <el-icon class="uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<style scoped lang="scss">
.pic-contain {
    $imageWidth: v-bind('imageWidth + "px"');
    $imageHeight: v-bind('imageHeight + "px"');
    $imageLineHeight: v-bind('imageHeight + "px"');
    width: $imageWidth;
    height: $imageHeight;
    position: relative;

    .imgShow {
        width: 100%;
        height: 100%;
    }

    &:hover .hoverPic {
        opacity: 50%;
    }

    .hoverPic {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: black;
        left: 0;
        top: 0;
        opacity: 0;
        font-size: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.3s;

        .icon-close {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            cursor: pointer;
            color: white;

            &+.icon-close {
                margin-left: 50px;
            }
        }
    }
}
</style>