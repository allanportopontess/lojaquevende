/* Comportamentos compartilhados. Cada página define <body data-raiz="../"> com o caminho até a raiz do site. */
(function () {
  var S = window.SITE || {};
  var raiz = document.body.getAttribute('data-raiz') || '';
  var LQV = window.LQV = {};

  /* ---------- Meta Pixel ---------- */
  if (S.META_PIXEL_ID) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', S.META_PIXEL_ID);
    fbq('track', 'PageView');
  }
  LQV.pixel = function () { if (window.fbq) fbq.apply(null, arguments); };

  /* ---------- UTMs: guarda na sessão e repassa nos links ---------- */
  var CHAVES = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'];
  var qs = new URLSearchParams(location.search);
  LQV.tracking = {};
  CHAVES.forEach(function (k) {
    var v = qs.get(k);
    try { if (v) sessionStorage.setItem('lqv_' + k, v); else v = sessionStorage.getItem('lqv_' + k); } catch (e) {}
    if (v) LQV.tracking[k] = v;
  });
  LQV.comTracking = function (href, extra) {
    var u = new URL(href, location.href);
    Object.keys(LQV.tracking).forEach(function (k) { u.searchParams.set(k, LQV.tracking[k]); });
    Object.keys(extra || {}).forEach(function (k) { if (extra[k]) u.searchParams.set(k, extra[k]); });
    return u.toString();
  };

  /* ---------- Ícones ---------- */
  var ICONES = {
    instagram: '<path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21.9 8c-.1-1.6-.4-3-1.6-4.2S17.6 2.2 16 2.1C14.4 2 9.6 2 8 2.1 6.4 2.2 5 2.5 3.8 3.7S2.2 6.4 2.1 8C2 9.6 2 14.4 2.1 16c.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6.4.1 8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6.4 0-8zm-2.1 9.8a3.2 3.2 0 0 1-1.8 1.8c-1.3.5-4.2.4-5.9.4s-4.7.1-5.9-.4a3.2 3.2 0 0 1-1.8-1.8c-.5-1.3-.4-4.2-.4-5.8s-.1-4.6.4-5.8a3.2 3.2 0 0 1 1.8-1.8c1.3-.5 4.2-.4 5.9-.4s4.7-.1 5.9.4a3.2 3.2 0 0 1 1.8 1.8c.5 1.3.4 4.2.4 5.8s.1 4.6-.4 5.8z"/>',
    whatsapp: '<path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8.2 8.2 0 0 1-4.1-3.6c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1.1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6zM20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.2 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4A11.8 11.8 0 0 0 20.5 3.5z"/>',
    email: '<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.2-8 5-8-5V6l8 5 8-5z"/>'
  };
  var CONTATOS = {
    whatsapp: S.WHATSAPP ? 'https://wa.me/' + S.WHATSAPP.replace(/\D/g, '') + '?text=' + encodeURIComponent('Olá, Allan! Vim pelo site e quero falar sobre a minha loja.') : '',
    instagram: S.INSTAGRAM || '',
    email: S.EMAIL ? 'mailto:' + S.EMAIL : ''
  };
  // Botões com data-contato="whatsapp|instagram|email": recebem o link ou somem
  document.querySelectorAll('[data-contato]').forEach(function (a) {
    var url = CONTATOS[a.getAttribute('data-contato')];
    if (!url) { a.hidden = true; return; }
    a.href = url;
    if (url.indexOf('mailto:') !== 0) { a.target = '_blank'; a.rel = 'noopener'; }
    a.addEventListener('click', function () { LQV.pixel('track', 'Contact', { canal: a.getAttribute('data-contato') }); });
  });
  // Qualquer contêiner com data-contato-grupo some se nenhum contato estiver preenchido
  document.querySelectorAll('[data-contato-grupo]').forEach(function (g) {
    if (!CONTATOS.whatsapp && !CONTATOS.instagram && !CONTATOS.email) g.hidden = true;
  });
  document.querySelectorAll('.redes').forEach(function (nav) {
    ['instagram', 'whatsapp', 'email'].forEach(function (k) {
      if (!CONTATOS[k]) return;
      var a = document.createElement('a');
      a.href = CONTATOS[k]; a.setAttribute('aria-label', k);
      if (k !== 'email') { a.target = '_blank'; a.rel = 'noopener'; }
      a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONES[k] + '</svg>';
      nav.appendChild(a);
    });
  });

  /* ---------- Produtos ---------- */
  var ARTE_PLANTA = '<svg viewBox="0 0 200 150" aria-hidden="true"><defs><radialGradient id="zq" cx="78%" cy="92%" r="70%"><stop offset="0" stop-color="#FF9F01" stop-opacity=".55"/><stop offset="1" stop-color="#FF9F01" stop-opacity="0"/></radialGradient></defs><rect x="10" y="10" width="180" height="130" rx="2" fill="#141414"/><rect x="10" y="10" width="180" height="130" fill="url(#zq)"/><rect x="10" y="10" width="180" height="130" fill="none" stroke="#F3F3F3" stroke-width="3"/><rect x="138" y="136" width="36" height="8" fill="#1A1A1A"/><rect x="20" y="20" width="56" height="8" fill="none" stroke="#A7A7A7" stroke-width="1.5"/><rect x="20" y="20" width="8" height="56" fill="none" stroke="#A7A7A7" stroke-width="1.5"/><circle cx="112" cy="78" r="14" fill="none" stroke="#A7A7A7" stroke-width="1.5"/><rect x="92" y="124" width="40" height="7" fill="#F3F3F3"/><rect x="164" y="36" width="16" height="40" fill="none" stroke="#A7A7A7" stroke-width="1.5"/><circle cx="50" cy="50" r="9" fill="#5b7c99"/><path d="M156 150 C156 118 146 104 126 94 C114 88 116 70 150 60" fill="none" stroke="#FF9F01" stroke-width="2.5" stroke-dasharray="6 5"/></svg>';
  var ARTE_CADEADO = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
  document.querySelectorAll('[data-produtos]').forEach(function (box) {
    (S.PRODUCTS || []).forEach(function (p) {
      var ativo = p.status === 'ativo';
      var el = document.createElement(ativo ? 'a' : 'div');
      el.className = 'produto' + (ativo ? '' : ' breve');
      if (ativo) {
        el.href = raiz + p.href;
        el.addEventListener('click', function () {
          el.href = LQV.comTracking(raiz + p.href);
          LQV.pixel('trackCustom', 'CliqueProduto', { produto: p.slug });
        });
      } else el.setAttribute('aria-disabled', 'true');
      var arte = !ativo ? ARTE_CADEADO : p.art === 'capa' ? '<img class="capa" src="' + raiz + 'img/capa-loja-que-vende-p.webp" alt="Capa do curso ' + p.title + '" loading="lazy">' : ARTE_PLANTA;
      el.innerHTML = '<div class="arte">' + arte + '</div>' +
        '<span class="selo">' + p.badge + '</span>' +
        '<div class="corpo"><h3>' + p.title + '</h3><p>' + p.text + '</p>' +
        (ativo ? '<span class="ir">' + (p.cta || 'Saiba mais') + ' →</span>' : '') + '</div>';
      box.appendChild(el);
    });
  });

  /* ---------- Botões de compra (data-checkout): link Hotmart + UTMs + InitiateCheckout ---------- */
  LQV.checkout = function () {
    if (!S.CHECKOUT_URL) return '';
    var u = new URL(S.CHECKOUT_URL), t = LQV.tracking;
    if (t.utm_source) u.searchParams.set('src', t.utm_source);
    if (t.utm_content) u.searchParams.set('sck', t.utm_content);
    Object.keys(t).forEach(function (k) { u.searchParams.set(k, t[k]); });
    return u.toString();
  };
  document.querySelectorAll('[data-checkout]').forEach(function (a) {
    var url = LQV.checkout();
    if (!url) { a.hidden = true; return; }
    a.href = url;
    a.addEventListener('click', function () {
      LQV.pixel('track', 'InitiateCheckout', { content_name: 'Loja que Vende', currency: 'BRL', value: Number(S.PRECO_POR) || undefined });
    });
  });
  // Preço (data-preco="de|por|parcelas"): esconde o bloco se não configurado
  document.querySelectorAll('[data-preco]').forEach(function (el) {
    var v = { de: S.PRECO_DE, por: S.PRECO_POR, parcelas: S.PARCELAS }[el.getAttribute('data-preco')];
    if (v) el.querySelector('[data-valor]').textContent = v; else el.hidden = true;
  });

  /* ---------- Cronômetro da oferta (data real em SITE.OFERTA_ATE) ---------- */
  (function () {
    var fim = S.OFERTA_ATE ? new Date(S.OFERTA_ATE).getTime() : 0;
    var alvos = document.querySelectorAll('[data-cronometro]');
    var blocos = document.querySelectorAll('[data-com-cronometro]');
    if (!alvos.length && !blocos.length) return;
    function dois(n) { return String(n).padStart(2, '0'); }
    function tick() {
      var r = fim - Date.now();
      if (!fim || r <= 0) { blocos.forEach(function (b) { b.hidden = true; }); document.body.classList.remove('tem-barra'); return; }
      document.body.classList.add('tem-barra');
      var t = Math.floor(r / 1000), d = Math.floor(t / 86400), h = Math.floor(t % 86400 / 3600), m = Math.floor(t % 3600 / 60), sg = t % 60;
      alvos.forEach(function (el) {
        el.querySelector('[data-d]').textContent = dois(d);
        el.querySelector('[data-h]').textContent = dois(h);
        el.querySelector('[data-m]').textContent = dois(m);
        el.querySelector('[data-s]').textContent = dois(sg);
      });
      setTimeout(tick, 1000);
    }
    tick();
  })();

  /* ---------- Foto de fundo do hero (só aparece se o arquivo existir) ---------- */
  document.querySelectorAll('.bgfoto[data-src]').forEach(function (d) {
    var src = window.innerWidth < 768 && d.getAttribute('data-src-mobile') ? d.getAttribute('data-src-mobile') : d.getAttribute('data-src');
    var img = new Image();
    img.onload = function () {
      d.style.backgroundImage = 'url(' + src + ')';
      d.classList.add('ok');
      var hero = d.closest('.hero, .hero-curso');
      hero.classList.add('com-foto');
      var arte = hero.querySelector('.arte'); if (arte) arte.classList.add('some');
    };
    img.src = src;
  });

  /* ---------- Menu: some ao descer, volta com vidro ao subir ---------- */
  var menu = document.querySelector('.menu');
  var cta = document.querySelector('.cta-fixo');
  var ultima = window.scrollY;
  window.addEventListener('scroll', function () {
    var atual = window.scrollY;
    if (menu && !menu.classList.contains('aberto')) {
      if (atual > ultima && atual > 120) menu.classList.remove('menu-ativo', 'blur');
      else menu.classList.add('menu-ativo', 'blur');
      if (atual <= 0) menu.classList.remove('blur');
    }
    ultima = atual;
    if (cta) {
      var visivel = false;
      document.querySelectorAll('[data-esconde-cta]').forEach(function (el) {
        var r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) visivel = true;
      });
      cta.classList.toggle('on', atual > 600 && !visivel);
    }
  }, { passive: true });
  var burger = document.querySelector('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      burger.setAttribute('aria-expanded', aberto);
    });
    menu.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('aberto'); burger.setAttribute('aria-expanded', 'false'); });
    });
  }
  // Item do menu ativo conforme a seção visível
  var navLinks = document.querySelectorAll('.nav a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var mapa = {};
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove('on'); });
        if (mapa[e.target.id]) mapa[e.target.id].classList.add('on');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (s) { mapa[s.id] = a; obs.observe(s); }
    });
  }

  /* ---------- Animação de entrada ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visivel'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    document.querySelectorAll('.surge').forEach(function (el) { io.observe(el); });
  } else document.querySelectorAll('.surge').forEach(function (el) { el.classList.add('visivel'); });

  document.querySelectorAll('[data-ano]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
