import './style.css'
import Swiper from 'swiper';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './video-facade.css';

// Mobile Menu
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');
const menuOverlay = document.getElementById('menu-overlay');

mobileMenu.addEventListener('click', () => {
  navList.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});

// Close menu when clicking overlay
menuOverlay.addEventListener('click', () => {
  navList.classList.remove('active');
  mobileMenu.classList.remove('active');
  menuOverlay.classList.remove('active');
  document.body.classList.remove('menu-open');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('active');
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
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


const initSwiper = () => {
  const swiperEl = document.querySelector('.evolution-swiper');
  if (swiperEl) {
    new Swiper('.evolution-swiper', {
      modules: [Navigation, Pagination, Autoplay],
      effect: 'slide',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
};

initSwiper();

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

/* Connect Form Logic (Personal Landing) */
const connectForm = document.getElementById('connectForm');
const connectInput = document.getElementById('connectInput');
const connectBtn = document.getElementById('connectBtn');
const toast = document.getElementById('toast');
const connectError = document.getElementById('connectError');

if (connectForm && connectInput && connectBtn) {

  const validateMessage = (msg) => {
    if (!msg.trim()) return "A mensagem não pode estar vazia.";
    if (msg.trim().length < 3) return "A mensagem deve ter pelo menos 3 caracteres.";
    if (msg.length > 200) return "A mensagem não pode exceder 200 caracteres.";
    return "";
  };

  connectInput.addEventListener('input', (e) => {
    const val = e.target.value;

    // Simple validation for button state
    if (val.trim().length >= 3) {
      connectBtn.disabled = false;
      connectBtn.style.opacity = "1";
      connectBtn.style.cursor = "pointer";
    } else {
      connectBtn.disabled = true;
      connectBtn.style.opacity = "0.5";
      connectBtn.style.cursor = "not-allowed";
    }

    if (connectError) connectError.textContent = "";
  });

  connectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = connectInput.value;
    const error = validateMessage(val);

    if (error) {
      if (connectError) connectError.textContent = error;
      return;
    }

    // Success
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    connectInput.value = "";
    connectBtn.disabled = true;
    connectBtn.style.opacity = "0.5";
  });
}


/* WhatsApp Button Visibility Logic */
const whatsappBtn = document.querySelector('.btn-whatsapp');
const secondSection = document.getElementById('mentoria');

if (whatsappBtn && secondSection) {
  window.addEventListener('scroll', () => {
    const sectionTop = secondSection.offsetTop;
    // Show button when the Mentoria section enters the viewport
    const triggerPoint = sectionTop - window.innerHeight + 100;

    if (window.scrollY > triggerPoint) {
      whatsappBtn.classList.add('show');
    } else {
      whatsappBtn.classList.remove('show');
    }
  });
}

/* Video Facade Logic */
const videoFacade = document.querySelector('.video-facade');
if (videoFacade) {
  videoFacade.addEventListener('click', function () {
    const videoId = this.dataset.videoId;
    if (!videoId) return;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`);
    iframe.setAttribute('title', 'Vídeo explicativo MFIT');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.classList.add('mfit-video-iframe');

    // Clear content and append iframe
    this.innerHTML = '';
    this.appendChild(iframe);
    this.classList.add('is-playing'); // Optional class for styling
  });
}
