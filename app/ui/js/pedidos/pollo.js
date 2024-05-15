const mostrarInfoExtra = (fila_id, btn_class) => {
  let infoExtraFila = document.querySelector(`#${fila_id} + .info-extra`);

  if (infoExtraFila && infoExtraFila.style.display !== "none") {
    infoExtraFila.style.display = "none";
  } else {
    infoExtraFila = document.createElement("tr");
    infoExtraFila.classList.add("info-extra");
    const n_celda = document.createElement("td");
    n_celda.colSpan = 5;
    n_celda.innerHTML = `
        <div class="info-extra-contenido">
        <div class="izquierda">
        <label><input type="checkbox" class="extras">Sin Salsa</label><br>
        <label><input type="checkbox" class="extras">Sin Totopos</label><br>
        <label><input type="checkbox" class="extras">Sin Tortillas</label>
        </div>
        <div class="derecha">
          <strong>Notas adicionales:</strong>
          <textarea  id="notas_adicionales" rows="4" cols="50" placeholder="Notas adicionales."></textarea>
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
  const td = button.parentNode;
  const img = td.querySelector("img");
  if (img) {
    if (img.src.endsWith("down.png")) {
      img.src = "../../../img/up.png";
    } else {
      img.src = "../../../img/down.png";
    }
  }
};

const actualizar_cantidad = (button, increment) => {
  const cantidadCell = button.parentElement;
  let cantidadSpan = cantidadCell.querySelector("span");
  if (!cantidadSpan) {
    cantidadSpan = document.createElement("span");
    cantidadSpan.innerText = "0";
    cantidadCell.appendChild(cantidadSpan);
  }
  let cantidadValue = parseInt(cantidadSpan.innerText, 10);
  if (!isNaN(cantidadValue)) {
    cantidadValue += increment;
    if (cantidadValue < 0) {
      cantidadValue = 0;
    }
    cantidadSpan.innerText = cantidadValue;
    updateTotal();
  }
};
//Eventos agregar cantidad
document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add");
  const lessButtons = document.querySelectorAll(".less");

  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      actualizar_cantidad(button, 1);
    });
  });

  lessButtons.forEach((button) => {
    button.addEventListener("click", () => {
      actualizar_cantidad(button, -1);
    });
  });

  const editButtons = document.querySelectorAll(".bntEdit");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const fila_id = button.parentNode.parentNode.id;
      mostrarInfoExtra(fila_id, button.className);
      toggleEditButtonImage(button);
    });
  });
});

const updateTotal = () => {
  // Para Pollo Loco
  let polloLococantidad = parseInt(
    document.getElementById("polloLococantidad").innerText
  );
  const precioPorPolloLoco = 128;
  let polloLocoTotal = polloLococantidad * precioPorPolloLoco;
  document.getElementById("polloLocoTotal").innerText = polloLocoTotal;

  // Para Medio Pollo
  let medioPollocantidad = parseInt(
    document.getElementById("medioPollocantidad").innerText
  );
  const precioPorMedioPollo = 64;
  let medioPolloTotal = medioPollocantidad * precioPorMedioPollo;
  document.getElementById("medioPolloTotal").innerText = medioPolloTotal;

  // Para Cuarto Pollo
  let cuartoPollocantidad = parseInt(
    document.getElementById("cuartoPollocantidad").innerText
  );
  const precioPorCuartoPollo = 32;
  let cuartoPolloTotal = cuartoPollocantidad * precioPorCuartoPollo;
  document.getElementById("cuartoPolloTotal").innerText = cuartoPolloTotal;
};
