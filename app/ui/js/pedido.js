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