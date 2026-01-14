// آفاق Presentation - JavaScript Controller
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.nav-dot');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    const currentSlideEl = document.querySelector('.current-slide');
    const totalSlidesEl = document.querySelector('.total-slides');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Initialize
    totalSlidesEl.textContent = totalSlides;
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        slides[currentSlide].classList.remove('active');
        navDots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        navDots[currentSlide].classList.add('active');
        currentSlideEl.textContent = currentSlide + 1;
    }
    
    // Navigation
    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }
    
    // Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') nextSlide();
        else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') prevSlide();
        else if (e.key === ' ') { e.preventDefault(); nextSlide(); }
        else if (e.key === 'Home') goToSlide(0);
        else if (e.key === 'End') goToSlide(totalSlides - 1);
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    });
    
    // Mouse wheel support
    let wheelThrottle = false;
    document.addEventListener('wheel', (e) => {
        if (wheelThrottle) return;
        wheelThrottle = true;
        
        if (e.deltaY > 0) nextSlide();
        else prevSlide();
        
        setTimeout(() => { wheelThrottle = false; }, 800);
    });
});
