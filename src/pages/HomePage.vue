<template>
  <global-layout>
    <template #content>
        内容
    </template>
  </global-layout>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent.vue';
import { NLayout, NLayoutHeader, NLayoutContent, NDialogProvider } from 'naive-ui';
</script>

<style scoped lang="scss">
$header-height: 8vh;
.n-layout {
    height: 100vh;

  .n-layout-header {
    height: $header-height;
    display: flex;
    align-items: center;
  }

  .n-layout-content {
    background: rgba(128, 128, 128, 0.4);
    height: calc(100vh - $header-height);
    overflow: hidden;
  }
}
</style>