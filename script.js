document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. SIDEBAR TOGGLE ---
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }

    if(menuBtn) menuBtn.addEventListener('click', openSidebar);
    if(closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if(overlay) overlay.addEventListener('click', closeSidebar);


    // --- 2. SLIDER LOGIC (Lag Fixed) ---
    // Instead of cloning inside the loop which causes lag, 
    // we use a clean index-based approach and handle reset efficiently.
    const wrapper = document.querySelector('.slider-image-wrapper');
    const originalImages = document.querySelectorAll('.slider-image');
    
    if (originalImages.length > 0) {
        // Clone last image to start for LTR direction
        const lastImageClone = originalImages[originalImages.length - 1].cloneNode(true);
        wrapper.insertBefore(lastImageClone, wrapper.firstChild);
        
        // Clone first image to end (for safety)
        const firstImageClone = originalImages[0].cloneNode(true);
        wrapper.appendChild(firstImageClone);

        const allImages = document.querySelectorAll('.slider-image');
        let currentSlide = 1; // Start at real image 1

        // Initial Set
        wrapper.style.transition = 'none';
        wrapper.style.transform = `translateX(-100%)`;

        const intervalTime = 4000; 

        setInterval(() => {
            currentSlide--; // Move Left (LTR visual)

            wrapper.style.transition = 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)';
            wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Check if we hit the start clone (index 0)
            if (currentSlide === 0) {
                // Wait for animation to finish then snap
                setTimeout(() => {
                    wrapper.style.transition = 'none';
                    // Jump to real last image (length - 2 because of 2 clones)
                    currentSlide = originalImages.length; 
                    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
                }, 1000); 
            }
        }, intervalTime);
    }


    // --- 3. SCROLL REVEAL ---
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); 
});