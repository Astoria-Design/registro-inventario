const products = [];

// Cargar los productos de Google Sheets
function loadProducts() {
    google.script.run.withSuccessHandler(function(productsList) {
        productsList.forEach((product, index) => {
            addProductRow(product.name, product.unit, index);
        });
    }).getProductsFromSheet();
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
        fetch('https://script.google.com/macros/s/AKfycbwaBILDSSkt7StoIyCzwj02Hax_PsAv-5ss3jgtmQ98OjjseyPL2xHQAkw5IOmukSsnzg/exec', {
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
