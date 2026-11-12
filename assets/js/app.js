/**
 * DAVID TIMOTEUS — ARCHITECTURAL EDITORIAL PORTFOLIO ENGINE
 * Powers:
 *  1. Custom Magnetic Cursor & Top Scroll Progress Bar
 *  2. Mobile Navigation Drawer & Active Section Scroll-Spy
 *  3. Crimson Editorial Theme Switcher (Obsidian / Velvet / Swiss Paper)
 *  4. Interactive Project Accordion Ledger
 *  5. Interactive Split-Stage Certificate Inspector + Fullscreen Zoom Modal
 *  6. Single-Column ATS CV Modal (Bilingual EN/ID + Direct A4 Print)
 *  7. Live GitHub Repository Telemetry Strip (@DavidTimoteus)
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. SCROLL PROGRESS LINE & ACTIVE SECTION SCROLL-SPY
     ========================================================================== */
  const topbar = document.querySelector('.topbar');
  const scrollLine = document.getElementById('scroll-line');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute('href');
      return id && id.startsWith('#') ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (topbar) {
      topbar.classList.toggle('is-scrolled', scrollTop > 48);
    }
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollLine && docHeight > 0) {
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      scrollLine.style.width = pct.toFixed(2) + '%';
    }

    const triggerY = scrollTop + 180;
    let activeSectionId = null;
    for (const sec of sections) {
      if (sec.offsetTop <= triggerY) {
        activeSectionId = '#' + sec.id;
      }
    }
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === activeSectionId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ==========================================================================
     2. CUSTOM MAGNETIC CURSOR FOLLOWER (DESKTOP ONLY)
     ========================================================================== */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isFinePointer && cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener(
      'mousemove',
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      },
      { passive: true }
    );

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    }
    requestAnimationFrame(animateRing);

    const interactiveSelector = 'a, button, .cert-canvas-frame, .ledger-row';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelector)) {
        cursorRing.classList.add('is-active');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelector)) {
        cursorRing.classList.remove('is-active');
      }
    });
  }

  /* ==========================================================================
     3. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const burgerBtn = document.getElementById('burger-btn');
  const navLinksList = document.getElementById('nav-links');

  if (burgerBtn && navLinksList) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = navLinksList.classList.toggle('is-open');
      burgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navLinksList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('is-open');
        burgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     4. CRIMSON EDITORIAL THEME SWITCHER
     ========================================================================== */
  const themes = [
    { id: 'obsidian-crimson', label: 'Obsidian Crimson' },
    { id: 'velvet-crimson', label: 'Velvet Crimson' },
    { id: 'swiss-red', label: 'Swiss Paper & Red' },
  ];
  const themeSwitchBtn = document.getElementById('theme-switch-btn');
  const themeLabel = document.getElementById('theme-label');

  let currentThemeIdx = 0;
  try {
    const savedTheme = localStorage.getItem('dt_editorial_theme');
    const foundIdx = themes.findIndex((t) => t.id === savedTheme);
    if (foundIdx !== -1) {
      currentThemeIdx = foundIdx;
      document.documentElement.setAttribute('data-theme', themes[currentThemeIdx].id);
      if (themeLabel) themeLabel.textContent = themes[currentThemeIdx].label;
    }
  } catch (_) {}

  if (themeSwitchBtn) {
    themeSwitchBtn.addEventListener('click', () => {
      currentThemeIdx = (currentThemeIdx + 1) % themes.length;
      const nextTheme = themes[currentThemeIdx];
      document.documentElement.setAttribute('data-theme', nextTheme.id);
      if (themeLabel) themeLabel.textContent = nextTheme.label;
      try {
        localStorage.setItem('dt_editorial_theme', nextTheme.id);
      } catch (_) {}
      showToast(`Tema aktif: ${nextTheme.label}`);
    });
  }

  /* ==========================================================================
     5. INTERACTIVE PROJECT ACCORDION LEDGER
     ========================================================================== */
  const accordionItems = Array.from(document.querySelectorAll('.project-accordion-item'));

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.project-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isAlreadyOpen = item.classList.contains('is-open');

      // Toggle clicked item smoothly
      item.classList.toggle('is-open', !isAlreadyOpen);
      trigger.setAttribute('aria-expanded', String(!isAlreadyOpen));
    });
  });

  /* ==========================================================================
     6. INTERACTIVE SPLIT-STAGE CERTIFICATE INSPECTOR + ZOOM MODAL
     ========================================================================== */
  const CERTIFICATES = {
    bnsp: {
      issuer: 'BADAN NASIONAL SERTIFIKASI PROFESI (BNSP) · LSP TEKNOLOGI DIGITAL',
      title: 'Sertifikat Kompetensi — Junior Web Developer',
      reg: 'No. Sertifikat: 62090 2513 3 0110805 2024 · No. Reg: TIK 1565 33316 2024 · Berlaku s/d Okt 2027',
      desc: 'Pengakuan kompetensi negara (BNSP) untuk kualifikasi Pengembang Web Pratama (Junior Web Developer). Mencakup penguasaan implementasi User Interface, eksekusi perintah pemrograman, organisasi struktur fungsi/file, penulisan kode sesuai guidelines, pemrograman terstruktur, dan pemanfaatan library pre-existing.',
      pages: [
        { label: 'Hal 1: Sertifikat BNSP', src: 'assets/img/certs/bnsp-jwd.webp' },
        { label: 'Hal 2: 6 Unit SKKNI', src: 'assets/img/certs/bnsp-units.webp' },
      ],
    },
    vsga: {
      issuer: 'KEMENTERIAN KOMINFO RI × POLITEKNIK NEGERI MALANG',
      title: 'Vocational School Graduate Academy (VSGA) — Web Developer (436 Jam)',
      reg: 'No: 1938970840-34/VSGA/BLSDM.Kominfo/2024 · Nilai Rata-Rata: 91,01 (Predikat A) · Top 2 Capstone Winner',
      desc: 'Pelatihan intensif 436 jam pelajaran (setara 20 SKS) yang mencakup 13 mata pelatihan teknis dan soft skills pengembangan aplikasi web. Meraih nilai rata-rata 91,01 (Predikat A) serta dinobatkan sebagai TOP 2 Team pada VSGA Competition Capstone Project "WEB Developer" 2024.',
      pages: [
        { label: 'Hal 1: Sertifikat Kominfo', src: 'assets/img/certs/dts-vsga.webp' },
        { label: 'Hal 2: Transkrip Nilai (91,01 / A)', src: 'assets/img/certs/transkrip-dts.webp' },
      ],
    },
    msib: {
      issuer: 'KEMENDIKBUDRISTEK × PT EDUCA SISFOMEDIA INDONESIA (GAMELAB.ID)',
      title: 'MSIB Batch 6 — Web Fullstack Developer (900 Jam Studi Independen)',
      reg: 'ID Kegiatan: 7459808 · Sertifikat: GL9965718018 · 16 Feb – 30 Jun 2024',
      desc: 'Menyelesaikan 900 jam Studi Independen Bersertifikat Kampus Merdeka sebagai Web Fullstack Developer. Berperan sebagai Team Lead pada proyek Zora Stamp dan Full-Stack Developer pada proyek Duit Tracker dengan skor proyek akhir (270 jam) sebesar 90 / 100.',
      pages: [
        { label: 'Hal 1: Sertifikat MSIB Batch 6', src: 'assets/img/certs/msib-gamelab.webp' },
        { label: 'Hal 2: Rapor Kompetensi (900 Jam)', src: 'assets/img/certs/msib-transkrip.webp' },
      ],
    },
    toeic: {
      issuer: 'EDUCATIONAL TESTING SERVICE (ETS) · INTERNATIONAL TEST CENTER',
      title: 'Official TOEIC Listening & Reading Score Report — Skor 600',
      reg: 'Result No: 1854917 · Listening: 370 · Reading: 230 · Total: 600 (Tanggal Uji: 12 Agu 2025)',
      desc: 'Sertifikasi kemampuan komunikasi Bahasa Inggris internasional resmi ETS TOEIC yang diselenggarakan di Politeknik Negeri Malang dengan skor total 600 (Listening 370, Reading 230), mendukung kolaborasi teknis dan dokumentasi perangkat lunak berbahasa Inggris.',
      pages: [{ label: 'Dokumen Skor Resmi ETS TOEIC', src: 'assets/img/certs/toeic-600.webp' }],
    },
    flutter: {
      issuer: 'HIMPUNAN MAHASISWA TEKNIK INFORMATIKA UTY × BISA AI',
      title: 'Workshop: Build Your First App with Flutter and Firebase',
      reg: 'No. Sertifikat: 2021/1139/37700 · Pengembangan Aplikasi Mobile Lintas Platform',
      desc: 'Pelatihan praktis arsitektur widget Flutter (Dart) dan integrasi layanan cloud Firebase, menjadi fondasi pengembangan proyek aplikasi mobile rekomendasi rute Route Wise.',
      pages: [{ label: 'Sertifikat Flutter & Firebase', src: 'assets/img/certs/flutter-firebase.webp' }],
    },
    aiconic: {
      issuer: 'POLITEKNIK NEGERI MALANG × BATANGAS STATE UNIVERSITY × PORT MALAYSIA',
      title: 'AICONIC International Program & Seminar Nasional Teknologi Informasi',
      reg: 'No: 13005/PL2/PK.01.02/2026 · Partisipasi Akademik Internasional & Industri IT',
      desc: 'Partisipasi aktif dalam forum internasional AICONIC bersama perguruan tinggi mitra Asia Tenggara serta seminar pengembangan karir dan arsitektur industri perangkat lunak bersama praktisi Sevima.',
      pages: [
        { label: 'Dokumen 1: AICONIC International', src: 'assets/img/certs/aiconic-intl.webp' },
        { label: 'Dokumen 2: Seminar IT Sevima', src: 'assets/img/certs/sevima-it.webp' },
      ],
    },
  };

  const certSelectorBtns = Array.from(document.querySelectorAll('.cert-selector-btn'));
  const certStageIssuer = document.getElementById('cert-stage-issuer');
  const certStageTitle = document.getElementById('cert-stage-title');
  const certStageReg = document.getElementById('cert-stage-reg');
  const certPageTabs = document.getElementById('cert-page-tabs');
  const certStageImg = document.getElementById('cert-stage-img');
  const certStageDesc = document.getElementById('cert-stage-desc');

  let activeCertKey = 'bnsp';
  let activePageIdx = 0;

  function renderCertificateStage(certKey, pageIndex = 0) {
    const cert = CERTIFICATES[certKey];
    if (!cert) return;
    activeCertKey = certKey;
    activePageIdx = pageIndex;

    if (certStageIssuer) certStageIssuer.textContent = cert.issuer;
    if (certStageTitle) certStageTitle.textContent = cert.title;
    if (certStageReg) certStageReg.textContent = cert.reg;
    if (certStageDesc) certStageDesc.textContent = cert.desc;

    if (certStageImg && cert.pages[pageIndex]) {
      certStageImg.style.opacity = '0.25';
      setTimeout(() => {
        certStageImg.src = cert.pages[pageIndex].src;
        certStageImg.alt = `${cert.title} — ${cert.pages[pageIndex].label}`;
        certStageImg.style.opacity = '1';
      }, 90);
    }

    if (certPageTabs) {
      certPageTabs.innerHTML = cert.pages
        .map(
          (p, idx) =>
            `<button type="button" class="cert-page-tab ${idx === pageIndex ? 'is-active' : ''}" data-page-index="${idx}">${p.label}</button>`
        )
        .join('');

      certPageTabs.querySelectorAll('.cert-page-tab').forEach((tabBtn) => {
        tabBtn.addEventListener('click', () => {
          const idx = Number(tabBtn.getAttribute('data-page-index')) || 0;
          renderCertificateStage(activeCertKey, idx);
        });
      });
    }
  }

  certSelectorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-cert-id');
      if (!id) return;

      certSelectorBtns.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle('is-active', isCurrent);
        b.setAttribute('aria-selected', String(isCurrent));
      });

      renderCertificateStage(id, 0);

      // On mobile screens, scroll gently to the preview stage so the user sees the change immediately
      if (window.innerWidth <= 1024) {
        const stageEl = document.getElementById('cert-stage');
        if (stageEl) {
          stageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  });

  // Fullscreen Zoom Modal
  const zoomModalOverlay = document.getElementById('zoom-modal-overlay');
  const zoomModalImg = document.getElementById('zoom-modal-img');
  const zoomModalCaption = document.getElementById('zoom-modal-caption');
  const zoomModalClose = document.getElementById('zoom-modal-close');
  const certZoomTrigger = document.getElementById('cert-zoom-trigger');
  const certZoomBtn = document.getElementById('cert-zoom-btn');

  function openZoomModal() {
    const cert = CERTIFICATES[activeCertKey];
    if (!cert || !zoomModalOverlay || !zoomModalImg) return;
    const page = cert.pages[activePageIdx] || cert.pages[0];
    zoomModalImg.src = page.src;
    if (zoomModalCaption) {
      zoomModalCaption.textContent = `${cert.title} (${page.label})`;
    }
    zoomModalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeZoomModal() {
    if (!zoomModalOverlay) return;
    zoomModalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (certZoomTrigger) certZoomTrigger.addEventListener('click', openZoomModal);
  if (certZoomBtn) certZoomBtn.addEventListener('click', openZoomModal);
  if (zoomModalClose) zoomModalClose.addEventListener('click', closeZoomModal);
  if (zoomModalOverlay) {
    zoomModalOverlay.addEventListener('click', (e) => {
      if (e.target === zoomModalOverlay) closeZoomModal();
    });
  }

  /* ==========================================================================
     7. ATS CV MODAL (ENGLISH & INDONESIAN SWITCH + DIRECT PRINT)
     ========================================================================== */
  const atsModalOverlay = document.getElementById('ats-modal-overlay');
  const openAtsBtns = document.querySelectorAll('[data-open-ats]');
  const closeAtsBtns = document.querySelectorAll('[data-close-ats]');
  const atsLangBtns = document.querySelectorAll('[data-ats-lang]');
  const atsSheetEn = document.getElementById('ats-sheet-en');
  const atsSheetId = document.getElementById('ats-sheet-id');
  const atsPrintBtn = document.getElementById('ats-print-btn');

  function openAtsModal() {
    if (!atsModalOverlay) return;
    atsModalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeAtsModal() {
    if (!atsModalOverlay) return;
    atsModalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openAtsBtns.forEach((btn) => btn.addEventListener('click', openAtsModal));
  closeAtsBtns.forEach((btn) => btn.addEventListener('click', closeAtsModal));

  if (atsModalOverlay) {
    atsModalOverlay.addEventListener('click', (e) => {
      if (e.target === atsModalOverlay) closeAtsModal();
    });
  }

  atsLangBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-ats-lang');
      atsLangBtns.forEach((b) => {
        b.classList.toggle('action-btn--primary', b === btn);
      });
      if (atsSheetEn && atsSheetId) {
        atsSheetEn.style.display = lang === 'en' ? 'block' : 'none';
        atsSheetId.style.display = lang === 'id' ? 'block' : 'none';
      }
    });
  });

  if (atsPrintBtn) {
    atsPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAtsModal();
      closeZoomModal();
    }
  });

  /* ==========================================================================
     8. LIVE GITHUB REPOSITORIES TELEMETRY (@DavidTimoteus)
     ========================================================================== */
  const FALLBACK_REPOS = [
    {
      name: 'Motaris',
      description:
        'Sistem Informasi Operasional Bengkel & POS Multi-Tier pada Bengkel Penarukan Motor (Laravel 13, MySQL 8, Tailwind v4).',
      language: 'PHP / Blade',
      updated: '2026',
      html_url: 'https://github.com/DavidTimoteus/Motaris',
    },
    {
      name: 'PWA-MyDuit',
      description:
        'Aplikasi pencatatan keuangan pribadi Offline-First PWA terintegrasi dengan ekstraksi struk Google Gemini AI.',
      language: 'JavaScript',
      updated: '2026',
      html_url: 'https://github.com/DavidTimoteus/PWA-MyDuit',
    },
    {
      name: 'Jhar-Ajharan',
      description:
        'Platform latihan simulasi ujian CAT CPNS & BUMN Offline-First dengan sistem Tiered Tactical Hints.',
      language: 'Python / JS',
      updated: '2025',
      html_url: 'https://github.com/DavidTimoteus/Jhar-Ajharan',
    },
    {
      name: 'Duit-Tracker',
      description:
        'Proyek akhir MSIB Batch 6 Gamelab.ID — Aplikasi web manajemen arus kas personal & dasbor admin berbasis Laravel 10 & MySQL.',
      language: 'PHP / Laravel',
      updated: '2024',
      html_url: 'https://github.com/DavidTimoteus/Duit-Tracker',
    },
    {
      name: 'Zora_Stamp',
      description:
        'Aplikasi web responsif layanan percetakan stempel digital hasil slicing Figma menggunakan HTML5, CSS3, dan SASS.',
      language: 'SCSS / HTML5',
      updated: '2024',
      html_url: 'https://github.com/DavidTimoteus/Zora_Stamp',
    },
    {
      name: 'Sistem-Informasi-Akademik-VSGA',
      description:
        'Proyek Capstone Top 2 VSGA Digital Talent Scholarship Kominfo 2024 berbasis Laravel & MySQL.',
      language: 'PHP / Laravel',
      updated: '2024',
      html_url: 'https://github.com/DavidTimoteus',
    },
  ];

  const repoContainer = document.getElementById('github-repos-container');
  const ghSyncStatus = document.getElementById('gh-sync-status');

  function renderRepos(repos) {
    if (!repoContainer) return;
    repoContainer.innerHTML = repos
      .slice(0, 6)
      .map(
        (r) => `
        <a href="${r.html_url}" target="_blank" rel="noopener" class="repo-cell spotlight-surface">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.45rem;">
              <strong style="font-family: var(--font-display); font-size: 1.02rem; color: var(--ink);">${r.name}</strong>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--red-bright);">↗</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--ink-2); line-height: 1.55;">
              ${r.description || 'Repositori pengembangan perangkat lunak oleh David Timoteus.'}
            </p>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; font-family: var(--font-mono); font-size: 0.7rem; color: var(--ink-3); border-top: 1px dashed var(--line); padding-top: 0.65rem;">
            <span>● ${r.language || 'Code'}</span>
            <span>${r.updated || 'Verified'}</span>
          </div>
        </a>
      `
      )
      .join('');
  }

  renderRepos(FALLBACK_REPOS);

  fetch('https://api.github.com/users/DavidTimoteus/repos?sort=updated&per_page=8')
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error('GitHub API status ' + res.status))))
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) return;
      const mapped = data
        .filter((d) => !d.fork)
        .slice(0, 6)
        .map((d) => ({
          name: d.name,
          description:
            d.description ||
            (FALLBACK_REPOS.find((f) => f.name.toLowerCase() === d.name.toLowerCase()) || {}).description ||
            'Repositori publik pada akun GitHub @DavidTimoteus.',
          language: d.language || 'Full-Stack',
          updated: new Date(d.updated_at).toLocaleDateString('id-ID', {
            month: 'short',
            year: 'numeric',
          }),
          html_url: d.html_url,
        }));
      if (mapped.length > 0) {
        renderRepos(mapped);
        if (ghSyncStatus) ghSyncStatus.textContent = 'Tersinkronisasi langsung dengan GitHub API';
      }
    })
    .catch(() => {
      if (ghSyncStatus) ghSyncStatus.textContent = 'Menampilkan arsip repositori terverifikasi';
    });

  /* ==========================================================================
     9. CLIPBOARD COPY & SCROLL REVEAL OBSERVER
     ========================================================================== */
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, 2600);
  }

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-copy');
      if (!val) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(() => {
          showToast(`Tersalin: ${val}`);
        });
      }
    });
  });

  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ==========================================================================
     10. AWARD WEB CRAFT MOTION ENGINE
     - Cursor-Tracked Surface Spotlights (Aceternity / HorizonX)
     - Masked Hero Typography Reveal & Animated Telemetry Count-Up (60fps.design)
     - Sliding Project Filter Glider (Transitions.dev)
     - Live WIB Real-Time Clock (Footer.design)
     - Searchable Command Palette Modal (⌘K / Ctrl+K)
     ========================================================================== */

  // 10A. Cursor-Tracked Spotlights (event delegation supports dynamic repo cells)
  if (isFinePointer) {
    document.addEventListener(
      'pointermove',
      (e) => {
        const surface = e.target.closest('.spotlight-surface');
        if (!surface) return;
        const rect = surface.getBoundingClientRect();
        surface.style.setProperty('--spot-x', `${(e.clientX - rect.left).toFixed(1)}px`);
        surface.style.setProperty('--spot-y', `${(e.clientY - rect.top).toFixed(1)}px`);
      },
      { passive: true }
    );
  }

  // 10B. Immediate Above-the-Fold Hero Reveal
  const heroDisplay = document.querySelector('.hero-display');
  if (heroDisplay) {
    requestAnimationFrame(() => {
      heroDisplay.classList.add('is-visible');
    });
  }

  // 10C. Animated Metric Count-Up Telemetry
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const countEls = Array.from(document.querySelectorAll('[data-count-target]'));

  function animateCounter(el) {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    const targetVal = parseFloat(el.getAttribute('data-count-target'));
    const decimals = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
    const sep = el.getAttribute('data-count-sep') || '';

    if (Number.isNaN(targetVal) || prefersReducedMotion) return;

    const duration = 1100;
    const startTime = performance.now();

    function formatValue(num) {
      const fixed = num.toFixed(decimals);
      if (!sep) return fixed;
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep);
      return parts.join('.');
    }

    function frame(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3); // EaseOutCubic
      el.textContent = formatValue(targetVal * eased);
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = formatValue(targetVal);
      }
    }
    requestAnimationFrame(frame);
  }

  if (countEls.length > 0 && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    countEls.forEach((el) => countObserver.observe(el));
  }

  // 10D. Interactive Project Filter Pills + Sliding Puck Glider
  const filterPillsWrap = document.getElementById('project-filter-pills');
  const filterGlider = document.getElementById('filter-glider');
  const filterBtns = Array.from(document.querySelectorAll('.filter-pill-btn'));
  const filterCountEl = document.getElementById('filter-result-count');

  function positionFilterGlider(activeBtn) {
    if (!filterGlider || !activeBtn || !filterPillsWrap) return;
    filterGlider.style.width = `${activeBtn.offsetWidth}px`;
    filterGlider.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
  }

  const initialActiveFilter = filterBtns.find((b) => b.classList.contains('is-active'));
  if (initialActiveFilter) {
    requestAnimationFrame(() => positionFilterGlider(initialActiveFilter));
    window.addEventListener('resize', () => {
      const currentActive = filterBtns.find((b) => b.classList.contains('is-active'));
      if (currentActive) positionFilterGlider(currentActive);
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all';

      filterBtns.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle('is-active', isCurrent);
        b.setAttribute('aria-selected', String(isCurrent));
      });
      positionFilterGlider(btn);

      let visibleCount = 0;
      accordionItems.forEach((item) => {
        const cats = (item.getAttribute('data-cats') || '').split(/\s+/);
        const match = filter === 'all' || cats.includes(filter);
        item.classList.toggle('is-hidden-filter', !match);
        if (match) visibleCount += 1;
      });

      if (filterCountEl) {
        filterCountEl.textContent = `Menampilkan ${visibleCount} Proyek`;
      }
    });
  });

  // 10E. Live WIB Clock (Jakarta / Malang / Sumenep Timezone)
  const wibClockHero = document.getElementById('wib-clock-hero');
  const wibClockFooter = document.getElementById('wib-clock-footer');
  const wibFormatter = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  function updateWibClock() {
    const nowStr = wibFormatter.format(new Date()).replace(/\./g, ':');
    if (wibClockHero) wibClockHero.textContent = `${nowStr.slice(0, 5)} WIB`;
    if (wibClockFooter) wibClockFooter.textContent = `${nowStr} WIB`;
  }

  if (wibClockHero || wibClockFooter) {
    updateWibClock();
    setInterval(updateWibClock, 1000);
  }

  // 10F. Command Palette Modal (⌘K / Ctrl+K)
  const cmdOverlay = document.getElementById('cmd-modal-overlay');
  const cmdSearchInput = document.getElementById('cmd-search-input');
  const cmdList = document.getElementById('cmd-list');
  const cmdTriggerBtn = document.getElementById('cmd-trigger-btn');
  const footerCmdBtn = document.getElementById('footer-cmd-btn');
  const cmdCloseBtn = document.getElementById('cmd-close-btn');

  const COMMAND_ACTIONS = [
    {
      label: 'Buka & Cetak CV Format ATS',
      tag: 'CV ATS',
      keywords: 'cv ats resume pdf cetak print harvard',
      run: () => openAtsModal(),
    },
    {
      label: 'Unduh File Asli PDF CV ATS',
      tag: 'DOWNLOAD',
      keywords: 'download unduh pdf cv asli',
      run: () => {
        const a = document.createElement('a');
        a.href = 'assets/docs/David_Timoteus_CV_ATS.pdf';
        a.download = 'David_Timoteus_CV_ATS.pdf';
        a.click();
      },
    },
    {
      label: 'Lompat ke 01. Pengalaman & Pendidikan',
      tag: 'NAVIGASI',
      keywords: 'pengalaman kerja magang inline vsga msib gamelab polinema ipk',
      run: () => document.getElementById('pengalaman')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      label: 'Lompat ke 02. Indeks Proyek & Studi Kasus',
      tag: 'NAVIGASI',
      keywords: 'proyek project motaris lms pkpa myduit route wise jhar',
      run: () => document.getElementById('proyek')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      label: 'Inspeksi Sertifikat BNSP Junior Web Developer',
      tag: 'SERTIFIKAT',
      keywords: 'sertifikat bnsp skkni lisensi profesi',
      run: () => {
        document.getElementById('sertifikasi')?.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('[data-cert-id="bnsp"]')?.click();
      },
    },
    {
      label: 'Inspeksi Sertifikat & Nilai VSGA Kominfo (Top 2)',
      tag: 'SERTIFIKAT',
      keywords: 'vsga kominfo top 2 capstone transkrip nilai',
      run: () => {
        document.getElementById('sertifikasi')?.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('[data-cert-id="vsga"]')?.click();
      },
    },
    {
      label: 'Inspeksi Skor Resmi ETS TOEIC (600)',
      tag: 'SERTIFIKAT',
      keywords: 'toeic english ets sertifikat bahasa inggris',
      run: () => {
        document.getElementById('sertifikasi')?.scrollIntoView({ behavior: 'smooth' });
        document.querySelector('[data-cert-id="toeic"]')?.click();
      },
    },
    {
      label: 'Lompat ke 04. Matriks Keahlian & SKKNI',
      tag: 'NAVIGASI',
      keywords: 'skill keahlian tech stack nextjs laravel flutter mysql',
      run: () => document.getElementById('keahlian')?.scrollIntoView({ behavior: 'smooth' }),
    },
    {
      label: 'Salin Email Resmi (detimotea@gmail.com)',
      tag: 'KONTAK',
      keywords: 'email mail kontak detimotea salin copy',
      run: () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('detimotea@gmail.com').then(() => {
            showToast('Tersalin: detimotea@gmail.com');
          });
        }
      },
    },
    {
      label: 'Ganti Tema Warna Crimson',
      tag: 'TEMA',
      keywords: 'tema warna theme obsidian velvet swiss dark light',
      run: () => themeSwitchBtn?.click(),
    },
  ];

  let cmdSelectedIdx = 0;
  let filteredCmds = COMMAND_ACTIONS;

  function renderCmdList(query = '') {
    if (!cmdList) return;
    const q = query.trim().toLowerCase();
    filteredCmds = q
      ? COMMAND_ACTIONS.filter(
          (c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q) || c.tag.toLowerCase().includes(q)
        )
      : COMMAND_ACTIONS;

    if (cmdSelectedIdx >= filteredCmds.length) cmdSelectedIdx = 0;

    if (filteredCmds.length === 0) {
      cmdList.innerHTML =
        '<div style="padding: 1.25rem; text-align: center; font-family: var(--font-mono); font-size: 0.8rem; color: var(--ink-3);">Tidak ada aksi yang cocok.</div>';
      return;
    }

    cmdList.innerHTML = filteredCmds
      .map(
        (cmd, idx) => `
        <button type="button" class="cmd-item ${idx === cmdSelectedIdx ? 'is-selected' : ''}" data-cmd-idx="${idx}" role="option" aria-selected="${idx === cmdSelectedIdx}">
          <span>${cmd.label}</span>
          <span class="cmd-item-tag">${cmd.tag}</span>
        </button>
      `
      )
      .join('');

    cmdList.querySelectorAll('.cmd-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-cmd-idx'));
        executeCmd(idx);
      });
    });
  }

  function executeCmd(idx) {
    const item = filteredCmds[idx];
    if (!item) return;
    closeCmdModal();
    item.run();
  }

  function openCmdModal() {
    if (!cmdOverlay) return;
    cmdOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    cmdSelectedIdx = 0;
    if (cmdSearchInput) {
      cmdSearchInput.value = '';
      renderCmdList('');
      setTimeout(() => cmdSearchInput.focus(), 40);
    }
  }

  function closeCmdModal() {
    if (!cmdOverlay) return;
    cmdOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (cmdTriggerBtn) cmdTriggerBtn.addEventListener('click', openCmdModal);
  if (footerCmdBtn) footerCmdBtn.addEventListener('click', openCmdModal);
  if (cmdCloseBtn) cmdCloseBtn.addEventListener('click', closeCmdModal);
  if (cmdOverlay) {
    cmdOverlay.addEventListener('click', (e) => {
      if (e.target === cmdOverlay) closeCmdModal();
    });
  }

  if (cmdSearchInput) {
    cmdSearchInput.addEventListener('input', () => {
      cmdSelectedIdx = 0;
      renderCmdList(cmdSearchInput.value);
    });

    cmdSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filteredCmds.length > 0) {
          cmdSelectedIdx = (cmdSelectedIdx + 1) % filteredCmds.length;
          renderCmdList(cmdSearchInput.value);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filteredCmds.length > 0) {
          cmdSelectedIdx = (cmdSelectedIdx - 1 + filteredCmds.length) % filteredCmds.length;
          renderCmdList(cmdSearchInput.value);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        executeCmd(cmdSelectedIdx);
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdOverlay?.classList.contains('is-open')) {
        closeCmdModal();
      } else {
        openCmdModal();
      }
    } else if (e.key === 'Escape') {
      closeCmdModal();
    }
  });
})();
