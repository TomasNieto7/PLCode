const { BrowserWindow, ipcMain } = require("electron")
const path = require("path"); // Asegúrate de importar el módulo 'path'
const {getUsers, newUser, validation, validationLogin} = require("./users.js")
const {getVentas, newVenta} = require("./pedidos.js")
const {getOrdenes, newOrden, reloadOrdenes} = require('./ordenes.js');
const { get } = require("jquery");
const { getNotas, newNota } = require("./notas.js");

function createWindow() {
  const win = new BrowserWindow({
    icon: path.join(__dirname, "../img/logo.ico"), // Ruta al archivo de icono
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false, 
    autoHideMenuBar: true,
    //fullscreen: true,
  });

  win.loadFile("app/ui/login.html");
  win.maximize();
}

getUsers()
newUser()
validation()
validationLogin()

getVentas()
newVenta()

getOrdenes()
newOrden() 
reloadOrdenes()

getNotas()
newNota()

module.exports = { createWindow };
