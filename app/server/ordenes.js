const {
    ipcMain
} = require("electron")

let ordenes = []

const getOrdenes = () => {
    ipcMain.on("client:getOrdenes", (e, arg) => {
        e.reply("server:getOrdenes", JSON.stringify(ordenes));
    })
}

const newOrden = () => {
    ipcMain.on('client:newOrden', async (e, arg) => {
        ordenes.push(arg)
        console.log(ordenes);
    })
}

const reloadOrdenes = () => {
    ipcMain.on('client:reloadOrden', (e, arg) => {
        ordenes = []
        console.log(ordenes);
    })
}


module.exports = {
    getOrdenes,
    newOrden,
    reloadOrdenes
}