import { ref } from "vue"

// 加载状态及按钮禁用统一管理HOOK
export const statusManage = () => {
    let loading = ref(false);
    let disableButton = ref(false);
    const statusChange = (status: boolean) => {
        loading.value = status;
        disableButton.value = status;
    }

    return {loading, disableButton, statusChange}
}