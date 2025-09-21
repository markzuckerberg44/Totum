
function cargarYMostrarNoticias() {
  const API_KEY = "cae09348a8a6d79fed4bd63294db32ad";
  const url = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=es&country=cl&max=10`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById("contenedor");
      if (!contenedor) return;
      contenedor.innerHTML = "";
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
    });
}
window.cargarYMostrarNoticias = cargarYMostrarNoticias;