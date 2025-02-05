document.addEventListener("DOMContentLoaded", () => {
    const fadeInElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    fadeInElements.forEach(el => observer.observe(el));
    function changeBackgroundVideo('newthon.mp4') {
        const video = document.getElementById('bg-video');
        video.src = videoSrc;
        video.load(); // Reload video
    }
    
    // Example Usage:
    // changeBackgroundVideo('new-video.mp4');
    
});
