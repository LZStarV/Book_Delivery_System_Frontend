<template>
    <n-space justify="center" align="center" style="height: 100vh; width: 100%;">
        <n-empty description="你什么也找不到" size="huge">
            <template #extra>
                <n-button class="n-button" type="primary" @click="$router.push('/')">
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
.n-button {
    margin-top: 20px;
    padding: 20px;

    .n-text {
        color: #fff;
    }
}
</style>