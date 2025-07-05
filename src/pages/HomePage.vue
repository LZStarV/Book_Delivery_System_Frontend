<template>
  <global-layout>
    <template #content>
      <div class="reader-home">
        <!-- 搜索区域 -->
        <div class="search-area">
          <n-card class="search-card" :bordered="false">
            <n-input-group compact class="search-group">
              <n-input v-model="searchText" placeholder="搜索内容" class="search-input">
              </n-input>
              <n-button type="primary" @click="handleSearch">
                搜索
              </n-button>
            </n-input-group>
          </n-card>
        </div>

        <!-- 分类筛选 -->
        <div class="filter-area">
          <n-card class="filter-card" :bordered="false">
            <div class="filter-title">内容分类</div>
            <n-tabs v-model:value="activeCategoryName" type="card" animated>
              <n-tab-pane v-for="category in categories" :key="category.id" :name="category.name">
              </n-tab-pane>
            </n-tabs>
          </n-card>
        </div>

        <!-- 推荐内容区域 -->
        <div class="content-area">
          <n-card class="content-card" :bordered="false">
            <div class="content-header">
              <n-space>
                <n-radio-group v-model:value="sortType">
                  <n-radio value="latest">最新上传</n-radio>
                  <n-radio value="popular">最受欢迎</n-radio>
                  <n-radio value="view">最多浏览</n-radio>
                </n-radio-group>
              </n-space>
            </div>

            <n-grid v-if="recommendedFiles.length > 0" :cols="5" :gutter="16">
              <n-grid-item v-for="file in recommendedFiles" :key="file.id">
                <n-card class="content-card-item" hoverable :bordered="false">
                  <div class="content-cover-container">
                    <img :src="file.cover_image" alt="内容封面" class="content-cover" />
                    <div class="content-type-badge">
                      <n-tag type="info" size="small">{{ file.file_ext.toUpperCase() }}</n-tag>
                    </div>
                  </div>
                  <div class="content-info">
                    <h4 class="content-title">{{ file.title }}</h4>
                    <p class="content-meta">
                      <span class="content-author">上传者: {{ file.user.username }}</span>
                      <span class="content-date">{{ formatDate(file.created_at) }}</span>
                    </p>
                    <div class="content-stats">
                      <n-icon size="14" color="#888">
                        <eye-outline />
                      </n-icon>
                      <span class="content-stat">{{ file.view_count }}</span>
                      <n-icon size="14" color="#888" class="ml-2">
                        <heart-outline />
                      </n-icon>
                      <span class="content-stat">{{ file.like_count }}</span>
                      <n-icon size="14" color="#888" class="ml-2">
                        <download-outline />
                      </n-icon>
                      <span class="content-stat">{{ file.download_count }}</span>
                    </div>
                    <div class="content-actions">
                      <n-button size="small" type="primary" class="action-btn" @click="goToDetail(file.file_uuid)">
                        查看
                      </n-button>
                      <n-button size=" small" type="info" class="action-btn" @click="handleDownload(file.file_uuid)">
                        下载
                      </n-button>
                    </div>
                  </div>
                </n-card>
              </n-grid-item>
            </n-grid>
            <n-empty v-else size="huge" description="暂无内容" style="margin-top:50px;" />
            <div class="pagination-container" v-if="recommendedFiles.length > 0">
              <n-pagination v-model:page="currentPage" :page-count="totalPages" @update:page="handlePageChange" />
            </div>
          </n-card>
        </div>

      </div>
    </template>
  </global-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { NEmpty } from 'naive-ui';
import { NCard, NInput, NButton, NTabs, NTabPane, NRadioGroup, NRadio, NGrid, NGridItem, NSpace, NTag, NIcon, NPagination } from 'naive-ui';
import { allFiles } from '@/mock/mockFiles';
import { EyeOutline, DownloadOutline, HeartOutline } from '@vicons/ionicons5';
import GlobalLayout from "@/layouts/GlobalLayout.vue";

// 模拟数据
const router = useRouter()
const searchText = ref('');
const activeCategoryName = ref('全部内容');
const sortType = ref('latest');
const currentPage = ref(1);
const filesPerPage = 10;

const categories = [
  { id: 'all', name: '全部内容' },
  { id: 'notes', name: '学习笔记' },
  { id: 'images', name: '图片素材' },
  { id: 'reports', name: '研究报告' },
  { id: 'data', name: '数据图表' },
  { id: 'other', name: '其他文件' },
];

