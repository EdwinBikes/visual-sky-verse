//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar
    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Make every service card open a portfolio-style detail modal.
    const services = [
        {
            title: 'Redes Sociales',
            intro: 'Estrategia, contenido y anuncios para hacer crecer tu marca',
            description: 'Creamos y gestionamos contenido para redes sociales: planificamos la comunicación, diseñamos piezas visuales, producimos publicaciones y optimizamos campañas para conectar con tu audiencia y generar resultados.',
            details: [
                ['Incluye', 'Estrategia de contenido, diseño de publicaciones, calendario editorial y gestión de comunidad'],
                ['Plataformas', 'Instagram, Facebook y TikTok']
            ]
        },
        {
            title: 'Creación de Contenido',
            intro: 'Videos y fotografías que cuentan la historia de tu marca',
            description: 'Producimos fotografías, reels y videos profesionales para mostrar tus productos, servicios o procesos de una manera atractiva y memorable.',
            details: [
                ['Incluye', 'Guion, grabación, edición y adaptación para redes sociales'],
                ['Formatos', 'Reels, historias, videos corporativos y fotografía']
            ]
        },
        {
            title: 'Diseño Web',
            intro: 'Sitios modernos, rápidos y pensados para convertir visitas en clientes',
            description: 'Diseñamos y desarrollamos páginas web personalizadas, responsivas y optimizadas para que tu empresa tenga una presencia digital profesional.',
            details: [
                ['Incluye', 'Diseño visual, desarrollo, adaptación móvil y publicación'],
                ['Tecnologías', 'HTML, CSS, JavaScript, React y Flutter Web']
            ]
        },
        {
            title: 'Branding Digital',
            intro: 'Una identidad visual coherente para destacar en internet',
            description: 'Construimos la identidad visual de tu marca para que se vea profesional y sea reconocible en redes sociales, sitios web y otros medios digitales.',
            details: [
                ['Incluye', 'Logotipo, paleta de colores, tipografías y estilo gráfico'],
                ['Aplicaciones', 'Redes sociales, piezas digitales y material corporativo']
            ]
        },
        {
            title: 'Drones FPV & Convencionales',
            intro: 'Perspectivas aéreas únicas para mostrar tus proyectos',
            description: 'Capturamos imágenes y videos aéreos de alto impacto para promocionar productos, eventos, espacios y proyectos inmobiliarios o automotrices.',
            details: [
                ['Incluye', 'Planeación de vuelo, grabación aérea y edición del material'],
                ['Ideal para', 'Inmobiliarias, automóviles, eventos y destinos turísticos']
            ]
        },
        {
            title: 'Cobertura de Eventos',
            intro: 'Los momentos importantes de tu evento, listos para compartir',
            description: 'Registramos eventos corporativos, lanzamientos, activaciones y shows con fotografía y video de alta calidad para redes sociales o comunicación interna.',
            details: [
                ['Incluye', 'Fotografía, video, edición y entrega de piezas para redes'],
                ['Eventos', 'Corporativos, culturales, comerciales y sociales']
            ]
        }
    ];

    const serviceCards = document.querySelectorAll('#services .row.text-center > [class*="col-"]');
    serviceCards.forEach((card, index) => {
        const service = services[index];
        if (!service) return;

        card.classList.add('service-card-clickable');
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Ver información sobre ${service.title}`);

        const openServiceModal = () => {
            const modalElement = document.getElementById(`serviceModal${index + 1}`);
            if (modalElement) bootstrap.Modal.getOrCreateInstance(modalElement).show();
        };

        card.addEventListener('click', openServiceModal);
        card.addEventListener('keydown', (keyboardEvent) => {
            if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                keyboardEvent.preventDefault();
                openServiceModal();
            }
        });

        const details = service.details.map(([label, value]) =>
            `<li><strong>${label}:</strong> ${value}</li>`
        ).join('');

        document.body.insertAdjacentHTML('beforeend', `
            <div class="portfolio-modal modal fade" id="serviceModal${index + 1}" tabindex="-1" aria-labelledby="serviceModal${index + 1}Title" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="close-modal" data-bs-dismiss="modal" aria-label="Cerrar ventana">
                            <img src="assets/img/close-icon.svg" alt="Cerrar modal" />
                        </div>
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-10">
                                    <div class="modal-body">
                                        <h2 class="text-uppercase" id="serviceModal${index + 1}Title">${service.title}</h2>
                                        <p class="item-intro text-muted">${service.intro}</p>
                                        <p>${service.description}</p>
                                        <ul class="list-inline">${details}</ul>
                                        <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                            <i class="fas fa-xmark me-1"></i>
                                            Cerrar Ventana
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });

    // Small visual cue that the service cards are interactive.
    const serviceCardStyle = document.createElement('style');
    serviceCardStyle.textContent = `
        .service-card-clickable { cursor: pointer; transition: transform .2s ease, opacity .2s ease; }
        .service-card-clickable:hover, .service-card-clickable:focus-visible { transform: translateY(-5px); opacity: .85; outline: none; }
    `;
    document.head.appendChild(serviceCardStyle);
});
