// Sistema de navegación simple para la SPA
class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
  }

  // Definir rutas y sus archivos correspondientes
  addRoute(path, templatePath) {
    this.routes[path] = templatePath;
  }

  // Cargar contenido de una página
  async loadPage(path) {
    if (!this.routes[path]) {
      console.error(`Ruta no encontrada: ${path}`);
      return;
    }

    try {
      const response = await fetch(this.routes[path]);
      const html = await response.text();
      const appContainer = document.getElementById('app');
      
      if (appContainer) {
        appContainer.innerHTML = html;
        this.currentPage = path;
        
        // Actualizar URL sin recargar la página
        window.history.pushState({ page: path }, '', `#${path}`);
        
        // Inicializar funcionalidades específicas de la página
        this.initPageSpecificFeatures(path);
        
        console.log(`Navegando a: ${path}`);
      }
    } catch (error) {
      console.error(`Error cargando la página ${path}:`, error);
    }
  }

  // Inicializar funcionalidades específicas según la página
  initPageSpecificFeatures(path) {
    // Esperar un poco para que el DOM se actualice
    setTimeout(() => {
      if (path === 'homepage') {
        // Inicializar menú hamburguesa para la página homepage
        if (window.AppUtils && window.AppUtils.initHamburgerMenu) {
          window.AppUtils.initHamburgerMenu();
        }
      }
    }, 50);
  }

  // Inicializar el router
  init() {
    // Definir todas las rutas
    this.addRoute('welcome', './pages/welcome.html');
    this.addRoute('homepage', './pages/homepage.html');
    this.addRoute('feature1', './pages/features/feature1.html');
    this.addRoute('feature2', './pages/features/feature2.html');
    this.addRoute('feature3', './pages/features/feature3.html');

    // Manejar el botón atrás del navegador
    window.addEventListener('popstate', (event) => {
      if (event.state && event.state.page) {
        this.loadPage(event.state.page);
      } else {
        this.loadPage('welcome');
      }
    });

    // Cargar página inicial basada en la URL o mostrar welcome
    const hash = window.location.hash.substring(1);
    const initialPage = hash && this.routes[hash] ? hash : 'welcome';
    this.loadPage(initialPage);
  }
}

// Función global para navegación (usada en los botones)
function navigateTo(page) {
  if (window.router) {
    window.router.loadPage(page);
  }
}

// Crear instancia global del router
window.router = new Router();
