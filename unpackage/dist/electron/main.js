const {app, BrowserWindow} = require('electron');

// 创建窗口
const createWindow = () => {
	const win = new BrowserWindow({
		width: 1024,
		height:768,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		}
	})
	//加载本地 H5 文件（打包后使用）
	// win.loadFile(path.join(__dirname, 'index.html'));
	
	// 开发时可直接加载 HBuilderX 的 H5 调试地址
	win.loadURL("http://localhost:8080");
}

app.whenReady().then(() => {
  createWindow()
	
	// 在 macOS 上，除非用户通过 Cmd + Q 明确退出，否则应用程序不会关闭
	app.on("window-all-closed", () => {
	  if (process.platform !== "darwin") app.quit();
	});
	
	// 当用户点击 dock 图标时，显示应用程序窗口
	app.on("activate", () => {
	  if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
})

