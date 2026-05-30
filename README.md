# Skyline Mobile — HTML, CSS e JS

Projeto responsivo em HTML, CSS e JavaScript puro, com tela desktop, tela mobile, splash inicial e estrutura de PWA.

> Atualizacao: os cards globais de indicadores e os cards/blocos de apresentacao no topo de cada modulo foram removidos. Cada tela agora abre diretamente no componente principal do modulo ativo.

> Atualizacao visual: no desktop, a marca da sidebar usa a logo horizontal oficial Skyline Mobile. No mobile, a navegacao continua pelo bottom nav.

> Atualizacao visual: a logo desktop agora fica solta na sidebar, sem card, sem borda e sem sombra. O rodape da sidebar com configuracoes/empresa foi removido, assim como o menu de perfil/admin no canto superior direito do desktop.

## Como testar

1. Abra a pasta no VS Code.
2. Rode um servidor local. Exemplos:
   - `python -m http.server 8080`
   - ou extensão Live Server do VS Code.
3. Acesse `http://localhost:8080`.

> Importante: o Service Worker e a instalação como app funcionam melhor em `localhost` ou em um domínio com HTTPS.

## Arquivos principais

- `index.html`: estrutura do dashboard.
- `styles.css`: layout responsivo desktop/mobile.
- `app.js`: splash de primeira visita, navegação, PWA install e Service Worker.
- `manifest.webmanifest`: ícone do app, nome, tema e modo standalone.
- `service-worker.js`: cache básico dos arquivos iniciais.
- `assets/`: ícones e imagens roxas da Skyline.

## Integração com endpoints

No arquivo `app.js`, coloque seus endpoints reais no array `INITIAL_ENDPOINTS`:

```js
const INITIAL_ENDPOINTS = [
  '/api/dashboard/resumo',
  '/api/dashboard/insights',
  '/api/dashboard/alertas'
];
```

Na primeira entrada do usuário, a imagem roxa aparece antes do app para dar tempo de carregar esses dados iniciais. Depois disso, ela não aparece de novo no mesmo navegador porque fica salva no `localStorage`.

Para testar a splash de novo, rode no console do navegador:

```js
localStorage.removeItem('skyline:splash-seen-v1');
location.reload();
```

## Telas implementadas nesta versao

- `Comercial`: abre diretamente na lista de BUs no estilo bolsa de acoes, seguindo o KV Skyline. Cada linha representa uma BU: Loja, WhatsApp, Site e Marketplaces.
- `Operacao`: abre diretamente na linha do tempo de producao com etapas de recebimento, triagem, gestao de pecas, reparo e qualidade, exibindo custo parado por etapa.
- `Home`, `Financas` e `Gestao`: telas placeholder `em breve...`, prontas para receber conteudo real.

A navegacao troca as telas sem reload, mantendo transicoes suaves e sincronizando menu lateral, bottom navigation mobile e titulo do topo.

- No mobile, o painel de leitura rápida comercial vira um botão flutuante redondo no canto inferior direito; ao tocar, abre um painel compacto com as informações.


## Ajuste de leitura rapida

Operacao usa o mesmo painel de leitura rapida do comercial no desktop e o mesmo botao flutuante no mobile, mudando apenas o texto interno.

## Atualizacao manual dos dados

O botao circular no canto superior direito recarrega os endpoints listados em `INITIAL_ENDPOINTS`, sem badge/ponto roxo e usando icone estatico de seta circular.

## Transicao entre telas

As mudancas de modulo usam uma transicao suave com fade/blur curto e um glow roxo atravessando a tela. A animacao roda no desktop e no mobile e respeita `prefers-reduced-motion`.


## Transições e refresh

- A troca entre telas usa `page-view` com fade, leve subida e blur curto, mantendo a navegação suave no desktop e no mobile.
- O botão de atualizar recarrega os endpoints definidos em `INITIAL_ENDPOINTS`.
- No mobile, troca de tela e refresh disparam um glow roxo discreto e rápido varrendo a tela.
- No desktop, o glow aparece apenas no refresh; a troca de telas mantém só a transição suave.


## Menu lateral desktop

- Clique na logo Skyline para ir direto para `Home`.
- O item `Home` foi renomeado para `Home` em todos os menus e títulos.
- O botão circular no canto inferior direito do menu recolhe o painel lateral.
- Quando recolhido, o menu mostra apenas a marca Skyline e os ícones dos módulos.
- O estado recolhido/expandido fica salvo em `localStorage`.

## Ícones SVG

Todos os ícones funcionais da interface foram migrados para SVGs em `assets/icons/`:

- `carrinho.svg`: comercial
- `fabrica.svg`: operação
- `home.svg`: home
- `money.svg`: financeiro
- `tarket.svg`: gestão
- `sparks.svg`: leitura rápida / IA
- `busca.svg`: busca
- `refresh.svg`: atualizar endpoints
- `back.svg` e `front.svg`: recolher/expandir sidebar


## Ajuste de sidebar desktop

- O botão de recolher/expandir agora usa `back.svg` quando a sidebar está aberta e `front.svg` quando está recolhida.
- Não há `scaleX`, rotação ou flip no SVG da seta.
- O botão da seta não possui card, borda circular ou sombra fixa.
- A sidebar tem transição curta e discreta ao recolher/expandir.
