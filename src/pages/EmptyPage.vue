<template>
    <n-space justify="center" align="center" style="height: 100vh; width: 100%;">
      <n-result status="404" title="404 资源不存在" size="huge">
            <template #footer>
                <n-button type="primary" @click="$router.push('/')">
                    <n-text>返回首页</n-text>
                </n-button>
            </template>
      </n-result>
    </n-space>
</template>

<script lang="ts" setup>
import { NSpace, NButton, NResult, NText } from 'naive-ui';
</script>

<style lang="scss" scoped>
.n-button {
    margin-top: 20px;
    padding: 10px 20px;

    .n-text {
        color: #fff;
    }
}
</style>
