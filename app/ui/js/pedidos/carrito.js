const {
  ipcRenderer
} = require("electron");
const {
  jsPDF
} = require("jspdf");
const autoTable = require('jspdf-autotable')

const pedido = document.querySelector(".pedido");
const modal = document.querySelector('#modal')
const modalLoad = document.querySelector('#modalLoad')
const btnCloseModal = document.querySelectorAll('.cerraradmon')

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
   
});

const generarNotaVenta = () => { const notas = [];

  let precioTotal = ordenes.reduce((total, orden) => total + parseFloat(orden.total), 0).toString();
  var fechaA = new Date(); // Fecha actual
  var zonaHoraria = 'America/Chihuahua'; // Cambia esto según tu zona horaria

  var opciones = { timeZone: zonaHoraria };
  const dia = fechaA.toLocaleDateString('es-CL', opciones);
  const horaLocal = fechaA.toLocaleTimeString('es-CL', opciones);

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
}

btnCloseModal.forEach(btn => {
  btn.addEventListener('click', e => {
    const modalToClose = e.target.closest('dialog'); 
    modalToClose.classList.remove("alertStyle");
    modalToClose.close();
  });
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
      confirmarBtn.disabled = !pagoEfectivo.value; 
    });
  }

  const ConfirmarPedido = document.getElementById("confirmar");
  ConfirmarPedido.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("alertStyle");
    modal.close();
    modalCarga();
  });
};  


const modalCarga = () => {
  
   modalLoad.classList.add("alertStyle");
   modalLoad.showModal();
   generarNotaVenta();
   setTimeout(() => {
     modalLoad.close();
     
     
     modalFnl.classList.add("alertStyle");
     modalFnl.showModal();

     
     setTimeout(() => {
       modalFnl.close();
       window.location.href = "./components/carrito/ticket.html";
     }, 6000); 
   }, 4000); 
}
const actualizarCambio = () => {
  const totalPago = parseFloat(total.innerHTML.replace('$', '')); 
  const efectivo = parseFloat(pagoEfectivo.value || 0); 
  const cambio = efectivo - totalPago; 
  document.getElementById('cambio').textContent = cambio.toFixed(2);
};
const modalRechazo = document.getElementById("modalRechazo");

const botonModal = document.getElementById("BtnRechazo");
botonModal.addEventListener("click", e => {
  e.preventDefault
  modalRechazo.classList.add("alertStyle");
  modalRechazo.showModal()
})


//Mostrar en pantalla el cambio
// const genResumen = () => {
//   const resumen = document.getElementById('resumen');
//   const valorSelect = document.getElementById('metodo');
//   const infoSelec = valorSelect.value;

//   if (infoSelec === 'EFECTIVO') {
//     resumen.innerHTML = `
//       <p>Ingrese el monto con el que va a pagar</p>
//       <input type="number" id="pagoEfectivo" placeholder="Monto a pagar">
//       <p>Cambio: <span id="cambio">0.00</span></p>`;

//     if (pagoEfectivo) {
//       pagoEfectivo.addEventListener('input', actualizarCambio);
//     }

//   } else if (infoSelec === 'DEBITO') {
//     resumen.innerHTML = ` `;
//   }
// };

// genResumen();


// selectElement.addEventListener("change", genResumen);
