<template>
    <n-space vertical size="large">

        <n-layout>
            <n-layout-header bordered>颐和园路</n-layout-header>
            <n-layout-content>
                平山道
            </n-layout-content>
            <n-layout-footer>成府路</n-layout-footer>
        </n-layout>

    </n-space>
</template>

<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutFooter, NLayoutContent, NSpace } from 'naive-ui';
</script>

<style scoped lang="scss">
.n-layout-header,
.n-layout-footer {
    background: rgba(128, 128, 128, 0.2);
    padding: 24px;
}

.n-layout-sider {
    background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
    background: rgba(128, 128, 128, 0.4);
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}
</style>