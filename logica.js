// ===============================
// Mostrar productos dinámicamente
// ===============================
function mostrarProductos(lista, origen) {
    const contenedor = document.getElementById("catalogo");
    contenedor.innerHTML = "";

    lista.forEach(producto => {
        const card = document.createElement("article");
        card.className = "producto";

        card.innerHTML = `
        <figure>
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <figcaption>
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>Precio:</strong> $${producto.precio} ${producto.unidad}</p>
                <button onclick="agregarAlCarrito(${producto.id}, '${origen}')">Agregar al carrito</button>
            </figcaption>
        </figure>
        `;
        contenedor.appendChild(card);
    });
}

// ===============================
// Toast moderno (login y carrito)
// ===============================
function mostrarToast(mensaje, tipo = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${tipo}`;
    toast.textContent = mensaje;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100); // animar entrada
    setTimeout(() => {
        toast.classList.remove("show");
        document.body.removeChild(toast);
    }, 3000); // desaparece en 3 segundos
}

// ===============================
// Agregar producto al carrito
// ===============================
function agregarAlCarrito(idProducto, origen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let catalogo = origen === "tradicional" ? productosTradicionales : productosSeco;
    let productoBase = catalogo.find(p => p.id === idProducto);

    if (!productoBase) {
        mostrarToast("Producto no encontrado", "error");
        return;
    }

    let index = carrito.findIndex(item => item.id === idProducto && item.origen === origen);

    if (index >= 0) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({
            id: productoBase.id,
            nombre: productoBase.nombre,
            descripcion: productoBase.descripcion,
            precio: productoBase.precio,
            unidad: productoBase.unidad,
            imagen: productoBase.imagen,
            cantidad: 1,
            origen: origen
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Toast moderno en lugar de alert
    mostrarToast(`Producto "${productoBase.nombre}" agregado al carrito`, "success");
}

// ===============================
// Mostrar carrito
// ===============================
function mostrarCarrito() {
    const contenedor = document.getElementById("carrito");
    contenedor.innerHTML = "";

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const card = document.createElement("div");
        card.className = "card-carrito";

        card.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="carrito-imagen" />
            <div class="carrito-info">
                <h3>${item.nombre}</h3>
                <p>${item.descripcion || ""}</p>
                <p><strong>Unidad:</strong> ${item.unidad}</p>
                <p><strong>Precio:</strong> $${item.precio}</p>
                <p><strong>Cantidad:</strong> ${item.cantidad}</p>
                <p><strong>Subtotal:</strong> $${subtotal}</p>

                <div class="carrito-acciones">
                    <button onclick="incrementarCantidad(${index})">+</button>
                    <button onclick="decrementarCantidad(${index})">-</button>
                    <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });

    const totalEl = document.createElement("div");
    totalEl.className = "carrito-total";
    totalEl.innerHTML = `<h4>Total: $${total}</h4>`;
    contenedor.appendChild(totalEl);
}

// ===============================
// Modificar cantidades del carrito
// ===============================
function incrementarCantidad(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito[index].cantidad += 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function decrementarCantidad(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito[index].cantidad = Math.max(1, carrito[index].cantidad - 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// ===============================
// Vaciar carrito y finalizar compra
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const btnVaciar = document.getElementById("btn-vaciar");
    const btnFinalizar = document.getElementById("btn-finalizar");

    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            mostrarCarrito();
            mostrarToast("Carrito vaciado", "error");
        });
    }

    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", () => {
            mostrarToast("¡Gracias por tu compra!", "success");
            localStorage.removeItem("carrito");
            mostrarCarrito();
        });
    }
});

// ===============================
// Login con validaciones modernas
// ===============================
function loginUsuario(event) {
  event.preventDefault(); // Evita que el formulario recargue la página

  // Capturamos los valores ingresados
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

  // Capturamos el elemento donde se mostrará el aviso de requisitos
    const requisitos = document.getElementById("requisitos-password");

  // Mostramos el aviso siempre que el usuario interactúe con el formulario
    requisitos.textContent = "La contraseña debe tener al menos una letra mayúscula y un carácter especial.";

  // Validación: campos vacíos
    if (!email || !password) {
        mostrarToast("Completa todos los campos.", "error");
        return;
}

  // Validación: mínimo de caracteres
    if (password.length < 4) {
        mostrarToast("La contraseña debe tener al menos 4 caracteres.", "error");
        return;
}

  // Validación: al menos una mayúscula y un carácter especial
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!tieneMayuscula || !tieneEspecial) {
        requisitos.textContent = " La contraseña debe incluir una letra mayúscula y un carácter especial.";
        mostrarToast("La contraseña no cumple los requisitos.", "error");
        return;
}

  // Si todo está bien, borramos el aviso
    requisitos.textContent = "";

  // Guardamos el usuario en localStorage
    localStorage.setItem("usuarioLogueado", email);

  // Mostramos mensaje de éxito
    mostrarToast("Login exitoso. Redirigiendo al carrito...", "success");

  // Redirigimos después de 1 segundo
    setTimeout(() => {
    window.location.href = "carrito.html";
}, 1000);
}

// Finalizar compra y mostrar mensaje.
function finalizarCompra(event) {
    event.preventDefault();

    const direccion = document.getElementById("direccion").value.trim();
    const entreCalles = document.getElementById("entreCalles").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();

    if (!direccion || !entreCalles || !ciudad) {
        mostrarToast("Por favor completá todos los campos de envío.", "error");
        return;
}

    mostrarToast("¡Gracias por tu compra! En breve recibirás la confirmación.", "success");

  // Si querés, podés vaciar el carrito acá
  // carrito = [];
  // actualizarCarrito();
}