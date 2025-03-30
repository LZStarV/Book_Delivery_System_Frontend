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
请注意，目前仅在electron目录下有package.json，所以请进入此目录下进行安装.

对于uni_modules，请前往官方插件市场进行安装:[插件市场](https://ext.dcloud.net.cn/?cat1=1&cat2=11)
 uni插件列表：uni-scss, uni-ui
 
 运行electron app办法：
 1. 点击**发行**——网站-PC Web或手机H5，发行H5版本(此时应在unpackage--dist下创建build文件夹)；
 2. 进入dist--build--web，复制此目录下的所有文件；
 3. 进入dist--electron目录，粘贴刚才复制的文件；
 4. 检查main.js，根据需要解注相应代码；
 5. 如果要运行，则解注对应运行代码，输入`npm start`即可运行；
 6. 如果要生成，则解注对应生成代码，输入`npm run build`即可打包.
 
 其他应用运行方法(假如使用HX)：点击工具栏-运行，即可自行选择运行模式
