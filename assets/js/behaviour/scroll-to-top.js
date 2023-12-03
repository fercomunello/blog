(function () {
    const target = document.querySelector('[data-js-footer-target]');

    const scrollButton = document.querySelector('[data-js-scroll-to-top]');
    const rootElement = document.documentElement;

    scrollButton.addEventListener('click', () => {
        rootElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const observer =
        new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    scrollButton.classList.add('-show');
                } else {
                    scrollButton.classList.remove('-show');
                }
            });
        });

    observer.observe(target);
})();