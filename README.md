# 📖 Vortex Mangás

O **Vortex Mangás** é uma Single Page Application (SPA) moderna para exploração e consulta de catálogos de mangás. O projeto consome a API do MangaDex, oferecendo busca em tempo real, navegação dinâmica, paginação sincronizada na URL e suporte para compilação nativa em Android.

O projeto foca em uma interface de usuário impecável, com temas cyberpunk/neon, garantindo uma excelente experiência tanto em desktops quanto em dispositivos móveis (com Bottom Sheets interativos).

---

## 🚀 Tecnologias Utilizadas

- **[React](https://react.dev/)** (Vite)
- **[React Router DOM](https://reactrouter.com/)** (Roteamento SPA)
- **[Capacitor](https://capacitorjs.com/)** (Empacotamento Nativo Android)
- **[MangaDex API](https://api.mangadex.org/)** (Fonte de dados do catálogo)
- **CSS3** (Estilização responsiva, Glassmorphism e tema customizado Neon)

---

## 🌟 Principais Funcionalidades

- **Navegação SPA:** Transições de tela fluidas e sem recarregamento de página.
- **Destaques e Populares:** Exibição dos 100 mangás mais seguidos na Home e banner com obra em destaque.
- **Catálogo Dinâmico Avançado:** 
  - Busca por texto com priorização de resultados.
  - Filtros Completos encapsulados em um componente Drawer/Bottom Sheet.
  - Filtro explícito +18 seguro por padrão.
  - Filtragem múltipla por Gêneros, Temas, Formatos, Status e Demografia.
  - Opções de ordenação personalizadas e filtro por Ano.
- **Parâmetros na URL:** Estado da busca, página atual e todos os filtros ativos persistem na URL, permitindo compartilhamento de links diretos.
- **Detalhes da Obra:** Rota dinâmica (`/manga/:id`) com sinopse, capa, informações detalhadas e histórico de navegação nativo do navegador.
- **Suporte Mobile:** Configurado via Capacitor para execução nativa em dispositivos Android, com UI responsiva amigável a toque (Bottom Sheet para filtros).

---

## 🏗️ Arquitetura e Estrutura do Projeto

### 🛣️ Roteamento (`src/App.jsx`)
A aplicação utiliza o `BrowserRouter` com as seguintes rotas mapeadas:

| Rota | Tela | Descrição |
| :--- | :--- | :--- |
| `/` | `Home` | Página inicial com destaques e obras populares |
| `/catalogos` | `Catalogos` | Busca geral de mangás e painel de filtros |
| `/saiba` | `Saiba` | Informações sobre a plataforma |
| `/manga/:id` | `DetalhesManga` | Informações detalhadas de um mangá específico (via UUID) |

---

### 🧩 Hooks Customizados (`src/hooks/`)
A lógica de negócios e as requisições estão segregadas em hooks especializados (Clean Code):

- `usePopularMangas.js`: Busca e gerencia a lista dos mangás mais populares (ocultando conteúdo sensível por padrão).
- `useMangaDestaque.js`: Processa o primeiro item da lista popular para exibição no banner principal.
- `useMangaSearch.js`: Gerencia a busca integrando todos os parâmetros de texto, tags, paginação e ordenação na API.
- `useMangaTags.js`: Busca os gêneros/temas da API dinamicamente e os separa por categorias lógicas.
- `useMangaDetails.js`: Consome os dados específicos de uma obra a partir do UUID da URL.
- `useCatalogParams.js`: Sincroniza todos os parâmetros de consulta e filtros com a URL via `SearchParams`.

---

### 🧱 Componentização (`src/componentes/`)
- Componentes visuais como `Navbar`, `CardManga`, e o painel `FiltrosDrawer` isolam completamente o layout da lógica de negócio.

---

### 🎨 Design e Estilização
- `src/index.css`: Reset global de CSS e estilos base.
- `src/App.css`: Definição do tema escuro (fundo escuro, cards azulados e acentos em cor ciano), gerenciamento da grade responsiva e adaptação para dispositivos móveis com componentes complexos como Toggles e Drawers.

---

## 🏃 Como Executar o Projeto

### Pré-requisitos
- **Recomendação: Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Android Studio** (apenas se for rodar/compilar a versão mobile Android)

### Guia Único de Instalação, Execução e Build Mobile

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/Vortex.git

# 2. Acesse a pasta do projeto
cd Vortex

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento na web
npm run dev
# Acesse no seu navegador através do link: http://localhost:5173

# -------------------------------------------------------------
# ETAPAS ADICIONAIS PARA COMPILAÇÃO / EXECUÇÃO NO ANDROID:
# -------------------------------------------------------------

# 5. Gere o pacote de produção da aplicação web
npm run build

# 6. Sincronize os arquivos compilados (dist) com o Capacitor
npx cap sync

# 7. Abra o projeto nativo no Android Studio para rodar em um emulador ou dispositivo físico
npx cap open android
```

## 📱 Suporte a Android Nativo
- **App Icon e Splash Screen:** Ícones exclusivos gerados pelo @capacitor/assets.
- **Botão de Voltar Nativo:** Integração com @capacitor/app para capturar e gerenciar a navegação ao clicar no botão físico de voltar do smartphone, permitindo a navegação interna ou a saída do app de forma suave.
