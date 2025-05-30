// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    let isMenuOpen = false;

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Toggle hamburger icon with smooth animation
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (isMenuOpen && !navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            closeMenu();
        }
    });

    // Close mobile menu when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) {
                closeMenu();
            }
        });
    });

    // Function to close menu
    function closeMenu() {
        isMenuOpen = false;
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.classList.remove('menu-open');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        }, 250);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature, .course-card, .testimonial-slide');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
            
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial check for elements in view
    animateOnScroll();

    // Check for elements in view on scroll with throttling
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (!scrollTimer) {
            scrollTimer = setTimeout(function() {
                animateOnScroll();
                scrollTimer = null;
            }, 100);
        }
    });
});

// Testimonials Carousel
// const testimonials = [
//     {
//         name: "Sarah Johnson",
//         role: "Aviation Graduate",
//         image: "images/student1.jpg",
//         quote: "The aviation course helped me land my dream job as a cabin crew member."
//     },
//     {
//         name: "Michael Chen",
//         role: "Animation Graduate",
//         image: "images/student2.jpg",
//         quote: "The animation program gave me the skills to work on major film projects."
//     },
//     {
//         name: "Priya Sharma",
//         role: "IT Graduate",
//         image: "images/student3.jpg",
//         quote: "The IT course helped me transition into a successful tech career."
//     }
// ];

let currentTestimonial = 0;
const testimonialCarousel = document.querySelector('.testimonial-carousel');

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    testimonialCarousel.innerHTML = `
        <div class="testimonial-slide">
            <div class="testimonial-content">
                <img src="${testimonial.image}" alt="${testimonial.name}">
                <p>"${testimonial.quote}"</p>
                <h4>${testimonial.name}</h4>
                <span>${testimonial.role}</span>
            </div>
        </div>
    `;
}

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
}, 5000);

// Initialize first testimonial
updateTestimonial();

// Form Animations
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, select, textarea');
    const label = group.querySelector('label');

    if (input && label) {
        input.addEventListener('focus', () => {
            group.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                group.classList.remove('focused');
            }
        });

        // Check initial value
        if (input.value) {
            group.classList.add('focused');
        }
    }
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form Submission with Animation
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Error! Try Again';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}); 