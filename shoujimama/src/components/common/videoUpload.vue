<!-- 视频上传组件 -->
<script setup lang="ts">
import type { UploadRawFile } from 'element-plus';
import { useUpload } from '../../hooks/uploadHooks';
import { IMG_URL, UPLOAD_URL } from '../../utiles/config';
import type { uploadSuccessResponsType } from '../../types/upload';
import { ref } from 'vue';

interface props {
    // 视频大小限制
    limit?: number;
    videoWidth?: number;
    videoHeight?: number;
}
const videoUrl = defineModel<string>("vidUrl", { required: true })
const disableButton = defineModel<boolean>("disableButton", { required: true })
const loading = defineModel<boolean>("loading", { required: true })
const { uploadSuccess, uploadFail, videaBeforeupload, uploadData } = useUpload({ disableButton, loading })
const { limit, videoWidth, videoHeight } = defineProps<props>()
const accepet = "mp4,avi"

// 上传成功回调
const successCallback = (response: uploadSuccessResponsType, file: UploadRawFile) => {
    console.log(response);
    console.log(file);
    videoUrl.value = "/" + response.key
}
// 放大回调
const dialogShow = ref(false)
const handleEnlarge = () => {
    dialogShow.value = true;
}

// 删除回调
const handleDelet = () => {
    videoUrl.value = ""
}

// dialog关闭回调
const videoDialog = ref<HTMLVideoElement | null>(null)
const handleDialogClose = () => {
    videoDialog.value?.pause();
}

</script>

<template>
    <el-upload :accepet="accepet" :action="UPLOAD_URL" v-if="!videoUrl && !disableButton"
        :on-success="(response: uploadSuccessResponsType, file: UploadRawFile) => uploadSuccess({ response, file, successCallback })"
        :on-error="uploadFail" :data="uploadData"
        :before-upload="(file: UploadRawFile) => videaBeforeupload({ file, limit })">
        <el-icon class="uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
    <div class="vid-contain" v-if="videoUrl">
        <video :src="IMG_URL + videoUrl" class="vidShow" ></video>
        <div class="hoverVideo">
            <el-icon class="icon-close" @click="handleEnlarge">
                <ZoomIn />
            </el-icon>
            <el-icon class="icon-close" @click="handleDelet" v-if="!disableButton">
                <Delete />
            </el-icon>
        </div>
        <el-dialog v-model="dialogShow" @closed="handleDialogClose">
            <video :src="IMG_URL + videoUrl" class="vidShow" controls ref="videoDialog"></video>
        </el-dialog>
    </div>

</template>

<style scoped lang="scss">
.vid-contain {
    $videoWidth: v-bind('videoWidth + "px"');
    $videoHeight: v-bind('videoHeight + "px"');
    $videoLineHeight: v-bind('videoHeight + "px"');
    width: $videoWidth;
    height: $videoHeight;
    position: relative;



    .vidShow {
        width: 100%;
        height: 100%;
    }

    &:hover .hoverVideo {
        opacity: 50%;
    }

    .hoverVideo {
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