<template>
    <n-message-provider>
        <login-component />
    </n-message-provider>
</template>

<script setup lang="ts">
import LoginComponent from '@/components/LoginComponent.vue';
import { NMessageProvider } from 'naive-ui';
</script>

<style scoped lang="scss"></style>