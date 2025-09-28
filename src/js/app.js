// Archivo principal de la aplicación
document.addEventListener('DOMContentLoaded', function() {
  console.log('TOTUM App iniciada');
  
  // Inicializar el router
  if (window.router) {
    window.router.init();
  }

  // Funciones utilitarias globales
  window.AppUtils = {
    // Mostrar notificaciones (puedes expandir esto)
    showNotification: function(message, type = 'info') {
      console.log(`${type.toUpperCase()}: ${message}`);
      // Aquí podrías agregar un sistema de toast/notificaciones
    },

    // Formatear fechas
    formatDate: function(date) {
      return new Date(date).toLocaleDateString('es-ES');
    },

    // Validar formularios
    validateForm: function(formElement) {
      // Lógica básica de validación
      const inputs = formElement.querySelectorAll('input[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('border-red-500');
        } else {
          input.classList.remove('border-red-500');
        }
      });
      
      return isValid;
    },

    // Inicializar menú hamburguesa - MOBILE FIRST
    initHamburgerMenu: function() {
      const btn = document.getElementById('menuBtn');
      const menu = document.getElementById('menu');
      
      if (btn && menu) {
        // Remover event listeners anteriores
        btn.replaceWith(btn.cloneNode(true));
        const newBtn = document.getElementById('menuBtn');
        
        // Función para cerrar el menú - MOBILE FIRST
        const closeMenu = () => {
          menu.classList.add('hidden');
          menu.classList.remove('active');
          newBtn.setAttribute('aria-expanded', 'false');
          
          // Resetear animación del botón hamburguesa
          const spans = newBtn.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        };
        
        // Función para abrir el menú - MOBILE FIRST
        const openMenu = () => {
          menu.classList.remove('hidden');
          menu.classList.add('active');
          newBtn.setAttribute('aria-expanded', 'true');
          
          // Animación del botón hamburguesa a X
          const spans = newBtn.querySelectorAll('span');
          spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        };
        
        // Toggle del menú al hacer clic en el botón
        newBtn.addEventListener('click', function(e) {
          e.stopPropagation(); // Evitar que se propague al document
          
          const isHidden = menu.classList.contains('hidden');
          if (isHidden) {
            openMenu();
          } else {
            closeMenu();
          }
        });
        
        // Cerrar menú al hacer clic en enlaces de navegación
        const navLinks = menu.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            closeMenu();
          });
        });
        
        // Cerrar menú al hacer clic fuera (para móviles)
        document.addEventListener('click', function(e) {
          const isClickInsideMenu = menu.contains(e.target);
          const isClickOnButton = newBtn.contains(e.target);
          
          // Si el clic no es dentro del menú ni en el botón, cerrar el menú
          if (!isClickInsideMenu && !isClickOnButton && !menu.classList.contains('hidden')) {
            closeMenu();
          }
        });
        
        // Cerrar menú al hacer touch fuera (específico para móviles)
        document.addEventListener('touchstart', function(e) {
          const isClickInsideMenu = menu.contains(e.target);
          const isClickOnButton = newBtn.contains(e.target);
          
          if (!isClickInsideMenu && !isClickOnButton && !menu.classList.contains('hidden')) {
            closeMenu();
          }
        });
        
        // Cerrar menú con la tecla Escape
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
            closeMenu();
          }
        });
        
        console.log('Menú hamburguesa Mobile First inicializado correctamente');
      } else {
        console.log('Elementos del menú no encontrados');
      }
    }
  };

  // Event listeners globales
  document.addEventListener('click', function(e) {
    // Manejar clics en elementos con data-navigate
    if (e.target.dataset.navigate) {
      e.preventDefault();
      navigateTo(e.target.dataset.navigate);
    }
  });

  // Configuración inicial
  const appConfig = {
    name: 'TOTUM',
    version: '1.0.0',
    theme: localStorage.getItem('theme') || 'light'
  };

  // Aplicar tema guardado
  if (appConfig.theme === 'dark') {
    document.body.classList.add('dark');
  }

  document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("facto")) {
    mostrarDato();
  }
  });

  console.log(`${appConfig.name} v${appConfig.version} cargado correctamente`);
});
