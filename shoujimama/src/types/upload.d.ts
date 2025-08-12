import type { UploadRawFile } from "element-plus";
import { Ref } from "vue"

// 上传钩子参数类型
export interface uploadParamType {
    disableButton: Ref<boolean>;
    loading: Ref<boolean>;
}

// 上传参数类型
export interface uploadDataType {
    /** 七牛云上传授权令牌 */
    token: string;
    /** 资源在七牛云存储的唯一标识key */
    key: string;
}
// 上传请求参数leix
export interface uploadTokenParamType {
    /** 文件后缀名（如：png/mp4） */
    suffix: string;
}

// 上传请求回复的凭证类型
export interface uploadTokenResponsType {
    /** 生成的文件名数组（支持批量上传） */
    fileName: Array<string>;
    /** 七牛云上传令牌 */
    upToken: string;
}

// 上传成功回调
export interface uploadSuccessResponsType {
    /** 文件哈希值（用于校验文件完整性） */
    hash: string;
    /** 资源在七牛云存储的唯一标识key */
    key: string;
}
// 上传成功回调参数类型
export interface uploadSuccessParamType {
    response: uploadSuccessResponsType;
    file: UploadFile;
    successCallback?: (respons: uploadSuccessResponsType, file: UploadFile) => void
}

// 上传校验类型
export interface uploadCheckParamType {
    file: UploadRawFile;
    // 大小限制
    limit?: number;
    // 类型限制
    fileType?: string;
    // 自定义检测
    checkBefore?: (file: UploadRawFile) => boolean;
    // 错误回调
    errorCallback?: (file: UploadRawFile) => void;
}