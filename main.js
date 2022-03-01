const { app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow() {
        const mainWindow = new BrowserWindow({
            width: 1200, height: 800, modal: true,
            webPreferences: {
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }

    })
    //mainWindow.webContents.openDevTools()
    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

