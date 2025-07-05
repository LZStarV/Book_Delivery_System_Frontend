<template>
  <n-grid x-gap="12" :cols="12">
    <!-- 左侧 Logo 部分 -->
    <n-gi :span="2">
      <LogoComponent :current-route="currentRoute" />
    </n-gi>

    <n-gi :span="7"></n-gi>

    <!-- 右侧部分 -->
    <n-gi :span="3">

      <n-grid :cols="6">
        <!-- 通知 -->
        <n-gi :span="1">
          <div>
            <n-badge class="notice" :value="noticeNum" :max="10">
              <n-icon :size="30" :component="Bell" />
            </n-badge>
          </div>
        </n-gi>

        <!-- 用户名 -->
        <n-gi :span="4">
          <div>
            <n-dropdown trigger="hover" :options="dropdownOptions" @select="handleDropdown">
              <n-text class="username">
                你好，{{ username }}
                <n-icon class="icon" :size="25">
                  <ChevronDownOutline />
                </n-icon>
              </n-text>
            </n-dropdown>
          </div>
        </n-gi>

        <!-- 用户头像 -->
        <n-gi :span="1">
          <div @click="router.push('/profile')">
            <n-avatar class="avatar" :src="avatar"
              fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" size="medium" />
          </div>
        </n-gi>

      </n-grid>

    </n-gi>


  </n-grid>
</template>

<script setup>
import LogoComponent from '@/components/LogoComponent.vue'
import { NGrid, NGi, NBadge, NIcon, NDropdown, NAvatar, NText, useDialog } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'
import { Bell } from '@vicons/tabler'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth.js'
import { useUserStore } from '@/store/user.js'

const noticeNum = ref(12)
const route = useRoute()
const currentRoute = ref(route.path)
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const dialog = useDialog()

const user = userStore.user || null
const avatar = user.avatar || 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
const username = user.username || 'xxx'

const dropdownOptions = [
  {
    label: '个人中心',
    key: 'profile'
  },
  {
    type: 'divider'
  },
  {
    label: '退出登录',
    key: 'logout'
  }
]

const handleDropdown = (key) => {
  if (key === 'profile') {
    router.push('/profile')
  } else if (key === 'logout') {
    dialog.warning({
      title: "警告",
      content: '您是否要退出登录？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        authStore.clearToken();
        userStore.clearUser();
        ElMessage.success('已成功退出登录！')
        router.push('/login')
      }
    })
  }
}

const clickLogo = () => {
  if (props.currentRoute === '/') {
    ElMessage.success('您已位于首页');
  } else {
    router.push('/')
  }
}
</script>

<style scoped lang="scss">
.n-grid {
  margin: 0;
  padding: 20px;
  padding-right: 20px;
  align-items: center;

  .n-gi {
    display: flex;
    align-items: center;

  }

  .notice {
    cursor: pointer;

    .n-icon {
      transition: color 0.2s;

      &:hover {
        color: #26a05a;
      }
    }

  }

  .notification-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .username {
    font-size: 16px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    min-width: 50px;

    &:hover {
      color: #26a05a;
      cursor: pointer;
    }

    &:focus-visible {
      outline: unset;
    }

    .icon {
      margin-left: 5px;

    }
  }

  .avatar {
    cursor: pointer;
  }
}
</style>