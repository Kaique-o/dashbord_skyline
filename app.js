const app = document.querySelector('#app');
const splash = document.querySelector('#splash');
const navButtons = document.querySelectorAll('[data-section]');
const pageViews = document.querySelectorAll('[data-view]');
const pageKicker = document.querySelector('#pageKicker');
const pageTitle = document.querySelector('#pageTitle');
const installButton = document.querySelector('#installApp');
const refreshButton = document.querySelector('#refreshData');
const sidebarToggle = document.querySelector('#sidebarToggle');
const screenGlow = document.querySelector('#screenGlow');
const mobileInsight = document.querySelector('#mobileInsight');
const mobileInsightFab = document.querySelector('#mobileInsightFab');
const mobileInsightSheet = document.querySelector('#mobileInsightSheet');
const mobileInsightCloseButtons = document.querySelectorAll('[data-mobile-insight-close]');
const mobileInsightFabIcon = document.querySelector('#mobileInsightFabIcon');
const mobileInsightKicker = document.querySelector('#mobileInsightKicker');
const mobileInsightContent = document.querySelector('#mobileInsightContent');
const mobileInsightAction = document.querySelector('#mobileInsightAction');

const ICONS = {
  comercial: 'assets/icons/carrinho.svg',
  operacao: 'assets/icons/fabrica.svg',
  home: 'assets/icons/home.svg',
  financeiro: 'assets/icons/money.svg',
  gestao: 'assets/icons/tarket.svg',
  sparks: 'assets/icons/sparks.svg',
  search: 'assets/icons/busca.svg',
  refresh: 'assets/icons/refresh.svg',
  back: 'assets/icons/back.svg',
  front: 'assets/icons/front.svg'
};

function renderIcon(src, className = 'ui-icon') {
  return `<img class="${className}" src="${src}" alt="" aria-hidden="true" />`;
}

const STORAGE_KEYS = {
  splashSeen: 'skyline:splash-seen-v1',
  activeSection: 'skyline:active-section-v2',
  sidebarCollapsed: 'skyline:sidebar-collapsed-v1'
};


const MOBILE_INSIGHT_META = {
  comercial: {
    icon: ICONS.sparks,
    label: 'Abrir leitura rapida comercial',
    kickerIcon: ICONS.sparks,
    kicker: 'leitura rapida',
    titleId: 'mobileInsightTitle',
    action: 'abrir diagnostico ›',
    items: [
      { title: 'loja lidera o dia', text: 'maior crescimento e maior ticket medio.' },
      { title: 'marketplaces em atencao', text: 'queda pede revisao de preco e margem.' }
    ]
  },
  operacao: {
    icon: ICONS.sparks,
    label: 'Abrir leitura rapida da operacao',
    kickerIcon: ICONS.sparks,
    kicker: 'leitura rapida',
    titleId: 'mobileInsightTitle',
    action: 'abrir plano de acao ›',
    items: [
      { title: 'reparo em atencao', text: 'etapa critica com R$ 89,7K parados.' },
      { title: 'pecas + reparo concentram custo', text: '64,9% do custo parado na operacao.' }
    ]
  }
};

const PAGE_META = {
  comercial: {
    kicker: 'comercial',
    icon: ICONS.comercial,
    title: 'BUs em formato de acoes para leitura rapida',
    documentTitle: 'Skyline Mobile | Comercial'
  },
  operacao: {
    kicker: 'operacao',
    icon: ICONS.operacao,
    title: 'Linha de producao com custo parado por etapa',
    documentTitle: 'Skyline Mobile | Operacao'
  },
  home: {
    kicker: 'home',
    icon: ICONS.home,
    title: 'Central inteligente em construcao',
    documentTitle: 'Skyline Mobile | Home'
  },
  financeiro: {
    kicker: 'financas',
    icon: ICONS.financeiro,
    title: 'Modulo financeiro em construcao',
    documentTitle: 'Skyline Mobile | Financas'
  },
  gestao: {
    kicker: 'gestao',
    icon: ICONS.gestao,
    title: 'Modulo de gestao em construcao',
    documentTitle: 'Skyline Mobile | Gestao'
  }
};

const INITIAL_ENDPOINTS = [
  // Troque pelos seus endpoints reais quando integrar a API.
  // '/api/dashboard/resumo',
  // '/api/dashboard/comercial',
  // '/api/dashboard/operacao'
];

let activeSection = null;
let navigationToken = 0;
let glowTimer = null;
let sidebarAnimationTimer = null;
const MOBILE_GLOW_QUERY = '(max-width: 767px)';


