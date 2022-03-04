
//
// main.js is an electron wrapper around game.js.
//
// Copyright 2021 Alpha Zoo LLC.
// Written by Matthew Carlin
//

// https://www.electronjs.org/docs/tutorial/quick-start

// Modules to control application life and create native browser window
const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('path');
const fs = require('fs');
const settings = require('electron-settings');


let game_fullscreen = false;


function createWindow () {
  // Create the browser window.

  settings.get('fullscreen.data').then(value => {

    let fullscreen = false;
    if (value != null) fullscreen = value;

    const mainWindow = new BrowserWindow({
      width: 1024,
      height: 576,
      fullscreen: fullscreen,
      useContentSize: true,
      backgroundColor: '#000000',
      show: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        enableRemoteModule: true,
        contextIsolation: false,
      }
    })

    mainWindow.once('ready-to-show', () => {
      mainWindow.show()
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit();
})

