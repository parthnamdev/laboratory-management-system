const server = require('../app');
const path= require('path')
const { app, BrowserWindow } = require('electron')

var mainWindow;

function createWindow() {

  let mainWindow = null
  let loading = new BrowserWindow({show: true, frame: false})

  loading.once('show', () => {

    setTimeout(function(){ 
      mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: path.join(__dirname, '../public/images/favicon.ico'),
        autoHideMenuBar: true,
        useContentSize: true,
        resizable: true,
        webPreferences: {
          devTools: false,
          nativeWindowOpen: true,
          nodeIntegration: true
        },
        show: false
      });
      mainWindow.webContents.once('dom-ready', () => {  
        // console.log('main loaded')
        mainWindow.show()
        loading.hide()
        loading.close()
      })
      // long loading html
      
      mainWindow.loadURL('http://localhost:3002/');

     }, 3000);
    
  })
  // loading.loadURL('loading.html');
  loading.loadFile('./src/loading.html');
  loading.show();
}


app.on('ready', createWindow);