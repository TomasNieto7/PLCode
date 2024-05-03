const {
    ipcRenderer
} = require("electron")


const login = document.querySelector('.buttonI')
login.addEventListener('click', (e) => {
    e.preventDefault()

    //const userId = document.querySelector('#email').value
    //ipcRenderer.send('client:ValidationLogin', userId)

    window.location.href = 'inicio.html'
})

/*
    const register = document.querySelector('.buttonR')
register.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = 'register.html'
})
*/


ipcRenderer.on('server:ValidationLogin', (e, flag) => {
    if (flag) {
        window.location.href = 'inicio.html'
    } else alert('Id or password incorrect')
})