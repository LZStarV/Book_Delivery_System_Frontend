<template>
    <n-space vertical size="large" style="width: 100%; height: 100vh; justify-content: center; align-items: center;">
        <n-card title="登录" hoverable embedded>
            <n-form ref="formRef" :model="form" :rules="rules" label-placement="left" label-width="80" size="medium">
                <n-form-item label="学号" path="studentid">
                    <n-input v-model:value="form.studentid" placeholder="请输入学号" />
                </n-form-item>
                <n-form-item label="密码" path="password">
                    <n-input v-model:value="form.password" type="password" show-password-on="mousedown"
                        placeholder="请输入密码" />
                </n-form-item>
                <n-form-item>
                    <n-button type="primary" block :loading="loading" @click="handleLogin">
                        <p class="logintext">登录</p>
                    </n-button>
                </n-form-item>
            </n-form>
            <div class="register-tip">
                没有账号？
                <router-link to="/register">
                    点我注册
                </router-link>
            </div>
        </n-card>
    </n-space>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useMessage, NSpace, NCard, NForm, NFormItem, NInput, NButton } from 'naive-ui';
import { useLoginRules, useLoginHandler } from '../hooks/useLogin';
import setMessageHandler from '@/utils/http.js'

const formRef = ref();
const loading = ref(false);
const nmessage = useMessage();

const form = reactive({
    studentid: '',
    password: ''
});

const rules = useLoginRules();

const handleLogin = async () => {
    try {
        setMessageHandler(nmessage);
        const res: any = await useLoginHandler({ formRef, form, loading })();
        if (res) {
            nmessage.success('登录成功');
            // ...登录成功后的逻辑...
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
}

$login-text-spacing: 20px;

.n-button {
    margin-top: 10px;

    .logintext {
        color: #fff;
        letter-spacing: $login-text-spacing;
        padding-left: $login-text-spacing;
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