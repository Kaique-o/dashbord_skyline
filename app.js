const app = document.querySelector('#app');
const splash = document.querySelector('#splash');
const navButtons = document.querySelectorAll('[data-section]');
const pageViews = document.querySelectorAll('[data-view]');
const pageKicker = document.querySelector('#pageKicker');
const pageTitle = document.querySelector('#pageTitle');
const installButton = document.querySelector('#installApp');
const refreshButton = document.querySelector('#refreshData');
const screenGlow = document.querySelector('#screenGlow');
const globalSearch = document.querySelector('#globalSearch');
const desktopSearchInput = document.querySelector('#desktopSearchInput');
const desktopSearchResults = document.querySelector('#desktopSearchResults');
const mobileSearch = document.querySelector('#mobileSearch');
const mobileSearchTrigger = document.querySelector('#mobileSearchTrigger');
const mobileSearchSheet = document.querySelector('#mobileSearchSheet');
const mobileSearchInput = document.querySelector('#mobileSearchInput');
const mobileSearchResults = document.querySelector('#mobileSearchResults');
const mobileSearchCloseButtons = document.querySelectorAll('[data-mobile-search-close]');
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
  activeSection: 'skyline:active-section-v3'
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
  },
  financeiro: {
    icon: ICONS.sparks,
    label: 'Abrir leitura rapida financeira',
    kickerIcon: ICONS.sparks,
    kicker: 'leitura rapida',
    titleId: 'mobileInsightTitle',
    action: 'abrir plano financeiro ›',
    items: [
      { title: 'caixa precisa de previsao', text: 'acompanhar entradas, saidas e saldo projetado por dia.' },
      { title: 'margem em foco', text: 'cruzar faturamento, custo e lucro para evitar venda sem retorno.' }
    ]
  },
  gestao: {
    icon: ICONS.sparks,
    label: 'Abrir leitura rapida gerencial',
    kickerIcon: ICONS.sparks,
    kicker: 'leitura rapida',
    titleId: 'mobileInsightTitle',
    action: 'abrir plano gerencial ›',
    items: [
      { title: 'decisao diaria centralizada', text: 'concentrar metas, alertas e indicadores principais por area.' },
      { title: 'plano de acao visivel', text: 'manter prioridades claras para comercial, operacao e financeiro.' }
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
    title: 'Central inteligente com plano de acao por area',
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
let searchIndex = [];
let lastSearchResults = [];
let desktopSearchHasFocus = false;
let mobileSearchHideTimer = null;
const MOBILE_GLOW_QUERY = '(max-width: 767px)';

// Tempo minimo para manter o splash visivel antes de liberar a interface.
// Para mudar futuramente, ajuste apenas este valor em milissegundos.
const MIN_SPLASH_TIME_MS = 1000;

// Tempo usado apenas no primeiro carregamento completo do app.
// Mantem o comportamento anterior de splash mais longo na primeira abertura.
const FIRST_LOAD_SPLASH_TIME_MS = 2600;

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
    // Mantem o preload em segundo plano, como antes, mas segura o splash por pelo menos 1 segundo.
    preloadInitialEndpoints();
    await wait(MIN_SPLASH_TIME_MS);
    showApp();
    return;
  }

  try {
    // Primeiro acesso continua aguardando os dados iniciais e o tempo visual original do splash.
    // Como FIRST_LOAD_SPLASH_TIME_MS e maior que MIN_SPLASH_TIME_MS, o minimo de 1 segundo ja fica garantido.
    await Promise.all([preloadInitialEndpoints(), wait(FIRST_LOAD_SPLASH_TIME_MS)]);
  } finally {
    localStorage.setItem(STORAGE_KEYS.splashSeen, 'true');
    showApp();
  }
}


