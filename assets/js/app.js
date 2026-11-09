/**
 * DAVID TIMOTEUS — PORTFOLIO INTERACTION & TELEMETRY ENGINE
 * Zero-dependency ES6+ module: Scroll reveals, Spotlight cursor,
 * Live GitHub API sync, Architecture Inspector Modal, Command Palette (Ctrl+K),
 * Curated Red Theme Switcher, and Bilingual (ID/EN) Engine.
 */

(function () {
  'use strict';

  /* ========================================================================
     1. CASE STUDY ARCHITECTURAL DATA (STAR / CAR STANDARD)
     ======================================================================== */
  const CASE_STUDIES = {
    motaris: {
      index: 'CASE_01 // ENTERPRISE POS & ERP',
      title: 'Motaris — Sistem Informasi Sparepart & POS Bengkel Penarukan Motor',
      subtitle: 'Laravel 13 • MySQL 8.0 • Tailwind CSS v4 • PHPUnit (57 Automated Scenarios)',
      problem:
        'Operasional front-desk Bengkel Penarukan Motor (Kepanjen, Malang) sebelumnya berjalan manual untuk ribuan SKU suku cadang dengan 3 skema harga berbeda (Ritel, Sales, Grosir), pencatatan piutang tempo, serta sering mengalami lost sales saat stok suku cadang utama habis.',
      architecture: [
        'Arsitektur Kasir-First berbasis transaksi database atomik (ACID) pada MySQL 8.0 untuk menjamin konsistensi mutasi stok saat checkout kasir dan penerimaan Purchase Order (PO) supplier.',
        'Rule-Based Specification Matching Engine: Algoritma pencocokan atribut teknis suku cadang secara transparan untuk merekomendasikan suku cadang alternatif yang kompatibel saat stok utama kosong.',
        'Multi-Tier Pricing & Credit Ledger: Kalkulasi otomatis harga Ritel, Sales, dan Grosir serta manajemen termin angsuran piutang pelanggan.',
        'Automated Quality Gate: Diuji melalui 57 skenario pengujian otomatis PHPUnit dengan metode Equivalence Partitioning (EP) & Boundary Value Analysis (BVA).'
      ],
      metrics: [
        { label: 'Kecepatan Transaksi Kasir', value: '< 30 dtk (dari 3–5 menit)' },
        { label: 'Automated Test Suite', value: '57/57 Pass (100% Black-Box)' },
        { label: 'Skor UAT Pengguna', value: '96.6% (Sangat Layak)' },
        { label: 'Efisiensi Laporan Bulanan', value: '99% Lebih Cepat' }
      ],
      repoUrl: 'https://github.com/DavidTimoteus'
    },
    myduit: {
      index: 'CASE_02 // OFFLINE-FIRST PWA & AI OCR',
      title: 'PWA-MyDuit & MyDuit — Smart Personal Finance Tracker + Gemini AI OCR',
      subtitle: 'Progressive Web App • Service Workers • IndexedDB • Google Gemini Vision AI •Apps Script',
      problem:
        'Pencatatan keuangan harian sering gagal dipertahankan pengguna karena friksi input manual setiap kali selesai berbelanja serta ketergantungan pada koneksi internet yang stabil.',
      architecture: [
        'Offline-First PWA Architecture: Memanfaatkan Service Worker caching dan penyimpanan lokal sehingga aplikasi dapat di-install ke layar utama ponsel/desktop dan beroperasi instan tanpa latensi jaringan.',
        'Automated Receipt OCR via Google Gemini AI: Mengintegrasikan model multimodal Gemini untuk mengekstrak item belanja, nominal, dan kategori otomatis langsung dari foto struk belanja.',
        'Dual Ecosystem: Tersedia dalam varian PWA mandiri (Firebase/Local sync) serta varian serverless berbasis Google Apps Script Web App.'
      ],
      metrics: [
        { label: 'Arsitektur Klien', value: '100% Offline-Capable PWA' },
        { label: 'Ekstraksi Struk', value: 'Gemini Vision AI OCR' },
        { label: 'Instalasi Perangkat', value: 'Zero App-Store Friction' },
        { label: 'Antarmuka UI', value: 'Tactile Responsive UI' }
      ],
      repoUrl: 'https://github.com/DavidTimoteus/PWA-MyDuit'
    },
    jhar: {
      index: 'CASE_03 // EDTECH ASSESSMENT ENGINE',
      title: 'Jhâr-Ajhârân — Offline-First CAT CPNS & BUMN Simulation Platform',
      subtitle: 'Python • JavaScript PWA • Tiered Tactical Hint Engine • Offline Storage',
      problem:
        'Peserta seleksi CAT (SKD CPNS, RBB BUMN, dan TOEIC/IELTS) membutuhkan simulator ujian yang ringan, dapat diakses tanpa kuota internet, dan melatih penalaran tanpa langsung membocorkan kunci jawaban.',
      architecture: [
        'Tiered Tactical Hints (Petunjuk Taktis Bertingkat): Sistem bantuan bertahap yang memandu logika pengerjaan soal langkah demi langkah sebelum menampilkan pembahasan penuh.',
        'Zero-Latency Exam Engine: Simulasi timer real-time dan evaluasi skor ambang batas (passing grade) yang berjalan sepenuhnya di sisi klien (offline-first).',
        'Pipeline pengolahan bank soal terstruktur menggunakan Python untuk validasi skema soal dan bobot nilai.'
      ],
      metrics: [
        { label: 'Mode Eksekusi', value: 'Offline-First PWA' },
        { label: 'Metode Pedagogi', value: '3-Tier Tactical Hints' },
        { label: 'Cakupan Modul', value: 'SKD CPNS • RBB BUMN • English' },
        { label: 'Latensi Navigasi Soal', value: '< 10 ms (Client-Side)' }
      ],
      repoUrl: 'https://github.com/DavidTimoteus/jhar-ajharan'
    },
    routewise: {
      index: 'CASE_04 // MOBILE × ENTERPRISE ERP',
      title: 'Route Wise — Mobile Fleet & Resource Planning Integrated with Odoo ERP',
      subtitle: 'Flutter • Dart • Odoo ERP Integration • REST / XML-RPC • Data Control',
      problem:
        'Operasional distribusi dan manajemen rute lapangan membutuhkan sinkronisasi data langsung dengan sistem Enterprise Resource Planning (ERP) pusat agar inventaris dan jadwal pengiriman selalu akurat.',
      architecture: [
        'Cross-Platform Mobile Client: Dibangun menggunakan Dart & Flutter untuk performa native 60fps di perangkat mobile personel lapangan.',
        'Odoo ERP Bridge: Terintegrasi langsung dengan modul Perencanaan Sumber Daya (Odoo ERP) untuk pertukaran data rute, status pengiriman, dan alokasi armada.',
        'Dedicated Data Control Interface: Dilengkapi antarmuka kontrol data pendamping (Route_Wise-DataControl) untuk pemantauan operasional.'
      ],
      metrics: [
        { label: 'Mobile Framework', value: 'Flutter (Dart Native)' },
        { label: 'Enterprise Backend', value: 'Odoo ERP Connected' },
        { label: 'Sinkronisasi Data', value: 'Bidirectional ERP Sync' },
        { label: 'Arsitektur', value: 'Modular Clean Architecture' }
      ],
      repoUrl: 'https://github.com/DavidTimoteus/route_wise'
    }
  };

  /* ========================================================================
     2. CURATED FALLBACK REPOSITORIES (MERGED WITH LIVE GITHUB API)
     ======================================================================== */
  const FALLBACK_REPOS = [
    {
      name: 'PWA-MyDuit',
      description: 'Aplikasi web progresif (PWA) pencatat keuangan harian berarsitektur offline-first dengan pemindaian struk belanja otomatis berbasis OCR.',
      language: 'JavaScript',
      html_url: 'https://github.com/DavidTimoteus/PWA-MyDuit',
      topics: ['pwa', 'finance', 'ocr', 'firebase']
    },
    {
      name: 'jhar-ajharan',
      description: 'Jhâr-Ajhârân — PWA latihan CAT CPNS & BUMN offline dengan sistem hint taktik bertingkat (SKD, RBB BUMN, TOEIC/IELTS-ready).',
      language: 'Python',
      html_url: 'https://github.com/DavidTimoteus/jhar-ajharan',
      topics: ['edtech', 'pwa', 'python', 'cat-simulator']
    },
    {
      name: 'route_wise',
      description: 'Aplikasi mobile berbasis Dart & Flutter yang terintegrasi dengan ERP Odoo untuk perencanaan sumber daya dan optimasi rute.',
      language: 'Dart',
      html_url: 'https://github.com/DavidTimoteus/route_wise',
      topics: ['flutter', 'dart', 'odoo-erp']
    },
    {
      name: 'MyDuit',
      description: 'Aplikasi manajemen keuangan pribadi berbasis Google Apps Script Web App, Tailwind CSS, dan analisis cerdas Google Gemini AI.',
      language: 'HTML / GAS',
      html_url: 'https://github.com/DavidTimoteus/MyDuit',
      topics: ['gemini-ai', 'apps-script', 'tailwind']
    },
    {
      name: 'bolbolaku',
      description: 'Aplikasi jadwal pertandingan sepak bola pria berbasis PWA ringan dengan konversi waktu WIB otomatis tanpa ketergantungan backend.',
      language: 'JavaScript',
      html_url: 'https://github.com/DavidTimoteus/bolbolaku',
      topics: ['pwa', 'javascript', 'zero-backend']
    },
    {
      name: 'klickcare',
      description: 'Sistem manajemen layanan kesehatan dan informasi klinik berbasis web dengan arsitektur PHP terstruktur.',
      language: 'PHP',
      html_url: 'https://github.com/DavidTimoteus/klickcare',
      topics: ['healthcare', 'php', 'web-system']
    }
  ];

  /* ========================================================================
     3. BILINGUAL DICTIONARY (ID / EN)
     ======================================================================== */
  const I18N = {
    id: {
      nav_overview: 'Ringkasan',
      nav_work: 'Studi Kasus',
      nav_repos: 'Eksplorasi Repo',
      nav_stack: 'Kompetensi',
      nav_trajectory: 'Rekam Jejak',
      nav_contact: 'Kontak',
      telemetry_badge: 'TERSEDIA UNTUK HIRE & KOLABORASI',
      telemetry_text: 'Full-Stack Software Engineer • Malang, ID (UTC+7)',
      hero_cta_primary: 'Lihat Studi Kasus Produksi',
      hero_cta_secondary: 'Bedah Kompetensi & CV',
      proof_1_label: 'Waktu Transaksi POS (Motaris)',
      proof_2_label: 'Skor UAT Kelayakan Sistem',
      proof_3_label: 'Skenario PHPUnit Otomatis',
      proof_4_label: 'Repositori & Proyek Aktif',
      portrait_mode_editorial: 'Mode: Studio Crimson',
      portrait_mode_original: 'Mode: Pas Foto Asli',
      toast_theme: 'Tema visual diperbarui: ',
      toast_email: 'Alamat email berhasil disalin ke clipboard!'
    },
    en: {
      nav_overview: 'Overview',
      nav_work: 'Case Studies',
      nav_repos: 'Repositories',
      nav_stack: 'Competencies',
      nav_trajectory: 'Trajectory',
      nav_contact: 'Contact',
      telemetry_badge: 'OPEN TO FULL-TIME & COLLABORATION',
      telemetry_text: 'Full-Stack Software Engineer • Malang, ID (UTC+7)',
      hero_cta_primary: 'Explore Production Case Studies',
      hero_cta_secondary: 'Inspect Stack & Resume',
      proof_1_label: 'POS Checkout Latency (Motaris)',
      proof_2_label: 'System UAT Acceptance Score',
      proof_3_label: 'Automated PHPUnit Scenarios',
      proof_4_label: 'Active Repositories & Systems',
      portrait_mode_editorial: 'Mode: Studio Crimson',
      portrait_mode_original: 'Mode: Original ID Photo',
      toast_theme: 'Visual theme switched to: ',
      toast_email: 'Email address copied to clipboard!'
    }
  };

  let currentLang = localStorage.getItem('dt_portfolio_lang') || 'id';
  const THEMES = ['obsidian-crimson', 'velvet-crimson', 'swiss-red'];
  const THEME_LABELS = {
    'obsidian-crimson': 'Obsidian Crimson (Default Dark)',
    'velvet-crimson': 'Velvet Crimson (Rich Red Dark)',
    'swiss-red': 'Swiss Paper & Red (Daylight Editorial)'
  };
  let currentTheme = localStorage.getItem('dt_portfolio_theme') || 'obsidian-crimson';
  let isEditorialPortrait = true;

  /* ========================================================================
     4. INITIALIZATION & DOM BINDINGS
     ======================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme, false);
    applyLanguage(currentLang);
    initScrollTelemetry();
    initRevealObserver();
    initSpotlightCards();
    initProjectFilters();
    initArchitectureModal();
    initPortraitToggle();
    initMobileNav();
    initCommandPalette();
    initCopyEmail();
    loadGitHubRepos();
  });

  /* Toast Helper */
  function showToast(message) {
    const toast = document.getElementById('sys-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2800);
  }

  /* Theme Engine */
  function applyTheme(themeName, notify = true) {
    if (!THEMES.includes(themeName)) themeName = 'obsidian-crimson';
    currentTheme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('dt_portfolio_theme', themeName);
    const labelEl = document.getElementById('theme-label');
    if (labelEl) {
      const shortNames = {
        'obsidian-crimson': 'Obsidian',
        'velvet-crimson': 'Velvet Red',
        'swiss-red': 'Swiss Light'
      };
      labelEl.textContent = shortNames[themeName];
    }
    if (notify) {
      showToast(I18N[currentLang].toast_theme + THEME_LABELS[themeName]);
    }
  }

  const themeBtn = document.getElementById('theme-cycle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nextIndex = (THEMES.indexOf(currentTheme) + 1) % THEMES.length;
      applyTheme(THEMES[nextIndex], true);
    });
  }

  /* Language Engine */
  function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'id';
    localStorage.setItem('dt_portfolio_lang', currentLang);
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) langBtn.textContent = currentLang.toUpperCase();

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (I18N[currentLang][key]) {
        el.textContent = I18N[currentLang][key];
      }
    });

    document.querySelectorAll('[data-lang-id][data-lang-en]').forEach((el) => {
      el.innerHTML =
        currentLang === 'en'
          ? el.getAttribute('data-lang-en')
          : el.getAttribute('data-lang-id');
    });
  }

  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLanguage(currentLang === 'id' ? 'en' : 'id');
    });
  }

  /* ========================================================================
     5. SCROLL PROGRESS BAR & ACTIVE SECTION SPY
     ======================================================================== */
  function initScrollTelemetry() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      if (progressBar) progressBar.style.width = pct.toFixed(1) + '%';

      let currentSectionId = '';
      sections.forEach((sec) => {
        const top = sec.offsetTop - 160;
        if (scrollTop >= top) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === '#' + currentSectionId) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ========================================================================
     6. INTERSECTION OBSERVER SCROLL REVEAL & METRIC COUNTERS
     ======================================================================== */
  function initRevealObserver() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            const counter = entry.target.querySelector('[data-count]');
            if (counter && !counter.dataset.counted) {
              animateCounter(counter);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));

    // Also observe standalone counters
    document.querySelectorAll('[data-count]').forEach((counter) => {
      animateCounter(counter);
    });
  }

  function animateCounter(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = 'true';
    const target = parseFloat(el.getAttribute('data-count'));
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = (target * eased).toFixed(decimals);
      el.innerHTML = `${prefix}${current}<span class="unit">${suffix}</span>`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  /* ========================================================================
     7. SPOTLIGHT RADIAL HOVER TRACKING ON CARDS
     ======================================================================== */
  function initSpotlightCards() {
    const cards = document.querySelectorAll('.bento-card, .project-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  /* ========================================================================
     8. PORTRAIT STUDIO COMPARISON TOGGLE (EDITORIAL VS ORIGINAL)
     ======================================================================== */
  function initPortraitToggle() {
    const toggleBtn = document.getElementById('portrait-mode-toggle');
    const imgEl = document.getElementById('hero-portrait-img');
    const sourceWebp = document.getElementById('hero-portrait-webp');

    if (!toggleBtn || !imgEl) return;

    toggleBtn.addEventListener('click', () => {
      isEditorialPortrait = !isEditorialPortrait;
      if (isEditorialPortrait) {
        if (sourceWebp) sourceWebp.srcset = 'assets/img/profile-editorial.webp';
        imgEl.src = 'assets/img/profile-editorial-opt.jpg';
        toggleBtn.textContent = I18N[currentLang].portrait_mode_editorial;
      } else {
        if (sourceWebp) sourceWebp.srcset = 'assets/img/profile-original.jpg';
        imgEl.src = 'assets/img/profile-original.jpg';
        toggleBtn.textContent = I18N[currentLang].portrait_mode_original;
      }
    });
  }

  /* ========================================================================
     9. PROJECT CATEGORY FILTER
     ======================================================================== */
  function initProjectFilters() {
    const buttons = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('.project-card[data-category]');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        buttons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        cards.forEach((card) => {
          const cats = card.getAttribute('data-category') || '';
          if (filter === 'all' || cats.includes(filter)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ========================================================================
     10. CASE STUDY ARCHITECTURE INSPECTOR MODAL
     ======================================================================== */
  function initArchitectureModal() {
    const backdrop = document.getElementById('arch-modal-backdrop');
    const closeBtn = document.getElementById('arch-modal-close');
    const triggers = document.querySelectorAll('[data-inspect-case]');

    if (!backdrop) return;

    function openCaseModal(caseKey) {
      const data = CASE_STUDIES[caseKey];
      if (!data) return;

      document.getElementById('modal-case-index').textContent = data.index;
      document.getElementById('modal-case-title').textContent = data.title;
      document.getElementById('modal-case-subtitle').textContent = data.subtitle;
      document.getElementById('modal-case-problem').textContent = data.problem;

      const archList = document.getElementById('modal-case-arch');
      archList.innerHTML = data.architecture
        .map((item) => `<li style="margin-bottom: 0.55rem; color: var(--text-secondary); font-size: 0.9rem;">${item}</li>`)
        .join('');

      const metricsGrid = document.getElementById('modal-case-metrics');
      metricsGrid.innerHTML = data.metrics
        .map(
          (m) => `
          <div style="padding: 0.75rem; border-radius: 6px; background: var(--bg-canvas); border: 1px solid var(--border-subtle);">
            <div style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase;">${m.label}</div>
            <div style="font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--red-bright); margin-top: 0.2rem;">${m.value}</div>
          </div>`
        )
        .join('');

      const repoLink = document.getElementById('modal-case-repo');
      if (repoLink) repoLink.href = data.repoUrl;

      backdrop.classList.add('is-open');
      backdrop.setAttribute('aria-hidden', 'false');
    }

    function closeCaseModal() {
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
    }

    triggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        openCaseModal(btn.getAttribute('data-inspect-case'));
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeCaseModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeCaseModal();
    });
  }

  /* ========================================================================
     11. LIVE GITHUB API REPOSITORY SYNC WITH CURATED FALLBACK
     ======================================================================== */
  async function loadGitHubRepos() {
    const container = document.getElementById('github-repo-grid');
    const statusEl = document.getElementById('github-sync-status');
    if (!container) return;

    function renderRepos(repos, isLive) {
      container.innerHTML = repos
        .slice(0, 6)
        .map(
          (repo) => `
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card">
          <div>
            <div class="repo-name">
              <span>${repo.name}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
            <p class="repo-desc" style="margin-top: 0.55rem;">
              ${repo.description || 'Repositori pengembangan perangkat lunak & eksplorasi sistem oleh David Timoteus.'}
            </p>
          </div>
          <div class="repo-meta">
            <span><span class="lang-dot"></span>${repo.language || 'Full-Stack'}</span>
            <span>github.com/DavidTimoteus</span>
          </div>
        </a>
      `
        )
        .join('');

      if (statusEl) {
        statusEl.textContent = isLive
          ? 'LIVE SYNC // api.github.com/users/DavidTimoteus'
          : 'VERIFIED SNAPSHOT // github.com/DavidTimoteus';
      }
    }

    // Initial instant render from verified snapshot
    renderRepos(FALLBACK_REPOS, false);

    try {
      const response = await fetch('https://api.github.com/users/DavidTimoteus/repos?sort=updated&per_page=12');
      if (!response.ok) return;
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const filtered = data.filter(
          (r) => !r.fork && r.name !== 'DavidTimoteus' && r.name !== 'Portofolioku' && r.description
        );
        if (filtered.length >= 4) {
          renderRepos(filtered, true);
        }
      }
    } catch (_) {
      // Fallback already rendered cleanly
    }
  }

  /* ========================================================================
     12. MOBILE NAVIGATION DRAWER
     ======================================================================== */
  function initMobileNav() {
    const btn = document.getElementById('mobile-menu-btn');
    const navList = document.getElementById('nav-links-list');
    if (!btn || !navList) return;

    btn.addEventListener('click', () => {
      const open = navList.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });

    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navList.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ========================================================================
     13. INTERACTIVE COMMAND PALETTE (CTRL+K / CMD+K)
     ======================================================================== */
  function initCommandPalette() {
    const backdrop = document.getElementById('cmd-modal-backdrop');
    const triggerBtn = document.getElementById('cmd-trigger-btn');
    const input = document.getElementById('cmd-search-input');
    const items = Array.from(document.querySelectorAll('.cmd-item'));

    if (!backdrop || !input) return;

    function openCmd() {
      backdrop.classList.add('is-open');
      backdrop.setAttribute('aria-hidden', 'false');
      input.value = '';
      filterCmd('');
      setTimeout(() => input.focus(), 50);
    }

    function closeCmd() {
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
    }

    function filterCmd(query) {
      const q = query.toLowerCase().trim();
      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'flex' : 'none';
      });
    }

    if (triggerBtn) triggerBtn.addEventListener('click', openCmd);

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (backdrop.classList.contains('is-open')) {
          closeCmd();
        } else {
          openCmd();
        }
      } else if (e.key === 'Escape') {
        closeCmd();
        const archBackdrop = document.getElementById('arch-modal-backdrop');
        if (archBackdrop) archBackdrop.classList.remove('is-open');
      }
    });

    input.addEventListener('input', (e) => filterCmd(e.target.value));

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeCmd();
    });

    items.forEach((item) => {
      item.addEventListener('click', () => {
        const action = item.getAttribute('data-cmd-action');
        const target = item.getAttribute('data-cmd-target');
        closeCmd();

        if (action === 'scroll' && target) {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (action === 'theme' && target) {
          applyTheme(target, true);
        } else if (action === 'lang') {
          applyLanguage(currentLang === 'id' ? 'en' : 'id');
        } else if (action === 'print') {
          window.print();
        } else if (action === 'url' && target) {
          window.open(target, '_blank', 'noopener');
        }
      });
    });
  }

  /* ========================================================================
     14. ONE-CLICK EMAIL COPY
     ======================================================================== */
  function initCopyEmail() {
    const copyBtns = document.querySelectorAll('[data-copy-email]');
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const email = btn.getAttribute('data-copy-email');
        if (navigator.clipboard && email) {
          navigator.clipboard.writeText(email).then(() => {
            showToast(I18N[currentLang].toast_email);
          });
        }
      });
    });
  }
})();

