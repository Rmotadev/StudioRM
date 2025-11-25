// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Sticky Header on Scroll
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = [];

// Portfolio items com imagens locais
const portfolioData = [
    { id: 12, category: 'cortes', image: './assets/3.jpeg' },
    { id: 1, category: 'cortes', image: './assets/1.jpeg' },
    { id: 5, category: 'cortes', image: './assets/6.jpeg' },
    { id: 3, category: 'cortes', image: './assets/4.jpeg' },
    { id: 2, category: 'maquiagem', image: './assets/8.jpeg' },
    { id: 11, category: 'cortes', image: './assets/2.jpeg' },
    { id: 8, category: 'cortes', image: './assets/7.jpeg' },
    { id: 6, category: 'cortes', image: './assets/9.jpeg' },
    { id: 9, category: 'cortes', image: './assets/5.jpeg' },
    { id: 4, category: 'unhas', image: './assets/11.jpeg' },
    { id: 7, category: 'unhas', image: './assets/10.jpeg' },
    { id: 10, category: 'unhas', image: './assets/12.jpeg' },
];

// Initialize portfolio grid
function initPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    portfolioData.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = `portfolio-item ${item.category}`;
        portfolioItem.dataset.category = item.category;
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="Portfolio ${index + 1}" class="portfolio-img">
            <div class="portfolio-overlay">
                <h3>${getCategoryName(item.category)} ${index + 1}</h3>
                <p>${getCategoryDescription(item.category)}</p>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
        portfolioItems.push(portfolioItem);
        
        // Add click event for lightbox
        portfolioItem.addEventListener('click', () => {
            openLightbox(item.image, `Portfolio ${index + 1}`, getCategoryName(item.category));
        });
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'todos' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function getCategoryName(category) {
    const names = {
        'cortes': 'Corte',
        'maquiagem': 'Maquiagem',
        'noivas': 'Noiva',
        'unhas': 'Design de Unhas'
    };
    return names[category] || 'Portfolio';
}

function getCategoryDescription(category) {
    const descriptions = {
        'cortes': 'Corte moderno e estilizado',
        'maquiagem': 'Maquiagem profissional',
        'noivas': 'Produção completa para noivas',
        'unhas': 'Design exclusivo para suas unhas'
    };
    return descriptions[category] || 'Confira nosso trabalho';
}

// Lightbox functionality
function openLightbox(imageSrc, title, category) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    lightbox.innerHTML = `
        <div class="lightbox-content" style="max-width: 90%; max-height: 90%; position: relative;">
            <img src="${imageSrc}" alt="${title}" style="max-width: 100%; max-height: 80vh; border-radius: 8px; display: block;">
            <div style="color: white; text-align: center; margin-top: 15px;">
                <h3 style="margin: 0 0 5px; color: var(--silver-1);">${title}</h3>
                <p style="margin: 0; color: var(--silver-3);">${category}</p>
            </div>
            <button class="close-lightbox" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 30px; cursor: pointer; outline: none;">&times;</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Trigger reflow to enable transition
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Close on X button click
    const closeBtn = lightbox.querySelector('.close-lightbox');
    closeBtn.addEventListener('click', () => closeLightbox(lightbox));
    
    // Close on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox(lightbox);
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox(lightbox);
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeLightbox(lightbox) {
    lightbox.style.opacity = '0';
    setTimeout(() => {
        document.body.removeChild(lightbox);
        document.body.style.overflow = 'auto';
    }, 300);
}

// Testimonial Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and update dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
const slider = document.querySelector('.testimonial-slider');
slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
});

// Navigation arrows
document.querySelector('.next').addEventListener('click', () => {
    clearInterval(slideInterval);
    nextSlide();
    slideInterval = setInterval(nextSlide, 5000);
});

document.querySelector('.prev').addEventListener('click', () => {
    clearInterval(slideInterval);
    prevSlide();
    slideInterval = setInterval(nextSlide, 5000);
});

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// Animated Counter
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // The lower the faster
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target.toLocaleString();
        }
    });
}

// Animate on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .about-img, .about-content, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
    
    // Animate counters when in view
    const counterSection = document.querySelector('.stats');
    if (counterSection) {
        const counterPosition = counterSection.getBoundingClientRect().top;
        const counterScreenPosition = window.innerHeight / 1.3;
        
        if (counterPosition < counterScreenPosition) {
            animateCounters();
        }
    }
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Trigger animations on scroll
    animateOnScroll();
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission
const contactForm = document.getElementById('form-contato');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            servico: document.getElementById('servico').value,
            data: document.getElementById('data').value,
            mensagem: document.getElementById('mensagem').value
        };
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        
        // Reset form
        this.reset();
    });
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Obrigado por se inscrever na nossa newsletter!');
        
        // Reset form
        this.reset();
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize portfolio
    initPortfolio();
    
    // Show first slide
    showSlide(0);
    
    // Initial animation on page load
    animateOnScroll();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });
});
