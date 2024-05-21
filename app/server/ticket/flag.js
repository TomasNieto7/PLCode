const {
    ipcMain
} = require("electron")

let flag = true

ipcMain.on('client:getVentaFlag', (e, args) => {
    e.reply('server:getVentaFlag', flag)
})

ipcMain.on('client:setVentaFlag', (e, args) => {
    flag = args
})

let flagModal = false

ipcMain.on('client:getModalFlag', (e, args) => {
    console.log(flagModal);
    e.reply('server:getModalFlag', flagModal)
})

ipcMain.on('client:setModalFlag', (e, args) => {
    flagModal = args
    console.log(flagModal);
})