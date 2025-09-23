// Objeto para manejar la NASA API
const NasaAPI = {
    async fetchAPOD(date = '') {
        const apiKey = 'Hr7EEdknMLRgwgv1gaerWz01sFtdyL8T1vL9IYoZ'; // Clave API con permisos de uso
        let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&thumbs=true`;
        if (date) url += `&date=${date}`;

        // Obtener elementos DOM
        const loading = document.getElementById('apod-loading');
        const errorEl = document.getElementById('apod-error');
        const image = document.getElementById('apod-image');
        const title = document.getElementById('apod-title');
        const explanation = document.getElementById('apod-explanation');

        // Validar elementos
        if (!loading || !errorEl || !image || !title || !explanation) {
            console.error('Elementos DOM no encontrados:', { loading, errorEl, image, title, explanation });
            return;
        }

        // Mostrar spinner
        loading.classList.remove('hidden');
        errorEl.classList.add('hidden');
        image.src = '';

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const data = await response.json();

            // Manejar imagen o video
            image.src = data.media_type === 'video' && data.thumbnail_url ? data.thumbnail_url : data.url;
            image.alt = data.title;
            title.textContent = data.title;
            explanation.textContent = data.explanation;
            return data; // Devolver datos para el resumen
        } catch (err) {
            console.error('Error fetching APOD:', err);
            errorEl.classList.remove('hidden');
            errorEl.textContent = `Error: ${err.message}`;
        } finally {
            loading.classList.add('hidden');
        }
    },

    async loadApodSummary() {
        console.log('Cargando resumen APOD');
        const summaryDiv = document.getElementById('apod-summary');
        if (!summaryDiv) {
            console.error('Elemento apod-summary no encontrado');
            return;
        }
        const data = await this.fetchAPOD();
        if (data) {
            summaryDiv.innerHTML = `
                <div class="bg-[#1E1E1E] rounded-lg p-4 border border-gray-600 cursor-pointer">
                    <h3 class="text-lg font-semibold text-white mb-2">${data.title}</h3>
                    <img src="${data.media_type === 'video' && data.thumbnail_url ? data.thumbnail_url : data.url}" class="w-full h-auto rounded-lg mb-2 object-contain mx-auto" style="max-width: 900px; width: 100%; height: auto; display: block; margin-left: auto; margin-right: auto;" alt="${data.title}">
                    <p class="text-gray-300">${data.explanation.slice(0, 100)}...</p>
                </div>
            `;
            summaryDiv.addEventListener('click', showApodDetail);
            summaryDiv.style.cursor = 'pointer';
        }
    }
};

// Funciones de navegación interna
function showApodDetail() {
    console.log('Mostrando detalle APOD');
    const summaryDiv = document.getElementById('apod-summary');
    const detailDiv = document.getElementById('apod-detail');
    
    if (summaryDiv && detailDiv) {
        summaryDiv.classList.add('hidden');
        detailDiv.classList.remove('hidden');
    } else {
        console.error('Elementos no encontrados:', { summaryDiv, detailDiv });
    }
}

function hideApodDetail() {
    console.log('Ocultando detalle APOD');
    const summaryDiv = document.getElementById('apod-summary');
    const detailDiv = document.getElementById('apod-detail');
    
    if (summaryDiv && detailDiv) {
        summaryDiv.classList.remove('hidden');
        detailDiv.classList.add('hidden');
    } else {
        console.error('Elementos no encontrados:', { summaryDiv, detailDiv });
    }
}

// La navegación y el menú hamburguesa se gestionan globalmente desde AppUtils y Router

// Hacer funciones globales
window.NasaAPI = NasaAPI;
window.showApodDetail = showApodDetail;
window.hideApodDetail = hideApodDetail;

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página NASA cargada');
    NasaAPI.loadApodSummary();
});