const CACHE_NAME = 'skyline-mobile-v41-subtelas-pastas-sem-splash';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './subpage.js',
  './manifest.webmanifest',
  './favicon.ico',
  './apple-touch-icon.png',
  './assets/icon-72.png',
  './assets/icon-96.png',
  './assets/icon-128.png',
  './assets/icon-144.png',
  './assets/icon-152.png',
  './assets/icon-180.png',
  './assets/icon-192.png',
  './assets/icon-384.png',
  './assets/icon-512.png',
  './assets/logo-skyline-desktop.png',
  './assets/logo-skyline-mark.png',
  './assets/splash-desktop.png',
  './assets/splash-mobile.png',
  './assets/icons/sparks.svg',
  './assets/icons/carrinho.svg',
  './assets/icons/fabrica.svg',
  './assets/icons/money.svg',
  './assets/icons/home.svg',
  './assets/icons/front.svg',
  './assets/icons/back.svg',
  './assets/icons/refresh.svg',
  './assets/icons/tarket.svg',
  './assets/icons/busca.svg',
  './assets/icons/excluir.svg',
  './subtelas/comercial/loja.html',
  './subtelas/comercial/whatsapp.html',
  './subtelas/comercial/site.html',
  './subtelas/comercial/marketplaces.html',
  './subtelas/operacao/recebimento.html',
  './subtelas/operacao/triagem.html',
  './subtelas/operacao/gestao-de-pecas.html',
  './subtelas/operacao/reparo.html',
  './subtelas/operacao/qualidade.html',
  './subtelas/home/plano-comercial.html',
  './subtelas/home/plano-operacional.html',
  './subtelas/home/plano-financeiro.html',
  './subtelas/home/plano-gerencial.html',
  './subtelas/financeiro/lucro.html',
  './subtelas/financeiro/dre.html',
  './subtelas/financeiro/contas-a-pagar.html',
  './subtelas/financeiro/contas-a-receber.html',
  './subtelas/financeiro/precificacao.html',
  './subtelas/financeiro/prejuizos.html',
  './subtelas/financeiro/contabil.html',
  './subtelas/gestao/otimizacao.html',
  './subtelas/gestao/precificacao.html',
  './subtelas/gestao/vagas.html',
  './subtelas/gestao/melhorias.html',
  './subtelas/gestao/growth.html',
  './subtelas/gestao/oportunidades.html',
  './subtelas/gestao/gerencia-de-cliente.html',
  './subtelas/gestao/gerencia-de-estoque.html',
  './subtelas/gestao/gerencia-de-produto.html',
  './subtelas/gestao/gerencia-de-preco.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const isEndpoint = requestUrl.pathname.startsWith('/api/');
  const shouldBypassCache = event.request.cache === 'no-store' || isEndpoint;

  if (shouldBypassCache) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
