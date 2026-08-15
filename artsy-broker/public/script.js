document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Select all elements with 'fade-in' class (add this class to sections in HTML if needed, 
    // or dynamically add it here for existing elements)
    const animatedElements = document.querySelectorAll('section, .card, .specs-card, .data-table');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // --- 2. Dynamic Background Grid Animation ---
    const bgGrid = document.getElementById('bg-grid');
    
    function createGrid() {
        const grid = document.createElement('div');
        grid.style.position = 'fixed';
        grid.style.top = '0';
        grid.style.left = '0';
        grid.style.width = '100%';
        grid.style.height = '100%';
        grid.style.pointerEvents = 'none';
        grid.style.zIndex = '-1';
        grid.style.backgroundImage = 'linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)';
        grid.style.backgroundSize = '40px 40px';
        bgGrid.appendChild(grid);
    }
    createGrid();

    // --- 3. Typing Effect for Subtitle (Optional Polish) ---
    const subtitle = document.querySelector('.subtitle');
    if(subtitle) {
        const originalText = subtitle.innerText;
        subtitle.innerText = '';
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                subtitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }

    // --- 4. Smooth Scroll for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed nav
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. Mouse Move Parallax Effect for Hero Text ---
    const hero = document.querySelector('.hero');
    const heroText = document.querySelector('.hero h1');
    
    if(hero && heroText) {
        hero.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            heroText.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
            heroText.style.transition = 'transform 0.1s ease-out';
        });
    }

});
