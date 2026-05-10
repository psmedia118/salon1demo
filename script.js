/* ========================================
   LUXEGLOW SALON - JAVASCRIPT
   ======================================== */

// ========== NAVBAR ==========
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        // Don't remove scrolled on inner pages
        if (!document.body.classList.contains('inner-page')) {
            navbar.classList.remove('scrolled');
        }
    }
});

// Hamburger toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });
}

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll(
    '.value-card, .service-card, .step-card, .testimonial-card, ' +
    '.section-header, .brand-item, .cta-content, .team-card, ' +
    '.mv-card, .pricing-card, .package-card, .gallery-item, ' +
    '.contact-card, .stat-full-item, .two-col-text, .two-col-img, ' +
    '.insta-item, .hours-card, .social-card, .map-placeholder'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========== GALLERY FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ========== BOOKING FORM ==========
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        const inputs = bookingForm.querySelectorAll('[required]');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = '#e74c3c';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 3000);
            }
        });

        if (!valid) return;

        // Show success
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            bookingForm.style.display = 'none';
            formSuccess.style.display = 'block';
        }, 1500);
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== STATS COUNTER ==========
const statNumbers = document.querySelectorAll('.stat-item h3, .stat-full-item h2');

const countUp = (el, target) => {
    const suffix = target.replace(/[0-9]/g, '');
    const num = parseInt(target);
    let current = 0;
    const step = Math.ceil(num / 60);
    const timer = setInterval(() => {
        current += step;
        if (current >= num) {
            current = num;
            clearInterval(timer);
        }
        el.textContent = current + suffix;
    }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target.textContent;
            countUp(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

// ========== SET MIN DATE FOR BOOKING ==========
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
}

// ========== NAVBAR LOGO COLOR FIX FOR INNER PAGES ==========
const logoTextDark = document.querySelector('.logo-text.dark');
if (logoTextDark) {
    navbar.classList.add('scrolled');
}
