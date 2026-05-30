# KV — Guia Fiel de Componentes, Branding e Ideologia do Layout Skyline Mobile

Este documento serve como **KV técnico e visual** para orientar o desenvolvimento fiel do layout Skyline Mobile em **HTML, CSS e JS**, mantendo a identidade visual, a hierarquia dos componentes, a responsividade e um padrão rigoroso de animações suaves.

O objetivo é que qualquer dev consiga evoluir o projeto sem quebrar a linguagem visual já definida.

---

## 1. Essência da marca

A Skyline Mobile deve transmitir uma experiência de **tecnologia premium, inteligência operacional, segurança e clareza de gestão**.

A marca não deve parecer apenas um dashboard comum. Ela deve parecer um **sistema inteligente de controle empresarial**, com visual limpo, moderno e levemente futurista.

### Palavras-chave da identidade

- Premium
- Inteligência artificial
- Segurança
- Controle
- Precisão
- Leveza
- Gestão moderna
- Alta tecnologia
- Interface confiável
- Experiência fluida

### Personalidade visual

A Skyline Mobile combina:

- **Base clara e limpa** para leitura e produtividade.
- **Roxo neon** como energia visual principal.
- **Cards brancos translúcidos** com sombras suaves.
- **Ícones simples e geométricos**.
- **Elementos arredondados** para sensação mobile/app.
- **Glow roxo controlado** para reforçar tecnologia, sem poluir a tela.

---

## 2. Direção visual principal

O layout deve seguir a estética de um **painel SaaS premium com IA embutida**.

A tela inicial não deve parecer um site institucional. Ela deve parecer um **app de gestão inteligente**, onde o usuário entra e rapidamente entende os principais indicadores da empresa.

### Regra principal

> A interface precisa parecer leve, inteligente e viva, mas nunca exagerada.

O visual deve ter movimento e brilho, porém todo efeito precisa ser sutil, funcional e elegante.

---

## 3. Paleta de cores

### Cores principais

| Uso | Cor sugerida | Observação |
|---|---:|---|
| Roxo principal | `#6D35F2` | Cor de ação, ícones ativos e destaques |
| Roxo neon | `#8A4DFF` | Glow, bordas ativas e microinterações |
| Roxo profundo | `#19063D` | Fundos escuros e splash |
| Lilás claro | `#EEE8FF` | Badges e áreas suaves |
| Branco base | `#FFFFFF` | Fundo dos cards |
| Fundo app claro | `#F8F7FC` | Background principal |
| Texto principal | `#171326` | Títulos e números importantes |
| Texto secundário | `#6F6A7F` | Descrições, labels e legendas |
| Borda suave | `#E8E4F2` | Divisões e contornos |
| Sucesso | `#14A65A` | Indicadores positivos |
| Alerta/queda | `#F15B3D` | Indicadores negativos |

### Regras de uso

- Roxo nunca deve dominar toda a interface clara.
- O branco deve ser predominante nas telas internas.
- O roxo deve guiar atenção, não competir com o conteúdo.
- O glow só pode aparecer em elementos importantes: splash, logo, item ativo, botão principal, cards de IA e gráficos.
- Não usar muitas cores além de roxo, verde e laranja/vermelho para status.

---

## 4. Tipografia

A tipografia deve ser moderna, limpa e altamente legível.

### Fonte recomendada

Usar uma fonte sans-serif moderna:

