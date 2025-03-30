这里是**528软件工程前端项目**的README文件

请使用**HBuilderX**打开并编辑项目

(目前暂未创建任何分支)请开发者在编辑时，将代码上传到自己的分支底下，以后再进行合并

技术栈：uni-app + vue3 + scss +electron
图标库：iconfont

对于node_modules，请切换淘宝镜像源进行包下载，具体操作如下：
```
// 切换淘宝镜像源，改用cnpm进行包托管
npm install -g cnpm --registry=https://registry.npmmirror.com
// 安装依赖
cnpm i --save-dev
```
请注意，根目录与electron目录下都有package.json，所以请在两个目录下都进行安装

对于uni_modules，请前往官方插件市场进行安装:[插件市场](https://ext.dcloud.net.cn/?cat1=1&cat2=11)
 uni插件列表：uni-scss, uni-ui
 
 运行electron app办法：
 1. 进入electron文件目录下；
 2. 运行cmd；
 3. 输入`npm start`（如果需要打包成exe，请运行npm build exe）.
 
 其他应用运行方法(假如使用HX)：点击工具栏-运行，即可自行选择运行模式
