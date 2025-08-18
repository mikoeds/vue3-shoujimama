import wangEditor from "wangeditor";
import { IMG_URL, UPLOAD_URL } from "../utiles/config";
import { ElMessage } from "element-plus";
import { getUploadToken } from "../utiles/api/mallGoods";
import type { uploadSuccessResponsType, uploadTokenParamType, uploadTokenResponsType } from "../types/upload";
import { onUnmounted, ref } from "vue";
import { postImg } from "../utiles/request";


// 富文本编辑器Hook
export const useEditor = (id: string = "#editor", callback:(data:string) => void) => {
    const editor = ref();

    // 初始化编辑器
    const initEditor = () => {
        const editor = new wangEditor(id);
        editor.config.height = 500;
        editor.config.uploadImgServer = UPLOAD_URL;
        editor.config.uploadFileName = "file";
        // 自定义上传配置
        editor.config.customUploadImg = (files: Array<File>, insertFn: (src: string) => void) => {
            // files为上传文件列表, insertFn为图片插入函数
            if (files.length === 0 || !files) {
                ElMessage.warning("请上传文件！");
                return;
            }

            if (files.length > 5) {
                ElMessage.warning("只能最多上传5张图片");
                return;
            }

            const suffix: Array<string> = [];
            // 获取后缀信息
            for (const item of files) {
                suffix.push(item.type);
            }

            // 获取上传token
            getUploadToken<uploadTokenResponsType, uploadTokenParamType>({ suffix: suffix.join(",") }).then(res => {
                // 上传图片
                for (const item of res.result.fileName) {
                    postImg<uploadSuccessResponsType>({ file: files[res.result.fileName.indexOf(item)], token: res.result.upToken, key: item }).then(res => {
                        console.log(res);
                        insertFn(IMG_URL + "/" + res.key);
                    })

                }
            })
        }
        editor.config.onchange = (data: string) => {
            data = data.replace(/(<img[^>]*style=")([^"]*)/g, "$1$2vertical-align:top;display: block;").replace(/(vertical-align:top;display: block;)\1+/g, "vertical-align:top;display: block;");
            return callback(data);
        };
        editor.create();

        return editor;
    }

    // 销毁编辑器
    const deletEditor = () => {
        editor.value?.destroy();
    }

    onUnmounted(() => {
        deletEditor();
    })

    return { initEditor, deletEditor }
}