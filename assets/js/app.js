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
        <a href="${r.html_url}" target="_blank" rel="noopener" class="repo-cell">
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
})();
