const {
  ipcRenderer
} = require("electron");
const {
  jsPDF
} = require("jspdf");
const autoTable = require('jspdf-autotable')

const pedido = document.querySelector(".pedido");

let ordenes = [];

ipcRenderer.send("client:getOrdenes");

const renderTasks = (ordenes) => {
  pedido.innerHTML = "";
  ordenes.forEach((orden) => {
    pedido.innerHTML += `
          <div class="card">
            <div class=cantidad>
              <p>
                ${orden.cantidad}
              </p>
            </div>
            <div class=producto>
              <h4>
                ${orden.producto}
              </h4>
              <p>
                ${orden.descripcion} <!-- Cambié "Description" a "Descripción" -->
              </p>
              <p>
                Notas: ${orden.notasCompletas}
              </p>
            </div>
            <div class=total>
              <p>
                $ ${parseFloat(orden.total).toFixed(2)}
              </p>
            </div>
          </div>
        `;
  });
};

ipcRenderer.on("server:getOrdenes", (e, args) => {
  ordenes = JSON.parse(args);
  renderTasks(ordenes);
  getTotal(ordenes);
});

const backPage = document.querySelector('#pageActually')
backPage.addEventListener('click', e => {
  e.preventDefault
  window.location.href = './crearPedido.html'
})

const cancel = document.getElementById("cancelar");
cancel.addEventListener("click", (e) => {
  e.preventDefault();
  ipcRenderer.send("client:reloadOrden");
  window.location.href = "./crearPedido.html";
});

const total = document.getElementById("total");

const getTotal = (ordenes) => {
  total.innerHTML = "";
  let precio = 0.0;
  ordenes.forEach((orden) => {
    precio += parseFloat(orden.total);
  });
  total.innerHTML = `$${precio.toFixed(2)}`;
};

let metodoPago

const selectElement = document.getElementById("metodo");
selectElement.addEventListener("change", function() {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    metodoPago = selectedOption.text;
    console.log(metodoPago);
});


const realizar = document.getElementById("realizar");
realizar.addEventListener("click", (e) => {
  e.preventDefault()

  const notas = [];

  let precioTotal = ordenes.reduce((total, orden) => total + parseFloat(orden.total), 0).toString();
  let fechaActual = new Date();
  const horaLocal = fechaActual.toLocaleTimeString();
  const dia = fechaActual.toLocaleDateString()
  const fecha = {
    dia,
    horaLocal
  }
  const dateSaved = JSON.stringify(fecha)
  let atendio = 'juan'

  const detalles = JSON.stringify(ordenes)

  let newNota = {
    monto: precioTotal,
    metodoPago: metodoPago,
    fecha: dateSaved,
    atendio: atendio,
    detalles: detalles
  };

  ipcRenderer.send("client:newVenta", newNota);


  console.log(newNota);

  //window.location.href = "./components/carrito/ticket.html";
});