```css
font-family: Inter, Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Hierarquia

| Elemento | Peso | Tamanho desktop | Tamanho mobile |
|---|---:|---:|---:|
| Saudação principal | 700 | 32–36px | 34–40px |
| Título de seção | 700 | 18–22px | 18–22px |
| Valor métrico | 700 | 24–28px | 24–30px |
| Label de card | 500 | 14–16px | 14–16px |
| Texto auxiliar | 400 | 12–14px | 12–14px |
| Botões | 600 | 13–15px | 13–15px |

### Regras

- Nunca usar fontes decorativas.
- Nunca usar texto muito fino em elementos importantes.
- Valores numéricos devem ter destaque forte.
- Labels devem ser discretas, mas legíveis.
- O espaçamento entre letras deve ser natural; evitar excesso de `letter-spacing`.

---

## 5. Grid e responsividade

O projeto precisa funcionar perfeitamente em **desktop e mobile**, mantendo a mesma linguagem visual.

### Desktop

Estrutura recomendada:

- Sidebar fixa à esquerda.
- Header superior com saudação, busca, notificações e perfil.
- Cards de métricas em linha horizontal.
- Card principal de IA ocupando largura maior.
- Cards secundários em grid.
- Coluna lateral direita para insights e alertas.
- Gráfico principal na parte inferior.

### Mobile

Estrutura recomendada:

- Sem sidebar lateral.
- Header compacto no topo.
- Cards de métricas em grid 2x2.
- Card de IA em destaque logo abaixo.
- Cards secundários em 2 colunas.
- Gráfico principal abaixo.
- Bottom navigation fixa e translúcida.

### Breakpoints obrigatórios

```css
/* Mobile */
@media (max-width: 767px) {}

/* Tablet */
@media (min-width: 768px) and (max-width: 1199px) {}

