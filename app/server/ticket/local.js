const {
    ipcMain
} = require("electron")

const {
    local,
    address
} = require("../data/database.js")

const getLocal = () => {
    ipcMain.on("client:getLocal", async (e, arg) => {
        const getLocal = {
            local,
            address
        }
        e.reply("server:getLocal", JSON.stringify(getLocal));
    })
}

module.exports = {getLocal}