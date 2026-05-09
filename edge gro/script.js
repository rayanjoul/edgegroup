// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu ul li a');

if(menuToggle){
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if(!e.target.closest('.navbar')){
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if(loadingScreen){
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 1500); // Show loading for 1.5 seconds
  }
});

// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== NAVBAR ACTIVE LINK =====
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if(pageYOffset >= (sectionTop - 200)){
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href').slice(1) === current){
      link.classList.add('active');
    }
  });
});

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');

if(contactForm){
  // Form validation rules
  const validationRules = {
    name: {
      validate: (value) => value.trim().length >= 2,
      message: 'Name must be at least 2 characters'
    },
    email: {
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Please enter a valid email address'
    },
    phone: {
      validate: (value) => !value || /^[0-9\s\-\+\(\)]{10,}$/.test(value),
      message: 'Please enter a valid phone number'
    },
    service: {
      validate: (value) => value !== '',
      message: 'Please select a service'
    },
    message: {
      validate: (value) => value.trim().length >= 10,
      message: 'Message must be at least 10 characters'
    }
  };

  // Validate individual field
  function validateField(fieldName, fieldValue) {
    const rule = validationRules[fieldName];
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if(rule && !rule.validate(fieldValue) && fieldValue !== ''){
      if(errorElement){
        errorElement.textContent = rule.message;
        errorElement.classList.add('show');
      }
      return false;
    } else {
      if(errorElement){
        errorElement.textContent = '';
        errorElement.classList.remove('show');
      }
      return true;
    }
  }

  // Real-time validation on blur
  const formFields = contactForm.querySelectorAll('input, textarea, select');
  formFields.forEach(field => {
    field.addEventListener('blur', () => {
      validateField(field.name, field.value);
    });

    field.addEventListener('input', () => {
      if(field.value){
        validateField(field.name, field.value);
      }
    });
  });

  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    const formData = new FormData(contactForm);

    for(let [fieldName, fieldValue] of formData.entries()){
      if(!validateField(fieldName, fieldValue)){
        isValid = false;
      }
    }

    // Validate required fields
    if(!formData.get('name')){
      const nameError = document.getElementById('nameError');
      if(nameError){
        nameError.textContent = 'Name is required';
        nameError.classList.add('show');
      }
      isValid = false;
    }

    if(!formData.get('email')){
      const emailError = document.getElementById('emailError');
      if(emailError){
        emailError.textContent = 'Email is required';
        emailError.classList.add('show');
      }
      isValid = false;
    }

    if(!formData.get('service')){
      const serviceError = document.getElementById('serviceError');
      if(serviceError){
        serviceError.textContent = 'Please select a service';
        serviceError.classList.add('show');
      }
      isValid = false;
    }

    if(!formData.get('message')){
      const messageError = document.getElementById('messageError');
      if(messageError){
        messageError.textContent = 'Message is required';
        messageError.classList.add('show');
      }
      isValid = false;
    }

    if(isValid){
      const messageElement = document.getElementById('formMessage');
      
      // Show success message
      messageElement.textContent = 'Thank you! Your message has been sent successfully. We\'ll be in touch soon!';
      messageElement.classList.add('success');
      messageElement.classList.remove('error');
      
      // Reset form
      contactForm.reset();
      
      // Clear error messages
      document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        messageElement.classList.remove('success');
        messageElement.textContent = '';
      }, 5000);
    } else {
      const messageElement = document.getElementById('formMessage');
      messageElement.textContent = 'Please fix the errors above and try again.';
      messageElement.classList.add('error');
      messageElement.classList.remove('success');
    }
  });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .stat, .info-card').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');

if(backToTopBtn){
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if(window.pageYOffset > 300){
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  // Scroll to top when clicked
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== GALLERY LIGHTBOX =====
const galleryLinks = document.querySelectorAll('.gallery-link');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

if(galleryLinks.length > 0 && lightbox){
  galleryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = link.getAttribute('data-img');
      const caption = link.getAttribute('data-caption');
      
      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = caption;
      lightbox.style.display = 'block';
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  if(lightboxClose){
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // Close on click outside
  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox){
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && lightbox.style.display === 'block'){
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

