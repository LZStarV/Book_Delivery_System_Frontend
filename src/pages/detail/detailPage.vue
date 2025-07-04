<template>
    <global-layout>
        <template #content>
            <div class="detail-container">
                <n-card v-if="file" class="n-card">
                    <div class="cover-and-info">
                        <img :src="file.cover_image" alt="封面" class="cover-img" />
                        <n-descriptions label-placement="top" bordered size="large" class="desc" :column="3"
                            label-class="desc-label">
                            <n-descriptions-item label="标题">
                                <span class="desc-content">{{ file.title }}</span>
                            </n-descriptions-item>
                            <n-descriptions-item label="上传者">
                                <span class="desc-content">{{ file.user.username }}</span>
                            </n-descriptions-item>
                            <n-descriptions-item label="分类">
                                <span class="desc-content">{{ file.category.name }}</span>
                            </n-descriptions-item>
                            <n-descriptions-item label="文件类型">
                                <span class="desc-content">{{ file.file_ext.toUpperCase() }}</span>
                            </n-descriptions-item>
                            <n-descriptions-item label="文件大小">
                                <span class="desc-content">{{ (file.file_size / 1024).toFixed(1) }} KB</span>
                            </n-descriptions-item>
                            <n-descriptions-item label="上传时间">
                                <span class="desc-content">{{ formatDate(file.created_at) }}</span>
                            </n-descriptions-item>
                            <n-descriptions-item label="标签">
                                <span class="desc-content">
                                    <n-tag v-for="tag in file.fixed_tags" :key="tag.name" type="info"
                                        style="margin-right: 4px;">
                                        {{ tag.name }}
                                    </n-tag>
                                </span>
                            </n-descriptions-item>
                            <n-descriptions-item label="自定义标签">
                                <span class="desc-content">{{ file.tags }}</span>
                            </n-descriptions-item>
                            <n-descriptions-item label="浏览/点赞/下载">
                                <span class="desc-content">{{ file.view_count }}</span><br>
                                <span class="desc-content">{{ file.like_count }}</span><br>
                                <span class="desc-content">{{ file.download_count }}</span>
                            </n-descriptions-item>
                        </n-descriptions>
                    </div>
                    <div class="btn-area">
                        <n-button type="primary" @click="handleDownload(file.file_uuid)">下载文件</n-button>
                    </div>
                </n-card>
                <n-empty v-else description="未找到该文件" />
            </div>
        </template>
    </global-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { NCard, NTag, NButton, NEmpty, NDescriptions, NDescriptionsItem } from 'naive-ui';
import { allFiles } from '@/mock/mockFiles';
import GlobalLayout from "@/layouts/GlobalLayout.vue";

const route = useRoute()
const fileUuid = route.params.file_uuid as string

const file = ref(allFiles.find(f => f.file_uuid === fileUuid))

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN')
}

const handleDownload = (fileUuid: string) => {
    // 下载逻辑
    console.log('下载', fileUuid)
}
</script>

<style scoped lang="scss">
$main-font-size: 24px;
$desc-font-size: 18px;
$label-font-size: 18px;
$desc-label-weight: 700;
$desc-content-weight: 400;

.detail-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.n-card {
    width: 80vw;
    padding: 40px 32px;
    box-sizing: border-box;
}

.cover-and-info {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 40px;
}

.cover-img {
    width: 200px;
    height: 270px;
    object-fit: cover;
    align-self: center;
    border-radius: 12px;
    margin-bottom: 0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    flex-shrink: 0;
}

.desc {
    flex: 1;
    width: 100%;

    .n-descriptions {
        width: 100%;
    }

    .n-descriptions-item__label {
        font-size: $label-font-size;
        font-weight: $desc-label-weight;
        color: #444;
    }

    .n-descriptions-item__content {
        font-size: $desc-font-size;
        font-weight: $desc-content-weight;
        color: #222;
    }

    .main-title {
        font-size: $main-font-size;
        font-weight: bold;
        color: #222;
    }

    .desc-label {
        font-size: $label-font-size;
        font-weight: $desc-label-weight;
        color: #444;
        margin-right: 4px;
    }

    .desc-content {
        font-size: $desc-font-size;
        font-weight: $desc-content-weight;
        color: #222;
    }
}

.btn-area {
    display: flex;
    justify-content: center;
    margin-top: 32px;
}
</style>