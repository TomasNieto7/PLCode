const toggleEditButtonImage = (button) => {
  const td = button.parentNode;
  const img = td.querySelector("img");
  if (img) {
    if (img.src.endsWith("down.png")) {
      img.src = "../img/up.png";
    } else {
      img.src = "../img/down.png";
    }
  }
};


const mostrarOcultarInformacionAdicional = (boton, notas) => {
  const fila = boton.parentNode.parentNode;
  const fila_id = fila.id;
  const btn_class = boton.className;
  const index = parseInt(fila.className.split('_')[1]);
  const detallesA = notas[index].detalles;
  mostrarInfoExtra(fila_id, btn_class, detallesA);
  toggleEditButtonImage(boton); 
};

const mostrarInfoExtra = (fila_id, btn_class, detalles) => {
  let infoExtraFila = document.querySelector(`#${fila_id} + .info-extra`);

  if (infoExtraFila && infoExtraFila.style.display !== "none") {
    infoExtraFila.style.display = "none";
  } else {
    infoExtraFila = document.createElement("tr");
    infoExtraFila.classList.add("info-extra");
    const n_celda = document.createElement("td");
    n_celda.colSpan = 7;
    
    let detallesHTML = "";
    if (Array.isArray(detalles)) {
      detallesHTML = detalles.map(detalle => `<p>${detalle}</p>`).join('');
    } else {
      detallesHTML = `<p>${detalles}</p>`;
    }
    
    n_celda.innerHTML = `
      <div class="info-extra-contenido">
        <p>Información adicional de la venta: </p>  
        ${detallesHTML}
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
