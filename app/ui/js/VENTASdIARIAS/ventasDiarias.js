const { ipcRenderer } = require("electron");

const backPage = document.querySelector('#pageActually')
backPage.addEventListener('click', e=>{
    e.preventDefault
    window.location.href="./inicio.html";
});

const mostrarInfoExtra = (fila_id, btn_class) => {
  let infoExtraFila = document.querySelector(`#${fila_id} + .info-extra`);

  if (infoExtraFila && infoExtraFila.style.display !== "none") {
    infoExtraFila.style.display = "none";
  } else {
    infoExtraFila = document.createElement("tr");
    infoExtraFila.classList.add("info-extra");
    const n_celda = document.createElement("td");
    n_celda.colSpan = 7;
    n_celda.innerHTML = `
        <div class="info-extra-contenido">
          <div class="derecha">
            <strong>${nota.contenidoOrden}</strong>
          </div>
        </div>
        `;
    infoExtraFila.appendChild(n_celda);

    const siguienteFila = document.getElementById(fila_id);
    siguienteFila.parentNode.insertBefore(
      infoExtraFila,
      siguienteFila.nextSibling
    );

    const editButton = document.querySelector(`#${fila_id} .${btn_class}`);
    if (editButton) {
      editButton.disabled = false;
    }

    infoExtraFila.style.display = "table-row";
  }
};

const toggleEditButtonImage = (button) => {
  const img = button.querySelector("img");
  if (img) {
    if (img.src.endsWith("down.png")) {
      img.src ="../img/up.png";
    } else {
      img.src ="../img/down.png";
    }
  }
};

let notas = [];

ipcRenderer.send("client:getNotas");
ipcRenderer.on("server:getNotas", (e, args) => {
  notas = JSON.parse(args);
  renderizarNotas(notas);   
});

const renderizarNotas = (notas) => {
  const tbody = document.querySelector('tbody'); 
  tbody.innerHTML = ''; 

  let totalMonto = 0; 

  notas.forEach((nota, index) => {
    totalMonto += parseFloat(nota.monto);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${nota.idVenta}</td>
      <td>${nota.precioTotal}</td>
      <td>efectivo</td>
      <td>${nota.fecha}</td>
      <td>...</td>
      <td> <img class="bntEdit" src="../img/down.png" /> </td>
    `;
    tr.id = `fila_${index}`; 
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

  const editButtons = document.querySelectorAll(".bntEdit");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const fila_id = button.closest('tr').id; 
      mostrarInfoExtra(fila_id, "bntEdit");
      toggleEditButtonImage(button);
    });
  });
}
