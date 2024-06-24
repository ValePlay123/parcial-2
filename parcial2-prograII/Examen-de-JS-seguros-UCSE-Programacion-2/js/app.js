// 1. Al cargar el DOM, ejecutar las siguientes funciones
document.addEventListener('DOMContentLoaded', () => {
  // 2. Definir la ruta al archivo datos.json
  const rutaDatos = 'datos.json';

  // 3. Obtener referencias a los elementos del DOM (selectores de propiedad y ubicación, campo de metros cuadrados, y el span para el valor de la póliza)
  const tipoPropiedadSelect = document.getElementById('propiedad');
  const ubicacionSelect = document.getElementById('ubicacion');
  const metrosCuadradosInput = document.getElementById('metros2');
  const valorPolizaSpan = document.getElementById('valorPoliza');
  const cotizarButton = document.querySelector('.button-outline');

  // 4. Función para cargar opciones en los selectores desde el archivo datos.json
  fetch(rutaDatos)
    .then((response) => response.json())
    .then((data) => {
      // Recorrer los datos y añadir opciones a los selectores
      data.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.factor;
        option.textContent = item.tipo;

        if (item.categoria === 'propiedad') {
          tipoPropiedadSelect.appendChild(option);
        } else if (item.categoria === 'ubicacion') {
          ubicacionSelect.appendChild(option);
        }
      });
    })
    .catch((error) => {
      // Manejar errores en la carga de datos
      console.error('Error al cargar los datos:', error);
    });

  // 5. Función para calcular el precio estimado en tiempo real
  function calcularPrecioEstimado() {
    const factorTipoPropiedad = parseFloat(tipoPropiedadSelect.value);
    const factorUbicacion = parseFloat(ubicacionSelect.value);
    const metrosCuadrados = parseFloat(metrosCuadradosInput.value);
    const costoBaseMetroCuadrado = 1000; //costo base por metro cuadrado

    if (!isNaN(factorTipoPropiedad) && !isNaN(factorUbicacion) && !isNaN(metrosCuadrados)) {
      const precioEstimado = metrosCuadrados * costoBaseMetroCuadrado * factorTipoPropiedad * factorUbicacion;
      valorPolizaSpan.textContent = precioEstimado.toFixed(2);
    } else {
      valorPolizaSpan.textContent = '0.00';
    }
  }

  // 6. Añadir tres event listeners a los selectores y al campo de metros cuadrados para llamar a la función de cálculo de precio estimado cuando cambien sus valores
  tipoPropiedadSelect.addEventListener('change', calcularPrecioEstimado);
  ubicacionSelect.addEventListener('change', calcularPrecioEstimado);
  metrosCuadradosInput.addEventListener('input', calcularPrecioEstimado);

  // 7. Obtener referencia al botón de cotizar
  // Esto esta al principio

  // 8. Event listener para el botón de cotizar
  cotizarButton.addEventListener('click', () => {
    const tipoPropiedad = tipoPropiedadSelect.options[tipoPropiedadSelect.selectedIndex].text;
    const ubicacion = ubicacionSelect.options[ubicacionSelect.selectedIndex].text;
    const metrosCuadrados = metrosCuadradosInput.value;
    const precioEstimado = valorPolizaSpan.textContent;

    // Crear un objeto con la cotización incluyendo la fecha actual
    const cotizacion = {
      tipoPropiedad,
      ubicacion,
      metrosCuadrados,
      precioEstimado,
      fecha: new Date().toLocaleString()
    };

    // Obtener cotizaciones previas del localStorage
    const cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
    // Añadir la nueva cotización
    cotizaciones.push(cotizacion);
    // Guardar las cotizaciones en el localStorage
    localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));

    // Redirigir al usuario a historial.html
    window.location.href = 'historial.html';
  });
});