# Book Delivery Frontend Project

这是一个基于 Vue3 + Vite + Electron 的图书派送系统前端项目，实现了图书管理、订单处理、用户权限等核心功能。以下是项目的详细说明。


## 技术栈

1. **前端框架**：[Vite](https://cn.vitejs.dev/) + [Vue3](https://cn.vuejs.org/) + [TypeScript](https://www.typescriptlang.org/zh/) + [Scss](https://www.sass.hk/)
2. **UI 库**：[Naive-UI](https://www.naiveui.com/zh-CN/os-theme)
3. **状态管理**：[Pinia](https://pinia.vuejs.org/)
4. **路由管理**：[Vue Router](https://router.vuejs.org/zh/)
5. **HTTP 请求**：[Axios](https://axios-http.com/)
6. **JWT 认证**：[jwt-decode](https://github.com/auth0/jwt-decode)
7. **跨平台打包**：[Electron](https://www.electronjs.org/) + [electron-builder](https://www.electron.build/)
8. **代码管理**：[Github](https://github.com/)


## 系统要求

- **操作系统**：Windows 10/11、macOS、Linux
- **Node.js**：v18.0.0 及以上
- **npm**：v9.0.0 及以上


## 安装与配置

### 1. 克隆项目

```bash
git clone https://github.com/LZStarV/book_delivery.git
cd book_delivery
```

### 2. 安装依赖

```bash
npm install
```

### 3. 开发环境运行

```bash
# 启动 Vite 开发服务器和 Electron
npm run electron:dev
```

### 4. 生产环境打包

```bash
# 构建 Vue 应用并打包 Electron 应用
npm run electron:build
```

打包后的安装程序将生成在 `dist_electron` 目录下。


## 项目结构

```
book_delivery/
├── build/                 # 打包资源（图标、安装包配置）
├── dist/                  # Vite 构建输出目录
├── dist_electron/         # Electron 打包输出目录
├── electron/              # Electron 主进程和预加载脚本
│   ├── main.js            # 主进程入口
│   └── preload.js         # 预加载脚本
├── src/                   # 前端源代码
│   ├── assets/            # 静态资源
│   ├── components/        # 通用组件
│   ├── router/            # 路由配置
│   ├── stores/            # Pinia 状态管理
│   ├── styles/            # 全局样式
│   ├── utils/             # 工具函数
│   └── App.vue            # 应用入口组件
├── .electron-builder.config.cjs # Electron 打包配置
├── package.json           # 项目依赖和脚本
├── tsconfig.json          # TypeScript 配置
└── vite.config.ts         # Vite 配置
```


## 环境变量配置

项目使用 `.env` 文件配置环境变量：

```env
# .env.development（开发环境）
VITE_APP_API_BASE_URL=http://localhost:3000/api

# .env.production（生产环境）
VITE_APP_API_BASE_URL=https://api.example.com
```


## 打包与发布

1. 确保已安装所有依赖：`npm install`
2. 执行打包命令：`npm run electron:build`
3. 打包后的安装程序将生成在 `dist_electron` 目录下
4. 支持多平台打包：Windows (.exe)、macOS (.dmg)、Linux (.AppImage)


## 常见问题与解决方案

1. **打包时提示缺少 main.js**  
   确保 `electron/main.js` 文件存在，并且 `vite.config.ts` 正确配置了主进程入口。

2. **Windows 打包失败，权限不足**  
   - 以管理员身份运行终端
   - 启用 Windows 开发者模式
   - 参考：[解决 Windows 符号链接权限问题](https://github.com/electron-userland/electron-builder/issues/4067)

3. **开发环境白屏**  
   检查 Vite 开发服务器是否正常启动（默认端口 5173），确保 `electron/main.js` 中正确配置了开发环境的 URL。
