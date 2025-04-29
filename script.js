// Cargar los productos desde Google Sheets
function loadProducts() {
    // Reemplaza 'URL_DE_TU_APLICACION_WEB' con la URL de tu aplicación web en Google Apps Script
    fetch('https://script.google.com/macros/s/your_script_id/exec', {
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

// Cargar los productos cuando se cargue la página
window.onload = loadProducts;
