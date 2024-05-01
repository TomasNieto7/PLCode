const {
    ipcRenderer
} = require("electron")


const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    /*
        const userId = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const userData={
        userId, password
    }
   ipcRenderer.send('client:ValidationLogin' ,userData)  
    */
   window.location.href = 'inicio.html'
})

const register = document.querySelector('.buttonR')
register.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = 'register.html'
})


ipcRenderer.on('server:ValidationLogin', (e, flag) => {
    if (flag) {
        window.location.href = 'inicio.html'
    } else alert('Id or password incorrect')
})