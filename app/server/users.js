const {
    ipcMain
} = require("electron")

const User = require("../models/User")

const getUsers = () => {
    ipcMain.on("get-users", async (e, arg) => {
        const Users = await User.find();
        e.reply("get-users", JSON.stringify(Users));
    })
}

const validation = () => {
    ipcMain.on('client:validation', async (e, data) => {
        const Users = await User.find();
        const isUserRegistered = await Users.find(user => user.email === data.email)
        let flag = false
        if (isUserRegistered) {
            flag=true
        }
        e.reply('server:validation', flag)
    })
}

const validationLogin = () => {
    ipcMain.on('client:ValidationLogin', async (e, data) => {
        const Users = await User.find();
        const existsUser = await Users.find(user => user.userId === data)
        let flag 
        if (existsUser) {
            flag=true
        }
        e.reply('server:ValidationLogin', flag)
    })
}
const existId = (Users, id) => {
    if (Users.find(user => user.userId === id)) {
        return true
    } else return false
}

const getUserID = async (data) => {
    let i = 1,
        userId, flag
    const Users = await User.find();
    const baseId = 100000
    do {
        console.log(Users.length)
        userId = (Users.length + i + baseId).toString()
        flag = existId(Users, userId)
        console.log(flag);
        i++
    } while (flag === true && parseInt(userId));
    if (parseInt(userId) > 999999) {
        alert('Ha alcanzado el limite de empleados que se pueden registrar!')
    } else {
        const newObj = Object.assign({
            userId
        }, data)
        return newObj
    }
}

const newUser = () => {
    ipcMain.on('new-user', async (e, arg) => {
        const userData = await getUserID(arg)
        console.log(userData);
        const newUserAux = new User(userData)
        const userSaved = await newUserAux.save();
        e.reply("new-user-created", JSON.stringify(userSaved))
    })
}



/*
    ipcMain.on("delete-task", async (e, args) => {
    const taskDeleted = await Task.findByIdAndDelete(args)
    e.reply("delete-task-success", JSON.stringify(taskDeleted))
});

ipcMain.on("update-task", async (e, args) => {
    console.log(args);
    const updatedTask = await Task.findByIdAndUpdate(
        args.idTaskToUpdate, {
            name: args.name,
            description: args.description
        }, {
            new: true
        }
    );
    e.reply("update-task-success", JSON.stringify(updatedTask));
});

*/


module.exports = {
    getUsers,
    newUser,
    validation,
    validationLogin
}