/* Desktop */
@media (min-width: 1200px) {}
```

### Regras de espaçamento

- Mobile: margens laterais entre `16px` e `24px`.
- Desktop: margens internas entre `24px` e `40px`.
- Cards devem ter padding mínimo de `20px`.
- Distância entre seções: `20px` a `32px`.
- Elementos não podem ficar colados, principalmente no mobile.

---

## 6. Componentes principais

## 6.1 Splash inicial Skyline

A splash é obrigatória na primeira entrada do usuário.

### Função

- Reforçar a marca.
- Dar tempo para carregar endpoints iniciais.
- Passar sensação premium antes de abrir o app.

### Estrutura

- Fundo roxo escuro tecnológico.
- Logo Skyline centralizada.
- Glow roxo suave ao redor do logo.
- Imagem adaptada para desktop e mobile.
- Transição suave para o app.

### Regras

- A splash deve aparecer antes do dashboard.
- Deve ser exibida apenas na primeira entrada, salvo se o cache/localStorage for limpo.
- O app só deve ser liberado após:
  - tempo mínimo visual da splash;
  - carregamento dos endpoints iniciais;
  - ou fallback seguro caso os endpoints demorem.

### Tempo recomendado

- Mínimo: `1200ms`
- Ideal: `1800ms` a `2400ms`
- Máximo com fallback: `3500ms`

---

## 6.2 App icon e favicon

O ícone roxo da Skyline deve ser usado como:

- `favicon.ico`
- `apple-touch-icon`
- ícones do `manifest.webmanifest`
- ícone exibido ao usar “Adicionar à tela inicial” no navegador

### Regras

- O ícone deve manter fundo roxo e símbolo branco.
- Não deformar o ícone.
- Não remover o glow/borda premium.
- Usar versões quadradas em múltiplos tamanhos.
- O manifest deve conter `name`, `short_name`, `icons`, `theme_color` e `background_color`.

---

## 6.3 Sidebar desktop

### Função

Organizar as áreas principais da plataforma.

### Itens esperados

- Comercial
- Operação
- Home
- Financeiro
- Gestão
- Configurações
- Empresa/plano

### Estilo

- Fundo branco ou quase branco.
- Ícones minimalistas.
- Item ativo com fundo lilás, glow suave e texto roxo.
- Bordas arredondadas.
- Separação clara entre navegação e rodapé da sidebar.

### Regras

- A sidebar não aparece no mobile.
- O item ativo deve ser visualmente claro.
- Não usar hover exagerado.
- O glow do item ativo deve ser discreto.

---

## 6.4 Header superior

### Função

Apresentar o contexto do app e ações rápidas.

### Elementos

- Saudação: “olá ka 👋” ou texto dinâmico.
- Subtítulo: “visão geral da empresa”.
- Busca.
- Notificações.
- Perfil/admin.

### Desktop

- Header horizontal.
- Busca alinhada à direita.
- Perfil no canto superior direito.

### Mobile

- Saudação maior.
- Ícones de busca e notificação à direita.
- Sem campo de busca aberto; usar botão circular.

### Regras

- O header deve respirar.
- Não comprimir a saudação.
- Ícones devem ter área clicável mínima de `44px`.

---

## 6.5 Cards de métricas principais

### Função

Mostrar rapidamente os principais indicadores da empresa.

### Exemplos

- Faturamento
- Margem
- Pedidos
- Estoque

### Estrutura do card

- Ícone roxo no topo.
- Label da métrica.
- Valor principal.
- Variação percentual.
- Texto comparativo: “vs mês ant.”

### Estilo

- Fundo branco.
- Borda suave.
- Sombra leve.
- Cantos arredondados entre `22px` e `28px`.
- Ícone em caixa roxa com glow sutil.

### Regras

- Valores precisam ser maiores que labels.
- Percentuais positivos usam verde.
- Percentuais negativos usam vermelho/laranja.
- O card inteiro pode ter hover no desktop, mas não deve “pular” demais.

---

## 6.6 Card Central de IA

### Função

Ser o principal bloco narrativo/inteligente da tela.

Este card comunica que o sistema não apenas mostra dados, mas interpreta e sugere caminhos.

### Conteúdo

- Título: “central de ia”.
- Frase curta de apoio.
- Insight principal com destaque roxo.
- Botões de ação: analisar, prever, alertas.
- Elemento visual 3D/glass roxo.

### Estilo

- Card maior e mais respirado.
- Fundo branco com leve gradiente lilás.
- Estrelas/decoradores roxos discretos.
- Elemento visual com blur/glassmorphism.

### Regras

- Este é o card mais importante da home.
- Deve aparecer acima dos cards secundários.
- O destaque roxo no texto deve chamar atenção, mas manter leitura natural.
- As ações devem parecer botões premium, não links comuns.

---

## 6.7 Cards secundários de módulos

### Função

Dar acesso visual aos módulos do negócio.

### Módulos

- Comercial
- Operação
- Financeiro
- Gestão

### Estrutura

- Ícone.
- Título.
- Subtítulo.
- Valor ou indicador.
- Mini gráfico ou barra de progresso.

### Regras

- Cada card precisa ter identidade própria, mas seguir o mesmo estilo.
- Os gráficos devem ser simples e decorativos, sem excesso de informação.
- Em mobile, usar grid 2x2.
- Em desktop, usar grid horizontal ou 2x2 conforme espaço.

---


### Regra de remoção dos cards globais e cards de apresentação

Os cards fixos de topo com `faturamento`, `margem`, `pedidos` e `estoque` não devem aparecer em nenhuma tela.

Também não deve existir card/bloco de apresentação antes do conteúdo principal do módulo, como `mesa comercial`, `BUs como acoes`, `receita total`, `ticket medio`, `linha de producao`, `custo parado por etapa`, `custo parado` ou `OS em fluxo`.

O topo deve seguir diretamente para o componente principal do módulo ativo. Na tela Comercial, após o header, deve aparecer a lista de BUs em formato de ações. Na tela Operação, após o header, deve aparecer a linha do tempo de produção. Indicadores só podem voltar quando forem específicos, compactos e integrados ao próprio componente principal, nunca como grade global repetida ou card introdutório separado.

## 6.8 Gráfico de evolução do faturamento

### Função

Mostrar tendência de crescimento de forma visual.

### Estilo

- Card largo.
- Linha roxa.
- Área inferior com preenchimento lilás suave.
- Tooltip roxo com valor destacado.
- Filtros simples, como “6 meses”.

### Regras

- Gráfico deve ser legível, não apenas decorativo.
- Linhas de grade precisam ser suaves.
- Tooltip deve aparecer com animação leve.
- No mobile, o gráfico deve caber sem quebrar a bottom navigation.

---

## 6.9 Painel lateral de insights desktop

### Função

Exibir sugestões e alertas inteligentes sem competir com a área principal.

### Elementos

- Card “insights de ia”.
- Lista de insights.
- Link “ver detalhe”.
- Card “alertas recentes”.

### Regras

- Visível apenas em desktop/tablet grande.
- No mobile, esse conteúdo deve entrar como seção abaixo do gráfico ou virar tela própria.
- Evitar excesso de texto.
- Cada insight deve ter ícone, texto curto e ação.

---

## 6.10 Bottom navigation mobile

### Função

Substituir a sidebar no mobile.

### Estrutura

- Barra fixa na parte inferior.
- Fundo translúcido com blur.
- Ícones dos módulos.
- Item ativo central destacado.

### Itens

- Comercial
- Operação
- Home
- Financeiro
- Gestão

### Estilo

- Altura confortável.
- Cantos super arredondados.
- Glow no item ativo.
- Ícone ativo em roxo com destaque circular.

### Regras

- Deve respeitar `safe-area-inset-bottom` em iPhones.
- Não pode cobrir conteúdo importante.
- O conteúdo da página deve ter padding inferior extra.
- A navegação precisa parecer nativa de app.

---

## 7. Sistema de botões

### Botão primário

- Roxo principal.
- Texto branco.
- Sombra roxa suave.
- Usar em ações mais importantes.

### Botão secundário

- Fundo branco ou translúcido.
- Texto roxo ou texto escuro.
- Ícone roxo.
- Borda suave.

### Botão circular

- Usado em busca, notificações e ações rápidas.
- Tamanho mínimo: `44px`.
- Fundo branco com borda suave.

### Regras

- Todo botão precisa ter estado `hover`, `active` e `focus-visible`.
- No mobile, o toque deve ter feedback visual leve.
- Não usar animações bruscas em botões.

---

## 8. Ícones

### Estilo

- Ícones lineares ou sólidos simples.
- Cantos arredondados quando possível.
- Preferência por traços médios.
- Roxo para ícones ativos.
- Cinza escuro para ícones inativos.

### Regras

- Todos os ícones devem ter estilo consistente.
- Não misturar ícones muito detalhados com ícones minimalistas.
- O ícone da marca deve ser tratado como elemento premium e não como ícone comum.

---

## 9. Glassmorphism e glow

O projeto pode usar glassmorphism, mas de forma controlada.

### Usar em

- Splash.
- Elemento visual da IA.
- Bottom navigation mobile.
- Badges suaves.
- Tooltips.

### Não usar em

- Todo card da tela.
- Textos longos.
- Áreas com dados importantes demais.

### Regra de intensidade

> O glow deve ser percebido, não gritar.

Se o brilho atrapalhar a leitura, está errado.

---

# 10. Regras rigorosas de animações suaves

As animações são parte essencial da experiência Skyline Mobile. Elas devem transmitir fluidez e inteligência, mas nunca devem parecer chamativas demais.

## 10.1 Princípios obrigatórios

1. **Toda animação deve ter propósito.**
2. **Nenhum elemento deve se mover sem motivo.**
3. **Transições devem ser curtas e elegantes.**
4. **Movimentos devem usar easing suave.**
5. **Animações não podem atrasar o uso real do sistema.**
6. **Dados e conteúdo devem carregar com sensação de estabilidade.**
7. **A interface não pode parecer “pulando”.**

---

## 10.2 Duração padrão

| Tipo de animação | Duração |
|---|---:|
| Hover simples | `160ms` a `220ms` |
| Press/tap | `100ms` a `140ms` |
| Entrada de cards | `360ms` a `520ms` |
| Splash fade out | `500ms` a `700ms` |
| Modal/dropdown | `220ms` a `320ms` |
| Tooltip | `160ms` a `240ms` |
| Mudança de gráfico | `500ms` a `800ms` |
| Skeleton/loading | `1000ms` a `1400ms` em loop |

---

## 10.3 Easing obrigatório

Usar easing moderno e natural:

```css
--ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1);
--ease-in-out-soft: cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring-soft: cubic-bezier(0.16, 1, 0.3, 1);
```

### Regra

Não usar `linear` para movimentos de entrada, saída, hover ou cards.

`linear` só é permitido em loops muito sutis, como shimmer/skeleton.

---

## 10.4 Entrada inicial da tela

Quando o dashboard aparecer após a splash:

- O fundo aparece primeiro.
- Header entra com leve `opacity` + `translateY`.
- Cards principais entram em sequência curta.
- Card de IA entra com delay pequeno e destaque sutil.
- Cards secundários entram depois.
- Gráfico aparece por último.

### Sequência recomendada

| Elemento | Delay |
|---|---:|
| Header | `0ms` |
| Cards de métricas | `80ms` |
| Card IA | `160ms` |
| Cards secundários | `240ms` |
| Gráfico | `320ms` |
| Sidebar/bottom nav | `120ms` |

### Exemplo de animação

```css
[data-animate="rise"] {
  opacity: 0;
  transform: translateY(14px) scale(0.985);
  animation: riseIn 480ms var(--ease-out-soft) forwards;
}

