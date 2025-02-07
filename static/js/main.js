document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully!');
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Get the contact form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const subject = document.querySelector('#subject').value;
            const message = document.querySelector('#message').value;

            // Create Gmail compose URL
            const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=sharook@gmail.com` + 
                `&su=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(
                    `Name: ${name}\n` +
                    `Email: ${email}\n\n` +
                    `Message:\n${message}`
                )}`;

            // Show success message
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = `
                <span>Opening Gmail...</span>
                <div class="btn-icon">
                    <i class="fas fa-check"></i>
                </div>
            `;
            submitBtn.classList.add('success');

            // Reset form
            contactForm.reset();

            // Open Gmail in new tab
            window.open(mailtoLink, '_blank');

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <span>Send Message</span>
                    <div class="btn-icon">
                        <i class="fas fa-paper-plane"></i>
                    </div>
                `;
                submitBtn.classList.remove('success');
            }, 3000);
        });
    }
});

// Number Animation
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        function updateCount() {
            if(count < target) {
                count += increment;
                number.textContent = Math.round(count) + '+';
                requestAnimationFrame(updateCount);
            } else {
                number.textContent = target + '+';
            }
        }

        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(number);
            }
        });

        observer.observe(number);
    });
}

document.addEventListener('DOMContentLoaded', animateNumbers);

// Animate skill progress bars when they come into view
function animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = `${progress}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', animateSkillBars); 