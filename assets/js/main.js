// Nalysis - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-toggle')) {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }

            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Accounting for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let valid = true;
            const formInputs = contactForm.querySelectorAll('.form-control');
            
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            const emailInput = contactForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    valid = false;
                    emailInput.classList.add('error');
                }
            }
            
            if (valid) {
                // In a real scenario, you would send form data to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill out all required fields correctly.');
            }
        });
        
        // Remove error class when user starts typing
        contactForm.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }

    // Animations on scroll
    const animateElements = document.querySelectorAll('.animate');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in viewport
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);
    
    // Trigger on initial load
    checkIfInView();
}); 