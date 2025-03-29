const {app, BrowserWindow} = require('electron');

// 创建窗口
const createWindow = () => {
	const win = new BrowserWindow({
		width: 1024,
		height:768,
		autoHideMenuBar: true
	})
	// 加载本地 H5 文件（打包后使用）
	// win.loadFile(path.join('unpackage/dist/build/web/index.html');
	
	// 开发时可直接加载 HBuilderX 的 H5 调试地址
	win.loadURL("http://localhost:8080");
}

app.whenReady().then(() => {
  createWindow()
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});