// 创建中文名称到ID的映射
const categoryNameToIdMap = computed(() => {
  const map: Record<string, string> = {};
  categories.forEach(category => {
    map[category.name] = category.id;
  });
  return map;
});

// 计算属性：过滤和排序后的文件
const filteredFiles = computed(() => {
  let files = allFiles;

  // 获取当前选中的分类ID
  const activeCategoryId = categoryNameToIdMap.value[activeCategoryName.value] || 'all';

  console.log('当前选中的分类:', activeCategoryName.value, '对应的ID:', activeCategoryId); // 调试输出

  // 分类筛选 - 修正这里的属性名
  if (activeCategoryId !== 'all') {
    files = files.filter(file => file.category.id === activeCategoryId);
    console.log('筛选后的文件数量:', files.length); // 调试输出
  }

  // 搜索筛选
  if (searchText.value) {
    const searchLower = searchText.value.toLowerCase();
    files = files.filter(file =>
      file.title.toLowerCase().includes(searchLower) ||
      file.user.username.toLowerCase().includes(searchLower) ||
      (file.tags && file.tags.toLowerCase().includes(searchLower))
    );
  }

  // 排序
  if (sortType.value === 'latest') {
    files = [...files].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } else if (sortType.value === 'popular') {
    files = [...files].sort((a, b) => b.like_count - a.like_count);
  } else if (sortType.value === 'view') {
    files = [...files].sort((a, b) => b.view_count - a.view_count);
  }

  return files;
});

// 计算属性：当前页显示的文件
const recommendedFiles = computed(() => {
  const start = (currentPage.value - 1) * filesPerPage;
  const end = start + filesPerPage;
  return filteredFiles.value.slice(start, end);
});

// 计算属性：总页数
const totalPages = computed(() => {
  return Math.ceil(filteredFiles.value.length / filesPerPage);
});

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN');
};

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1; // 重置到第一页
};

// 处理分页变化
const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// 处理查看操作
const goToDetail = (fileUuid: string) => {
  console.log(`查看文件详情: ${fileUuid}`);
  router.push({ name: '书本详情', params: { file_uuid: fileUuid } })
}

// 处理下载操作
const handleDownload = (fileUuid: string) => {
  console.log(`下载文件: ${fileUuid}`);
  // 这里可以添加文件下载逻辑
};
</script>

<style scoped lang="scss">
$header-height: 8vh;
$search-height: 120px;
$filter-height: 100px;

.reader-home {
  height: 100%;
  padding: 16px;
  overflow-y: auto;

  .search-area {
    height: $search-height;
    display: flex;
    justify-content: center;
  }

  .search-card {
    width: 70%;
    max-width: 900px;
    background: rgba(255, 255, 255, 0.8);
    //backdrop-filter: blur(8px);
    padding: 16px 24px;
  }

  .search-group {
    width: 100%;
  }

  .filter-area {
    height: $filter-height;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .filter-card {
    width: 70%;
    max-width: 900px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    padding: 16px 24px;
  }

  .filter-title {
    margin-bottom: 12px;
    font-weight: bold;


  }

  .content-area {
    margin-top: 10px;

  }

  .content-card {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    padding: 16px 24px;
  }

  .content-header {
    margin-bottom: 16px;
  }

  .content-card-item {
    height: 340px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;

    .content-cover-container {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f5f5;
      border-radius: 8px 8px 0 0;
      position: relative;

      .content-cover {
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        transition: transform 0.3s ease;
      }

      .content-type-badge {
        position: absolute;
        top: 8px;
        right: 8px;
      }

      &:hover .content-cover {
        transform: scale(1.05);
      }
    }

    .content-info {
      padding: 12px;
      flex: 1;
      display: flex;
      flex-direction: column;

      .content-title {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .content-meta {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #666;
        margin-bottom: 8px;
      }

      .content-stats {
        display: flex;
        align-items: center;
        color: #888;
        font-size: 12px;
        margin-bottom: 12px;
      }

      .content-stat {
        margin-left: 2px;
        margin-right: 8px;
      }

      .content-actions {
        display: flex;
        justify-content: space-between;
        margin-top: auto;
      }

      .action-btn {
        width: 48%;
      }
    }
  }

  .pagination-container {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }
}
</style>