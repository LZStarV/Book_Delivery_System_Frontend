const path = require('path');

module.exports = {
    // 应用基础信息
    appId: 'com.book.delivery',
    productName: 'BookDelivery',
    copyright: 'Copyright © 2025 ${author}', // 自动读取package.json中的author
    compression: 'maximum', // 最大化压缩安装包（可选：store/normal/maximum）

    // 目录配置（与项目结构对齐）
    directories: {
        buildResources: path.join(__dirname, 'build'), // 构建资源（图标、安装背景等）
        output: path.join(__dirname, 'dist_electron'), // 打包输出目录（避免与Vite的dist冲突）
        app: __dirname // 应用根目录
    },

    // 打包文件过滤（核心优化点：减少冗余）
    files: [
        // 包含Vite构建的渲染进程文件
        { from: path.join(__dirname, 'dist'), to: 'dist', filter: ['**/*'] },
        // 包含Electron主进程文件（若使用Vite构建主进程，需指向构建后目录）
        { from: path.join(__dirname, 'electron'), to: 'electron', filter: ['**/*.js', '**/*.ts'] },
        // 包含package.json（用于运行时依赖解析）
        'package.json',
        // 生产依赖（精确过滤，排除开发工具）
        {
            from: 'node_modules',
            to: 'node_modules',
            filter: [
                // 基础规则：包含所有文件
                '**/*',
                // 排除开发依赖（仅保留生产必需）
                '!** /@vitejs/**',
                '!** /vite/**',
                '!** /vitest/**',
                '!** /vue-tsc/**',
                '!** /typescript/lib/**', // 保留typescript核心，排除多余类型定义
                '!** /electron-builder/**',
                // 排除文档、测试和源码
                '!** /docs/**',
                '!** /tests/**',
                '!** /__tests__/**',
                '!** /src/**',
                '!** /examples/**',
                // 排除无用文件格式
                '!**/*.md',
                '!**/*.map',
                '!**/*.d.ts',
                '!**/*.tsbuildinfo',
                // 排除操作系统特定冗余文件
                '!** /.DS_Store',
                '!** /Thumbs.db'
            ]
        }
    ],

    // ASAR打包配置（提高安全性和加载速度）
    asar: true,
    asarUnpack: [
        '**/*.{node,dll,so,dylib}', // 原生模块不打包（避免运行时错误）
        'node_modules/axios/**/*' // 示例：若axios有特殊依赖需解压，可添加
    ],
    win: {
        target: [
            {
                target: 'nsis', // Windows安装包
                arch: ['x64', 'ia32'] // 支持32位和64位
            }
        ],
        icon: path.join(__dirname, 'build/icons/icon.ico'), // 图标路径
        verifyUpdateCodeSignature: false // 开发阶段可关闭签名验证
    },
    // 安装程序配置（NSIS for Windows）
    nsis: {
        oneClick: false, // 允许自定义安装路径
        allowToChangeInstallationDirectory:
            true, // 允许用户修改安装目录
        installerIcon: path.join(__dirname, 'build/icons/icon.ico'), // 安装程序图标
        uninstallerIcon: path.join(__dirname, 'build/icons/icon.ico'), // 卸载程序图标
        installerHeaderIcon: path.join(__dirname, 'build/icons/icon.ico'), // 安装程序头部图标
        createDesktopShortcut: true, // 创建桌面快捷方式
        createStartMenuShortcut: true, // 创建开始菜单快捷方式
        shortcutName: 'BookDelivery', // 快捷方式名称
        uninstallDisplayName: 'BookDelivery', // 卸载列表中显示的名称
        deleteAppDataOnUninstall: false, // 卸载时是否删除用户数据（建议false，避免误删）
        artifactName: 'BookDelivery-Setup-${version}-${arch}.exe' // 安装包文件名格式
    },

    // 应用更新配置（可选，用于自动更新）
    // publish: [
    //     {
    //         provider: 'github', // 发布到GitHub Releases
    //         owner: 'LZStarV', // GitHub用户名
    //         repo: 'Book_Delivery_System_Frontend', // 仓库名称
    //         releaseType: 'release', // 发布类型（draft/pre-release/release）
    //         // token: process.env.GITHUB_TOKEN // 建议通过环境变量传入，避免硬编码
    //     }
    // ],
};