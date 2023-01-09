const urlMonedas = `https://mindicador.cl/api`;
const filtrarMonedas = ['dolar', 'euro', 'uf']
const producto = document.getElementById('result')
const tipoCambio = document.getElementById('coin');
const boton = document.getElementById('btnConvert');

const obtenerValores = async () => {
    const pedirMonedas = await fetch(urlMonedas);
    const datos = await pedirMonedas.json();

    const listadoMonedas = filtrarMonedas.map((moneda) => {
        return {
            code: datos[moneda].codigo,
            valor: datos[moneda].valor,
        };
    });
    
    // Agrego options al elemento select 
    listadoMonedas.forEach((monedaLocal) => {
        const option = document.createElement('option')
        option.value = monedaLocal.valor;
        option.text = monedaLocal.code.toUpperCase();
        tipoCambio.appendChild(option);
    });
};

// Calculo el producto 
const calcular = (cantidad, moneda) => {
    producto.innerHTML = `Resultado: $${(cantidad / moneda).toFixed(2)}`;
};


boton.addEventListener('click', () => {
    const pesosClp = document.getElementById('pesos').value;
    if (pesosClp === '') {
        alert('Debe indicar un valor en pesos')
        return;
    }
    const monedaSeleccionada = document.querySelector('#coin').value;
    calcular (pesosClp, monedaSeleccionada)
})

obtenerValores();


