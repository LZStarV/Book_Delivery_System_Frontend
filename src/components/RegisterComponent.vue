<template>
    <n-space vertical size="large" style="width: 100%; height: 100vh; justify-content: center; align-items: center;">
        <n-card title="注册" hoverable embedded>
            <n-form ref="formRef" :model="form" :rules="rules" label-placement="left" label-width="80" size="medium">
                <n-form-item label="用户名" path="username">
                    <n-input v-model:value="form.username" placeholder="请输入用户名" />
                </n-form-item>
                <n-form-item label="学号" path="studentid">
                    <n-input v-model:value="form.studentid" placeholder="请输入学号" />
                </n-form-item>
                <n-form-item label="密码" path="password">
                    <n-input v-model:value="form.password" type="password" show-password-on="mousedown"
                        placeholder="请输入密码" />
                </n-form-item>
                <n-form-item label="确认密码" path="confirmPassword">
                    <n-input v-model:value="form.confirmPassword" type="password" show-password-on="mousedown"
                        placeholder="请再次输入密码" />
                </n-form-item>
                <n-form-item>
                    <n-button type="primary" block :loading="loading" @click="handleRegister">
                        <n-text class="registertext">注册</n-text>
                    </n-button>
                </n-form-item>
            </n-form>
            <div class="register-tip">
                已有账号？
                <router-link to="/login">
                    点我登录
                </router-link>
            </div>
        </n-card>
    </n-space>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useMessage, NSpace, NCard, NForm, NFormItem, NInput, NButton, NText } from 'naive-ui';
import { useRegisterRules, useRegisterHandler } from '../hooks/userRegister';
import setMessageHandler from '@/utils/http.js'

const formRef = ref();
const loading = ref(false);
const nmessage = useMessage();

const form = reactive({
    username: '',
    studentid: '',
    password: '',
    confirmPassword: ''
});

const rules = useRegisterRules();

const handleRegister = async () => {
    try {
        setMessageHandler(nmessage);
        const res: any = await useRegisterHandler({ formRef, form, loading })();
        if (res) {
            nmessage.success('注册成功');
            // ...注册成功后的逻辑...
            console.log(res);
        }
    } catch (e) {
        // 错误消息已由 http.js 统一处理
    }
};
</script>

<style scoped lang="scss">
.n-space {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.n-card {
    background-color: #fff;
    height: auto;
    padding: 20px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

$register-text-spacing: 20px;

.n-button {
    margin-top: 10px;

    .registertext {
        color: #fff;
        letter-spacing: $register-text-spacing;
        padding-left: $register-text-spacing;
    }
}

.register-tip {
    margin-top: 12px;
    font-size: 12px;
    color: #888;
    text-align: center;

    a {
        color: #18a058;
        text-decoration: underline;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
            color: #1abd58;
        }
    }
}
</style>
