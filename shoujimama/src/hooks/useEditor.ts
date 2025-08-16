import wangEditor from "wangeditor";
import { UPLOAD_URL } from "../utiles/config";


// 富文本编辑器Hook
export const useEditor = (id:string = "editor") => {
    // 初始化编辑器
    const initEditor = () => {
        const editor = new wangEditor(id);
        editor.config.height = 500;
        editor.config.uploadImgServer = UPLOAD_URL;
        editor.config.uploadFileName = "file";
        editor.config.customUploadImg = () => {
            
        }
    }

    // 销毁编辑器
    const deletEditor = () => {

    }

    return {initEditor, deletEditor}
}