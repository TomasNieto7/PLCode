const {
  ipcRenderer
} = require("electron");

let notas = [];

ipcRenderer.send("client:getVentas");
ipcRenderer.on("server:getVentas", (e, args) => {
  notas = JSON.parse(args);
  renderizarNotas(notas);
});

ipcRenderer.on('server:deleteAll', (e, args) => {
  notas = JSON.parse(args);
  renderizarNotas(notas);
})

const backPage = document.querySelector('#pageActually');
backPage.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = "./inicio.html";
});

const esPar = (numero) => {
  if (numero % 2 === 0) {
    return true;
  } else {
    return false;
  }
};

const renderizarNotas = (notas) => {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  let totalMonto = 0;

  
  notas.forEach((nota, index) => {
    montoDouble = parseFloat(nota.monto);
    totalMonto += parseFloat(nota.monto);
    flagID = esPar(index);
    const fechaA = JSON.parse(nota.fecha)
    const fecha = `${fechaA.dia}   -  ${fechaA.horaLocal}`

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${nota.ventaId}</td>
      <td>${montoDouble.toFixed(2)}</td>
      <td>${nota.metodoPago}</td>
      <td>${fecha}</td>
      <td>${nota.atendio}</td>
      <td> <img class="btnEdit" src="../img/down.png" /> </td>
    `;
    if (flagID) {
      tr.id = `one`;
    } else {
      tr.id = `two`;
    }
    tr.className = `fila_${index}`;
    tbody.appendChild(tr);
  });

  const trTotal = document.createElement('tr');
  trTotal.innerHTML = `
    <td></td>
    <td>TOTAL:</td>
    <td>$${totalMonto.toFixed(2)}</td>
    <td></td>
    <td></td>
    <td></td>
  `;
  tbody.appendChild(trTotal);

  const botonesEditar = document.querySelectorAll(".btnEdit");
  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const botonClickeado = e.target;
      mostrarOcultarInformacionAdicional(botonClickeado, notas);
    });
  });
};

//"client:deleteAll"

const buttonDelete = document.getElementById('btnDelete')
buttonDelete.addEventListener('click', e => {
  ipcRenderer.send("client:deleteAll")
})

