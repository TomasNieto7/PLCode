const {
    ipcMain
} = require("electron")

const Venta = require("../models/ventas")

const getVentas = () => {
    ipcMain.on("client-getVentas", async (e, arg) => {
        const ventas = await Venta.find();
        e.reply("server-getVentas", JSON.stringify(ventas));
    })
}

const generateCustomID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
    }
    return id;
}

const existId = (Ventas, id) => {
    if (Ventas.find(venta => venta.ventaId === id)) {
        return true
    } else return false
}

const getVentaID = async (data) => {
    let ventaId, flag
    const Ventas = await Venta.find();
    do {
        ventaId = generateCustomID().toString()
        flag = existId(Ventas, ventaId)
        console.log(flag);
    } while (flag === true);
    const newObj = Object.assign({
        ventaId
    }, data)
    return newObj
}

const newVenta = () => {
    ipcMain.on('client:newVenta', async (e, arg) => {
        const ventaData = await getVentaID(arg)
        console.log(ventaData);
        const newVenta = new Venta(ventaData)
        const ventaSaved = await newVenta.save();
        e.reply("server:newVenta", JSON.stringify(ventaSaved))
    })
}


module.exports = {
    getVentas,
    newVenta
}