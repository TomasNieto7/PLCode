const {
    ipcMain
} = require("electron")

const Venta = require("../models/ventas")

let pago
let cambio

const getVentas = () => {
    ipcMain.on("client:getVentas", async (e, arg) => {
        const ventas = await Venta.find();
        e.reply("server:getVentas", JSON.stringify(ventas));
    })
}

const getVentasActual = () => {
    ipcMain.on("client:getVentasActual", async (e, arg) => {
        const ventas = await Venta.find();
        const VentaA = await ventas[ventas.length - 1]
        e.reply("server:getVentasActual", JSON.stringify(VentaA));
    })
}

const generateCustomID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
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
        const newVenta = new Venta(ventaData)
        const ventaSaved = await newVenta.save();
        e.reply("server:newVenta", JSON.stringify(ventaSaved))
    })
}

const deleteVentasDiarias = () => {
    ipcMain.on("client:deleteAll", async (e, args) => {
        const Ventas = await Venta.deleteMany();
        const ventas = await Venta.find();
        e.reply('server:deleteAll', JSON.stringify(ventas))
    })
}

const getPagoCambio = () => {
    ipcMain.on('client:getPagoCambio', (e,args) => {
        
        const obj = {
            pago,
            cambio
        }
        console.log(obj);
        e.reply('server:getPagoCambio', JSON.stringify(obj))
    })
}

const setPago = () => {
    ipcMain.on('client:setPago', (e,args) => {
        pago = args
        console.log(pago);
    })
}

const setCambio = () => {
    ipcMain.on('client:setCambio', (e,args) => {
        cambio = args
        console.log(cambio);
    })
}


module.exports = {
    getVentas,
    newVenta,
    getVentasActual,
    deleteVentasDiarias,
    getPagoCambio,
    setPago,
    setCambio
}