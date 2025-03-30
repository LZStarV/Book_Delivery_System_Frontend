这里是**528软件工程前端项目**的README文件.

请使用**HBuilderX**打开并编辑项目.

# 项目信息

技术栈：[uni-app](https://uniapp.dcloud.net.cn/) + [vue3](https://cn.vuejs.org/) + [scss](https://www.sass.hk/docs/) +[electron](https://www.electronjs.org/zh/docs/latest/)

图标库：[iconfont](https://www.iconfont.cn/)

# 快速开始

在开发项目前，请先注册好github与DCloud账号，并联系项目所有者拉入github与DCloud项目成员.

(目前暂未创建任何分支)请开发者在编辑时，将代码上传到自己的分支底下，以后再进行合并.


# 环境配置

_请注意，目前仅在**unpackage--dist--electron**目录下有npm环境，所以请进入此目录下进行安装._

对于node_modules，请切换淘宝镜像源进行包下载，具体操作如下：
```
// 切换淘宝镜像源，改用cnpm进行包托管
npm install -g cnpm --registry=https://registry.npmmirror.com
// 安装依赖
cnpm i --save-dev
```

对于uni_modules，如果项目编译时显示插件缺失错误，请前往官方插件市场进行安装:[插件市场](https://ext.dcloud.net.cn/?cat1=1&cat2=11)
 uni插件列表：uni-scss, uni-ui
 
 - 运行**electron app**办法：
	 1. 点击**发行——网站-PC Web或手机H5**，发行H5版本(此时unpackage--dist下应已创建好build文件夹)；
	 2. 进入dist--build--web，复制此目录下的所有文件；
	 3. 进入dist--electron目录，粘贴刚才复制的文件；
	 4. 检查main.js，根据需要解注相应代码：
		- 运行：解注对应运行代码并注释打包代码，后在终端输入`npm start`即可运行；
		- 打包：解注对应打包代码并注释运行代码，后在终端输入`npm run build`即可打包.
 
 - 其他应用运行方法(假如使用HX)：点击**工具栏**-**运行**，即可自行选择运行模式.
 
 如有疑问，请联系项目所有者**LZStarV**.