@keyframes riseIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

---

## 10.5 Hover em cards desktop

### Permitido

```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 45px rgba(55, 35, 110, 0.12);
}
```

### Proibido

- Escala acima de `1.02`.
- Movimento vertical maior que `6px`.
- Rotação em cards de dados.
- Glow muito forte.
- Animação infinita em cards de métrica.

---

## 10.6 Press/tap em mobile

No mobile, o feedback deve ser rápido e sutil.

```css
.button:active,
.nav-item:active,
.card:active {
  transform: scale(0.985);
}
```

### Regras

- Não usar hover como dependência no mobile.
- O estado `active` deve durar pouco.
- O toque não pode mover layout ao redor.

---

## 10.7 Animações do glow

Glow só pode pulsar em elementos decorativos ou de destaque controlado.

### Permitido

- Splash logo.
- Orb/elemento 3D da IA.
- Ponto de notificação.
- Item ativo na bottom navigation.

### Configuração recomendada

```css
@keyframes softPulse {
  0%, 100% {
    opacity: 0.72;
    filter: drop-shadow(0 0 14px rgba(138, 77, 255, 0.32));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 24px rgba(138, 77, 255, 0.48));
  }
}
```

### Regras

- Duração mínima de pulse: `2800ms`.
- Nunca usar pulse abaixo de `1600ms`.
- Nunca aplicar pulse em muitos elementos ao mesmo tempo.
- No máximo 2 elementos com animação infinita por tela.

