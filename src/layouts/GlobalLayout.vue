<template>
  <n-layout>
    <n-dialog-provider>

      <n-layout-header>
        <header-component />
      </n-layout-header>

      <n-layout-content>
        <!-- 面包屑导航 -->
        <n-breadcrumb v-if="showBreadcrumb" class="global-breadcrumb">
          <n-breadcrumb-item v-for="(item, idx) in breadcrumbList" :key="idx">
            <router-link v-if="item.path" :to="item.path">{{ item.name }}</router-link>
            <span v-else>{{ item.name }}</span>
          </n-breadcrumb-item>
        </n-breadcrumb>
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
import { NLayout, NLayoutHeader, NLayoutContent, NDialogProvider, NH1, NBreadcrumb, NBreadcrumbItem } from 'naive-ui';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
const hiddenNames = ['首页', '登录', '注册'];
const titleShow = !hiddenNames.includes(<string>route.name)

// 生成面包屑数据
const showBreadcrumb = computed(() => route.name !== '首页' && route.name !== undefined);

const breadcrumbList = computed(() => {
  // 只处理两级：首页 > 当前页
  const list = [];
  if (route.name && route.name !== '首页') {
    list.push({ name: '首页', path: '/' });
    list.push({ name: route.name as string });
  }
  return list;
});
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
    //overflow: hidden;

    .global-breadcrumb {
      margin: 18px 0 0 20px;
      font-size: 15px;
    }

    .n-h1 {
      height: 35px;
      margin: 10px 0 0 20px;
      display: flex;
      align-items: center;
    }
  }
}
</style>