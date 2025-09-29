// Configuración del clima 
const API_CONFIG_WEATHER = {
    url: 'https://api.openweathermap.org/data/2.5',
    key: 'c831e41df74ea4750019d3dec89131b8'
};

const lat = -29.90591;
const lon = -71.25014;

async function obtenerClima() {
    try {
        console.log('🌤️ Iniciando request del clima...');
        const url = `${API_CONFIG_WEATHER.url}/weather?lat=${lat}&lon=${lon}&appid=${API_CONFIG_WEATHER.key}&units=metric&lang=es`;
        console.log('URL del clima:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            // Agregar timeout para evitar que se cuelgue
            signal: AbortSignal.timeout(10000) // 10 segundos
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Datos del clima recibidos:', data);
        return data;
    } catch (error) {
        console.error('❌ Error detallado al obtener el clima:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        
        // Mostrar error en la UI
        const elementoTemp = document.getElementById('clima-temperatura');
        const elementoDesc = document.getElementById('clima-descripcion');
        
        if (elementoTemp) elementoTemp.textContent = 'Error';
        if (elementoDesc) elementoDesc.textContent = `Error: ${error.message}`;
        
        return null;
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
    console.log('🌤️ Iniciando carga del clima...');
    
    // Verificar que los elementos DOM existan antes de hacer el request
    const elementos = ['clima-temperatura', 'clima-descripcion', 'clima-ubicacion', 'clima-icon'];
    const elementosExisten = elementos.every(id => {
        const elemento = document.getElementById(id);
        console.log(`Elemento ${id}:`, elemento ? '✅ Encontrado' : '❌ No encontrado');
        return elemento !== null;
    });
    
    if (!elementosExisten) {
        console.log('❌ Algunos elementos del clima no están disponibles aún');
        return;
    }

    const climaData = await obtenerClima();

    if (climaData && climaData.main && climaData.weather) {
        console.log('✅ Datos válidos recibidos, actualizando carta...');
        actualizarCartaClima(climaData);
    } else {
        console.log('❌ Error: No se pudieron obtener datos válidos del clima');
        // Mostrar mensaje de error en la UI
        const elementoDesc = document.getElementById('clima-descripcion');
        if (elementoDesc) {
            elementoDesc.textContent = 'Servicio de clima no disponible';
        }
    }
}


// Hacer la función disponible globalmente
window.cargarYMostrarClima = cargarYMostrarClima;

console.log('Weather.js cargado - función cargarYMostrarClima disponible globalmente');