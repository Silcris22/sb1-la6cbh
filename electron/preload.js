const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // Aquí puedes exponer funciones específicas de Electron a tu aplicación React
  platform: process.platform
});