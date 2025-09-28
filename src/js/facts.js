const API_CONFIG_FACTS = {
  random: "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en",
  today: "https://uselessfacts.jsph.pl/api/v2/facts/today?language=en"
};

async function obtenerDatoRandom() {
  const res = await fetch(API_CONFIG_FACTS.random);
  return await res.json();
}

async function obtenerDatoDelDia() {
  const res = await fetch(API_CONFIG_FACTS.today);
  return await res.json();
}

async function loadFact() {
  try {
    const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
    const data = await response.json();

    // Inserta el fact en el elemento <p>
    document.getElementById("fact-text").textContent = data.text;
  } catch (error) {
    console.error("Error cargando fact:", error);
    document.getElementById("fact-text").textContent = "No se pudo cargar un fact";
  }
}

async function mostrarDato() {
  const fact = await obtenerDatoRandom();
  document.getElementById("facto").textContent = fact.text;
}


async function mostrarDatosLista() {
  const lista = document.getElementById("lista-facts");
  lista.innerHTML = "";

  const datos = [];
  for (let i = 0; i < 5; i++) {
    const f = await obtenerDatoRandom();
    datos.push(f);
  }
  window.factsData = datos;
  renderizarFacts(datos);
}

function renderizarFacts(datos) {
  const lista = document.getElementById("lista-facts");
  lista.innerHTML = "";
  datos.forEach(f => {
    const li = document.createElement("li");
    li.className = "p-2 border-b border-gray-600";
    li.textContent = f.text;
    lista.appendChild(li);
  });
}

function ordenarFacts() {
  const datosOrdenados = [...window.factsData].sort((a, b) => 
    a.text.localeCompare(b.text)
  );
  renderizarFacts(datosOrdenados);
}

async function mostrarSoloDatoDelDia() {
  const fact = await obtenerDatoDelDia();
  renderizarFacts([fact]);
}


window.mostrarDato = mostrarDato;
window.mostrarDatosLista = mostrarDatosLista;
window.ordenarFacts = ordenarFacts;
window.mostrarSoloDatoDelDia = mostrarSoloDatoDelDia;