// Configuración del clima 
const API_CONFIG_WEATHER = {
    url: 'https://api.openweathermap.org/data/2.5',
    key: 'c831e41df74ea4750019d3dec89131b8'
};

const lat = -29.90591;
const lon = -71.25014;

async function obtenerClima() {
    try {
        const response = await fetch(
            `${API_CONFIG_WEATHER.url}/weather?lat=${lat}&lon=${lon}&appid=${API_CONFIG_WEATHER.key}&units=metric&lang=es`
        );

        const data = await response.json();
        console.log('Datos del clima:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener el clima:', error);
    }
}

function actualizarCartaClima(data) {
    console.log('Actualizando elementos HTML...');

    const elementoTemp = document.getElementById('clima-temperatura');
    if (elementoTemp) {
        elementoTemp.textContent = `${Math.round(data.main.temp)}°C`;
        console.log('Temperatura actualizada:', elementoTemp.textContent);
    } else {
        console.log('Elemento clima-temperatura no encontrado');
    }

    const elementoDesc = document.getElementById('clima-descripcion');
    if (elementoDesc) {
        elementoDesc.textContent = data.weather[0].description;
        console.log('Descripción actualizada:', elementoDesc.textContent);
    } else {
        console.log('Elemento clima-descripcion no encontrado');
    }

    const elementoUbicacion = document.getElementById('clima-ubicacion');
    if (elementoUbicacion) {
        elementoUbicacion.textContent = `${data.name}, Chile`;
        console.log('Ubicación actualizada:', elementoUbicacion.textContent);
    } else {
        console.log('Elemento clima-ubicacion no encontrado');
    }

    const elementoIcono = document.getElementById('clima-icon');
    if (elementoIcono) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        console.log('Código de ícono del clima:', iconCode);
        console.log('URL del ícono:', iconUrl);
        
        elementoIcono.innerHTML = `
            <img src="${iconUrl}" 
                 alt="${data.weather[0].description}" 
                 class="w-20 h-20 object-contain"
                 onerror="console.log('Error cargando ícono:', this.src)">
        `;
        
        console.log('✅ Ícono dinámico cargado');
    } else {
        console.log('❌ Elemento clima-icon no encontrado');
    }

    console.log('Carta de clima actualizada completamente');

}
async function cargarYMostrarClima() {
    console.log('Iniciando carga del clima...');

    const climaData = await obtenerClima();

    if (climaData) {
        console.log('Datos recibidos, actualizando carta...');
        actualizarCartaClima(climaData);
    } else {
        console.log('Error: No se pudieron obtener datos del clima');
    }
}


// Hacer la función disponible globalmente
window.cargarYMostrarClima = cargarYMostrarClima;

console.log('Weather.js cargado - función cargarYMostrarClima disponible globalmente');