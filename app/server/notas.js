const {
    ipcMain
} = require("electron")

let notas = []

const getNotas = () => {
    ipcMain.on("client:getNotas", async (e, arg) => {
        e.reply("server:getNotas", JSON.stringify(notas));
    })
}

const newNota = () => {
    ipcMain.on('client:newNota', async (e, arg) => {
        notas.push(arg)
    })
}

module.exports = {
    getNotas,
    newNota
}