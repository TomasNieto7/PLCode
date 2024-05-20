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
  let filaID = 1;
  let colorIndex = 0

  
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
    tr.id = `fila_${filaID}`; 
    filaID++; 
    tr.style.backgroundColor = colorIndex % 2 === 0 ? '#FDCEA2' : '#FFE6C9';
    colorIndex++;
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

const buttonShowModal = document.getElementById('btnShModal')
buttonShowModal.addEventListener('click', e => {
  // ipcRenderer.send("client:deleteAll")
  modal.classList.add("alertStyle");
  modal.showModal()

  const buttonConfirm = document.getElementById('botonadmon')
  buttonConfirm.addEventListener('click', e =>{
    ipcRenderer.send("client:deleteAll");
    modal.classList.remove("alertStyle");

    modal.close();
  })

  
})


const btnCloseModal = document.querySelector('#cerraradmon')

btnCloseModal.addEventListener('click', e => {
    modal.classList.remove("alertStyle");
    modal.close()
 
})


