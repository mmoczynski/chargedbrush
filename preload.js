const { contextBridge, ipcRenderer, ipcMain } = require("electron");

contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);

console.log(require("electron"));

module.exports = {}