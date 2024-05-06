const { ipcRenderer } = require("electron");

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
              Descripción: ${orden.descripcion} <!-- Cambié "Description" a "Descripción" -->
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
