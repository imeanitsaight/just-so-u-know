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

// --- Logika kursora (Wersja 3.0) ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const clickableElements = document.querySelectorAll('a, button, .features li');
const downloadButton = document.getElementById('download-btn'); // Zmienione z querySelector na getElementById

// 1. Ruch kursora
window.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  cursorDot.style.left = `${clientX}px`;
  cursorDot.style.top = `${clientY}px`;
  cursorOutline.style.left = `${clientX}px`;
  cursorOutline.style.top = `${clientY}px`;
});

// 2. Interakcje kursora z elementami
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

// 3. Efekt "Kliknięcia"
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