const SECTION_SEARCH_WORDS = {
  home: 'home inicio principal central skyline ia ai inteligente resumo leitura geral plano acao area cards roxo spark sparks sparcos empresa estabilidade atencao',
  comercial: 'comercial venda vendas canal canais loja whatsapp wpp site ecommerce marketplace marketplaces margem preco precos ticket crescimento queda diagnostico bu bus',
  operacao: 'operacao operacional producao linha recebimento triagem gestao pecas reparo qualidade gargalo gargalos custo parado paradas os tempo medio retrabalho execucao',
  financeiro: 'financeiro financas financa caixa margem lucro faturamento custo contas conciliacao fluxo entrada previsao saldo valor valores',
  gestao: 'gestao gerencial gerencial metas meta okr okrs indicador indicadores alerta alertas decisao rotina acompanhamento diario controle visibilidade plano acao'
};

function normalizeSearchText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanSearchText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getNodeTitle(node, fallback) {
  const titleNode = node.querySelector('h2, h3, strong, .market-symbol strong');
  const title = cleanSearchText(titleNode?.textContent);
  return title || fallback;
}

function getNodeDescription(node, title) {
  const fullText = cleanSearchText(node.textContent);
  const description = cleanSearchText(fullText.replace(title, ''));
  return description || fullText;
}

function buildSearchIndex() {
  const index = [];

  pageViews.forEach((view) => {
    const section = view.dataset.view;
    const meta = PAGE_META[section];
    if (!section || !meta) return;

    const sectionWords = SECTION_SEARCH_WORDS[section] || '';
    const pageText = cleanSearchText(view.textContent);

    index.push({
      section,
      type: 'area',
      title: meta.kicker,
      description: meta.title,
      text: normalizeSearchText(`${sectionWords} ${meta.kicker} ${meta.title} ${pageText}`)
    });

    const cards = view.querySelectorAll('.action-plan-card, .market-row, .timeline-stop, .coming-soon, .mini-insight, .home-ai-box__status');
    cards.forEach((card) => {
      const title = getNodeTitle(card, meta.kicker);
      const description = getNodeDescription(card, title);
      const raw = cleanSearchText(`${sectionWords} ${meta.kicker} ${meta.title} ${title} ${description}`);

      if (!raw || raw.length < 4) return;

      index.push({
        section,
        type: 'item',
        title,
        description,
        text: normalizeSearchText(raw)
      });
    });
  });

  searchIndex = index;
}

function scoreSearchItem(item, terms, normalizedQuery) {
  const title = normalizeSearchText(item.title);
  const description = normalizeSearchText(item.description);
  const section = normalizeSearchText(item.section);
  const searchable = item.text;
  const matchesAllTerms = terms.every((term) => searchable.includes(term));

  if (!matchesAllTerms) return 0;

  let score = 10;
  if (section.includes(normalizedQuery)) score += 35;
  if (title === normalizedQuery) score += 60;
  if (title.startsWith(normalizedQuery)) score += 42;
  if (title.includes(normalizedQuery)) score += 28;
  if (description.includes(normalizedQuery)) score += 12;
  if (item.type === 'area') score += 8;

  terms.forEach((term) => {
    if (title.includes(term)) score += 10;
    if (section.includes(term)) score += 8;
  });

  return score;
}

