<script setup lang="ts">
import { onMounted } from 'vue';
import type { regionInfo } from '../../types/freighTemplate';
import type { CheckboxValueType } from 'element-plus';



const showDialog = defineModel<boolean>("showDialog", { required: true });
const selectAll = defineModel<boolean>("selectAll");
const regionData = defineModel<Array<regionInfo>>("regionData", { required: true });
const regionSelectData = defineModel<Array<number>>("regionSelectData", { required: true });

const emit = defineEmits<{
    selectChange: [Array<number>]
}>()

// 判断是否全选了
const isSelectAll = () => {
    if (regionSelectData.value.length === regionData.value.length) {
        selectAll.value = true;
    } else {
        selectAll.value = false;
    }
}

// 选择回调
const selectChange = () => {
    isSelectAll();
    emit("selectChange", regionSelectData.value);
}

// 全选回调 
const selectAllChange = (val: CheckboxValueType) => {
    regionSelectData.value = val ? regionData.value.map(item => item.id) : []
    emit("selectChange", regionSelectData.value);
}



onMounted(() => {
    isSelectAll();
})

</script>

<template>
    <div>
        <el-dialog v-model="showDialog" title="配送区域" @close="">
            <el-form>
                <el-form-item label="选择可配送区域：">
                    <div>
                        <el-checkbox v-model="selectAll" @change="selectAllChange">全选</el-checkbox>
                        <el-checkbox-group v-model="regionSelectData" @change="selectChange">
                            <el-checkbox v-for="item in regionData" :label="item.id" :value="item.id" :key="item.id">{{
                                item.name }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<style scoped></style>