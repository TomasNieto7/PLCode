

//redicciona al hacer click sobre crear pedido a crearPedido.html
const crearPedido = document.querySelector('.left')
crearPedido.addEventListener('click', e => {
    e.preventDefault
    window.location.href= 'crearPedido.html'
})

const logout = document.querySelector('#logout')
logout.addEventListener('click', e=>{
    e.preventDefault
    window.location.href = 'login.html'
})

//Falta rediccion a ventas diarias