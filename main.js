const app = document.querySelector('#app');

const images = [
  'https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1440387/pexels-photo-1440387.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1669790/pexels-photo-1669790.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1669791/pexels-photo-1669791.jpeg?auto=compress&cs=tinysrgb&w=800'
];

const colorPalettes = [
  { name: 'Ocean Breeze', colors: ['#0A2463', '#3E92CC', '#D8315B', '#1E1B18'] },
  { name: 'Sunset Glow', colors: ['#F08A4B', '#F4442E', '#BE3144', '#872341'] },
  { name: 'Forest Dawn', colors: ['#1B4332', '#2D6A4F', '#52B788', '#95D5B2'] },
  { name: 'Royal Elegance', colors: ['#22223B', '#4A4E69', '#9A8C98', '#C9ADA7'] },
  { name: 'Modern Neutral', colors: ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C'] },
  { name: 'Warm Earth', colors: ['#8B4513', '#CD853F', '#DEB887', '#F5DEB3'] }
];

const services = [
  {
    icon: '🎨',
    title: 'Interior Painting',
    description: 'Transform your living spaces with vibrant colors and flawless finishes that reflect your style and personality.'
  },
  {
    icon: '🏠',
    title: 'Exterior Painting',
    description: 'Protect and beautify your property with weather-resistant, long-lasting exterior paint solutions.'
  },
  {
    icon: '🏢',
    title: 'Commercial Projects',
    description: 'Professional painting services for offices, retail spaces, and commercial buildings with minimal disruption.'
  },
  {
    icon: '✨',
    title: 'Custom Designs',
    description: 'Bring your creative visions to life with custom murals, patterns, and decorative painting techniques.'
  },
  {
    icon: '🔧',
    title: 'Surface Preparation',
    description: 'Expert surface preparation including repairs, priming, and treatment for optimal paint adhesion.'
  },
  {
    icon: '🎭',
    title: 'Texture & Finishes',
    description: 'Specialized textured finishes and decorative techniques to add depth and character to your walls.'
  }
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Homeowner',
    text: 'ColorCraft transformed our home completely! The attention to detail and professionalism exceeded our expectations. Highly recommended!',
    initial: 'S'
  },
  {
    name: 'Ahmed Rahman',
    role: 'Business Owner',
    text: 'They painted our entire office space over the weekend. Zero disruption to our business and the results are stunning. True professionals!',
    initial: 'A'
  },
  {
    name: 'Linda Chen',
    role: 'Interior Designer',
    text: 'I work with ColorCraft on all my projects. Their color expertise and flawless execution make them my go-to painting partner.',
    initial: 'L'
  }
];

