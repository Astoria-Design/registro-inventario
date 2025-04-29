// Cargar los productos desde Google Sheets
function loadProducts() {
    // Reemplaza 'URL_DE_TU_APLICACION_WEB' con la URL de tu aplicación web en Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbzdklG52OrjshZn_CNneoUf-xg1pIEmkjmKy4yqNmM02i9eCz7vV_9HN1gNHjC7Yhg9-g/exec', {
        method: 'GET'
    })
    .then(response => response.json())  // Convertir la respuesta a formato JSON
    .then(productsList => {
        // Iterar sobre los productos y agregarlos a la tabla
        productsList.forEach((product, index) => {
            addProductRow(product.name, product.unit, index);
        });
    })
    .catch(error => console.error('Error al cargar los productos:', error));
}

// Mostrar productos fijos en la tabla
function addProductRow(name, unit, index) {
    const tableBody = document.querySelector("#productTable tbody");
    const row = document.createElement("tr");

    // Descripción
    const productCell = document.createElement("td");
    productCell.textContent = name;
    row.appendChild(productCell);

    // Unidad
    const unitCell = document.createElement("td");
    unitCell.textContent = unit;
    row.appendChild(unitCell);

    // Campo de cantidad
    const quantityCell = document.createElement("td");
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.id = "quantity-" + index;
    quantityInput.min = 0;
    quantityCell.appendChild(quantityInput);
    row.appendChild(quantityCell);

    // Agregar fila a la tabla
    tableBody.appendChild(row);
}

// Función para enviar los datos a Google Sheets
function submitData() {
    const data = [];
    const today = new Date().toLocaleDateString(); // Fecha de hoy

    // Obtener las cantidades de los productos
    products.forEach((product, index) => {
        const quantity = document.getElementById("quantity-" + index).value;
        if (quantity > 0) {
            data.push({
                name: product.name,
                unit: product.unit,
                quantity: quantity,
                date: today
            });
        }
    });

    if (data.length > 0) {
        // Llamada AJAX para enviar los datos al backend de Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbzdklG52OrjshZn_CNneoUf-xg1pIEmkjmKy4yqNmM02i9eCz7vV_9HN1gNHjC7Yhg9-g/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos enviados correctamente:', data);
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert("Por favor ingrese cantidades para al menos un producto.");
    }
}

// Cargar los productos cuando se cargue la página
window.onload = loadProducts;
