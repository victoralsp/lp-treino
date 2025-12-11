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


/* 3D Evolution Slider Logic */
const evoStackCards = Array.from(document.querySelectorAll('.evo-stack-card'));
const btnPrev3d = document.getElementById('btnPrev3d');
const btnNext3d = document.getElementById('btnNext3d');

const evoName = document.getElementById('evoName');
const evoRole = document.getElementById('evoRole');
const evoDesc = document.getElementById('evoDesc');

// Data for text content (matching the order of cards in HTML)
const evoData = [
  {
    name: "Carlos Silva",
    role: "Perda de Gordura",
    desc: "\"O método do Igor mudou completamente minha visão sobre treino. Resultados reais em 3 meses!\""
  },
  {
    name: "Rafael Souza",
    role: "Hipertrofia",
    desc: "\"Consegui ganhar massa muscular como nunca antes. A periodização faz toda a diferença.\""
  },
  {
    name: "Lucas Mendes",
    role: "Definição",
    desc: "\"Energia dobrada e corpo definido. O suporte é incrível, recomendo demais!\""
  }
];

let active3dIndex = 0;

function getRandomRotation() {
  return Math.floor(Math.random() * 21) - 10; // -10 to 10
}

function update3dSlider() {
  // Update Cards
  evoStackCards.forEach((card, index) => {
    if (index === active3dIndex) {
      // Active Card
      card.style.opacity = '1';
      card.style.transform = 'scale(1) rotateY(0deg) translateZ(0)';
      card.style.zIndex = '50';
      card.style.filter = 'blur(0px)';
    } else {
      // Inactive Cards (Stacked behind)
      const randomRot = getRandomRotation();
      // Determine relative distance for Z-index to stack correctly
      // We want immediate next/prev to be just behind? 
      // Actually React code: zIndex: isActive ? 999 : testimonials.length + 2 - index
      // But index changes. Let's just put all inactive behind.

      card.style.opacity = '0.4';
      card.style.transform = `scale(0.9) rotateY(${randomRot}deg) translateZ(-100px)`;
      card.style.zIndex = (evoStackCards.length - index).toString(); // Simple stacking order
      // But if we want them to feel like a deck, this might be enough.
      // Better: active is 50. Others are lower.

      card.style.filter = 'blur(1px)'; // Subtle depth blur
    }
  });

  // Update Text with simple fade effect
  const wrapper = document.querySelector('.evo-text-wrapper');
  wrapper.style.opacity = 0;

  setTimeout(() => {
    const data = evoData[active3dIndex];
    if (data) {
      if (evoName) evoName.textContent = data.name;
      if (evoRole) evoRole.textContent = data.role;
      if (evoDesc) evoDesc.textContent = data.desc;
    }
    wrapper.style.opacity = 1;
  }, 200); // Wait for fade out
}

if (btnPrev3d && btnNext3d && evoStackCards.length > 0) {
  // Init
  update3dSlider();

  btnNext3d.addEventListener('click', () => {
    active3dIndex = (active3dIndex + 1) % evoStackCards.length;
    update3dSlider();
  });

  btnPrev3d.addEventListener('click', () => {
    active3dIndex = (active3dIndex - 1 + evoStackCards.length) % evoStackCards.length;
    update3dSlider();
  });
}
