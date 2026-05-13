/**
 * OCTAVIO VELÁZQUEZ — PORTAFOLIO
 * main.js — Interacciones y animaciones
 */

/* ── CURSOR PERSONALIZADO ────────────────────────────────────── */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const dot      = document.getElementById('cursor-dot');
  if (!cursor || window.matchMedia('(max-width: 900px)').matches) return;

  let mx = 0, my = 0, cx = 0, cy = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateCursor() {
    cx = lerp(cx, mx, 0.15);
    cy = lerp(cy, my, 0.15);
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    raf = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover en elementos interactivos
  const hoverEls = document.querySelectorAll('a, button, .arq-project, .web-card, .explora-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });

  document.addEventListener('mousedown', () => cursor.classList.add('is-click'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('is-click'));
})();


/* ── TEMA OSCURO / CLARO ─────────────────────────────────────── */
(function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const saved  = localStorage.getItem('ov-theme');
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (saved === 'dark' || (!saved && prefers)) {
    document.documentElement.dataset.theme = 'dark';
  }

  toggle && toggle.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
    localStorage.setItem('ov-theme', isDark ? 'light' : 'dark');
  });
})();


/* ── NAVEGACIÓN ──────────────────────────────────────────────── */
(function initNav() {
  const nav     = document.getElementById('nav');
  const ham     = document.getElementById('hamburger');
  const overlay = document.getElementById('nav-overlay');
  const closeBtn= document.getElementById('nav-close');
  const body    = document.body;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

 let scrollPosition = 0;

function openMenu() {
  scrollPosition = window.scrollY;

  requestAnimationFrame(() => {

  body.classList.add('nav-open');

  body.style.position = 'fixed';
  body.style.top = `-${scrollPosition}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.width = '100%';

  ham?.setAttribute('aria-expanded', 'true');
  });
}

function closeMenu() {
  body.classList.remove('nav-open');

  body.style.position = '';
  body.style.top = '';
  body.style.left = '';
  body.style.right = '';
  body.style.width = '';

  window.scrollTo(0, scrollPosition);

  ham?.setAttribute('aria-expanded', 'false');
}

  ham     && ham.addEventListener('click', openMenu);
  overlay && overlay.addEventListener('click', closeMenu);
  closeBtn && closeBtn.addEventListener('click', closeMenu);

  // Cerrar al elegir una opción
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
})();


/* ── SCROLL REVEAL ───────────────────────────────────────────── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();


/* ── CONTADORES ANIMADOS ─────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCount(el) {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 1500;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();


/* ── CANVAS — SIMULADOR ──────────────────────────────────────── */
(function initSimCanvas() {
  const canvas = document.getElementById('sim-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const W   = canvas.width  = 320;
  const H   = canvas.height = 280;

  // Nodos de la estructura (x, y normalizados 0–1)
  const nodes = [
    { x: 0.15, y: 0.85 }, // 0 — base izq
    { x: 0.50, y: 0.85 }, // 1 — base centro
    { x: 0.85, y: 0.85 }, // 2 — base der
    { x: 0.15, y: 0.50 }, // 3 — nivel 1 izq
    { x: 0.50, y: 0.50 }, // 4 — nivel 1 centro
    { x: 0.85, y: 0.50 }, // 5 — nivel 1 der
    { x: 0.15, y: 0.18 }, // 6 — nivel 2 izq
    { x: 0.50, y: 0.18 }, // 7 — nivel 2 centro
    { x: 0.85, y: 0.18 }, // 8 — nivel 2 der
  ];

  // Elementos (pares de índices de nodos)
  const elements = [
    // Columnas
    [0, 3], [1, 4], [2, 5],
    [3, 6], [4, 7], [5, 8],
    // Vigas nivel 1
    [0, 1], [1, 2],
    // Vigas nivel 2
    [3, 4], [4, 5],
    // Vigas nivel 3 (techo)
    [6, 7], [7, 8],
  ];

  // Colores por D/C ratio simulado
  const dcRatios = [0.45, 0.62, 0.48, 0.78, 0.55, 0.41, 0.35, 0.92, 0.44, 0.29, 0.67, 0.73];
  function ratioColor(dc) {
    if (dc < 0.5) return '#4a8a6a'; // verde
    if (dc < 0.8) return '#c8a040'; // ámbar
    return '#c84040';               // rojo
  }

  let frame = 0;

  function px(n) { return { x: n.x * W, y: n.y * H }; }

  function drawAxes() {
    ctx.strokeStyle = '#2a2a28';
    ctx.lineWidth = 0.5;
    // Eje X
    ctx.beginPath(); ctx.moveTo(10, H - 10); ctx.lineTo(W - 10, H - 10); ctx.stroke();
    // Eje Y
    ctx.beginPath(); ctx.moveTo(10, H - 10); ctx.lineTo(10, 10); ctx.stroke();
    // Labels
    ctx.fillStyle = '#3a3a32';
    ctx.font = '9px DM Mono, monospace';
    ctx.fillText('X', W - 16, H - 13);
    ctx.fillText('Z', 14, 16);
  }

  function drawElements() {
    elements.forEach((el, i) => {
      const a = px(nodes[el[0]]);
      const b = px(nodes[el[1]]);
      const dc = dcRatios[i] || 0.5;
      const col = ratioColor(dc);

      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Etiqueta D/C en el centro del elemento (solo columnas)
      if (i < 6) {
        const mx = (a.x + b.x) / 2 + 4;
        const my = (a.y + b.y) / 2;
        ctx.fillStyle = col;
        ctx.font = '7px DM Mono, monospace';
        ctx.globalAlpha = 0.7;
        ctx.fillText(dc.toFixed(2), mx, my);
        ctx.globalAlpha = 1;
      }
    });
  }

  function drawNodes() {
    nodes.forEach((n, i) => {
      const p = px(n);
      const isBase = i < 3;

      // Nodo base — triángulo de apoyo
      if (isBase) {
        ctx.fillStyle = '#444440';
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - 6, p.y + 10);
        ctx.lineTo(p.x + 6, p.y + 10);
        ctx.closePath();
        ctx.fill();
      }

      // Círculo del nodo
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = isBase ? '#666660' : '#aaaaaa';
      ctx.fill();
    });
  }

  // Carga animada (línea de construcción)
  let buildProgress = 0;

  function drawForce() {
    // Carga distribuida en viga superior izq-centro
    const a = px(nodes[6]);
    const b = px(nodes[7]);
    const arrows = 4;
    ctx.strokeStyle = '#7aaa8a';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.6;
    for (let i = 0; i <= arrows; i++) {
      const t = i / arrows;
      const ax = a.x + (b.x - a.x) * t;
      ctx.beginPath();
      ctx.moveTo(ax, a.y - 24);
      ctx.lineTo(ax, a.y - 6);
      ctx.stroke();
      // Punta de flecha
      ctx.beginPath();
      ctx.moveTo(ax - 3, a.y - 12);
      ctx.lineTo(ax, a.y - 6);
      ctx.lineTo(ax + 3, a.y - 12);
      ctx.stroke();
    }
    // Línea horizontal de carga
    ctx.beginPath();
    ctx.moveTo(a.x, a.y - 24);
    ctx.lineTo(b.x, a.y - 24);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawLegend() {
    const items = [
      { col: '#4a8a6a', label: 'D/C < 0.5' },
      { col: '#c8a040', label: 'D/C 0.5–0.8' },
      { col: '#c84040', label: 'D/C > 0.8' },
    ];
    let lx = W - 100, ly = 16;
    ctx.font = '7px DM Mono, monospace';
    items.forEach(item => {
      ctx.fillStyle = item.col;
      ctx.fillRect(lx, ly, 8, 8);
      ctx.fillStyle = '#5a5a52';
      ctx.fillText(item.label, lx + 12, ly + 7);
      ly += 14;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawAxes();
    drawForce();
    drawElements();
    drawNodes();
    drawLegend();

    // Timestamp
    ctx.fillStyle = '#2a2a28';
    ctx.font = '7px DM Mono, monospace';
    ctx.fillText('NTC-RSEE · ACI 318', 12, H - 16);

    frame++;
    requestAnimationFrame(draw);
  }

  // Iniciar cuando sea visible
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      draw();
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(canvas);
})();


/* ── FORMULARIO DE CONTACTO ──────────────────────────────────── */
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.innerHTML;

    btn.textContent = 'Enviando…';
    btn.disabled = true;

    // Simulación — aquí conectar EmailJS o similar
    setTimeout(() => {
      btn.textContent = 'Mensaje enviado ✓';
      btn.style.background = 'var(--accent)';
      form.reset();
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.background = '';
      }, 3500);
    }, 1400);
  });
})();


/* ── SCROLL SUAVE para anclas ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('nav')?.offsetHeight || 64;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
