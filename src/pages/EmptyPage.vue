<template>
    <n-space justify="center" align="center" style="height: 100vh; width: 100%;">
        <n-empty description="你什么也找不到">
            <template #extra>
                <n-button type="primary" @click="$router.push('/')">
                    <n-text>返回首页</n-text>
                </n-button>
            </template>
        </n-empty>
    </n-space>
</template>

<script lang="ts" setup>
import { NSpace, NButton, NEmpty, NText } from 'naive-ui';
</script>

<style lang="scss" scoped>
// 调整按钮样式
.n-button {
    margin-top: 20px;
    padding: 10px 20px; // 调整内边距，使用更合理的值

    .n-text {
        color: #fff;
    }
}
</style>
