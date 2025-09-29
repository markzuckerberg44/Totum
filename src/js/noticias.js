
function cargarYMostrarNoticias() {
  const API_KEY = "cae09348a8a6d79fed4bd63294db32ad";
  const url = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=es&country=cl&max=10`;

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log("Respuesta de la API:", data); // Debug
      
      const contenedor = document.getElementById("contenedor");
      if (!contenedor) return;
      
      contenedor.innerHTML = "";
      
      // Verificar si hay errores en la respuesta de la API
      if (data.errors && data.errors.length > 0) {
        console.error("Errores de la API:", data.errors);
        contenedor.innerHTML = `<div class="text-red-400 p-4">Error de API: ${data.errors[0]}</div>`;
        return;
      }
      
      // Verificar si existen artículos
      if (!data.articles || !Array.isArray(data.articles) || data.articles.length === 0) {
        contenedor.innerHTML = `<div class="text-gray-400 p-4">No se encontraron noticias disponibles.</div>`;
        return;
      }
      
      data.articles.forEach(noticia => {
        const div = document.createElement("div");
        div.className = "bg-[#1E1E1E] rounded-lg shadow-lg p-6 mb-4 flex flex-col justify-between h-full noticia border border-[#444444]";
        div.innerHTML = `
          <h2 class="text-lg font-bold mb-2 text-[#8DD1FA] drop-shadow">${noticia.title}</h2>
          <p class="text-sm text-gray-200 mb-4 leading-relaxed">${noticia.description || "Sin descripción"}</p>
          <a href="${noticia.url}" target="_blank" class="inline-block px-3 py-1 bg-[#8DD1FA] text-[#12191D] rounded font-medium shadow hover:bg-[#5bb6e6] transition-colors text-sm">Leer más</a>
        `;
        contenedor.appendChild(div);
      });
    })
    .catch(error => {
      console.error("Error al obtener noticias:", error);
      const contenedor = document.getElementById("contenedor");
      if (contenedor) {
        let mensajeError;
        if (error.message.includes('403')) {
          mensajeError = 'Límite de requests de noticias alcanzado. Intenta más tarde.';
        } else if (error.message.includes('401')) {
          mensajeError = 'Error de autenticación con el servicio de noticias.';
        } else if (error.message.includes('429')) {
          mensajeError = 'Demasiadas solicitudes. Espera un momento.';
        } else if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503')) {
          mensajeError = 'Servicio de noticias temporalmente no disponible.';
        } else {
          mensajeError = 'No se pudieron cargar las noticias.';
        }
        contenedor.innerHTML = `<div class="text-red-400 p-4">${mensajeError}</div>`;
      }
    });
}
window.cargarYMostrarNoticias = cargarYMostrarNoticias;

// Función para cargar solo la primera noticia en el homepage
function cargarPrimeraNoticia() {
  const API_KEY = "cae09348a8a6d79fed4bd63294db32ad";
  const url = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=es&country=cl&max=1`;

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log("Respuesta API homepage:", data); // Debug
      
      // Verificar errores de la API
      if (data.errors && data.errors.length > 0) {
        console.error("Errores de la API:", data.errors);
        throw new Error(data.errors[0]);
      }
      
      // Verificar si existen artículos
      if (data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
        const noticia = data.articles[0];
        
        // Actualizar elementos de la carta de noticias
        const titulo = document.getElementById("noticia-titulo");
        const descripcion = document.getElementById("noticia-descripcion");
        const fuente = document.getElementById("noticia-fuente");
        
        if (titulo) titulo.textContent = noticia.title || "Sin título";
        if (descripcion) {
          const desc = noticia.description || "Sin descripción disponible";
          descripcion.textContent = desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
        }
        if (fuente) fuente.textContent = (noticia.source && noticia.source.name) || "Fuente desconocida";
      } else {
        throw new Error("No se encontraron noticias disponibles");
      }
    })
    .catch(error => {
      console.error("Error al obtener primera noticia:", error);
      const titulo = document.getElementById("noticia-titulo");
      const descripcion = document.getElementById("noticia-descripcion");
      const fuente = document.getElementById("noticia-fuente");
      
      if (titulo) titulo.textContent = "Error al cargar noticia";
      
      if (descripcion) {
        let mensajeError;
        if (error.message.includes('403')) {
          mensajeError = 'Límite de requests alcanzado. Intenta más tarde.';
        } else if (error.message.includes('401')) {
          mensajeError = 'Error de autenticación del servicio.';
        } else if (error.message.includes('429')) {
          mensajeError = 'Demasiadas solicitudes, espera un momento.';
        } else if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503')) {
          mensajeError = 'Servicio temporalmente no disponible.';
        } else {
          mensajeError = 'No se pudo conectar con el servicio.';
        }
        descripcion.textContent = mensajeError;
      }
      
      if (fuente) fuente.textContent = "Servicio no disponible";
    });
}

window.cargarPrimeraNoticia = cargarPrimeraNoticia;