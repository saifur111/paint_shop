// Initialize AOS (Animate On Scroll)
function initAOS() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
}

// Preloader
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hide');
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }, 1000);
}

// Scroll Progress Bar
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.style.width = scrolled + '%';
}

// Navigation
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

// Animated Counter
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Hero Stats Counter
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-count'));
          animateCounter(stat, target);
        });
      }
    });
  });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    observer.observe(heroStats);
  }
}

// Service Tabs
function initServiceTabs() {
  const tabs = document.querySelectorAll('.service-tab');
  const panels = document.querySelectorAll('.service-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-panel="${target}"]`).classList.add('active');
    });
  });
}

// Projects Carousel
function initProjectsCarousel() {
  const track = document.getElementById('projectsTrack');
  const prevBtn = document.getElementById('projectPrev');
  const nextBtn = document.getElementById('projectNext');
  const slides = track.querySelectorAll('.project-slide');
  let currentIndex = 0;
  const slideWidth = 100;
  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
  }
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });
  // Auto-play
  let autoplay = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }, 5000);
  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, 5000);
  });
}

// Gallery Filters
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Before/After Tabs
function initBATabs() {
  const tabs = document.querySelectorAll('.ba-tab');
  const comparisons = document.querySelectorAll('.ba-comparison');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-ba');
      tabs.forEach(t => t.classList.remove('active'));
      comparisons.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-ba-content="${target}"]`).classList.add('active');
      // Reinitialize the active slider
      initBeforeAfterSlider(`baSlider${target}`);
    });
  });
  // Initialize first slider
  initBeforeAfterSlider('baSlider1');
}

// Before/After Slider
function initBeforeAfterSlider(sliderId) {
  const container = document.getElementById(sliderId);
  if (!container) return;
  const beforeDiv = container.querySelector('.ba-before');
  const handle = container.querySelector('.ba-handle');
  let isDragging = false;
  function setPosition(percentage) {
    percentage = Math.max(0, Math.min(100, percentage));
    beforeDiv.style.width = percentage + '%';
    handle.style.left = percentage + '%';
    handle.setAttribute('aria-valuenow', Math.round(percentage));
  }
  function getPercentage(clientX) {
    const rect = container.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }
  // Mouse events
  handle.addEventListener('mousedown', () => isDragging = true);
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setPosition(getPercentage(e.clientX));
  });
  document.addEventListener('mouseup', () => isDragging = false);
  // Touch events
  handle.addEventListener('touchstart', () => isDragging = true);
  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setPosition(getPercentage(e.touches[0].clientX));
  });
  document.addEventListener('touchend', () => isDragging = false);
  // Click on container
  container.addEventListener('click', (e) => {
    if (e.target === handle || handle.contains(e.target)) return;
    setPosition(getPercentage(e.clientX));
  });
  // Keyboard navigation
  handle.addEventListener('keydown', (e) => {
    let current = parseFloat(handle.getAttribute('aria-valuenow'));
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition(current - 5);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition(current + 5);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setPosition(50);
    }
  });
  setPosition(50);
}

// Lightbox
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const galleryItems = document.querySelectorAll('.gallery-item img');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const lightboxImg = lightbox.querySelector('.lightbox-image');
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      lightbox.style.display = 'flex';
    });
  });
  const closeBtn = lightbox.querySelector('.lightbox-close');
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      lightbox.style.display = 'none';
    }
  });
}

// Color Visualizer
function initColorVisualizer() {
  const wallColorInput = document.getElementById('wallColor');
  const accentColorInput = document.getElementById('accentColor');
  const wallColorValue = document.getElementById('wallColorValue');
  const accentColorValue = document.getElementById('accentColorValue');
  const applyBtn = document.getElementById('applyColors');
  const resetBtn = document.getElementById('resetColors');
  const roomUpload = document.getElementById('roomUpload');
  const uploadArea = document.getElementById('uploadArea');
  const roomImage = document.getElementById('roomImage');
  const paintOverlay = document.getElementById('paintOverlay');
  const accentStrip = document.getElementById('accentStrip');
  const roomWall = document.querySelector('.room-wall');
  const finishBtns = document.querySelectorAll('.finish-btn');
  let currentFinish = 'matte';
  // Color input updates
  wallColorInput.addEventListener('input', () => {
    wallColorValue.textContent = wallColorInput.value;
  });
  accentColorInput.addEventListener('input', () => {
    accentColorValue.textContent = accentColorInput.value;
  });
  // Color swatches
  document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.getAttribute('data-color');
      const parent = swatch.closest('.control-group');
      if (parent.querySelector('#wallColor')) {
        wallColorInput.value = color;
        wallColorValue.textContent = color;
      } else {
        accentColorInput.value = color;
        accentColorValue.textContent = color;
      }
    });
  });
  // Finish selection
  finishBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      finishBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFinish = btn.getAttribute('data-finish');
      applyColors();
    });
  });
  // Apply colors
  function applyColors() {
    const wallColor = wallColorInput.value;
    const accentColor = accentColorInput.value;
    if (roomImage.src && roomImage.src !== window.location.href) {
      roomImage.style.display = 'block';
      paintOverlay.style.background = wallColor;
      paintOverlay.style.mixBlendMode = 'multiply';
    } else {
      roomImage.style.display = 'none';
      roomWall.style.background = wallColor;
    }
    accentStrip.style.background = accentColor;
    // Apply finish effect
    let filter = '';
    if (currentFinish === 'satin') {
      filter = 'brightness(1.1)';
    } else if (currentFinish === 'gloss') {
      filter = 'brightness(1.2) contrast(1.1)';
    }
    if (roomImage.style.display === 'block') {
      paintOverlay.style.filter = filter;
    } else {
      roomWall.style.filter = filter;
    }
  }
  applyBtn.addEventListener('click', applyColors);
  // Reset
  resetBtn.addEventListener('click', () => {
    wallColorInput.value = '#f5f5f5';
    accentColorInput.value = '#3b82f6';
    wallColorValue.textContent = '#f5f5f5';
    accentColorValue.textContent = '#3b82f6';
    roomImage.src = '';
    roomImage.style.display = 'none';
    finishBtns.forEach(b => b.classList.remove('active'));
    finishBtns[0].classList.add('active');
    currentFinish = 'matte';
    applyColors();
  });
  // File upload
  uploadArea.addEventListener('click', () => {
    roomUpload.click();
  });
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary)';
  });
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'var(--gray-300)';
  });
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--gray-300)';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  });
  roomUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  });
  function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      roomImage.src = e.target.result;
      applyColors();
    };
    reader.readAsDataURL(file);
  }
  // Initial application
  applyColors();
}

// Multi-Step Calculator
function initCalculator() {
  const steps = document.querySelectorAll('.step');
  const formSteps = document.querySelectorAll('.form-step');
  const roomTypeBtns = document.querySelectorAll('.room-type-btn');
  const step1Next = document.getElementById('step1Next');
  const step2Prev = document.getElementById('step2Prev');
  const step2Next = document.getElementById('step2Next');
  const step3Prev = document.getElementById('step3Prev');
  const calculateBtn = document.getElementById('calculateBtn');
  const resetCalculator = document.getElementById('resetCalculator');
  const estimateResult = document.getElementById('estimateResult');
  const estimateAmount = document.getElementById('estimateAmount');
  const calculatorForm = document.getElementById('calculatorForm');
  let currentStep = 1;
  let selectedRoom = null;
  function showStep(step) {
    steps.forEach(s => s.classList.remove('active'));
    formSteps.forEach(s => s.classList.remove('active'));
    steps[step - 1].classList.add('active');
    document.querySelector(`[data-form-step="${step}"]`).classList.add('active');
    currentStep = step;
  }
  // Room type selection
  roomTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roomTypeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedRoom = btn.getAttribute('data-room');
      step1Next.disabled = false;
    });
  });
  step1Next.addEventListener('click', () => showStep(2));
  step2Prev.addEventListener('click', () => showStep(1));
  step2Next.addEventListener('click', () => showStep(3));
  step3Prev.addEventListener('click', () => showStep(2));
  calculateBtn.addEventListener('click', () => {
    const numRooms = parseInt(document.getElementById('numRooms').value);
    const roomSize = parseFloat(document.getElementById('roomSize').value);
    const paintQuality = document.getElementById('paintQuality').value;
    const coats = parseInt(document.querySelector('input[name="coats"]:checked').value);
    
    let baseRate = 30; // Base rate per m² in SAR
    
    // Quality multiplier
    if (paintQuality === 'premium') baseRate *= 1.2;
    if (paintQuality === 'luxury') baseRate *= 1.4;
    
    // Calculate
    const paintCost = numRooms * roomSize * coats * baseRate;
    const laborCost = numRooms * 500; // Labor per room in SAR
    const total = Math.round(paintCost + laborCost);
    
    // Display result
    calculatorForm.style.display = 'none';
    estimateResult.style.display = 'block';
    
    // Animate counter
    const formattedTotal = total.toLocaleString('en-SA');
    estimateAmount.dataset.total = total;
    animateCounter(estimateAmount, total, 1500);
  });
  resetCalculator.addEventListener('click', () => {
    calculatorForm.style.display = 'block';
    estimateResult.style.display = 'none';
    calculatorForm.reset();
    roomTypeBtns.forEach(b => b.classList.remove('selected'));
    step1Next.disabled = true;
    showStep(1);
  });
  
  // Book from estimate
  document.getElementById('bookFromEstimate')?.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
}

// Booking Form
function initBookingForm() {
  const bookingForm = document.getElementById('bookingForm');
  const bookingStatus = document.getElementById('bookingStatus');
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData);
    // Simulate form submission
    bookingStatus.textContent = 'Sending your request...';
    bookingStatus.className = 'form-status';
    bookingStatus.style.display = 'block';
    setTimeout(() => {
      bookingStatus.textContent = 'Thank you! We will contact you within 24 hours to schedule your free consultation.';
      bookingStatus.className = 'form-status success';
      bookingForm.reset();
    }, 1500);
  });
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    contactStatus.textContent = 'Sending your message...';
    contactStatus.className = 'form-status';
    contactStatus.style.display = 'block';
    setTimeout(() => {
      contactStatus.textContent = 'Message sent successfully! We will respond within 24 hours.';
      contactStatus.className = 'form-status success';
      contactForm.reset();
    }, 1500);
  });
}

// Newsletter Form
function initNewsletterForm() {
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterStatus = document.getElementById('newsletterStatus');
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    newsletterStatus.textContent = 'Subscribing...';
    newsletterStatus.className = 'form-status';
    newsletterStatus.style.display = 'block';
    setTimeout(() => {
      newsletterStatus.textContent = 'Successfully subscribed! Check your email for a welcome message.';
      newsletterStatus.className = 'form-status success';
      newsletterForm.reset();
    }, 1500);
  });
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));
      // Open clicked item if it was not active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Social Proof Notifications
function initSocialProof() {
  const notification = document.getElementById('socialProof');
  const names = ['Sarah M.', 'John D.', 'Emily R.', 'Michael C.', 'Jessica L.', 'David T.'];
  function showNotification() {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const nameElement = document.getElementById('notificationName');
    nameElement.textContent = randomName;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 5000);
  }
  // Show first notification after 3 seconds
  setTimeout(showNotification, 3000);
  // Show notification every 15 seconds
  setInterval(showNotification, 15000);
  // Close button
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.style.display = 'none';
  });
}

// Scroll to Top
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  hidePreloader();
  initAOS();
  initNavigation();
  initThemeToggle();
  initStatsCounter();
  initServiceTabs();
  initProjectsCarousel();
  initGalleryFilters();
  initBATabs();
  initLightbox();
  initColorVisualizer();
  initCalculator();
  initBookingForm();
  initContactForm();
  initNewsletterForm();
  initFAQ();
  initSocialProof();
  initScrollToTop();
  // Scroll progress
  window.addEventListener('scroll', updateScrollProgress);
});
