// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { shell } = require('electron')
const { session } = require('electron')

let mainWindow

function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 1220,
    height: 740,
    icon: path.join(__dirname, '/icon.ico'),
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: false,
      nodeIntegration: true
    }
  })
  
  
  // and load the index.html of the app.
  mainWindow.loadFile('main.html')
  mainWindow.setMenuBarVisibility(false)
  mainWindow.setAlwaysOnTop(false, 'screen');
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Einige APIs können nur nach dem Auftreten dieses Events genutzt werden.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. Sie können den Code auch 
// auf mehrere Dateien aufteilen und diese hier einbinden.
//console.time('Starting time');

//console.time('Require time 1');
/*
window.onerror = function(msg, url, linenumber) {

  alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
  return true;

}*/

