const {
  ipcRenderer
} = require("electron");
const {
  jsPDF
} = require("jspdf");
const autoTable = require('jspdf-autotable')

const fs = require('fs');

const pedido = document.querySelector(".pedido");
const modal = document.querySelector('#modal')
const modalLoad = document.querySelector('#modalLoad')
const btnCloseModal = document.querySelector('#cerraradmon')

let ordenes = [];
let atendioA
let precioTotalA

ipcRenderer.send("client:getUsersLogin")

ipcRenderer.on("server:getUsersLogin", (e, arg) => {
  const user = JSON.parse(arg)
  atendioA = user.name
  console.log(atendioA);
})

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
selectElement.addEventListener("change", function () {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  metodoPago = selectedOption.text;

});

const generarNotaVenta = () => {

  let precioTotal = ordenes.reduce((total, orden) => total + parseFloat(orden.total), 0).toString();
  precioTotalA = precioTotal
  var fechaA = new Date();
  var zonaHoraria = 'America/Chihuahua';

  var opciones = {
    timeZone: zonaHoraria
  };
  const dia = fechaA.toLocaleDateString('es-CL', opciones);
  const horaLocal = fechaA.toLocaleTimeString('es-CL', opciones);

  const fecha = {
    dia,
    horaLocal
  }

  const dateSaved = JSON.stringify(fecha)

  const detalles = JSON.stringify(ordenes)

  let newNota = {
    monto: precioTotal,
    metodoPago: metodoPago,
    fecha: dateSaved,
    atendio: atendioA,
    detalles: detalles
  };

  ipcRenderer.send("client:newVenta", newNota);

  try {
    fs.unlinkSync('./ticket.pdf');
    console.log('Archivo eliminado');
  } catch (err) {
    console.error('Ocurrió un error al eliminar el archivo', err);
  }

  console.log(newNota);
}

btnCloseModal.addEventListener('click', e => {
  modal.classList.remove("alertStyle");
  modal.close();
});

const realizar = document.getElementById("realizar");
realizar.addEventListener("click", (e) => {
  e.preventDefault();


  if (metodoPago === 'EFECTIVO') {
    modal.classList.add("alertStyle");
    modal.showModal(actualizarModal());
  } else if (metodoPago === 'CREDITO' || metodoPago === 'DEBITO') {
    modalCarga();
  }
});


const actualizarModal = () => {
  const info = document.querySelector('#informacion');
  info.innerHTML = `
    <p>Total a pagar: ${total.innerHTML}</p>
    <p>Ingrese el monto con el que va a pagar</p>
    <input type="number" id="pagoEfectivo" placeholder="Monto a pagar" required>
    <p>Cambio: <span id="cambio">0.00</span></p>
    <button id="confirmar" disabled>Confirmar pedido</button>`;

  const pagoEfectivo = document.getElementById("pagoEfectivo");
  if (pagoEfectivo) {
    pagoEfectivo.addEventListener('input', actualizarCambio);
    pagoEfectivo.addEventListener('input', () => {
      const confirmarBtn = document.getElementById("confirmar");
      confirmarBtn.disabled = !pagoEfectivo.value || parseFloat(pagoEfectivo.value) < parseFloat(total.innerHTML.replace('$', ''));
    });
  }

  const ConfirmarPedido = document.getElementById("confirmar");
  ConfirmarPedido.addEventListener("click", (e) => {
    e.preventDefault();
    ipcRenderer.send("client:setPago", pagoEfectivo.value)
    generarNotaVenta();
    modal.classList.remove("alertStyle");
    modal.close();
    window.location.href = "./components/carrito/ticket.html";
  });
};


const modalCarga = () => {
  modalLoad.classList.add("alertStyle");
  modalLoad.showModal();
  const carga = document.getElementById("preload");
  carga.addEventListener("click", (e) => {
    e.preventDefault();
    modalesPago();
  });

}
const actualizarCambio = () => {
  const totalPago = parseFloat(total.innerHTML.replace('$', ''));
  const efectivo = parseFloat(pagoEfectivo.value || 0);
  const cambio = efectivo - totalPago;
  ipcRenderer.send("client:setCambio", cambio)
  document.getElementById('cambio').textContent = cambio.toFixed(2);
};

const modalesPago = () => {
  const random = Math.random();
  if (random > 0.5) {
    modalLoad.classList.remove("alertStyle");
    modalLoad.close();

    modalFnl.classList.add("alertStyle");
    modalFnl.showModal();
    generarNotaVenta();
    ipcRenderer.send("client:setPago", precioTotalA)
    ipcRenderer.send("client:setCambio", 0)
    setTimeout(() => {
      modalFnl.close();
      window.location.href = "./components/carrito/ticket.html";
    }, 1000);
  } else {
    modalLoad.classList.remove("alertStyle");
    modalLoad.close();

    modalRechazo.classList.add("alertStyle");
    modalRechazo.showModal();
    const rechazoMdl = document.getElementById("modalRechazo");
    rechazoMdl.addEventListener("click", e => {
      e.preventDefault
      window.location.href = "./carrito.html";
    });

  }
};