const {
    ipcRenderer
} = require("electron");


// Importa las bibliotecas
const html2canvas = require('html2canvas')
const {
    jsPDF
} = require("jspdf"); // will automatically load the node version

const ticket = document.querySelector(".orden");

let notas = [];
let ordenes = [];

ipcRenderer.send("client:getVentasActual");
ipcRenderer.on("server:getVentasActual", (e, args) => {
  notas = JSON.parse(args);
  renderVentaID(notas);
  renderOrdenes(notas.detalles);
  renderDate(notas.fecha);
  renderAtendidoPor(notas.atendio);
  renderPagoInfo(notas.monto);
});

const renderVentaID = (venta) => {
    const ventaId = venta.ventaId
    const numOrden = document.querySelector(".numOrden");
    numOrden.innerHTML = `Orden #${ventaId}`
}

const renderAtendidoPor = (atendido) => {
    const nombreEmp = document.querySelector("#attendedBy");
    nombreEmp.innerHTML = `Atendido por: ${atendido}`
}

const renderDate = (date) => {
    const fecha = JSON.parse(date);
    const $hora=document.querySelector('.hora'),
    $fecha= document.querySelector('.fecha');
    $hora.innerHTML=`Hora: ${fecha.horaLocal}`;
    $fecha.innerHTML= `FECHA: ${fecha.dia}`;
}

ipcRenderer.send('client:getLocal')

ipcRenderer.on("server:getLocal", (e, args) => {
    const local = JSON.parse(args);
    renderLocal(local)
});

const renderLocal = (local) => {
    const localName = document.querySelector("#localName");
    const address = document.querySelector("#address");
    localName.innerHTML = `${local.local}`
    address.innerHTML = `${local.address}`
}


const renderOrdenes = (ordenes) => {
    ordenes = JSON.parse(ordenes);
    ordenes.forEach((orden) => {
        ticket.innerHTML += `
                <div class="bodyTable">
                    <div class="f1" id='detalles'>
                    <p>
                        ${orden.producto} 
                    </p>
                    <p id='desc'>
                        Descripcion:${orden.descripcion}
                    </p>
                    <p id='notes'>
                        Notas:${orden.notasCompletas}
                    </p>
                    </div> 
                    <p class="f2">
                        ${orden.cantidad}
                    </p>
                    <p class="f3">
                        $ ${orden.total}.00
                    </p>
                </div>
              `;
    });
}

const renderPagoInfo = (monto) => {
    const subtotal = document.querySelector("#subtotal");
    const iva = document.querySelector("#iva");
    const total = document.querySelector("#total");
    const metodoPago = document.querySelector("#metodoPago");
    const cambio = document.querySelector("#cambio");
    
    var metodoPagoA = 1000;

    const montoA = parseInt(monto);
    const ivaA = montoA * 0.16;
    var subtotalA = montoA - ivaA;
    var cambioA = metodoPagoA - montoA;

    subtotal.innerHTML = `${subtotalA}`
    iva.innerHTML = `${ivaA}`
    total.innerHTML = `${montoA}`
    metodoPago.innerHTML = `${metodoPagoA}`
    cambio.innerHTML = `${cambioA}`
}

// Espera a que la página se cargue completamente
window.onload = function () {

    const tableContent = document.getElementById('ticket'); // Reemplaza con el ID o selector correcto de tu tabla
    const height = tableContent.clientHeight;
    const width = tableContent.clientWidth;
    const heightEnMilimetros = height / 3.7795280352161;
    const widthEnMilimetros = width / 3.7795280352161;
    console.log(heightEnMilimetros);
    const cmd = document.getElementById('cmd');
    cmd.addEventListener('click', e => {
        html2canvas(tableContent).then(canvas => {

            let heightTIcket = 100; 
            const pdf = new jsPDF({
                unit: 'mm',
                format: [width, height],
            });
            
            // Agrega el contenido del canvas al PDF
            pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, width, height);
            
            // Guarda el PDF
            pdf.save('ticket.pdf');
            console.log('PDF guardado');
        });
    })

    const back = document.getElementById('back'); // Reemplaza con el ID o selector correcto de tu tabla
    back.addEventListener('click', e => {
        e.preventDefault
        window.location.href = "../../carrito.html";
    })
};