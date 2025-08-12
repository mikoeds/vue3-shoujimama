import { ElMessage, type UploadFile } from "element-plus";
import type { uploadCheckParamType, uploadDataType, uploadParamType, uploadSuccessParamType, uploadTokenParamType, uploadTokenResponsType } from "../types/upload";
import { getUploadToken } from "../utiles/api/mallGoods";

// 图片类型映射
const imgTypeMap = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml"
}
type imgTypeKey = keyof typeof imgTypeMap;



// 上传相关代码复用片段
export const useUpload = ({ disableButton, loading }: uploadParamType) => {
    // 上传参数
    const uploadData: uploadDataType = {
        token: "",
        key: ""
    };

    // 上传成功回调
    const uploadSuccess = ({ response, file, successCallback }: uploadSuccessParamType) => {
        disableButton.value = false;
        loading.value = false;
        if (successCallback) {
            successCallback(response, file)
        }
    };

    // 上传失败回调
    const uploadFail = () => {
        disableButton.value = false;
        loading.value = false;
        ElMessage.warning("上传失败")
    };

    // 上传图片预处理回调
    const beforeupload = async({ file, limit = 500, fileType = ".png,.jpg,.jpeg,.gif", checkBefore, errorCallback }: uploadCheckParamType) => {
        disableButton.value = true;
        loading.value = true;
        // 自定义检查
        if (checkBefore) {
            if (!checkBefore(file)) {
                disableButton.value = false;
                loading.value = false;
                return false
            }
        }

        // 图片大小限制
        if (file.size / 1024 > limit) {
            ElMessage.warning(`请上传大小不超过${{ limit }}KB的文件`)
            disableButton.value = false;
            loading.value = false;
            if (errorCallback) {
                errorCallback(file);
            }
            return false;
        }
        // 图片类型限制
        let fileTypeList: Array<string> = [];
        fileType.split(",").forEach(item => {
            const key = item as imgTypeKey;
            fileTypeList.push(imgTypeMap[key])
        })
        if (!fileTypeList.includes(file.type)) {
            ElMessage.warning(`请上传${{ fileType }}类型文件`)
            disableButton.value = false;
            loading.value = false;
            if (errorCallback) {
                errorCallback(file);
            }
            return false;
        }

        // 获取文件后缀
        const suffix = file.type.split("/")[1];

        // 获取上传参数
        return getUploadParams(suffix);
    }

    // 获取上传参数（参数为后缀名,闭包确定参数）
    const getUploadParams = async(data: string) => {
        return getUploadToken<uploadTokenResponsType, uploadTokenParamType>({ suffix: data }).then(res => {
            uploadData.token = res.result.upToken;
            uploadData.key = res.result.fileName[0];
        }).catch(error => {
            console.log(error);
        })
    }

    return { uploadSuccess, 
        uploadFail, 
        beforeupload, 
        //  返回一个方法保证数据时效性及防止外部修改
        uploadData : () => uploadData }
}