function getSearchResults(query) {
  const normalizedQuery = normalizeSearchText(query);
  const terms = normalizedQuery.split(' ').filter(Boolean);

  if (!terms.length) return [];

  return searchIndex
    .map((item) => ({ ...item, score: scoreSearchItem(item, terms, normalizedQuery) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'pt-BR'))
    .slice(0, 8);
}

function renderSearchResults(container, query, options = {}) {
  if (!container) return;

  const mode = options.mode || 'desktop';
  const normalizedQuery = cleanSearchText(query);

  if (!normalizedQuery) {
    lastSearchResults = [];
    container.innerHTML = '<p class="search-empty">digite para buscar em home, comercial, operacao, financeiro e gestao.</p>';
    if (mode === 'desktop') container.hidden = false;
    return;
  }

  const results = getSearchResults(normalizedQuery);
  lastSearchResults = results;

  if (!results.length) {
    container.innerHTML = `<p class="search-empty">nenhum resultado para "${escapeHtml(normalizedQuery)}".</p>`;
    if (mode === 'desktop') container.hidden = false;
    return;
  }

  container.innerHTML = results.map((item) => {
    const description = cleanSearchText(item.description).slice(0, 132);
    return `
      <button class="search-result" type="button" role="option" data-search-section="${escapeHtml(item.section)}">
        <span class="search-result__area">${escapeHtml(PAGE_META[item.section]?.kicker || item.section)}</span>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(description)}${description.length >= 132 ? '...' : ''}</small>
      </button>
    `;
  }).join('');

  if (mode === 'desktop') container.hidden = false;
}

function closeDesktopSearchResults() {
  if (!desktopSearchResults || !desktopSearchInput) return;

  desktopSearchResults.hidden = true;
  desktopSearchInput.setAttribute('aria-expanded', 'false');
}

function openDesktopSearchResults() {
  if (!desktopSearchResults || !desktopSearchInput) return;

  renderSearchResults(desktopSearchResults, desktopSearchInput.value, { mode: 'desktop' });
  desktopSearchInput.setAttribute('aria-expanded', 'true');
}

function closeMobileSearch() {
  if (!mobileSearch || !mobileSearchSheet || !mobileSearchTrigger) return;

  window.clearTimeout(mobileSearchHideTimer);
  mobileSearch.classList.remove('is-open');
  mobileSearchTrigger.setAttribute('aria-expanded', 'false');
  mobileSearchSheet.setAttribute('aria-hidden', 'true');

  mobileSearchHideTimer = window.setTimeout(() => {
    if (!mobileSearch.classList.contains('is-open')) mobileSearch.hidden = true;
  }, 280);
}

function openMobileSearch() {
  if (!mobileSearch || !mobileSearchSheet || !mobileSearchInput || !mobileSearchTrigger) return;

  closeMobileInsight();
  window.clearTimeout(mobileSearchHideTimer);
  mobileSearch.hidden = false;
  mobileSearchTrigger.setAttribute('aria-expanded', 'true');
  mobileSearchSheet.setAttribute('aria-hidden', 'false');
  mobileSearchInput.value = desktopSearchInput?.value || mobileSearchInput.value || '';
  if (mobileSearchResults) mobileSearchResults.innerHTML = '';

  window.requestAnimationFrame(() => {
    mobileSearch.classList.add('is-open');
    mobileSearchInput.focus?.();
  });
}

function closeSearchPanels() {
  closeDesktopSearchResults();
  closeMobileSearch();
}

function syncSearchInputs(value, source) {
  if (source !== 'desktop' && desktopSearchInput) desktopSearchInput.value = value;
  if (source !== 'mobile' && mobileSearchInput) mobileSearchInput.value = value;
}

function selectSearchResult(section) {
  if (!PAGE_META[section]) return;

  closeSearchPanels();
  setActiveSection(section, { animate: true });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSearchResultClick(event) {
  const resultButton = event.target.closest('[data-search-section]');
  if (!resultButton) return;

  selectSearchResult(resultButton.dataset.searchSection);
}

function handleSearchEnter(sourceInput) {
  const query = sourceInput?.value || desktopSearchInput?.value || mobileSearchInput?.value || '';
  const firstResult = getSearchResults(query)[0];
  if (!firstResult) return;

  selectSearchResult(firstResult.section);
}

function initGlobalSearch() {
  buildSearchIndex();

  if (desktopSearchInput && desktopSearchResults) {
    desktopSearchInput.addEventListener('focus', () => {
      desktopSearchHasFocus = true;
      closeDesktopSearchResults();
    });

    desktopSearchInput.addEventListener('input', () => {
      syncSearchInputs(desktopSearchInput.value, 'desktop');
      closeDesktopSearchResults();
    });

    desktopSearchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDesktopSearchResults();
        desktopSearchInput.blur();
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        handleSearchEnter(desktopSearchInput);
      }
    });

    desktopSearchInput.addEventListener('blur', () => {
      desktopSearchHasFocus = false;
    });

    desktopSearchResults.addEventListener('click', handleSearchResultClick);
  }

  if (mobileSearchTrigger) {
    mobileSearchTrigger.addEventListener('click', openMobileSearch);
  }

  if (mobileSearchInput && mobileSearchResults) {
    mobileSearchInput.addEventListener('input', () => {
      syncSearchInputs(mobileSearchInput.value, 'mobile');
      if (mobileSearchResults) mobileSearchResults.innerHTML = '';
    });

    mobileSearchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMobileSearch();
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        handleSearchEnter(mobileSearchInput);
      }
    });

    mobileSearchResults.addEventListener('click', handleSearchResultClick);
  }

  mobileSearchCloseButtons.forEach((button) => {
    button.addEventListener('click', closeMobileSearch);
  });

  document.addEventListener('pointerdown', (event) => {
    if (!globalSearch || !desktopSearchResults || desktopSearchResults.hidden) return;
    if (globalSearch.contains(event.target)) return;

    closeDesktopSearchResults();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeSearchPanels();
  });

  window.addEventListener('resize', () => {
    if (!isMobileViewport() && mobileSearch && !mobileSearch.hidden) closeMobileSearch();
    if (desktopSearchHasFocus) closeDesktopSearchResults();
  });
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


