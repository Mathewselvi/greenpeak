// Main JavaScript file for GREEN PEAK Adventure Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS if it exists
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('sticky', window.scrollY > 50);
            
            // Back to top button
            const backToTop = document.getElementById('backToTop');
            if (backToTop) {
                if (window.scrollY > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            }
            
            // Animate sections on scroll
            animateOnScroll();
        });
    }
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.getElementById('navbar');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
            mobileMenuBtn.innerHTML = navbar.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('#navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Active navigation links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    if (sections.length > 0 && navLinks.length > 0) {
        function setActiveLink() {
            let index = sections.length;
            
            while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
            
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
        
        window.addEventListener('scroll', setActiveLink);
    }
    
    // Improved Slideshow with Smooth Transitions
    const hero = document.querySelector('.hero');
    if (hero) {
        const backgrounds = [
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("main.jpg")',
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("forest.jpg")',
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("campfire.jpg")',
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("mudhouse.jpg")'
        ];
        
        // Create a secondary background div for cross-fade effect
        const createBackgroundOverlay = () => {
            const overlay = document.createElement('div');
            overlay.className = 'hero-background-overlay';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundSize = 'cover';
            overlay.style.backgroundPosition = 'center';
            overlay.style.backgroundAttachment = 'fixed';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 1.5s ease-in-out';
            overlay.style.zIndex = '-1';
            hero.style.position = 'relative';
            hero.style.overflow = 'hidden';
            hero.prepend(overlay);
            return overlay;
        };
        
        const backgroundOverlay = createBackgroundOverlay();
        let currentBg = 0;
        
        // Set initial background
        hero.style.backgroundImage = backgrounds[0];
        hero.style.transition = 'background-image 0s'; // No transition for initial setup
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
        
        function changeBg() {
            // Calculate next background index
            const nextBg = (currentBg + 1) % backgrounds.length;
            
            // Set the overlay to the current background
            backgroundOverlay.style.backgroundImage = backgrounds[nextBg];
            
            // Fade in the overlay
            backgroundOverlay.style.opacity = '1';
            
            // After transition completes, make the main background match overlay and reset
            setTimeout(() => {
                hero.style.backgroundImage = backgrounds[nextBg];
                backgroundOverlay.style.opacity = '0';
                currentBg = nextBg;
            }, 1500); // Match this with the CSS transition duration
        }
        
        // Start slideshow
        setInterval(changeBg, 5000);
    }
    
    // Scroll Animation
    function animateOnScroll() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                // About section animation
                if (section.id === 'about') {
                    const aboutImage = document.querySelector('.about-image');
                    const aboutText = document.querySelector('.about-text');
                    if (aboutImage) aboutImage.classList.add('animated');
                    if (aboutText) aboutText.classList.add('animated');
                }
                
                // Services section animation
                if (section.id === 'services') {
                    const servicesGrid = document.querySelector('.services-grid');
                    if (servicesGrid) servicesGrid.classList.add('animated');
                }
                
                // Gallery section animation
                if (section.id === 'gallery') {
                    const galleryMasonry = document.querySelector('.gallery-masonry');
                    if (galleryMasonry) galleryMasonry.classList.add('animated');
                }
                
                // Contact section animation
                if (section.id === 'contact') {
                    const contactInfo = document.querySelector('.contact-info');
                    if (contactInfo) contactInfo.classList.add('animated');
                }
            }
        });
    }
    
    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Set active button
                filterBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter gallery items
                const filter = btn.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
    
    // Load More Gallery
    const loadMoreBtn = document.getElementById('loadMoreGallery');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This would typically load more images from server
            // For demonstration, we'll just show a message
            this.textContent = 'No More Images';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Load More';
                this.disabled = false;
            }, 3000);
        });
    }
    
    // Lightbox Configuration
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'disableScrolling': true,
            'fadeDuration': 300,
            'albumLabel': "Image %1 of %2",
            'positionFromTop': 100
        });
    }
    
    // Enhanced Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Initial checks on load
    animateOnScroll();
    if (sections.length > 0 && navLinks.length > 0) {
        setActiveLink();
    }
});
// Add this code inside your existing slideshow logic in script.js

// After creating backgroundOverlay
const slideIndicators = document.querySelectorAll('.slide-indicator');
if (slideIndicators.length > 0) {
    // Add click event to indicators
    slideIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            // Get the index to change to
            const targetIndex = parseInt(indicator.getAttribute('data-index'));
            
            // Only change if it's not the current background
            if (targetIndex !== currentBg) {
                // Update indicators
                slideIndicators.forEach(ind => ind.classList.remove('active'));
                indicator.classList.add('active');
                
                // Set the overlay to the target background
                backgroundOverlay.style.backgroundImage = backgrounds[targetIndex];
                
                // Fade in the overlay
                backgroundOverlay.style.opacity = '1';
                
                // After transition completes, update the background
                setTimeout(() => {
                    hero.style.backgroundImage = backgrounds[targetIndex];
                    backgroundOverlay.style.opacity = '0';
                    currentBg = targetIndex;
                }, 1500);
                
                // Reset the interval timer to avoid rapid transitions
                clearInterval(slideshowInterval);
                slideshowInterval = setInterval(changeBg, 5000);
            }
        });
    });
}

// Update indicators in the changeBg function
// Add this at the end of your changeBg function:
if (slideIndicators.length > 0) {
    slideIndicators.forEach(ind => ind.classList.remove('active'));
    slideIndicators[nextBg].classList.add('active');
}

// Modify the setInterval to store the reference
let slideshowInterval = setInterval(changeBg, 5000);