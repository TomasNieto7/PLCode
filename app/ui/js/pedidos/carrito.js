const {
  ipcRenderer
} = require("electron");
const {
  jsPDF
} = require("jspdf"); 
const autoTable =  require('jspdf-autotable')

const pedido = document.querySelector(".pedido");

let ordenes = [];

ipcRenderer.send("client:getOrdenes");

const renderTasks = (ordenes) => {
  pedido.innerHTML = "";
  ordenes.forEach((orden) => {
    pedido.innerHTML += `
          <div class="card">
            <h4>
              Producto: ${orden.producto}
            </h4>
            <p>
              Descripción: ${orden.descripcion} 
            </p>
            <p>
              Cantidad: ${orden.cantidad}
            </p>
            <p>
              Precio: ${orden.total}
            </p>
            <p>
              Notas: ${orden.notasCompletas}
            </p>
          </div>
        `;
  });
};

ipcRenderer.on("server:getOrdenes", (e, args) => {
  ordenes = JSON.parse(args);
  renderTasks(ordenes);
  getTotal(ordenes);
});

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
  total.innerHTML = `El total es: ${precio}`;
};

const realizar = document.getElementById("realizar");
realizar.addEventListener("click", (e) => {
  e.preventDefault()

  const notas = [];

  let precioTotal = ordenes.reduce((total, orden) => total + parseFloat(orden.total), 0);
  let idVenta = Math.floor(Math.random() * 1000000);
  let fecha = new Date();

  let newNota = {
    idVenta: idVenta,
    precioTotal: precioTotal,    
    fecha: fecha,
    contenidoOrden: ordenes 
  };
  notas.push(newNota);

  notas.forEach((nota) => {
    ipcRenderer.send("client:newNota", nota);
  });

  console.log(newNota);

  window.location.href = "./components/carrito/ticket.html";
});

 
