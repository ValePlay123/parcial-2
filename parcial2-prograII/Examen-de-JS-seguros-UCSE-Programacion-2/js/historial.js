// 1. Al cargar el DOM, ejecutar las siguientes funciones
document.addEventListener('DOMContentLoaded', () => {

    // 2. Leer las cotizaciones guardadas en el localStorage y parsearlas a un array de objetos
    const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
  
    // 3. Obtener referencia al cuerpo de la tabla (elemento tbody)
    const tbody = document.querySelector('tbody');
    
    // Limpiar cualquier contenido anterior de la tabla
    tbody.innerHTML = '';
  
    // 4. Recorrer las cotizaciones y añadirlas a la tabla
    cotizaciones.forEach((cotizacion) => {
      // a. Crear una fila para cada cotización
      const fila = document.createElement('tr');
      
      // b. Añadir celdas a la fila con los datos de la cotización (fecha, propiedad, ubicación, metros cuadrados, póliza mensual)
      const celdaFecha = document.createElement('td');
      celdaFecha.textContent = cotizacion.fecha;
  
      const celdaPropiedad = document.createElement('td');
      celdaPropiedad.textContent = cotizacion.tipoPropiedad;
  
      const celdaUbicacion = document.createElement('td');
      celdaUbicacion.textContent = cotizacion.ubicacion;
  
      const celdaMetros = document.createElement('td');
      celdaMetros.textContent = cotizacion.metrosCuadrados;
  
      const celdaPoliza = document.createElement('td');
      celdaPoliza.textContent = cotizacion.precioEstimado;
  
      // Añadir las celdas a la fila
      fila.appendChild(celdaFecha);
      fila.appendChild(celdaPropiedad);
      fila.appendChild(celdaUbicacion);
      fila.appendChild(celdaMetros);
      fila.appendChild(celdaPoliza);
  
      // c. Añadir la fila al tbody
      tbody.appendChild(fila);
    });
  
    // 5. Obtener referencia al botón de limpiar historial
    const clearButton = document.getElementById('clearHistorial');
  
    // 6. Event listener para el botón de limpiar historial
    clearButton.addEventListener('click', () => {
      // a. Limpiar el localStorage
      localStorage.removeItem('cotizaciones');
      
      // b. Limpiar el contenido del tbody (eliminar todas las filas)
      tbody.innerHTML = '';
    });
  });
