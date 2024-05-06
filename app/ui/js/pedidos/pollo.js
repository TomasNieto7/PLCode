const mostrarInfoExtra = (fila_id, btn_class) => {
  const n_fila = document.createElement("tr");
  n_fila.classList.add("info-extra");
  const n_celda = document.createElement("td");
  n_celda.colSpan = 5;
  n_celda.innerHTML = `
        <div class="info-extra-contenido">
          <div class="izquierda">
            <div class='options'>
              <input type="checkbox" class="extras" id='uno'>
              <label for='uno'>
                Sin Salsa
              </label>
            </div>
            <div class='options'>
              <input type="checkbox" class="extras" id='dos'>
              <label for="dos">
                <span class="radio-button-1"></span>Sin Totopos
              </label>
            </div>
            <div class='options'>
              <input type="checkbox" class="extras" id='tres'>
              <label for="tres">
                <span class="radio-button-1"></span>Sin Tortillas
              </label>
            </div>
          </div>
          <div class="derecha">
            <strong>Notas adicionales:</strong>
            <textarea  id="notas_adicionales" rows="4" cols="50" placeholder="Notas adicionales."></textarea>
          </div>
        </div>
      `;
  n_fila.appendChild(n_celda);

  const siguienteFila = document.getElementById(fila_id);
  siguienteFila.parentNode.insertBefore(n_fila, siguienteFila.nextSibling);

  const editButton = document.querySelector(`#${fila_id} .${btn_class}`);
  if (editButton) {
    editButton.disabled = true;
  }

  n_fila.style.display = "table-row";
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