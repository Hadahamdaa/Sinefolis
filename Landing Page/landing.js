

document.addEventListener('DOMContentLoaded', () => {
    
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;


    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    body.appendChild(menuOverlay);


    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
    }

    menuOverlay.addEventListener('click', () => {
        if (navToggle) {
            navToggle.classList.remove('active');
            mainNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });


    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) {
                navToggle.classList.remove('active');
                mainNav.classList.remove('active');
                menuOverlay.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    });

    
    function navigateToPage(pageId) {
        const pageUrls = {
            'landing': 'landing.html',
            'promo': 'promo.html',
            'now-showing': 'now-showing.html',
            'cinema': 'cinema.html',
            'feedback': 'feedback.html'
        };

        const url = pageUrls[pageId];
        if (url) {
            window.location.href = url;
        }
    }


    const pageLinks = document.querySelectorAll('[data-page]');
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });

            
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }

            const page = this.getAttribute('data-page');

        
            if (mainNav.classList.contains('active')) {
                navToggle.classList.remove('active');
                mainNav.classList.remove('active');
                menuOverlay.classList.remove('active');
                body.classList.remove('no-scroll');
            }

        
            navigateToPage(page);

            console.log(`Navigating to ${page} page`);
        });
    });

    const bookNowBtn = document.querySelector('.book-now-btn');
    const footerLinks = document.querySelectorAll('.footer-link:not([href*=".html"])');

    
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            alert('Redirecting to booking page...');
            console.log('Book Now clicked');
        });
    }
    const useCodeBtns = document.querySelectorAll('.use-code-btn');
    useCodeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            
            const card = this.closest('.promo-card');
            const promoType = card.querySelector('.card-title').textContent;

          
            const promoCodes = {
                'Diskon Pelajar': 'STUDENT20',
                'Birthday Promo': 'BIRTHDAY2024',
                'Keuntungan Member': 'MEMBER2024',
                'Flash Sale': 'FLASH50'
            };

            const code = promoCodes[promoType] || 'PROMO2024';

            alert(`Your promo code for ${promoType}: ${code}`);
            console.log(`Promo code generated: ${code} for ${promoType}`);
        });
    });

    const bookTicketBtns = document.querySelectorAll('.book-ticket-btn');
    bookTicketBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const movieCard = this.closest('.movie-card');
            const movieTitle = movieCard.querySelector('.movie-title').textContent;
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            alert(`Booking ticket for: ${movieTitle}`);
            console.log(`Booking ticket for: ${movieTitle}`);
        });
    });

    const viewShowtimesBtns = document.querySelectorAll('.view-showtimes-btn');
    viewShowtimesBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cinemaCard = this.closest('.cinema-card');
            const cinemaName = cinemaCard.querySelector('.cinema-name').textContent;
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            alert(`Viewing showtimes for: ${cinemaName}`);
            console.log(`Viewing showtimes for: ${cinemaName}`);
        });
    });


    const feedbackForm = document.querySelector('.feedback-form');
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;


    stars.forEach((star, index) => {
        star.addEventListener('click', function() {
            selectedRating = index + 1;
            updateStarDisplay();
        });

        star.addEventListener('mouseenter', function() {
            highlightStars(index + 1);
        });
    });

    const ratingContainer = document.querySelector('.rating-stars');
    if (ratingContainer) {
        ratingContainer.addEventListener('mouseleave', function() {
            updateStarDisplay();
        });
    }

    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    function updateStarDisplay() {
        highlightStars(selectedRating);
    }


    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const feedbackData = {
                name: formData.get('name'),
                email: formData.get('email'),
                cinema: formData.get('cinema'),
                rating: selectedRating,
                feedback: formData.get('feedback')
            };

            console.log('Feedback submitted:', feedbackData);
            alert('Thank you for your feedback! We appreciate your input.');

           
            this.reset();
            selectedRating = 0;
            updateStarDisplay();
        });
    }

    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;

            this.style.color = '#F4B942';
            setTimeout(() => {
                this.style.color = '#cccccc';
            }, 200);

            console.log(`Navigating to ${linkText} page`);
            alert(`Navigating to ${linkText} page...`);
        });
    });

    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label') || 'social media';
            console.log(`Navigating to ${platform}`);
            alert(`Opening ${platform} page...`);
        });
    });

    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-item, .stat-item, .promo-card, .movie-card, .cinema-card');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 20);
    }

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.stat-number');
                if (numberElement) {
                    const targetValue = parseInt(numberElement.textContent);
                    animateCounter(numberElement, targetValue);
                    statsObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        statsObserver.observe(item);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('btn') || 
                focusedElement.classList.contains('book-now-btn') ||
                focusedElement.classList.contains('btn-secondary') ||
                focusedElement.classList.contains('use-code-btn') ||
                focusedElement.classList.contains('book-ticket-btn') ||
                focusedElement.classList.contains('view-showtimes-btn')) {
                e.preventDefault();
                focusedElement.click();
            }
        }

        if (e.key === 'Escape' && mainNav && mainNav.classList.contains('active')) {
            if (navToggle) {
                navToggle.classList.remove('active');
                mainNav.classList.remove('active');
                menuOverlay.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        }
    });

    document.documentElement.style.scrollBehavior = 'smooth';

    function createFloatingElements() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.style.position = 'absolute';
            element.style.width = Math.random() * 100 + 50 + 'px';
            element.style.height = element.style.width;
            element.style.background = 'radial-gradient(circle, rgba(244, 185, 66, 0.1) 0%, transparent 70%)';
            element.style.borderRadius = '50%';
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            element.style.animation = `float ${Math.random() * 10 + 10}s infinite linear`;
            element.style.pointerEvents = 'none';
            element.style.zIndex = '-1';
            
            hero.appendChild(element);
        }
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            50% { opacity: 0.3; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    createFloatingElements();

    console.log('🎬 Welcome to Sinéfolis! Your premium cinema destination.');
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        console.log('Mobile view detected - optimized layout loaded');
    }

    const currentPage = window.location.pathname;
    console.log(`Current page: ${currentPage}`);

    const navLinksAll = document.querySelectorAll('.nav-link');
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage.includes('landing') && link.getAttribute('href').includes('landing')) ||
            (currentPage.includes('promo') && link.getAttribute('href').includes('promo')) ||
            (currentPage.includes('nowShowing') && link.getAttribute('href').includes('nowShowing')) ||
            (currentPage.includes('cinema') && link.getAttribute('href').includes('cinema')) ||
            (currentPage.includes('feedback') && link.getAttribute('href').includes('feedback'))) {
            link.classList.add('active');
        }
    });
});

window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});