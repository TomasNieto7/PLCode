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