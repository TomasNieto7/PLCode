const ModalesOreden =()=>{
    const modalOrden = document.getElementById('abrir');
    modalOrden.classList.add("alertStyle")
    modalOrden.showModal()

    const cerrarModal = document.querySelector('.cerrar')

    cerrarModal.addEventListener('click', e => {
    modalOrden.classList.remove("alertStyle");
    modalOrden.close()
})
}