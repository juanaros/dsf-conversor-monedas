const urlMonedas = `https://mindicador.cl/api`;
const filtrarMonedas = ['dolar', 'euro', 'uf','utm']
const producto = document.getElementById('result')
const tipoCambio = document.querySelector('#coin');
const boton = document.getElementById('btnConvert');

const obtenerValores = async () => {
    try {
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
            option.text = monedaLocal.code;
            tipoCambio.appendChild(option);
        });
    } catch (error) {
        alert('error al obtener las divisas')
    }
};

// Calculo el producto
const calcular = (cantidad, moneda) => {
    producto.innerHTML = `Resultado: $${(cantidad / moneda).toFixed(2)}`;
};

// Creando el grafico
const dibujarGrafico = async (currency) => {
    try {
        const pedirGrafico = await fetch(`${urlMonedas}/${currency}`)
        const datosGrafico = await pedirGrafico.json()

        const serieGrafico = datosGrafico.serie.slice(0, 10)
        console.log(serieGrafico)
        const data = {
            labels: serieGrafico.map((item) => item.fecha.substring(0, 10)),
            datasets: [
                {
                    label: currency,
                    data: serieGrafico.map((item) => item.valor),
                    fill: false,
                    borderColor: 'rgb(204, 0, 0)',
                    tension: 0.1,
                }
            ]
        };
        const config = {type: 'line', data: data,};
        const chartDOM = document.getElementById('graph');
        chartDOM.classList.remove('d-none')
        new Chart(chartDOM, config);
    } catch (error) {
        alert('error al graficar')
    }
};

// Muestro resultado y grafico
boton.addEventListener('click', () => {
    const pesosClp = document.getElementById('pesos').value;
    if (pesosClp === '') {
        alert('Debe indicar un valor en pesos')
        return;
    }
    const optionText = tipoCambio.options[tipoCambio.selectedIndex].text
    calcular(pesosClp, tipoCambio.value);
    dibujarGrafico(optionText);
});
obtenerValores();