function syncNavIndicator(section) {
  document.querySelectorAll('.side-nav, .bottom-nav').forEach((nav) => {
    const buttons = Array.from(nav.querySelectorAll('[data-section]'));
    const index = buttons.findIndex((button) => button.dataset.section === section);
    const activeButton = buttons[Math.max(index, 0)];

    nav.style.setProperty('--nav-index', String(Math.max(index, 0)));

    // No mobile o indicador precisa usar medida real do botao.
    // Isso evita quebra quando a largura da tela muda ou quando a barra fica oculta no primeiro paint.
    if (activeButton) {
      nav.style.setProperty('--nav-indicator-x', `${activeButton.offsetLeft}px`);
      nav.style.setProperty('--nav-indicator-y', `${activeButton.offsetTop}px`);
      nav.style.setProperty('--nav-indicator-w', `${activeButton.offsetWidth}px`);
      nav.style.setProperty('--nav-indicator-h', `${activeButton.offsetHeight}px`);
    }
  });
}

function scheduleNavIndicatorSync(section = activeSection || 'home') {
  syncNavIndicator(section);
  window.requestAnimationFrame(() => syncNavIndicator(section));
  window.setTimeout(() => syncNavIndicator(section), 80);
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
  const safeSection = PAGE_META[section] ? section : 'home';
  const meta = PAGE_META[safeSection];
  const shouldAnimate = options.animate !== false && activeSection && activeSection !== safeSection;
  const token = ++navigationToken;
  const currentView = Array.from(pageViews).find((view) => view.classList.contains('is-active'));
  const nextView = Array.from(pageViews).find((view) => view.dataset.view === safeSection);

  navButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.section === safeSection);
  });
  scheduleNavIndicatorSync(safeSection);

  // Controla o cabecalho mobile:
  // - home: exibe somente a logo Skyline.
  // - demais telas: exibe o texto normal da area ativa.
  if (app) app.classList.toggle('is-home-view', safeSection === 'home');

  // Cabecalho limpo: sem icone e sem subtitulo visivel.
  // O titulo completo continua no <title> do navegador para manter contexto/acessibilidade.
  if (pageKicker) pageKicker.textContent = meta.kicker;
  if (pageTitle) pageTitle.textContent = meta.title;
  document.title = meta.documentTitle;

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
  // Sempre inicia o app na Home ao abrir/recarregar, tanto no desktop quanto no mobile.
  // A navegacao continua normal depois do boot, mas nao usamos mais a ultima categoria salva.
  localStorage.removeItem(STORAGE_KEYS.activeSection);
  setActiveSection('home', { animate: false });

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closeSearchPanels();
      setActiveSection(button.dataset.section, { animate: true });
    });
  });

  window.addEventListener('resize', () => {
    scheduleNavIndicatorSync(activeSection || 'home');
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
  if (!app) return;

  const shouldAnimate = options.animate === true;
  app.classList.toggle('is-sidebar-collapsed', collapsed);

  if (shouldAnimate) runSidebarAnimation();
}

function initSidebarToggle() {
  if (!app) return;

  // Sidebar desktop travada no estado recolhido.
  // A nav mobile continua usando as regras responsivas do CSS.
  applySidebarState(true, { animate: false });
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
  initGlobalSearch();
  initRefreshButton();
  initPwaInstall();
  registerServiceWorker();
  boot();
});
