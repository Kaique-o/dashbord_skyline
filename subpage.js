const app = document.querySelector('#app');
const refreshButton = document.querySelector('#refreshData');
const screenGlow = document.querySelector('#screenGlow');
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

const SEARCH_ITEMS = window.SUBPAGE_SEARCH_INDEX || [];

function normalizeSearchText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
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

function getSearchResults(query) {
  const terms = normalizeSearchText(query).split(' ').filter(Boolean);
  if (!terms.length) return [];

  return SEARCH_ITEMS
    .map((item) => {
      const searchable = normalizeSearchText(`${item.area} ${item.title} ${item.description}`);
      const title = normalizeSearchText(item.title);
      const score = terms.every((term) => searchable.includes(term))
        ? (title.startsWith(terms[0]) ? 50 : 10) + terms.reduce((acc, term) => acc + (title.includes(term) ? 12 : 0), 0)
        : 0;

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'pt-BR'))
    .slice(0, 8);
}

function renderSearchResults(container, query) {
  if (!container) return;

  const results = getSearchResults(query);
  if (!query.trim()) {
    container.innerHTML = '<p class="search-empty">digite para buscar uma tela ou subtela.</p>';
    container.hidden = false;
    return;
  }

  if (!results.length) {
    container.innerHTML = `<p class="search-empty">nenhum resultado para "${escapeHtml(query)}".</p>`;
    container.hidden = false;
    return;
  }

  container.innerHTML = results.map((item) => `
    <a class="search-result subpage-search-open" role="option" href="${escapeHtml(item.href)}">
      <span class="search-result__area">${escapeHtml(item.area)}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <small>${escapeHtml(item.description).slice(0, 132)}${item.description.length > 132 ? '...' : ''}</small>
    </a>
  `).join('');
  container.hidden = false;
}

function closeDesktopSearchResults() {
  if (!desktopSearchResults || !desktopSearchInput) return;
  desktopSearchResults.hidden = true;
  desktopSearchInput.setAttribute('aria-expanded', 'false');
}

function syncSearchInputs(value, source) {
  if (source !== 'desktop' && mobileSearchInput) mobileSearchInput.value = value;
  if (source !== 'mobile' && desktopSearchInput) desktopSearchInput.value = value;
}

function closeMobileSearch() {
  if (!mobileSearch || !mobileSearchSheet || !mobileSearchTrigger) return;
  mobileSearch.classList.remove('is-open');
  mobileSearchTrigger.setAttribute('aria-expanded', 'false');
  mobileSearchSheet.setAttribute('aria-hidden', 'true');
  window.setTimeout(() => {
    if (!mobileSearch.classList.contains('is-open')) mobileSearch.hidden = true;
  }, 260);
}

function openMobileSearch() {
  if (!mobileSearch || !mobileSearchTrigger || !mobileSearchSheet) return;
  closeMobileInsight();
  mobileSearch.hidden = false;
  mobileSearchTrigger.setAttribute('aria-expanded', 'true');
  mobileSearchSheet.setAttribute('aria-hidden', 'false');
  if (mobileSearchInput) mobileSearchInput.value = desktopSearchInput?.value || mobileSearchInput.value || '';
  if (mobileSearchResults) mobileSearchResults.innerHTML = '';
  window.requestAnimationFrame(() => {
    mobileSearch.classList.add('is-open');
    mobileSearchInput?.focus();
  });
}

function closeMobileInsight() {
  if (!mobileInsight || !mobileInsightFab || !mobileInsightSheet) return;
  mobileInsight.classList.remove('is-open');
  mobileInsightFab.setAttribute('aria-expanded', 'false');
  mobileInsightSheet.setAttribute('aria-hidden', 'true');
}

function openMobileInsight() {
  if (!mobileInsight || !mobileInsightFab || !mobileInsightSheet) return;
  mobileInsight.classList.add('is-open');
  mobileInsightFab.setAttribute('aria-expanded', 'true');
  mobileInsightSheet.setAttribute('aria-hidden', 'false');
}

function triggerScreenGlow() {
  if (!screenGlow) return;
  screenGlow.classList.remove('is-active', 'is-refresh');
  screenGlow.classList.add('is-refresh');
  void screenGlow.offsetWidth;
  screenGlow.classList.add('is-active');

  window.setTimeout(() => {
    screenGlow.classList.remove('is-active', 'is-refresh');
  }, 940);
}

function initSearch() {
  if (desktopSearchInput && desktopSearchResults) {
    desktopSearchInput.addEventListener('input', () => {
      syncSearchInputs(desktopSearchInput.value, 'desktop');
      renderSearchResults(desktopSearchResults, desktopSearchInput.value);
      desktopSearchInput.setAttribute('aria-expanded', 'true');
    });

    desktopSearchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDesktopSearchResults();
        desktopSearchInput.blur();
      }

      if (event.key === 'Enter') {
        const first = getSearchResults(desktopSearchInput.value)[0];
        if (first) window.location.href = first.href;
      }
    });
  }

  if (mobileSearchTrigger) mobileSearchTrigger.addEventListener('click', openMobileSearch);

  if (mobileSearchInput && mobileSearchResults) {
    mobileSearchInput.addEventListener('input', () => {
      syncSearchInputs(mobileSearchInput.value, 'mobile');
      renderSearchResults(mobileSearchResults, mobileSearchInput.value);
    });

    mobileSearchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMobileSearch();
      }

      if (event.key === 'Enter') {
        const first = getSearchResults(mobileSearchInput.value)[0];
        if (first) window.location.href = first.href;
      }
    });
  }

  mobileSearchCloseButtons.forEach((button) => button.addEventListener('click', closeMobileSearch));

  document.addEventListener('pointerdown', (event) => {
    if (!desktopSearchResults || desktopSearchResults.hidden) return;
    if (event.target.closest('#globalSearch')) return;
    closeDesktopSearchResults();
  });
}

function initMobileInsight() {
  if (!mobileInsightFab) return;

  mobileInsightFab.addEventListener('click', () => {
    if (mobileInsight?.classList.contains('is-open')) {
      closeMobileInsight();
      return;
    }

    openMobileInsight();
  });

  mobileInsightCloseButtons.forEach((button) => button.addEventListener('click', closeMobileInsight));
}

function initRefreshButton() {
  if (!refreshButton) return;

  refreshButton.addEventListener('click', async () => {
    if (refreshButton.disabled) return;

    refreshButton.disabled = true;
    refreshButton.setAttribute('aria-busy', 'true');
    refreshButton.classList.remove('is-spinning');
    void refreshButton.offsetWidth;
    refreshButton.classList.add('is-updating', 'is-spinning');

    app?.classList.add('is-refresh-transitioning');
    triggerScreenGlow();

    window.setTimeout(() => {
      refreshButton.disabled = false;
      refreshButton.removeAttribute('aria-busy');
      refreshButton.classList.remove('is-updating', 'is-spinning');
      app?.classList.remove('is-refresh-transitioning');
    }, 1000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (app) app.removeAttribute('aria-hidden');
  initSearch();
  initMobileInsight();
  initRefreshButton();
});