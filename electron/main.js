import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;

const createWindow = () => {

    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        // frame: false, // 取消注释此行以完全移除窗口边框
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });
    win.setMenuBarVisibility(false); // 隐藏菜单栏
    if (isDev) {
        win.loadURL("http://localhost:5173");
        win.webContents.openDevTools(); // 开发环境保留调试工具
    } else {
        win.loadFile(path.join(__dirname, "../dist/index.html"));
        // 生产环境不打开调试工具
    }
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});