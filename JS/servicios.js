// Seleccionamos el botón del carrito y el menú desplegable del carrito
const cartButton = document.querySelector('.cart-button');
const cartDropdown = document.querySelector('.dropdown-menu');
// Inicializamos el arreglo de items del carrito
let cartItems = [];
// Cargamos el carrito desde el almacenamiento local
loadCart();

// Función para cargar el carrito desde el almacenamiento local
function loadCart() {
    // Obtenemos los items del carrito almacenados en el almacenamiento local
    const storedCartItems = localStorage.getItem('cartItems');
    
    // Si hay items en el almacenamiento local, los cargamos en el arreglo de items del carrito
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
        
        // Actualizamos el carrito con los items cargados
        updateCart();
    }
}

// Función para agregar un item al carrito
function addToCart(precio, nombre, imagen) {
    // Si el menú desplegable del carrito solo tiene un item y es el mensaje de "Carrito Vacio!!", lo eliminamos
    if (cartDropdown.children.length === 1 && cartDropdown.children[0].innerText === 'Carrito Vacio!!') {
        cartDropdown.innerHTML = '';
    }
    
    // Generamos un id para el nuevo item
    let id = cartItems.length + 1;
    
    // Agregamos el nuevo item al arreglo de items del carrito
    cartItems.push({ id, precio, nombre, imagen });
    
    // Actualizamos el carrito con el nuevo item
    updateCart()
}

// Función para actualizar el carrito
function updateCart() {
    // Eliminamos todos los items del menú desplegable del carrito
    cartDropdown.innerHTML = '';
    
    // Si no hay items en el carrito, mostramos el mensaje de "Carrito Vacio!!"
    if (cartItems.length === 0) {
        cartDropdown.innerHTML = '<li>Carrito Vacio!!</li>';
    }
    
    // Recorremos cada item del carrito y lo agregamos al menú desplegable
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('dropdown-item');
        listItem.innerHTML = `
            <p>${item.id}</p>
            <img src="${item.imagen}" width="50px" height="50px" alt="imagen de producto">
            <p>${item.nombre}</p>
            <p>${item.precio}$</p>
            <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Eliminar</button>
            `;
        cartDropdown.appendChild(listItem);
    });
    
    // Calculamos el precio total del carrito
    let finalPrice = 0 
    cartItems.forEach(item => {
        finalPrice += item.precio;
    })
    
    // Creamos un item para mostrar el precio total y el botón de confirmar
    const finalItem = document.createElement('li');
    finalItem.classList.add('dropdown-item');
    finalItem.innerHTML = `
        <p>Total: ${finalPrice}</p>
        <button class="btn btn-primary" onclick="confirmOrder()">Confirmar</button>
    `;
    cartDropdown.appendChild(finalItem);
    
    // Almacenamos el carrito en el almacenamiento local
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
// Función para confirmar el pedido
function confirmOrder() {
    // Mostramos un mensaje de confirmación (en desarrollo)
    alert('En desarrollo :D');
}

// Función para eliminar un item del carrito
function removeFromCart(index) {
    // Eliminamos el item del arreglo de items del carrito
    cartItems = cartItems.filter(item => item.id !== index);
    
    // Actualizamos los ids de los items restantes
    cartItems.forEach((item, index) => {
        item.id = index + 1;
    });
    
    // Actualizamos el carrito
    updateCart();
}