---

## 10.8 Skeleton e carregamento

Quando endpoints estiverem carregando, usar skeleton elegante.

### Regras

- Skeleton deve respeitar o formato final do componente.
- Usar brilho horizontal muito leve.
- Nunca mostrar layout quebrado antes dos dados.
- Evitar loaders grandes no meio da tela depois da splash.

### Exemplo

```css
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(238, 232, 255, 0.45),
    rgba(255, 255, 255, 0.9),
    rgba(238, 232, 255, 0.45)
  );
  background-size: 220% 100%;
  animation: skeletonMove 1200ms linear infinite;
}

@keyframes skeletonMove {
  from { background-position: 120% 0; }
  to { background-position: -120% 0; }
}
```

---

## 10.9 Redução de movimento

O projeto deve respeitar usuários que preferem menos animação.

Obrigatório:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10.10 Performance das animações

### Propriedades permitidas para animar

- `transform`
- `opacity`
- `filter`, com moderação

### Evitar animar

- `width`
- `height`
- `top`
- `left`
- `margin`
- `padding`
- `box-shadow` em muitos elementos ao mesmo tempo

### Regra técnica

> Sempre que possível, animações devem usar `transform` e `opacity` para manter 60fps.

---

# 11. Estados visuais obrigatórios

Todo componente interativo precisa ter estados claros.

## 11.1 Estados mínimos

- Default
- Hover
- Active/Pressed
- Focus-visible
- Disabled
- Loading
- Error, quando aplicável
- Empty state, quando aplicável

## 11.2 Focus-visible

Obrigatório para acessibilidade:

```css
:focus-visible {
  outline: 3px solid rgba(109, 53, 242, 0.32);
  outline-offset: 3px;
}
```

---

# 12. Acessibilidade

O visual premium não pode prejudicar a usabilidade.

### Regras

- Contraste mínimo legível em todos os textos.
- Botões com área clicável mínima de `44px`.
- Textos importantes nunca devem depender apenas de cor.
- Ícones decorativos devem usar `aria-hidden="true"`.
- Elementos interativos precisam ser acessíveis por teclado.
- Imagens importantes precisam ter `alt` adequado.
- A splash não pode prender o usuário indefinidamente.