const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function preloadInitialEndpoints() {
  if (!INITIAL_ENDPOINTS.length) {
    await wait(1500);
    return;
  }

  const requests = INITIAL_ENDPOINTS.map((url) =>
    fetch(url, {
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    }).then((response) => {
      if (!response.ok) throw new Error(`Erro ao carregar ${url}`);
      return response.json();
    })
  );

  const results = await Promise.allSettled(requests);
  const rejected = results.filter((result) => result.status === 'rejected');

  if (rejected.length) {
    console.warn('Alguns endpoints iniciais não carregaram:', rejected);
  }
}

function showApp() {
  app.classList.remove('is-loading');
  app.removeAttribute('aria-hidden');
  splash.classList.add('is-hidden');
}

async function boot() {
  const hasSeenSplash = localStorage.getItem(STORAGE_KEYS.splashSeen) === 'true';

  if (hasSeenSplash) {
    showApp();
    preloadInitialEndpoints();
    return;
  }

  try {
    await Promise.all([preloadInitialEndpoints(), wait(2600)]);
  } finally {
    localStorage.setItem(STORAGE_KEYS.splashSeen, 'true');
    showApp();
  }
}


function closeMobileInsight() {
  if (!mobileInsight || !mobileInsightFab || !mobileInsightSheet) return;

  mobileInsight.classList.remove('is-open');
  mobileInsightFab.setAttribute('aria-expanded', 'false');
  mobileInsightSheet.setAttribute('aria-hidden', 'true');
}

function openMobileInsight() {
  if (!mobileInsight || !mobileInsightFab || !mobileInsightSheet || mobileInsight.hidden) return;

  mobileInsight.classList.add('is-open');
  mobileInsightFab.setAttribute('aria-expanded', 'true');
  mobileInsightSheet.setAttribute('aria-hidden', 'false');
  window.requestAnimationFrame(() => mobileInsightSheet.focus?.());
}

function renderMobileInsight(section) {
  const meta = MOBILE_INSIGHT_META[section];
  if (!meta || !mobileInsightContent || !mobileInsightKicker || !mobileInsightAction || !mobileInsightFab) return;

  mobileInsightFab.setAttribute('aria-label', meta.label);
  if (mobileInsightFabIcon) mobileInsightFabIcon.innerHTML = renderIcon(meta.icon, 'ui-icon mobile-insight__fab-icon');
  mobileInsightKicker.innerHTML = `<span>${renderIcon(meta.kickerIcon)}</span> ${meta.kicker}`;
  mobileInsightAction.textContent = meta.action;

  mobileInsightContent.innerHTML = meta.items.map((item, index) => {
    const titleId = index === 0 ? ' id="mobileInsightTitle"' : '';
    const text = item.text.includes('<') ? item.text : `<span>${item.text}</span>`;
    return `<article class="mini-insight"><strong${titleId}>${item.title}</strong>${text}</article>`;
  }).join('');
}

function syncMobileInsight(section) {
  if (!mobileInsight) return;

  const shouldShow = Boolean(MOBILE_INSIGHT_META[section]);
  mobileInsight.hidden = !shouldShow;

  if (shouldShow) {
    renderMobileInsight(section);
    return;
  }

  closeMobileInsight();
}

function isMobileViewport() {
  return window.matchMedia(MOBILE_GLOW_QUERY).matches;
}

function triggerScreenGlow(options = {}) {
  const includeDesktop = options.includeDesktop === true;
  const isRefresh = options.reason === 'refresh';

  if (!screenGlow || (!includeDesktop && !isMobileViewport())) return;

  window.clearTimeout(glowTimer);
  screenGlow.classList.remove('is-active', 'is-refresh');
  if (isRefresh) screenGlow.classList.add('is-refresh');
  void screenGlow.offsetWidth;
  screenGlow.classList.add('is-active');

  glowTimer = window.setTimeout(() => {
    screenGlow.classList.remove('is-active', 'is-refresh');
  }, includeDesktop ? 940 : 820);
}

