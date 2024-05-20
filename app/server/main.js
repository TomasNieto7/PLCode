const {
  BrowserWindow,
  ipcMain
} = require("electron")
const path = require("path"); // Asegúrate de importar el módulo 'path'
const {
  getUsers,
  newUser,
  validation,
  validationLogin,
  getUsersLogin,
  setUsersLogin,
  validatePassword
} = require("./users.js")
const {
  getVentas,
  newVenta,
  getVentasActual,
  deleteVentasDiarias,
  getPagoCambio,
  setPago,
  setCambio
} = require("./ventasDiarias.js")
const {
  getOrdenes,
  newOrden,
  reloadOrdenes
} = require('./ordenes.js');
const {
  get
} = require("jquery");
const {
  getNotas,
  newNota
} = require("./notas.js");
const {
  getLocal
} = require("./ticket/local.js");


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
getUsersLogin()
setUsersLogin()
validatePassword()

getVentas()
newVenta()
getVentasActual()
deleteVentasDiarias()
getPagoCambio()
setPago()
setCambio()

getOrdenes()
newOrden()
reloadOrdenes()

getNotas()
newNota()

getLocal()

module.exports = {
  createWindow
};