// --- Inicjalizacja bibliotek ---
AOS.init();
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: {
      value: 0.6,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.2, sync: false }
    },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 250,
      color: '#ffffff',
      opacity: 0.5,
      width: 1
    },
    move: { enable: true, speed: 2, direction: 'none', out_mode: 'out' }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      repulse: { distance: 200, duration: 1.0 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// --- Logika kursora (Twoja oryginalna, bez zmian) ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const clickableElements = document.querySelectorAll('a, button, .features li');
const downloadButton = document.getElementById('download-btn');

window.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  cursorDot.style.left = `${clientX}px`;
  cursorDot.style.top = `${clientY}px`;
  cursorOutline.style.left = `${clientX}px`;
  cursorOutline.style.top = `${clientY}px`;
});

clickableElements.forEach((el) => {
  if (el === downloadButton) {
    el.addEventListener('mouseover', () => {
      document.body.classList.add('hide-custom-cursor');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hide-custom-cursor');
    });
  } else {
    el.addEventListener('mouseover', () => {
      document.body.classList.add('link-hovered');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('link-hovered');
    });
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.add('clicking');
});
document.addEventListener('mouseup', () => {
  document.body.classList.remove('clicking');
});

const fileUrl =
  'https://github.com/imeanitsaight/just-so-u-know/releases/download/crazy/main.exe';
const version = document.getElementById('version').textContent.trim();
const fileName = 'Wersja' + version + '.exe';

downloadButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = fileUrl;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  console.log(`Rozpoczęto pobieranie pliku: ${fileName}`);
});

// ===================================================================
// ================== NOWY KOD - ZACZYNA SIĘ TUTAJ ===================
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  // EFEKT 1: 3D TILT NA PANELACH
  VanillaTilt.init(document.querySelectorAll('.glass-panel'), {
    'max': 15, // Maksymalny kąt nachylenia
    'speed': 400, // Szybkość animacji
    'glare': true, // Efekt "blasku"
    'max-glare': 0.2 // Intensywność blasku
  });

  // EFEKT 2: ODSZYFROWYWANIE NAGŁÓWKA
  const headerElement = document.querySelector('h1.gradient-text');
  const originalText = headerElement.getAttribute('data-text');
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  let decryptInterval;

  function runDecryptEffect() {
    let iteration = 0;
    clearInterval(decryptInterval); // Wyczyść poprzedni interwał, jeśli istnieje

    decryptInterval = setInterval(() => {
      headerElement.textContent = originalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= originalText.length) {
        clearInterval(decryptInterval);
      }
      iteration += 1 / 3;
    }, 55);
  }
  // Uruchomienie efektu z małym opóźnieniem dla lepszego wrażenia
  setTimeout(runDecryptEffect, 800);

  // EFEKT 3: ANIMACJA NAGŁÓWKA NA SCROLL
  const mainHeader = document.querySelector('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      // Zaczyna animację bardzo szybko po rozpoczęciu scrollowania
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });
});
