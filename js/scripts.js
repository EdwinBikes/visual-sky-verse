//
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    const navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

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

    const portfolioProjects = {
        1: {
            images: ['assets/img/portfolio/1.jpg'],
            videos: [],
            links: []
        },
        2: {
            images: ['assets/img/portfolio/2.jpg'],
            videos: [],
            links: []
        },
        3: {
            images: ['assets/img/portfolio/3.jpg'],
            videos: [
                'https://www.instagram.com/p/C3A-GePuWY-/',
                'https://www.instagram.com/p/DP7bpvAAdde/'
            ],
            links: []
        },
        4: {
            images: ['assets/img/portfolio/4.jpg'],
            videos: [],
            links: []
        },
        5: {
            images: ['assets/img/portfolio/5.jpg'],
            videos: [],
            links: []
        },
        6: {
            images: ['assets/img/portfolio/6.jpg'],
            videos: [],
            links: [
                'https://www.instagram.com/p/DQvF2Hskc-Z/?img_index=1',
                'https://www.instagram.com/p/DXMt2IYDkj9/?img_index=1'
            ]
        }
    };

    const createCarousel = (images, modalNumber) => {
        if (!images.length) return '';

        const slides = images.map((image, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${image}" class="d-block w-100 portfolio-carousel-image" alt="Proyecto ${modalNumber} - imagen ${index + 1}" loading="lazy">
            </div>
        `).join('');

        return `
            <div id="portfolioCarousel${modalNumber}" class="carousel slide portfolio-carousel mb-4" data-bs-ride="carousel" aria-label="Galería del proyecto">
                <div class="carousel-inner">
                    ${slides}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#portfolioCarousel${modalNumber}" data-bs-slide="prev" aria-label="Anterior">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#portfolioCarousel${modalNumber}" data-bs-slide="next" aria-label="Siguiente">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        `;
    };

    const createVideoLinks = (videos) => {
        if (!videos.length) return '';
        return `
            <div class="portfolio-videos text-start mb-4">
                <h4 class="mb-3">Videos realizados</h4>
                <div class="list-group">
                    ${videos.map((video, index) => `
                        <a class="list-group-item list-group-item-action" href="${video}" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-play-circle me-2"></i>Ver video ${index + 1}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    };

    const createExternalLinks = (links, label) => {
        if (!links.length) return '';
        return `
            <div class="portfolio-links text-start mb-4">
                <h4 class="mb-3">${label}</h4>
                <div class="list-group">
                    ${links.map((link, index) => `
                        <a class="list-group-item list-group-item-action" href="${link}" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-link me-2"></i>${label} ${index + 1}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    };

    Object.entries(portfolioProjects).forEach(([modalNumber, project]) => {
        const modal = document.getElementById(`portfolioModal${modalNumber}`);
        if (!modal) return;

        const modalBody = modal.querySelector('.modal-body');
        if (!modalBody) return;

        const originalImage = modalBody.querySelector(':scope > img');
        if (originalImage) originalImage.remove();

        const intro = modalBody.querySelector('.item-intro');
        const gallery = createCarousel(project.images, modalNumber);
        const videos = createVideoLinks(project.videos);
        const links = createExternalLinks(project.links, project.videos.length ? 'Más contenidos' : 'Fotos de referencia');
        if (intro) intro.insertAdjacentHTML('afterend', gallery + videos + links);
        else modalBody.insertAdjacentHTML('afterbegin', gallery + videos + links);
    });

    const services = [
        {
            title: 'Redes Sociales',
            intro: 'Estrategia, contenido y anuncios para hacer crecer tu marca',
            description: 'Creamos y gestionamos contenido para redes sociales: planificamos la comunicación, diseñamos piezas visuales, producimos publicaciones y optimizamos campañas para conectar con tu audiencia y generar resultados.',
            details: [['Incluye', 'Estrategia de contenido, diseño de publicaciones, calendario editorial y gestión de comunidad'], ['Plataformas', 'Instagram, Facebook y TikTok']]
        },
        {
            title: 'Creación de Contenido',
            intro: 'Videos y fotografías que cuentan la historia de tu marca',
            description: 'Producimos fotografías, reels y videos profesionales para mostrar tus productos, servicios o procesos de una manera atractiva y memorable.',
            details: [['Incluye', 'Guion, grabación, edición y adaptación para redes sociales'], ['Formatos', 'Reels, historias, videos corporativos y fotografía']]
        },
        {
            title: 'Diseño Web',
            intro: 'Sitios modernos, rápidos y pensados para convertir visitas en clientes',
            description: 'Diseñamos y desarrollamos páginas web personalizadas, responsivas y optimizadas para que tu empresa tenga una presencia digital profesional.',
            details: [['Incluye', 'Diseño visual, desarrollo, adaptación móvil y publicación'], ['Tecnologías', 'HTML, CSS, JavaScript, React y Flutter Web']]
        },
        {
            title: 'Branding Digital',
            intro: 'Una identidad visual coherente para destacar en internet',
            description: 'Construimos la identidad visual de tu marca para que se vea profesional y sea reconocible en redes sociales, sitios web y otros medios digitales.',
            details: [['Incluye', 'Logotipo, paleta de colores, tipografías y estilo gráfico'], ['Aplicaciones', 'Redes sociales, piezas digitales y material corporativo']]
        },
        {
            title: 'Drones FPV & Convencionales',
            intro: 'Perspectivas aéreas únicas para mostrar tus proyectos',
            description: 'Capturamos imágenes y videos aéreos de alto impacto para promocionar productos, eventos, espacios y proyectos inmobiliarios o automotrices.',
            details: [['Incluye', 'Planeación de vuelo, grabación aérea y edición del material'], ['Ideal para', 'Inmobiliarias, automóviles, eventos y destinos turísticos']]
        },
        {
            title: 'Cobertura de Eventos',
            intro: 'Los momentos importantes de tu evento, listos para compartir',
            description: 'Registramos eventos corporativos, lanzamientos, activaciones y shows con fotografía y video de alta calidad para redes sociales o comunicación interna.',
            details: [['Incluye', 'Fotografía, video, edición y entrega de piezas para redes'], ['Eventos', 'Corporativos, culturales, comerciales y sociales']]
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
        card.addEventListener('keydown', keyboardEvent => {
            if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
                keyboardEvent.preventDefault();
                openServiceModal();
            }
        });

        const details = service.details.map(([label, value]) => `<li><strong>${label}:</strong> ${value}</li>`).join('');
        document.body.insertAdjacentHTML('beforeend', `
            <div class="portfolio-modal modal fade" id="serviceModal${index + 1}" tabindex="-1" aria-labelledby="serviceModal${index + 1}Title" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered"><div class="modal-content custom-service-modal">
                    <div class="close-modal" data-bs-dismiss="modal" aria-label="Cerrar ventana"><img src="assets/img/close-icon.svg" alt="Cerrar modal" /></div>
                    <div class="container"><div class="row justify-content-center"><div class="col-lg-10"><div class="modal-body">
                        <h2 class="text-uppercase" id="serviceModal${index + 1}Title">${service.title}</h2>
                        <p class="item-intro text-muted">${service.intro}</p><p>${service.description}</p>
                        <ul class="list-inline">${details}</ul>
                        <button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button"><i class="fas fa-xmark me-1"></i>Cerrar Ventana</button>
                    </div></div></div></div>
                </div></div>
            </div>
        `);
    });

    const cardStyle = document.createElement('style');
    cardStyle.textContent = `
        .service-card-clickable { cursor: pointer; transition: transform .2s ease, opacity .2s ease; }
        .service-card-clickable:hover, .service-card-clickable:focus-visible { transform: translateY(-5px); opacity: .85; outline: none; }
        .portfolio-carousel { border-radius: 18px; overflow: hidden; border: 1px solid rgba(255,255,255,.12); box-shadow: 0 12px 30px rgba(17, 24, 39, 0.18); }
        .portfolio-carousel-image { width: 100%; height: 340px; object-fit: cover; }
        .portfolio-videos .list-group-item, .portfolio-links .list-group-item { text-align: left; }
        .portfolio-modal .modal-content { border: none; border-radius: 24px; }
        .portfolio-modal .modal-body { padding: 2rem 1.5rem 1.5rem; }
        .custom-service-modal { background: linear-gradient(180deg, #fff 0%, #fffaf0 100%); }
        .portfolio-modal .carousel-control-prev, .portfolio-modal .carousel-control-next { width: 52px; } 
        .portfolio-modal .carousel-control-prev-icon, .portfolio-modal .carousel-control-next-icon { filter: drop-shadow(0 2px 10px rgba(0,0,0,.35)); }
    `;
    document.head.appendChild(cardStyle);
});
