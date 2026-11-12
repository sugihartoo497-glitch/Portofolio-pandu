/**
 * ==========================================================================
 * PANDU ARIEF HARIYANTO - PORTFOLIO JAVASCRIPT
 * Features:
 * - Typing animation
 * - Mobile navigation menu toggle
 * - Sticky navbar on scroll
 * - Active nav link indicator on scroll
 * - Scroll reveal animations (Intersection Observer)
 * - Copy code to clipboard with toast notification
 * - Interactive contact form validation & feedback
 * - Dynamic copyright year
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DYNAMIC COPYRIGHT YEAR
    const currentYearElem = document.getElementById('current-year');
    if (currentYearElem) {
        currentYearElem.textContent = new Date().getFullYear();
    }

    // 2. MOBILE NAVIGATION MENU TOGGLE
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    // Show menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }

    // Hide menu
    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');
                document.body.style.overflow = '';
            }
        });
    });

    // 3. STICKY NAVBAR & BACK TO TOP BUTTON ON SCROLL
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Navbar blur effect
        if (scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollY >= 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Active link highlighting
        highlightActiveNav();
    };

    window.addEventListener('scroll', handleScroll);

    // 4. ACTIVE NAV LINK HIGHLIGHTING
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

            if (correspondingNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingNavLink.classList.add('active-link');
                } else {
                    correspondingNavLink.classList.remove('active-link');
                }
            }
        });
    }

    // 5. TYPING ANIMATION IN HERO SECTION
    const typedTextElem = document.getElementById('typed-text');
    const roles = [
        "Computer Science Student",
        "Future Software Developer",
        "Web Development Explorer",
        "UI/UX & Tech Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenWords = 1800;

    function typeEffect() {
        if (!typedTextElem) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextElem.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElem.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    // Start typing animation
    setTimeout(typeEffect, 500);

    // 6. SCROLL REVEAL ANIMATION (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Unobserve once animated
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // 7. COPY CODE TO CLIPBOARD
    const copyCodeBtn = document.getElementById('copy-code-btn');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const rawCode = `const developer = {
    name: "Pandu Arief Hariyanto",
    major: "Computer Science (S1)",
    status: "Undergraduate Student",
    focus: [
        "Web Development",
        "UI/UX Design",
        "Software Development"
    ],
    passions: ["Clean Code", "Problem Solving"],
    hireable: true,
    exploreTech: function() {
        return "Continuously learning & building!";
    }
};`;

            navigator.clipboard.writeText(rawCode).then(() => {
                showToast("Snippet copied to clipboard! 📋");
                copyCodeBtn.innerHTML = '<i class="fa-solid fa-check text-cyan"></i>';
                setTimeout(() => {
                    copyCodeBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                }, 2000);
            }).catch(err => {
                console.error("Failed to copy code: ", err);
            });
        });
    }

    // 8. TOAST NOTIFICATION HELPER
    function showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 9. INTERACTIVE CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formFeedback.textContent = "Mohon lengkapi semua bidang form.";
                formFeedback.style.color = "#f43f5e";
                return;
            }

            // Simulated sending state
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalBtnContent = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                formFeedback.textContent = `Terima kasih, ${name}! Pesan Anda telah tersimpan (demo mode).`;
                formFeedback.className = 'form-feedback success';
                showToast("Pesan terkirim dengan sukses! 🚀");
                contactForm.reset();

                setTimeout(() => {
                    formFeedback.textContent = '';
                }, 5000);
            }, 1200);
        });
    }
});
