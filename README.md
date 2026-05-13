# Portafolio — Octavio Velázquez Ramírez

**Arquitectura + Tecnología**  
Portafolio web profesional para perfil híbrido arquitectura / desarrollo web.

## Stack
- HTML5 semántico
- CSS3 (variables, grid, clamp, sin frameworks)
- JavaScript puro (sin dependencias)

## Estructura
```
portafolio-ov/
├── index.html          ← Página principal
├── css/
│   └── style.css       ← Todo el sistema de diseño
├── js/
│   └── main.js         ← Cursor, animaciones, canvas, tema
└── img/
    ├── favicon.svg
    └── projects/
        ├── escuela/    ← Agrega aquí imágenes: hero.jpg, 01.jpg, 02.jpg…
        ├── clinica/
        ├── biblioteca/
        └── hacienda/
```

## Despliegue en GitHub Pages
1. Sube la carpeta a un repositorio en GitHub
2. Ve a **Settings → Pages → Branch: main / root**
3. Listo — estará en `https://[usuario].github.io/[repo]/`

## Personalización rápida

### Agregar imágenes a proyectos
En `index.html`, busca el comentario `<!-- Para agregar imagen real -->` y reemplaza el `div.img-placeholder` con:
```html
<img src="img/projects/escuela/hero.jpg" alt="Descripción del proyecto" loading="lazy">
```

### Conectar formulario de contacto
El formulario usa [EmailJS](https://emailjs.com) (gratuito).
En `js/main.js`, sustituye el `setTimeout` en `initForm()` por:
```js
emailjs.init('TU_PUBLIC_KEY');
emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', form);
```

### Cambiar correo y LinkedIn
En `index.html` busca `tu@correo.com` y `linkedin.com/in/octaviovelazquez` y sustitúyelos.

### Colores de acento
En `css/style.css`, cambia `--accent: #5a7a6a` por el color que prefieras.
El modo oscuro cambia automáticamente a `--accent: #7aaa8a`.

## Features incluidas
- ✅ Cursor personalizado tipo CAD (crosshair)
- ✅ Modo oscuro / claro con toggle + respeta preferencia del sistema
- ✅ Animaciones de entrada con IntersectionObserver
- ✅ Canvas animado del simulador estructural (ACI 318 / NTC)
- ✅ Contadores animados de estadísticas
- ✅ Responsive completo (mobile first)
- ✅ SEO básico (meta, OG, Twitter Card)
- ✅ Scroll suave en todos los anclas
- ✅ Menú hamburger en mobile
- ✅ Formulario con feedback visual
- ✅ Sin dependencias externas (solo Google Fonts)
