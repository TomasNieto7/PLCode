const {
    ipcRenderer
} = require("electron");

let users = [];

const modal = document.querySelector('#modal')

function limpiarFormulario() {
    document.querySelector(".registro").reset();
}

const msg = document.createElement('msg');

const signupForm = document.querySelector('.registro')
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password').value;
    const phone = document.querySelector('#phone').value;
    const newUser = {
        name,
        email,
        password,
        phone
    };
    try {
        // Envía la validación al servidor y espera la respuesta
        const isUserRegistered = await new Promise((resolve, reject) => {
            ipcRenderer.send('client:validation', newUser);
            ipcRenderer.on('server:validation', (e, flag) => {
                resolve(flag);
            });
        });

        if (isUserRegistered) {
            msg.textContent = 'El usuario ya está registrado.'
            modal.prepend(msg)
            modal.classList.add("alertStyle");
            modal.showModal()
        } else {
            ipcRenderer.send('new-user', newUser);
        }
    } catch (error) {
        console.error('Error al validar o registrar al usuario:', error);
    }
});

ipcRenderer.on("new-user-created", (e, arg) => {
    console.log(arg);
    const userSaved = JSON.parse(arg)
    users.push(userSaved)
    console.log(users)
    msg.textContent = `Registro Exitoso!, su ID es ${userSaved.userId}`
    modal.prepend(msg)
    modal.classList.add("alertStyle");
    modal.showModal()
});

const login = document.querySelector('.buttonI')
login.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = 'login.html'
})

const btnCloseModal = document.querySelector('#btn-cerrar-modal')

btnCloseModal.addEventListener('click', e => {
    modal.classList.remove("alertStyle");
    modal.close()
    limpiarFormulario()
})