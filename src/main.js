import './style.css'

// Mobile Menu
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in');
animatedElements.forEach(el => observer.observe(el));


// Carousel Logic
const track = document.getElementById('track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Simple carousel assumption: strictly 100% width slides
let currentIndex = 0;

if (track && nextBtn && prevBtn) {
  const slides = track.children;
  const slideCount = slides.length;

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateCarousel();
  });

  function updateCarousel() {
    const transformValue = `translateX(-${currentIndex * 100}%)`;
    track.style.transform = transformValue;
  }
}

/* Timeline Scroll & Progress Logic */
const timelineSection = document.querySelector('.timeline-section');
const timelineProgress = document.querySelector('.timeline-line-progress');
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineSection && timelineProgress) {
  window.addEventListener('scroll', () => {
    const rect = timelineSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Start filling when section top hits 50% of viewport
    const startOffset = windowHeight * 0.5;

    const sectionHeight = rect.height;
    // Calculate how far we've scrolled into the section relative to the viewport center
    const scrolledDistance = (windowHeight / 2) - rect.top;

    let progress = (scrolledDistance / sectionHeight) * 100;

    // Clamp progress between 0 and 100
    progress = Math.max(0, Math.min(progress, 100));
    timelineProgress.style.height = `${progress}%`;

    // Activate Items
    timelineItems.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const triggerPoint = windowHeight * 0.6; // Trigger when item is a bit past middle

      if (itemRect.top < triggerPoint) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
}


/* Testimonial Carousel Logic */
const tTrack = document.getElementById('testimonials-track');
const tNextBtn = document.getElementById('nextTestimonialBtn');
const tPrevBtn = document.getElementById('prevTestimonialBtn');
const tNav = document.getElementById('testimonialNav');
const tDots = tNav ? Array.from(tNav.children) : [];

if (tTrack && tNextBtn && tPrevBtn) {
  const tSlides = Array.from(tTrack.children);
  let tCurrentIndex = 0;

  function updateTestimonialCarousel(index) {
    const slideWidth = tSlides[0].getBoundingClientRect().width;
    tTrack.style.transform = 'translateX(-' + (slideWidth * index) + 'px)';

    // Update dots
    tDots.forEach(dot => dot.classList.remove('current-slide'));
    if (tDots[index]) tDots[index].classList.add('current-slide');
  }

  tNextBtn.addEventListener('click', () => {
    tCurrentIndex = (tCurrentIndex + 1) % tSlides.length;
    updateTestimonialCarousel(tCurrentIndex);
  });

  tPrevBtn.addEventListener('click', () => {
    tCurrentIndex = (tCurrentIndex - 1 + tSlides.length) % tSlides.length;
    updateTestimonialCarousel(tCurrentIndex);
  });

  tDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      tCurrentIndex = index;
      updateTestimonialCarousel(tCurrentIndex);
    });
  });

  // Handle Resize
  window.addEventListener('resize', () => {
    updateTestimonialCarousel(tCurrentIndex);
  });
}