---

# 13. PWA e experiência de app

O sistema deve se comportar como aplicativo quando instalado.

### Obrigatório

- `manifest.webmanifest` configurado.
- Ícones em múltiplos tamanhos.
- `theme-color` roxo escuro.
- `apple-touch-icon` configurado.
- `favicon` usando o ícone da marca.
- Service worker para cache inicial.
- Layout mobile respeitando `safe-area`.

### Manifest recomendado

```json
{
  "name": "Skyline Mobile",
  "short_name": "Skyline",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#19063D",
  "theme_color": "#19063D",
  "icons": []
}
```

---

# 14. Padrão de conteúdo

A interface deve usar textos curtos, diretos e funcionais.

### Tom de voz

- Inteligente
- Claro
- Confiante
- Objetivo
- Sem excesso de formalidade

### Exemplos corretos

- “visão geral da empresa”
- “insights inteligentes para impulsionar seus resultados”
- “receita +12,4% no mês”
- “ver detalhe”
- “alertas recentes”

### Evitar

- Textos longos demais.
- Termos técnicos desnecessários.
- Mensagens genéricas sem valor.
- Excesso de emojis.

---

# 15. Regras de fidelidade visual

O dev deve seguir estas regras sem flexibilizar:

1. Manter o roxo como cor de assinatura.
2. Manter a interface clara no dashboard.
3. Manter a splash roxa antes do app.
4. Manter cards arredondados e suaves.
5. Manter sidebar no desktop e bottom nav no mobile.
6. Manter o card de IA como destaque principal.
7. Usar animações suaves, nunca agressivas.
8. Não substituir o app icon por outro símbolo.
9. Não remover estados de acessibilidade.
10. Não carregar dados quebrando o layout; usar skeleton quando necessário.
11. Não exagerar em blur, glow ou sombras.
12. Não misturar estilos visuais diferentes dentro da mesma tela.

---

# 16. Checklist de entrega para o dev

Antes de considerar a tela pronta, validar:

- [ ] Splash aparece na primeira entrada.
- [ ] Endpoints iniciais têm tempo para carregar antes do dashboard.
- [ ] Favicon aparece corretamente.
- [ ] Ícone aparece ao adicionar site à tela inicial.
- [ ] Desktop mantém sidebar e grid completo.
- [ ] Mobile mantém bottom navigation fixa.
- [ ] Cards não quebram em telas pequenas.
- [ ] Header fica legível no mobile.
- [ ] Animações seguem duração e easing definidos.
- [ ] `prefers-reduced-motion` está implementado.
- [ ] Todos os botões têm `hover`, `active` e `focus-visible`.
- [ ] O layout não depende de imagens externas para funcionar.
- [ ] O app não trava se algum endpoint falhar.
- [ ] O visual segue a identidade roxa premium da Skyline.

---

# 17. Resumo final do KV

A Skyline Mobile deve ser desenvolvida como uma experiência de **dashboard-app premium**, com foco em IA, gestão e controle empresarial.

A experiência começa com uma splash roxa tecnológica, passa para uma interface clara e organizada, e usa o roxo como elemento de inteligência, ação e marca.

As animações devem ser suaves, rápidas e funcionais. O objetivo não é impressionar com movimento exagerado, mas criar a sensação de um sistema moderno, confiável e bem acabado.

> Regra final: se uma alteração deixar o layout menos limpo, menos premium ou menos fluido, ela não deve ser aplicada.

---

# KV complementar — telas Comercial e Operacao

## Tela Comercial

A tela Comercial deve transformar cada BU em uma acao de mercado, inspirada na lista de bolsa do iPhone, mas sem copiar o visual escuro. A linguagem visual deve continuar Skyline: vidro branco, bordas suaves, roxo como energia principal e micrograficos limpos. A tela deve abrir direto na lista de BUs, sem card introdutório acima.

### BUs obrigatorias

- Loja
- WhatsApp
- Site
- Marketplaces

### Estrutura de cada card de BU

Cada linha/card deve conter:

- ticker curto da BU;
- nome legivel do canal;
- micrografico de tendencia;
- valor principal em destaque;
- variacao percentual em badge;
- estado positivo em verde e estado negativo em vermelho/laranja controlado.

### Regra visual

Mesmo usando a referencia de bolsa, a tela nao deve ficar preta, pesada ou agressiva. O card deve parecer um ativo financeiro premium dentro do ecossistema Skyline.

## Tela Operacao

A tela Operacao deve usar uma linha do tempo vertical inspirada em rotas com paradas. Cada parada representa uma etapa da producao, com foco no custo parado. A tela deve abrir direto na linha do tempo, sem card introdutório acima.

### Etapas obrigatorias

1. Recebimento
2. Triagem
3. Gestao de pecas
4. Reparo
5. Qualidade

### Estrutura de cada etapa

Cada parada deve conter:

- marcador numerado;
- nome da etapa;
- descricao curta da funcao da etapa;
- valor de custo parado;
- metadados de apoio, como OS paradas e tempo medio.

### Hierarquia de atencao

A etapa com maior gargalo pode usar acento visual controlado, sem quebrar a paleta. O alerta nunca deve dominar a interface; deve apenas orientar o olhar.

## Telas em breve

As telas abaixo devem existir como placeholders limpos, sem conteudo falso complexo:

- Home
- Financas
- Gestao

O placeholder deve usar icone grande, titulo `em breve...` e texto curto explicando o modulo.

## Animacoes obrigatorias

As animacoes devem ser suaves, discretas e funcionais:

- transicao de tela: opacidade + deslocamento vertical maximo de 12px;
- duracao ideal: 280ms a 420ms;
- easing obrigatorio: `cubic-bezier(.22, 1, .36, 1)` ou equivalente suave;
- hover em cards: subir no maximo 2px;
- micrografico: pode desenhar a linha uma unica vez ao entrar na tela;
- proibido: bounce agressivo, zoom brusco, piscar, rotacao forte ou loop chamativo em cards de leitura.

## Acessibilidade de movimento

Todo movimento deve respeitar `prefers-reduced-motion: reduce`. Nesse modo, transicoes e animacoes devem ser removidas sem quebrar layout ou navegacao.


### Regra de marca na sidebar desktop

No desktop, o topo da sidebar deve usar a logo horizontal oficial `Skyline Mobile`, em imagem, solta sobre o fundo da sidebar, sem card, sem borda e sem sombra.  
Não usar mais o bloco textual antigo `ka / gestao` nesse ponto.

- Arquivo recomendado: `assets/logo-skyline-desktop.png`.
- A logo deve manter proporção, sem esticar.
- É proibido envolver a logo desktop em card branco, container arredondado, borda ou sombra.
- O card deve continuar com vidro claro, borda suave e sombra leve.
- No mobile, a sidebar continua oculta; não duplicar essa logo na bottom navigation.


## Regra desktop — remoções definitivas

- O rodape inferior esquerdo do desktop com configuracoes, empresa e plano deve permanecer removido.
- O menu de perfil/admin no canto superior direito do desktop deve permanecer removido.
- A logo desktop deve aparecer limpa e direta na sidebar, sem forma externa, sem box-shadow e sem glow artificial aplicado por CSS.


## Regra mobile — leitura rápida flutuante

Na versão mobile, o painel lateral de leitura rápida da tela Comercial não deve ocupar espaço no fluxo do conteúdo. Ele deve aparecer como um botão flutuante circular no canto inferior direito, acima da navegação inferior. O botão usa um sparkle pequeno `✦`, fundo em gradiente roxo e sombra suave. Ao tocar, abre um painel compacto com backdrop leve, vidro branco translúcido, borda sutil e animação curta de entrada com `opacity` + `translateY` + `scale`. No desktop, o painel continua como card lateral fixo na grade.

### Complemento — resumo operacional flutuante no mobile