function setActiveSection(section, options = {}) {
  const safeSection = PAGE_META[section] ? section : 'comercial';
  const meta = PAGE_META[safeSection];
  const shouldAnimate = options.animate !== false && activeSection && activeSection !== safeSection;
  const token = ++navigationToken;
  const currentView = Array.from(pageViews).find((view) => view.classList.contains('is-active'));
  const nextView = Array.from(pageViews).find((view) => view.dataset.view === safeSection);

  navButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.section === safeSection);
  });

  if (pageKicker) pageKicker.innerHTML = `${renderIcon(meta.icon, 'ui-icon eyebrow__icon')} ${meta.kicker}`;
  if (pageTitle) pageTitle.textContent = meta.title;
  document.title = meta.documentTitle;
  localStorage.setItem(STORAGE_KEYS.activeSection, safeSection);

  if (!nextView || currentView === nextView) {
    activeSection = safeSection;
    syncMobileInsight(safeSection);
    return;
  }

  pageViews.forEach((view) => {
    if (view !== currentView && view !== nextView) {
      view.classList.remove('is-active', 'is-leaving');
      view.hidden = true;
    }
  });

  if (shouldAnimate) {
    app.classList.add('is-view-transitioning');
    triggerScreenGlow();
  }

  if (currentView) {
    currentView.classList.remove('is-active');

    if (shouldAnimate) {
      currentView.classList.add('is-leaving');
      window.setTimeout(() => {
        if (token === navigationToken && !currentView.classList.contains('is-active')) {
          currentView.hidden = true;
          currentView.classList.remove('is-leaving');
        }
      }, 360);
    } else {
      currentView.hidden = true;
      currentView.classList.remove('is-leaving');
    }
  }

  nextView.hidden = false;
  nextView.classList.remove('is-active', 'is-leaving');
  void nextView.offsetWidth;

  window.requestAnimationFrame(() => {
    if (token !== navigationToken) return;
    nextView.classList.add('is-active');
  });

  window.setTimeout(() => {
    if (token === navigationToken) app.classList.remove('is-view-transitioning');
  }, shouldAnimate ? 520 : 0);

  activeSection = safeSection;
  syncMobileInsight(safeSection);
}

function initNavigation() {
  const saved = localStorage.getItem(STORAGE_KEYS.activeSection) || 'comercial';
  setActiveSection(saved, { animate: false });

  navButtons.forEach((button) => {
    button.addEventListener('click', () => setActiveSection(button.dataset.section, { animate: true }));
  });
}

function runSidebarAnimation() {
  if (!app) return;

  window.clearTimeout(sidebarAnimationTimer);
  app.classList.remove('is-sidebar-animating');
  void app.offsetWidth;
  app.classList.add('is-sidebar-animating');

  sidebarAnimationTimer = window.setTimeout(() => {
    app.classList.remove('is-sidebar-animating');
  }, 340);
}

function applySidebarState(collapsed, options = {}) {
  if (!app || !sidebarToggle) return;

  const shouldAnimate = options.animate === true;
  app.classList.toggle('is-sidebar-collapsed', collapsed);
  sidebarToggle.setAttribute('aria-expanded', String(!collapsed));
  sidebarToggle.setAttribute('aria-label', collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral');

  const toggleIcon = sidebarToggle.querySelector('.sidebar-toggle__icon');
  if (toggleIcon) {
    // Sem flip, rotate ou scaleX: cada estado usa o SVG original correto.
    toggleIcon.src = collapsed ? ICONS.front : ICONS.back;
    toggleIcon.style.transform = '';
  }

  if (shouldAnimate) runSidebarAnimation();
  localStorage.setItem(STORAGE_KEYS.sidebarCollapsed, collapsed ? 'true' : 'false');
}

function initSidebarToggle() {
  if (!sidebarToggle || !app) return;

  const savedCollapsed = localStorage.getItem(STORAGE_KEYS.sidebarCollapsed) === 'true';
  applySidebarState(savedCollapsed, { animate: false });

  sidebarToggle.addEventListener('click', () => {
    applySidebarState(!app.classList.contains('is-sidebar-collapsed'), { animate: true });
  });
}


function initMobileInsight() {
  if (!mobileInsight || !mobileInsightFab) return;

  mobileInsightFab.addEventListener('click', () => {
    if (mobileInsight.classList.contains('is-open')) {
      closeMobileInsight();
      return;
    }

    openMobileInsight();
  });

  mobileInsightCloseButtons.forEach((button) => {
    button.addEventListener('click', closeMobileInsight);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileInsight();
  });
}

function initRefreshButton() {
  if (!refreshButton) return;

  refreshButton.addEventListener('click', async () => {
    if (refreshButton.disabled) return;

    refreshButton.disabled = true;
    refreshButton.setAttribute('aria-busy', 'true');
    refreshButton.classList.add('is-updating');
    app.classList.add('is-refresh-transitioning');
    triggerScreenGlow({ includeDesktop: true, reason: 'refresh' });

    try {
      await preloadInitialEndpoints();
    } finally {
      refreshButton.disabled = false;
      refreshButton.removeAttribute('aria-busy');
      refreshButton.classList.remove('is-updating');
      window.setTimeout(() => app.classList.remove('is-refresh-transitioning'), 260);
    }
  });
}

function initPwaInstall() {
  if (!installButton) return;

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.hidden = false;
  });

  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    installButton.hidden = true;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  });

  window.addEventListener('appinstalled', () => {
    installButton.hidden = true;
    deferredPrompt = null;
  });
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  try {
    await navigator.serviceWorker.register('service-worker.js');
  } catch (error) {
    console.warn('Service Worker não registrado:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSidebarToggle();
  initMobileInsight();
  initRefreshButton();
  initPwaInstall();
  registerServiceWorker();
  boot();
});
