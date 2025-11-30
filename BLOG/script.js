document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.slider-image-wrapper');
    const originalImages = document.querySelectorAll('.slider-image');
    
    if (originalImages.length === 0) return;

    // --- SETUP: Clone Last Image to Start ---
    // [Clone-3, 1, 2, 3]
    const lastImageClone = originalImages[originalImages.length - 1].cloneNode(true);
    wrapper.insertBefore(lastImageClone, wrapper.firstChild);

    const allImages = document.querySelectorAll('.slider-image');
    
    // Start at Index 1 (Real Image 1)
    let currentSlide = 1;
    
    // Initial Position (Instant set, no animation)
    wrapper.style.transition = 'none';
    wrapper.style.transform = `translateX(-100%)`;

    // 3 Seconds Interval
    const intervalTime = 3000; 

    function startSlider() {
        setInterval(() => {
            // 1. Move Index Backwards (Left to Right slide)
            currentSlide--;

            // 2. Enable Animation
            wrapper.style.transition = 'transform 1s ease-in-out';
            
            // 3. Move the Slide
            wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

            // --- CHECK FOR LOOP RESET ---
            // Agar hum Index 0 (Clone) par pohanch gaye
            if (currentSlide === 0) {
                
                // Wait for animation to finish (1000ms)
                setTimeout(() => {
                    // 4. Disable Animation instantly
                    wrapper.style.transition = 'none';
                    
                    // 5. Jump to the Real Last Image (Index 3)
                    // (Total length is 4. Last index is 3)
                    currentSlide = allImages.length - 1;
                    
                    // 6. Apply new position instantly (No transition)
                    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
                    
                }, 1000); 
            }

        }, intervalTime);
    }

    // Start the engine
    startSlider();
});