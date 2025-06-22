document.addEventListener('DOMContentLoaded', () => {
  // Get all sections and navigation links
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar nav a');
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  // Create Intersection Observer for navigation highlighting
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to corresponding link
        const targetId = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.navbar nav a[href="#${targetId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll to top functionality
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Scroll Animation Observer
  const animationObserverOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animated class to trigger animations
        entry.target.classList.add('animated');
        
        // For stagger items, animate each child with delay
        if (entry.target.classList.contains('stagger-item')) {
          const parent = entry.target.parentElement;
          const siblings = parent.querySelectorAll('.stagger-item');
          siblings.forEach((sibling, index) => {
            setTimeout(() => {
              sibling.classList.add('animated');
            }, index * 100);
          });
        }
      }
    });
  }, animationObserverOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .stagger-item');
  animatedElements.forEach(element => {
    animationObserver.observe(element);
  });
}); 