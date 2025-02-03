let lastScroll = window.scrollY;
let isAutoScroll = false;

// Add hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const menuItems = document.querySelector('.menu-items');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        menuItems.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (menuItems?.classList.contains('active') && 
        !e.target.closest('.menu') && 
        !e.target.closest('.hamburger')) {
        hamburger.setAttribute('aria-expanded', 'false');
        menuItems.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Create an observer to detect changes to the URL hash
const observer = new MutationObserver(() => {
    if (window.location.hash) {
        isAutoScroll = true;
        setTimeout(() => {
            isAutoScroll = false;
        }, 100);
    }
});

// Observe changes to the URL
observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true
});

// Also catch programmatic scrolls
document.addEventListener('click', (e) => {
    // Check for any links that might cause auto-scrolling
    if (e.target.matches('a[href^="#"]') || 
        e.target.matches('.sidenote-label') ||
        e.target.closest('a[href^="#"]')) {
        isAutoScroll = true;
        setTimeout(() => {
            isAutoScroll = false;
        }, 100);
    }
});

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const menu = document.querySelector('.menu');
    
    if (currentScroll > lastScroll && currentScroll > 50) {
        menu.classList.add('scroll-down');
    } else if (!isAutoScroll) {
        // Only show menu if scroll was triggered by user
        menu.classList.remove('scroll-down');
    }
    
    lastScroll = currentScroll;
});