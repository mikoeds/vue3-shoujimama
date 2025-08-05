<script setup lang="ts">
import { ElMessage } from 'element-plus';
import type { loginResultType, loginType } from '../types/login';
import { getLoginCode, postLogin } from '../utiles/api/login';
import router from '../router';
import { reactive, ref } from 'vue';

const diableButton = ref(false)
const diableButton2 = ref(false)
const loading = ref(false)
// 登录回调
const formData = reactive<loginType>({
    code: "",
    username: "",
    password: "",
    validate: ""
})
const handleLogin = (formData: loginType) => {
    diableButton2.value = true;
    loading.value = true;
    postLogin<loginResultType, loginType>(formData).then(
        response => {
            ElMessage.success("登录成功");
            localStorage.setItem("Authorization", response.result.accessToken);
            localStorage.setItem("refreshToken", response.result.refreshToken);
            // 推送回先前页面或直接推送首页
            const redirectPath = router.currentRoute.value.query.redirect;
            if (redirectPath) {
                router.push(redirectPath as string)
            } else {
                router.push("/")
            };
        }
    ).catch(
        erro => {
            console.log(erro);
            ElMessage.error(erro);
        }
    ).finally(
        () => {
            diableButton2.value = false;
            loading.value = false;
        }
    )
}

// 倒计时
const time = ref(60);
const timer = () => {
    diableButton.value = true;
    const intervalId = setInterval(() => {
        time.value--
        if (time.value <= 0) {
            time.value = 60;
            diableButton.value = false;
            clearInterval(intervalId);
        }
    }, 1000)
};

// 获取验证码回调
const getCodeButton = () => {

    timer();
    getLoginCode({ mobile: formData.username }).then((response) => {
        // formData.code = response.result
        if (response.status === 1) {
            ElMessage.success("已发送")
        }
    }).catch(
        erro => {
            ElMessage.error(erro)
        }
    ).finally(

    )
}

// 表单校验
const rules = {
    username: [{ required: true, message: "请填写用户名", trigger: "blur" }],
    password: [{ required: true, message: "请填写密码", trigger: "blur" }],
    code: [{ required: true, message: "请填写验证码", trigger: "blur" }]
};
// 登录按钮回调
const handleLoginButton = () => {
    handleLogin(formData)

}
</script>

<template>
    <div class="back">
        <div class="title">手机商城后台管理系统</div>
        <div class="loginForm">
            <div class="ms-login">
                <el-form label-width="90px" v-loading="loading" class="demo-loginForm ms-content" :model="formData"
                    :rules="rules" @submit.prevent @keyup.enter="handleLoginButton">
                    <el-form-item label="账号：" prop="username">
                        <el-input v-model.trim="formData.username" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input v-model.trim="formData.password" type="password" autocomplete="on"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码：" prop="code">
                        <div style="display: flex;">
                            <el-input placeholder="请输入验证码" v-model.trim="formData.code"></el-input>
                            <el-button @click="getCodeButton()" text type="primary" :disabled="diableButton">{{
                                diableButton ?
                                    time + "秒后重试" : "获取验证码" }}</el-button>
                        </div>
                    </el-form-item>
                    <el-button class="loginButton" @click="handleLoginButton" :disabled="diableButton2">登录</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<style>
.back {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(http://img.zgwstxc.com/admin-bg.jpg) no-repeat;
    background-size: cover;
}

.title {
    position: absolute;
    left: 50%;
    top: 23%;
    font-size: 35px;
    text-align: center;
    color: #fff;
    transform: translateX(-50%);
}

.loginForm {
    position: absolute;
    left: 50%;
    top: 31%;
    width: 400px;
    margin-top: 10px;
    background-color: #409eff;
    border-radius: 5px;
    transform: translateX(-50%);
}

.ms-login {
    margin: 10px;
    background: rgba(255, 255, 255, 0.9);
}

.ms-content {
    padding: 30px 30px 30px 25px;
}

.loginButton {
    width: 100%;
}
</style>