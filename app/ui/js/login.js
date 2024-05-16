const {
    ipcRenderer
} = require("electron")

const modal = document.querySelector('#modal')
const modalError = document.querySelector('.modalerror')
const login = document.querySelector('.buttonI')
login.addEventListener('click', (e) => {
    e.preventDefault()

    const userId = document.querySelector('#email').value
    //ipcRenderer.send('client:ValidationLogin', userId)
    if (userId === "admin") {
        modal.classList.add("alertStyle");
        modal.showModal()
        console.log(2);
    }
    //window.location.href = 'inicio.html'
})

/*
    const register = document.querySelector('.buttonR')
register.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = 'register.html'
})
*/

const btnCloseModal = document.querySelector('#cerraradmon')

btnCloseModal.addEventListener('click', e => {
    modal.classList.remove("alertStyle");
    modal.close()
})

const botonadmon = document.getElementById("botonadmon")

botonadmon.addEventListener("click", e => {
    e.preventDefault()
    const password = botonadmon.value
    if (password==="a") {
        modalError.classList.add("alertStyle");
        modalError.showModal()
    }
})

ipcRenderer.on('server:ValidationLogin', (e, flag) => {
    if (flag) {
        window.location.href = 'inicio.html'
    } else alert('Id or password incorrect')
})