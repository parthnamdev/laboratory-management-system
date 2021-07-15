const server = require('../app');
const path= require('path')
const { app, BrowserWindow } = require('electron')

var mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(__dirname, 'public/images/logo.png'),
    autoHideMenuBar: true,
    useContentSize: true,
    resizable: true,
    webPreferences: {
      devTools: false
    }
  });
  mainWindow.loadURL('http://localhost:3000/');
}

app.on('ready', createWindow);
