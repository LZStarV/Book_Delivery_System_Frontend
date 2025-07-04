<template>
  <n-card title="用户信息" :bordered="false" class="user-card">
    <div class="user-info-wrapper">
      <n-avatar :size="200" :src="user.avatar" class="avatar" />
      <div class="user-details">
        <div class="user-info-name">
          <div class="username">{{ user.username }}</div>
          <n-tag :type="identityTagType[role]" size="medium">
            {{ roleName[role] }}
          </n-tag>
        </div>
        <p class="studentid-and-email">学号：{{ user.studentid }}</p>
        <p class="studentid-and-email">邮箱：{{ user.email }}</p>
      </div>
      <n-space class="action-buttons">
        <n-button secondary circle @click="onSetting" size="large">
          <template #icon>
            <n-icon>
              <SettingsOutline />
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </div>
    <div class="bookshelf-section">
      <div class="section-title">书架内容</div>
      <n-grid :cols="6" :x-gap="16" :y-gap="16">
        <n-grid-item v-for="book in bookshelf" :key="book.id">
          <n-card :title="book.title" hoverable class="book-card">
            <img :src="book.cover" :alt="book.title" class="book-cover" />
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
  </n-card>

  <n-upload
      multiple
      directory-dnd
      action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
      :max="5"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <ArchiveIcon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        点击或者拖动文件到该区域来上传
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
      </n-p>
    </n-upload-dragger>
  </n-upload>

</template>

<script setup>
import { ref } from 'vue'
import { NCard, NAvatar, NTag, NButton, NSpace, NIcon, NGrid, NGridItem } from 'naive-ui'
import { SettingsOutline } from '@vicons/ionicons5'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import { useUserStore } from "@/store/user.js";

const userStore = useUserStore();

const user = userStore.user.userData;
const role = userStore.user.role;

const bookshelf = [
  { id: 1, title: '算法导论', cover: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg' },
  { id: 2, title: '深入理解计算机系统', cover: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg' },
  { id: 3, title: 'JavaScript权威指南', cover: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg' }
]

const identityTagType = {
  1: 'error',
  2: 'info',
  3: 'success'
}

const roleName = {
  1: '管理员',
  2: '用户',
  3: '志愿者'
}

function onSetting() {
  // 跳转到设置页面或弹出设置对话框
  window.$message?.info('设置功能待实现')
}
</script>

<style scoped lang="scss">
.user-card {

}

.user-info-wrapper {
  display: flex;
  margin-bottom: 24px;
}

.avatar {
  margin-right: 24px;
}

.user-details {
  .user-info-name {
    display: flex;
    flex-direction: row;
    margin: 15px 0 20px 0;
    align-items: center;

    .username {
      font-size: 40px;
      font-weight: bold;
      margin-right: 20px;
    }

    .n-tag {
      padding: 0 10px 0 10px;
    }

  }
}
.studentid-and-email {
  font-size: 18px;
  margin-bottom: 6px;
}

.action-buttons {
  margin-left: auto;
  align-items: center;
}

.bookshelf-section {
  margin-top: 24px;

  .section-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
  }
}

.book-card {
  text-align: center;
}

.book-cover {
  width: 100px;
  height: 140px;
  object-fit: cover;
  margin-bottom: 8px;
}
</style>