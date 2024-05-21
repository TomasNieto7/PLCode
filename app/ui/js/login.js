const {
    ipcRenderer
} = require("electron")

const modal = document.querySelector('#modal')
const login = document.querySelector('.buttonI')
const passwordInput = document.getElementById("contraeña");
const errorLabel = document.getElementById("errorLabel");
const errorLabelLog = document.getElementById("errorLabelLog");
const ID = document.getElementById("email");

let userAux

login.addEventListener('click', (e) => {
    e.preventDefault()
    const userId = document.querySelector('#email').value
    ipcRenderer.send('client:ValidationLogin', userId)
})

ipcRenderer.on('server:ValidationLogin', (e, user) => {
    console.log(user);
    userAux = JSON.parse(user)

    if (userAux.rol==='Admin' || userAux.rol==='Jefe') {
        modal.classList.add("alertStyle");
        modal.showModal()
        errorLabelLog.innerText = "";
    } 
    else if (userAux.rol==='Trabajador') window.location.href = 'crearPedido.html'
    else {
        errorLabelLog.innerText = "Clave incorrecta";
        limpiarID()
    } 
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
    ipcRenderer.send("client:setUsersLogin")
    limpiarPassoword();
    limpiarID()
})

const botonadmon = document.getElementById("botonadmon")

botonadmon.addEventListener("click", e => {
    e.preventDefault();
    const password = passwordInput.value;
    ipcRenderer.send("client:validatePassword", password)
    ipcRenderer.on("server:validatePassword", (e, flag) => {
        if (!flag) {
            passwordInput.classList.add("error");
            errorLabel.innerText = "Contraseña incorrecta";
        } else {
            window.location.href = 'inicio.html';
        }
    })
});

const limpiarPassoword = () => {
    passwordInput.value = '';
    passwordInput.classList.remove("error");
    errorLabel.innerText = "";
}

const limpiarID= () => {
    ID.value = '';
    ID.classList.remove("error");
}