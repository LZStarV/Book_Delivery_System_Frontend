<template>
  <n-layout>
    <n-dialog-provider>

      <n-layout-header>
        <header-component />
      </n-layout-header>

      <n-layout-content>
        <n-h1 v-if="titleShow" prefix="bar">
          <n-gradient-text :size="24" type="success">
            {{ route.name }}
          </n-gradient-text>
        </n-h1>
        <slot name="content"></slot>
      </n-layout-content>

    </n-dialog-provider>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutContent, NDialogProvider, NH1 } from 'naive-ui';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const hiddenNames = ['首页', '登录', '注册'];
const titleShow = !hiddenNames.includes(<string>route.name)

</script>

<style scoped lang="scss">
$header-height: 8vh;

.n-layout {
  height: 100vh;

  .n-layout-header {
    height: $header-height;
    position: absolute;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.6);
    /* 半透明背景 */
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
    /* 悬浮阴影 */
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    z-index: 1000;
    transition: box-shadow 0.3s ease, background 0.3s ease;
  }

  .n-layout-content {
    height: calc(100vh - $header-height);
    margin-top: $header-height;
    overflow: hidden;

    .n-h1 {
      height: 35px;
      margin: 20px 0 0 20px;
      display: flex;
      align-items: center;

    }


  }
}
</style>