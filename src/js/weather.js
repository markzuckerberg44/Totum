import { API_CONFIG } from './config.js';

const lat = -29.90591;
const lon = -71.25014;
const apiKey = API_CONFIG.weather.key;


async function obtenerClima() {
    try {
        const response = await fetch(
            `${API_CONFIG.weather.url}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`
        );

        const data = await response.json();
        console.log('Datos del clima:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener el clima:', error);
    }
}