'use strict';

/**
 * Module to control application life.
 */
const electron = require('electron');
const config = require('./configs');
const connection = require('./api/connection');

const app = electron.app;

/**
 * Module to create native browser window.
 */
const BrowserWindow = electron.BrowserWindow;

/**
 * Keep a global reference of the window object, if you don't, the window will
 * be closed automatically when the JavaScript object is garbage collected.
 */
let mainWindow;

function createWindow () {
  /**
   * Create the browser window.
   */
  let browserWindowConfig = {
      width: config.project.window.width,
      height: config.project.window.height,
      center: config.project.window.isCenter,
      title: config.project.name,
      resizable: config.project.window.isResizable
  };

  mainWindow = new BrowserWindow(browserWindowConfig);

  /**
   * load the index.html of the app.
   */
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  /**
   * Enable below line to Open the DevTools.
   */
  // mainWindow.webContents.openDevTools();

  /**
   * Emitted when the window is closed.
   */
  mainWindow.on('closed', function() {
    /**
     * Dereference the window object, usually you would store windows
     * in an array if your app supports multi windows, this is the time
     * when you should delete the corresponding element.
     */
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('shell').openExternal(url);
  });
}

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 */
app.on('ready', createWindow);

/**
 * Quit when all windows are closed.
 */
app.on('window-all-closed', function () {
  /**
   * On OS X it is common for applications and their menu bar
   * to stay active until the user quits explicitly with Cmd + Q
   */
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  /**
   * On OS X it's common to re-create a window in the app when the
   * dock icon is clicked and there are no other windows open.
   */
  if (mainWindow === null) {
    createWindow();
  }
});
