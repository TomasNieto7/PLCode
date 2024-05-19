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

const mostrarInfoExtra = (fila_id, btn_class, detallesA) => {
  let infoExtraFila = document.querySelector(`#${fila_id} + .info-extra`);
  console.log(JSON.parse(detallesA));
  const detalles = JSON.parse(detallesA)
  if (infoExtraFila && infoExtraFila.style.display !== "none") {
    infoExtraFila.style.display = "none";
  } else {
    infoExtraFila = document.createElement("tr");
    infoExtraFila.classList.add("info-extra");
    const n_celda = document.createElement("td");
    n_celda.colSpan = 7;
    
    let detallesHTML = "";
    if (Array.isArray(detalles)) {
      detallesHTML = detalles.map(detalle => `

      <div class='conteinerVenta'>
      <p id='cantidad'><b>Cantidad:</b> ${detalle.cantidad}</p>
      <p id='producto'><b>Producto:</b>${detalle.producto}</p>
      <p id='desc'><b>Descripcion:</b> ${detalle.descripcion}</p>
      <p id='notes'><b>Notas:</b> ${detalle.notasCompletas}</p>
      </div> 
      
      `).join('');
    } else {
      detallesHTML = `<p>${detalles}</p>`;
    }
    
    n_celda.innerHTML = `
      <div class="info-extra-contenido">
        <p><b>Detalles de la venta:</b> </p>  
        <div class='detallesVenta'>
        ${detallesHTML}
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
