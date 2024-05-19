const {
    ipcRenderer
} = require("electron")

const modal = document.querySelector('#modal')
const login = document.querySelector('.buttonI')
const passwordInput = document.getElementById("contraeña"); 
const errorLabel = document.getElementById("errorLabel");

login.addEventListener('click', (e) => {
    e.preventDefault()

    const userId = document.querySelector('#email').value
    //ipcRenderer.send('client:ValidationLogin', userId)
    if (userId === "admin") {
        modal.classList.add("alertStyle");
        modal.showModal()
        // console.log(2);
    }
    else window.location.href = 'crearPedido.html'
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
    limpiarPassoword();
})

const botonadmon = document.getElementById("botonadmon")

botonadmon.addEventListener("click", e => {
    e.preventDefault();
    const password = passwordInput.value;
    if (password !== "admin") {
        passwordInput.classList.add("error"); 
        errorLabel.innerText = "Contraseña incorrecta"; 
    } else {
        window.location.href = 'inicio.html';
    }
});
const limpiarPassoword = () => {
    passwordInput.value = '';
    passwordInput.classList.remove("error");
    errorLabel.innerText = ""; 
}


ipcRenderer.on('server:ValidationLogin', (e, flag) => {
    if (flag) {
        window.location.href = 'inicio.html'
    } else alert('Id or password incorrect')
})