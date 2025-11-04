// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillBars = document.querySelectorAll('.skill-progress');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const contactForm = document.getElementById('contactForm');
const navbar = document.querySelector('.navbar');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill bars animation
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate skill bars when skills section is visible
            if (entry.target.classList.contains('skills')) {
                setTimeout(animateSkillBars, 500);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Add animate-on-scroll class to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
});

// Resume tabs functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button and corresponding panel
        btn.classList.add('active');
        const panel = document.getElementById(targetTab);
        if (panel) panel.classList.add('active');
    });
});

// Contact form handling
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
        
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Notification system
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
};

// Typing animation for hero title
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize typing animation for name
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typeWriter(nameElement, originalText, 150);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill category hover effects
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', () => {
        category.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    category.addEventListener('mouseleave', () => {
        category.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animation for stats
const animateStats = () => {
    const stats = document.querySelectorAll('.stat h4');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        if (numericValue) {
            let currentValue = 0;
            const increment = numericValue / 50;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '') + (finalValue.includes('%') ? '%' : '');
                }
            }, 30);
        }
    });
};

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 500);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);
}

// Add ripple effect to buttons
const addRippleEffect = (button) => {
    button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
};

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(addRippleEffect);

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Theme toggle functionality (bonus feature)
const createThemeToggle = () => {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
        transition: transform 0.3s ease;
    `;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        // Persist choice
        try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
    });
    
    document.body.appendChild(themeToggle);
};

// Initialize theme toggle
createThemeToggle();
// Initialize theme from localStorage (persisted choice)
const initTheme = () => {
    try {
        const saved = localStorage.getItem('theme');
        const isDark = saved === 'dark';
        if (isDark) document.body.classList.add('dark-theme');
        // Update toggle icon if it exists
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) toggle.innerHTML = (isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>');
    } catch (e) {
        // ignore storage errors
    }
};

initTheme();

// Simple CSS injection for dark-theme adjustments (keeps styles in CSS file minimal)
const darkThemeStyles = `
    .dark-theme {
        --primary-color: #06b6d4;
        --secondary-color: #0ea5a4;
        --accent-color: #7c3aed;
        --bg-primary: #0b1220;
        --bg-secondary: #0f1724;
        --text-primary: #e6eef6;
        --text-secondary: #9fb3c8;
        --text-light: #7d8f9f;
        --border-color: #1f2a36;
        --gradient-primary: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        --gradient-secondary: linear-gradient(135deg, var(--accent-color), var(--primary-color));
    }
    .dark-theme .navbar { background: rgba(11, 17, 32, 0.9); border-bottom-color: var(--border-color); }
    .dark-theme .skill-category, .dark-theme .project-card, .dark-theme .contact-form, .dark-theme .timeline-item { background: var(--bg-secondary); border: 1px solid var(--border-color); }
`;

const darkStyle = document.createElement('style');
darkStyle.textContent = darkThemeStyles;
document.head.appendChild(darkStyle);

// Console welcome message
console.log(`
🚀 Portfolio Website Loaded Successfully!

Built with:
- HTML5 Semantic Structure
- CSS3 with Modern Animations
- Vanilla JavaScript
- React Components (coming soon)

Features:
✅ Responsive Design
✅ Smooth Animations
✅ Interactive Elements
✅ Dark/Light Theme
✅ Contact Form
✅ Resume Section
✅ Social Links

Enjoy exploring! 🎉
`);

// Performance optimization: Lazy load images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading
lazyLoadImages();

// Hide avatar placeholders when profile images load
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.querySelector('.profile-photo');
    if (profileImg) {
        profileImg.addEventListener('load', () => {
            const placeholder = profileImg.parentElement.querySelector('.avatar-placeholder');
            if (placeholder) placeholder.style.display = 'none';
        });
        profileImg.addEventListener('error', () => {
            // Keep placeholder visible if image fails to load
            profileImg.style.display = 'none';
        });
    }

    const aboutImg = document.querySelector('.about-photo');
    if (aboutImg) {
        aboutImg.addEventListener('load', () => {
            const placeholder = aboutImg.parentElement.querySelector('.avatar-placeholder-large');
            if (placeholder) placeholder.style.display = 'none';
        });
        aboutImg.addEventListener('error', () => {
            aboutImg.style.display = 'none';
        });
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loaded class styles
    const loadedStyles = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = loadedStyles;
    document.head.appendChild(loadedStyle);
});