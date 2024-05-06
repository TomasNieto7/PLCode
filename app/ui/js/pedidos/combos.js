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
        <input type="checkbox" class="extras">Quesadilla</label><br>
        <input type="checkbox" class="extras">Papas a la Francesa</label><br>
        <input type="checkbox" class="extras">Ensalada de Col</label><br>
        <input type="checkbox" class="extras">Frijoles Charros</label><br>
        <input type="checkbox" class="extras">Ensalada de Coditos</label><br>
        <input type="checkbox" class="extras">Arroz</label>
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
    updateTotalCombos();
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

const updateTotalCombos = () => {
  // Combo idividual 1
  let combo1Cantidad = parseInt(document.getElementById("combo1").innerText);
  const precioCombo1 = 150;
  let totalCombo1 = combo1Cantidad * precioCombo1;
  document.getElementById("combo1Total").innerText = totalCombo1;

  // Combo idividual 2
  let combo2Cantidad = parseInt(document.getElementById("combo2").innerText);
  const precioCombo2 = 200;
  let totalCombo2 = combo2Cantidad * precioCombo2;
  document.getElementById("combo2Total").innerText = totalCombo2;

  // Combo familiar 1
  let combo3Cantidad = parseInt(document.getElementById("combo3").innerText);
  const precioCombo3 = 250;
  let totalCombo3 = combo3Cantidad * precioCombo3;
  document.getElementById("combo3Total").innerText = totalCombo3;

  // Combo familiar 2
  let combo4Cantidad = parseInt(document.getElementById("combo4").innerText);
  const precioCombo4 = 300;
  let totalCombo4 = combo4Cantidad * precioCombo4;
  document.getElementById("combo4Total").innerText = totalCombo4;

  // Combo familiar 3
  let combo5Cantidad = parseInt(document.getElementById("combo5").innerText);
  const precioCombo5 = 350;
  let totalCombo5 = combo5Cantidad * precioCombo5;
  document.getElementById("combo5Total").innerText = totalCombo5;
};
