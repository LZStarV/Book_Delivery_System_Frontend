<template>
    <div class="logo-content" @click="clickLogo">
        <img src="@/assets/vue.svg" alt="Logo" class="logo-image" />
        <span class="logo-text">图书派送系统</span>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const props = defineProps<{
    currentRoute: string
}>()

const router = useRouter()

const clickLogo = () => {
    if (props.currentRoute === '/') {
        ElMessage.success('您已位于首页');
    } else {
        router.push('/')
    }
}
</script>

<style lang="scss" scoped>
.logo-content {
    display: flex;
    align-items: center;
    height: 100%;

    .logo-image {
        height: 35px;
        margin-right: 10px;
        will-change: filter;
        transition: filter 600ms;

        &:hover {
          cursor: pointer;
          filter: drop-shadow(0 0 2em #42b883);
        }
    }

    .logo-text {
        font-size: 20px;
        font-weight: bold;
    }
}
</style>