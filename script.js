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

// --- Logika kursora ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const clickableElements = document.querySelectorAll('a, button, .feature-card');
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

// --- Logika pobierania ---
const fileUrl =
  'https://github.com/imeanitsaight/just-so-u-know/releases/download/crazy/CyberVault.exe';
const version = document.getElementById('version').textContent.trim();
const fileName = 'CyberVault-' + version + '.exe';

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
// ================== GŁÓWNA LOGIKA STRONY ===========================
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Efekt 3D TILT na kartach
  VanillaTilt.init(document.querySelectorAll('.feature-card'), {
    'max': 10,
    'speed': 600,
    'glare': true,
    'max-glare': 0.1
  });

  // Efekt 3D TILT na głównych panelach
  VanillaTilt.init(document.querySelectorAll('.glass-panel'), {
    'max': 8,
    'speed': 800,
    'glare': true,
    'max-glare': 0.05
  });

  // EFEKT ODSZYFROWYWANIA NAGŁÓWKA
  const headerElement = document.querySelector('h1.gradient-text');
  const originalText = headerElement.getAttribute('data-text');
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  let decryptInterval;

  function runDecryptEffect() {
    let iteration = 0;
    clearInterval(decryptInterval);

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
  setTimeout(runDecryptEffect, 800);

  // GŁÓWNY LISTENER SCROLLA
  const mainHeader = document.querySelector('header');
  const scrollPrompt = document.querySelector('.scroll-prompt');

  window.addEventListener('scroll', () => {
    // 1. Logika animacji nagłówka
    if (window.scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }

    // 2. NOWA, POPRAWIONA LOGIKA: Ukryj prompt na stałe po pierwszym scrollu
    // Sprawdzamy, czy użytkownik przewinął stronę i czy prompt nie jest jeszcze ukryty
    if (window.scrollY > 5 && !scrollPrompt.classList.contains('hidden')) {
      // Jeśli tak, dodajemy klasę 'hidden', co uruchomi transition w CSS
      scrollPrompt.classList.add('hidden');
    }
  });
});
window.addEventListener(
  'scroll',
  () => {
    const scrollPrompt = document.querySelector('.scroll-prompt');
    if (scrollPrompt) {
      scrollPrompt.style.display = 'none';
    }
  },
  { once: true }
); // Opcja { once: true } sprawia, że ten kod wykona się tylko raz i sam się usunie.