function renderApp() {
  app.innerHTML = `
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">ColorCraft</div>
        <ul class="nav-menu">
          <li><a href="#home" class="nav-link">Home</a></li>
          <li><a href="#services" class="nav-link">Services</a></li>
          <li><a href="#gallery" class="nav-link">Gallery</a></li>
          <li><a href="#colors" class="nav-link">Colors</a></li>
          <li><a href="#testimonials" class="nav-link">Reviews</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
        </ul>
        <button class="menu-toggle">☰</button>
      </div>
    </nav>

    <section id="home" class="hero">
      <div class="hero-background"></div>
      <div class="hero-shapes">
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">Transform Your Space with Color</h1>
        <p class="hero-subtitle">Professional painting services that bring your vision to life with precision, passion, and perfection</p>
        <a href="#contact" class="btn">Get Free Consultation</a>
      </div>
    </section>

    <section id="services" class="section">
      <div class="container">
        <h2 class="section-title fade-in">Our Services</h2>
        <p class="section-subtitle fade-in">From residential to commercial projects, we offer comprehensive painting solutions tailored to your needs</p>
        <div class="services-grid">
          ${services.map((service, index) => `
            <div class="service-card fade-in" style="animation-delay: ${index * 0.1}s">
              <div class="service-icon">${service.icon}</div>
              <h3 class="service-title">${service.title}</h3>
              <p class="service-description">${service.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="gallery" class="section" style="background: #fff;">
      <div class="container">
        <h2 class="section-title fade-in">Our Portfolio</h2>
        <p class="section-subtitle fade-in">Explore our recent projects and see the quality craftsmanship we deliver</p>
        <div class="gallery-grid">
          ${images.map((img, index) => `
            <div class="gallery-item fade-in" style="animation-delay: ${index * 0.1}s" data-index="${index}">
              <img src="${img}" alt="Gallery Image ${index + 1}">
              <div class="gallery-overlay">
                <div class="gallery-icon">🔍</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="colors" class="section colors-section">
      <div class="container">
        <h2 class="section-title fade-in">Color Palettes</h2>
        <p class="section-subtitle fade-in">Curated color combinations to inspire your next project</p>
        <div class="color-palettes">
          ${colorPalettes.map((palette, index) => `
            <div class="palette-card fade-in" style="animation-delay: ${index * 0.1}s">
              <div class="palette-colors">
                ${palette.colors.map(color => `
                  <div class="palette-color" style="background: ${color}" title="${color}"></div>
                `).join('')}
              </div>
              <div class="palette-info">
                <div class="palette-name">${palette.name}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="testimonials" class="section">
      <div class="container">
        <h2 class="section-title fade-in">What Clients Say</h2>
        <p class="section-subtitle fade-in">Real feedback from satisfied customers who trusted us with their spaces</p>
        <div class="testimonials-grid">
          ${testimonials.map((testimonial, index) => `
            <div class="testimonial-card fade-in" style="animation-delay: ${index * 0.1}s">
              <div class="quote-icon">"</div>
              <p class="testimonial-text">${testimonial.text}</p>
              <div class="testimonial-author">
                <div class="author-avatar">${testimonial.initial}</div>
                <div>
                  <div class="author-name">${testimonial.name}</div>
                  <div class="author-role">${testimonial.role}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="about" class="section" style="background: #fff;">
      <div class="container">
        <h2 class="section-title fade-in">About ColorCraft</h2>
        <div class="about-content fade-in">
          <p class="about-text">
            With over a decade of experience, ColorCraft has been transforming homes and businesses across the region.
            Our team of skilled painters combines technical expertise with artistic vision to deliver exceptional results
            that exceed expectations. We use premium quality paints and eco-friendly materials to ensure lasting beauty
            and durability.
          </p>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">2500+</div>
              <div class="stat-label">Projects Completed</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">12+</div>
              <div class="stat-label">Years Experience</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">98%</div>
              <div class="stat-label">Client Satisfaction</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">50+</div>
              <div class="stat-label">Expert Painters</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="section contact-section">
      <div class="container">
        <div class="contact-container">
          <div class="contact-info fade-in">
            <h2>Let's Start Your Project</h2>
            <p>Ready to transform your space? Get in touch with us today for a free consultation and quote.</p>
            <div class="contact-details">
              <div class="contact-item">
                <div class="contact-icon">📍</div>
                <div>
                  <div style="font-weight: 600;">Visit Us</div>
                  <div style="opacity: 0.9;">123 Paint Street, Color City, CC 12345</div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">📞</div>
                <div>
                  <div style="font-weight: 600;">Call Us</div>
                  <div style="opacity: 0.9;">+880 151 5666 904</div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">✉️</div>
                <div>
                  <div style="font-weight: 600;">Email Us</div>
                  <div style="opacity: 0.9;">info@colorcraft.com</div>
                </div>
              </div>
            </div>
          </div>
          <form class="contact-form fade-in" id="contactForm">
            <div class="form-group">
              <label class="form-label">Your Name</label>
              <input type="text" class="form-input" name="name" required placeholder="John Doe">
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" name="email" required placeholder="john@example.com">
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="tel" class="form-input" name="phone" placeholder="+880 1234 567890">
            </div>
            <div class="form-group">
              <label class="form-label">Your Message</label>
              <textarea class="form-textarea" name="message" required placeholder="Tell us about your project..."></textarea>
            </div>
            <button type="submit" class="btn-submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>ColorCraft</h3>
          <p>Transforming spaces with professional painting services since 2013. Quality, reliability, and customer satisfaction guaranteed.</p>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul class="footer-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#colors">Color Palettes</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Services</h3>
          <ul class="footer-links">
            <li><a href="#services">Interior Painting</a></li>
            <li><a href="#services">Exterior Painting</a></li>
            <li><a href="#services">Commercial Projects</a></li>
            <li><a href="#services">Custom Designs</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Contact</h3>
          <ul class="footer-links">
            <li>123 Paint Street</li>
            <li>Color City, CC 12345</li>
            <li>Phone: +880 151 5666 904</li>
            <li>Email: info@colorcraft.com</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 ColorCraft Painting Shop. All rights reserved.</p>
      </div>
    </footer>

    <a href="https://wa.me/8801515666904" target="_blank" class="whatsapp-float" title="Chat on WhatsApp">
      💬
    </a>

    <div class="scroll-top" id="scrollTop">↑</div>
  `;
}

function initializeEventListeners() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.querySelector('#scrollTop');
  const contactForm = document.querySelector('#contactForm');
  const navbar = document.querySelector('.navbar');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
      scrollTopBtn.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      scrollTopBtn.classList.remove('visible');
    }

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 100) {
        element.classList.add('visible');
      }
    });
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    alert(`Thank you ${data.name}! We've received your message and will contact you soon at ${data.email}`);
    contactForm.reset();
  });

  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: pointer;
        padding: 2rem;
      `;

      const modalImg = document.createElement('img');
      modalImg.src = img.src;
      modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      `;

      modal.appendChild(modalImg);
      document.body.appendChild(modal);

      modal.addEventListener('click', () => {
        modal.remove();
      });
    });
  });

  const paletteCards = document.querySelectorAll('.palette-card');
  paletteCards.forEach(card => {
    card.addEventListener('click', () => {
      const colors = Array.from(card.querySelectorAll('.palette-color')).map(el => el.style.background);
      alert(`Color codes:\n${colors.join('\n')}`);
    });
  });
}

renderApp();
initializeEventListeners();

window.addEventListener('load', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('visible');
    }, index * 100);
  });
});