Na tela de Operação, os cards de resumo `etapa crítica` e `prioridade` seguem a mesma regra do painel de leitura rápida no mobile: não devem ocupar espaço no fluxo da tela. Em telas até 920px, esses dados ficam dentro do botão flutuante circular no canto inferior direito. Ao tocar, abre o sheet translúcido com as mesmas regras de movimento: `opacity`, `translateY` curto, `scale` sutil, sem bounce, sem piscar e sem deslocamentos grandes. No desktop, o resumo operacional continua como painel lateral fixo da grade.


## Regra de painel rapido operacional

A tela de operacao deve usar exatamente o mesmo componente visual de leitura rapida do comercial: kicker com sparkle, dois blocos `mini-insight`, divisoria fina, botao `full-button` e, no mobile, apenas o botao flutuante redondo que abre o sheet. Nao usar cards KPI verticais com icones grandes nessa area.

### Regra do botao de atualizar

O botao circular do topo deve representar atualizacao manual dos dados. Usar apenas icone estatico de seta circular, sem badge, bolinha roxa, notificacao ou contador. No clique, recarregar os endpoints configurados no app sem alterar a navegacao atual.

## Regra de transicao entre telas

- Toda troca de modulo deve ter fade/blur curto, sem salto visual.
- Um glow roxo deve atravessar a viewport uma unica vez, em ate 720ms.
- O glow e decorativo, `pointer-events: none`, e nao pode bloquear clique ou leitura.
- A animacao deve existir no desktop e no mobile.
- Em `prefers-reduced-motion: reduce`, a transicao deve ser desativada.


## Regra de transição entre telas e refresh

A mudança de tela deve ser sempre suave, usando fade curto, deslocamento vertical mínimo e blur leve. Não usar cortes secos, zoom agressivo ou animações longas.

O glow roxo de passagem é exclusivo do mobile. Ele deve ser breve, discreto, sem bloquear clique e deve aparecer somente em dois momentos: ao trocar de tela pelo menu mobile e ao usar o botão de atualizar dados. No desktop, o glow não deve aparecer; a navegação mantém apenas a transição suave dos painéis.

O botão de atualizar deve recarregar os endpoints configurados em `INITIAL_ENDPOINTS`, usando `cache: no-store`, sem depender do cache do Service Worker para dados de API.


## Regra adicional: refresh desktop

No desktop, o glow roxo de tela deve acontecer somente quando o usuario acionar o botao de atualizar dados. A navegacao entre telas nao deve disparar glow no desktop. No mobile, a navegacao e o refresh podem manter o sweep roxo rapido e discreto.


---

## Regra de menu lateral recolhível

- No desktop, a logo principal deve ser clicável e sempre direcionar para `Home`.
- O módulo deve se chamar apenas `Home`; não usar mais `Home` em labels de navegação.
- O painel lateral expandido exibe a logo horizontal Skyline e os nomes dos módulos.
- O painel lateral recolhido deve exibir apenas a marca/ícone Skyline e os ícones de cada módulo.
- O botão de recolher fica no canto inferior direito do painel lateral, com seta para a esquerda quando expandido.
- Ao recolher, a largura muda com transição suave curta, sem bounce agressivo e sem deslocamento brusco do conteúdo.
- O estado recolhido deve ser persistido localmente para manter a preferência do usuário.

## Regra de ícones SVG

Todos os ícones visuais da navegação, busca, refresh, leitura rápida, módulos em breve e controle de sidebar devem usar exclusivamente os SVGs da pasta `assets/icons/`. Não usar caracteres soltos como `✦`, `↗`, `◈`, `▣`, `◎`, `⌕`, `↻`, `←` ou `→` como ícones de interface. Os SVGs devem manter escala consistente, transição suave e contraste com o estado ativo.


## Regra de sidebar recolhível desktop

- A seta de recolher deve usar `back.svg` com a sidebar aberta.
- A seta de expandir deve usar `front.svg` com a sidebar recolhida.
- É proibido inverter SVG com `scaleX`, `rotate`, filtro de espelhamento ou qualquer flip artificial.
- O botão da seta deve ser transparente, sem círculo, sem borda aparente e sem sombra fixa.
- A transição de recolher/expandir deve ser rápida, discreta e suave, usando `grid-template-columns`, `opacity`, `max-width` e pequenos ajustes de `transform`, sem deslocamentos bruscos.
