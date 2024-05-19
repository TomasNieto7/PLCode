const {
  ipcRenderer
} = require("electron");

function generateCustomID() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
}

console.log(generateCustomID()); // Ejemplo de ID generado: '7n805l8n'

const backPage = document.querySelector('#pageActually')
backPage.addEventListener('click', e => {
  e.preventDefault
  window.location.href = './login.html'
})

const endPedido = document.querySelector('#endPedido')
const modal = document.querySelector('#abrir')
let ordenesExist = [];
ipcRenderer.send("client:getOrdenes");
ipcRenderer.on("server:getOrdenes", async (e, args) => {
  ordenesExist = await JSON.parse(args);
});

endPedido.addEventListener('click', e => {
  e.preventDefault
  console.log(ordenesExist);
  if (ordenesExist.length !== 0) {
    window.location.href = './carrito.html'
  } else {
    modal.classList.add("alertStyle")
    modal.showModal()
  }
})

const cerrarModal = document.querySelector('.cerrar')

cerrarModal.addEventListener('click', e => {
  modal.classList.remove("alertStyle");
  modal.close()
})

const pollo = document.querySelector('#pollo')
pollo.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = './components/pedido/pollo.html'
})

const combos = document.querySelector('#combos')
combos.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = './components/pedido/combos.html'
})

const bebidas = document.querySelector('#bebidas')
bebidas.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = './components/pedido/bebidas.html'
})

const postres = document.querySelector('#postres')
postres.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = './components/pedido/postres.html'
})

const especiales = document.querySelector('#especiales')
especiales.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = './components/pedido/especiales.html'
})

const extras = document.querySelector('#extras')
extras.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.href = './components/pedido/complementos.html'
})