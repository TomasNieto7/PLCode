const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
  const backPage = document.querySelector('#pageActually');
  const agregar = document.querySelector("#agregar");
  const cancelar = document.querySelector("#cancelar");
  const modal = document.getElementById("modal");

  backPage.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '../../crearPedido.html';
  });

  agregar.addEventListener("click", (e) => {
    e.preventDefault();
    let flag = false;
    console.log("Agregando productos");
    const detalles = document.querySelectorAll(".detalle");
    const ordenes = [];
    let i = 0;

    detalles.forEach((div) => {
      const cantidad = div.querySelector(".cantidad span").innerText;
      if (parseInt(cantidad) > 0) {
        const producto = div.querySelector(".producto").innerText;
        const descripcion = div.querySelector(".descripcion").innerText;
        const total = div.querySelector(".total").innerText;
        let notasCompletas = '';

        if (document.querySelector(".info-extra-contenido")) {
          const interNotes = document.querySelectorAll(".info-extra-contenido");
          let notas = '';
          interNotes[i].querySelector("#notas_adicionales") && (notas = interNotes[i].querySelector("#notas_adicionales").value);
          const extras = interNotes[i].querySelectorAll(".extras:checked");
          const extrasSeleccionados = Array.from(extras).map((extra) => {
            return extra.nextSibling.textContent.trim().toLowerCase();
          });
          notasCompletas = `${notas}${extrasSeleccionados.length > 0 ? ", " + extrasSeleccionados.join(",") : ""}`;
        }

        const newOrden = {
          producto,
          descripcion,
          cantidad,
          total,
          notasCompletas,
        };
        i++;
        console.log(i);
        ordenes.push(newOrden);
        flag = true;
      }
    });

    if (flag) {
      ordenes.forEach((orden) => {
        ipcRenderer.send("client:newOrden", orden);
        console.log("Enviando orden");
        console.log(orden);
      });
      window.location.href = "../../crearPedido.html";
    } else {
      if (modal) {
        modal.classList.add("alertStyle");
        modal.showModal();
      }
    }
  });

  const btnCloseModal = document.querySelector('#cerraradmon');
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', e => {
      if (modal) {
        modal.classList.remove("alertStyle");
        modal.close();
      }
    });
  }

  cancelar.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "../../crearPedido.html";
  });
});
