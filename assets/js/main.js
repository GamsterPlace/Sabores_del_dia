// assets/js/main.js

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
actualizarContador();

function actualizarContador() {
  const contadorSidebar = document.getElementById('contadorSidebar');
  if (contadorSidebar) contadorSidebar.innerText = carrito.length;
}

let productoActual = {
  nombre: '',
  precioBase: 0
};

function abrirPersonalizacion(nombre, precioBase) {
  productoActual = { nombre, precioBase };
  document.getElementById('modalTitulo').innerText = `Personalizar ${nombre}`;
  document.getElementById('tamano').value = 'Pequeño'; // Reset modal
  document.getElementById('comentario').value = '';
  document.querySelectorAll('.extra').forEach(cb => cb.checked = false);
  document.getElementById('modal').classList.remove('hidden');
}

function cerrarModal() {
  document.getElementById('modal').classList.add('hidden');
}

function agregarPersonalizado() {
  const tamano = document.getElementById('tamano').value;
  const comentario = document.getElementById('comentario').value.trim();
  const checkboxes = document.querySelectorAll('.extra');
  
  let extras = [];
  let precioExtras = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) {
      const [nombreExtra, precio] = cb.value.split('|');
      extras.push(nombreExtra);
      precioExtras += parseFloat(precio);
    }
  });

  // Ajuste por tamaño
  let precioTamano = 0;
  if (tamano === 'Mediano') precioTamano = 5;
  else if (tamano === 'Grande') precioTamano = 10;

  const precioTotal = productoActual.precioBase + precioTamano + precioExtras;

  carrito.push({
    nombre: productoActual.nombre,
    tamano,
    extras,
    comentario,
    precioTotal
  });

  localStorage.setItem('carrito', JSON.stringify(carrito));
  cerrarModal();
  actualizarContador();
  alert(`${productoActual.nombre} personalizado fue agregado al carrito.`);
}

// Sidebar carrito

function abrirSidebar() {
  document.getElementById("sidebarCarrito").classList.remove("translate-x-full");
  actualizarSidebar();
}

function cerrarSidebar() {
  document.getElementById("sidebarCarrito").classList.add("translate-x-full");
}

function actualizarSidebar() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const sidebarContenido = document.getElementById("sidebarContenido");
  const totalSpan = document.getElementById("sidebarTotal");
  const contador = document.getElementById("contadorSidebar");

  sidebarContenido.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    total += item.precioTotal;

    const div = document.createElement("div");
    div.className = "border p-2 rounded bg-gray-50";
    div.innerHTML = `
      <p class="font-semibold">${item.nombre} (${item.tamano})</p>
      ${item.extras.length > 0 ? `<p class="text-sm text-gray-600">Extras: ${item.extras.join(", ")}</p>` : ""}
      ${item.comentario ? `<p class="text-sm italic text-gray-500">"${item.comentario}"</p>` : ""}
      <p class="text-right text-green-600 font-bold">Q${item.precioTotal.toFixed(2)}</p>
    `;
    sidebarContenido.appendChild(div);
  });

  totalSpan.textContent = total.toFixed(2);
  contador.textContent = carrito.length;
}
