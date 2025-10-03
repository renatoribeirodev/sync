# SyncUp - Gerenciador de Projetos 🚀

**SyncUp** é uma moderna aplicação web de gerenciamento de projetos, desenvolvida como um case de estudo completo sobre arquiteturas de software avançadas para o front-end. A aplicação é responsiva, instalável (PWA) e demonstra conceitos como gerenciamento de estado global, Micro-Frontends e fluxos de autenticação modernos.

![Screenshot do Dashboard do SyncUp](https://i.imgur.com/3YpD55D.png)

## ✨ Funcionalidades Principais

* **Dashboard Interativo:** Visualização rápida de métricas chave como projetos ativos, em andamento, concluídos e membros da equipe.
* **Gerenciamento de Projetos (CRUD):** Funcionalidade completa para Criar, Ler, Atualizar e Excluir projetos.
* **Gerenciamento de Equipe (CRUD):** Funcionalidade completa para Adicionar, Editar e Excluir membros da equipe.
* **Persistência de Dados:** Todos os dados de projetos e equipes são salvos no **Local Storage** do navegador, simulando um backend e garantindo que os dados persistam entre as sessões.
* **Progressive Web App (PWA):** A aplicação é 100% compatível com PWA, permitindo que seja "instalada" no desktop ou em dispositivos móveis para uma experiência de aplicativo nativo.
* **Prova de Conceito de Micro-Frontends:** Inclui uma página de "Análise" que é, na verdade, uma aplicação separada e independente, carregada dinamicamente em tempo de execução.

## 🏗️ Conceitos de Arquitetura Implementados

Este projeto foi construído para demonstrar o domínio sobre os seguintes conceitos de engenharia de software:

1.  **Arquitetura de Application Shell:** O projeto utiliza um componente "Shell" (`AppShell.jsx`) que serve como o container principal da aplicação, responsável pela navegação, layout e estado global. Cada página (`Dashboard`, `Projetos`, `Equipe`) funciona como um micro-aplicativo isolado e desacoplado, carregado dinamicamente pelo Shell.

2.  **Gerenciamento de Estado Global com Zustand:** O estado da aplicação (autenticação, dados de projetos, dados da equipe) é gerenciado de forma centralizada e eficiente com a biblioteca Zustand. Isso permite uma comunicação desacoplada entre os componentes, seguindo uma abordagem minimalista e baseada em hooks.

3.  **Simulação de Autenticação OAuth 2.0:** O fluxo de login simula o retorno de um provedor de identidade corporativo (como Google ou Microsoft). O clique no botão representa o callback de sucesso do fluxo OAuth, que autoriza o acesso à aplicação.

4.  **Micro-Frontends com Module Federation (Prova de Conceito):** A página "Análise" demonstra uma arquitetura de Micro-Frontend "real". Ela é um projeto Vite/React completamente separado, rodando em seu próprio servidor, que é carregado dinamicamente pelo aplicativo principal (Shell) em tempo de execução, utilizando o `vite-plugin-federation`.

## 🛠️ Tecnologias Utilizadas

* **Framework:** React 18
* **Build Tool:** Vite
* **Gerenciamento de Estado:** Zustand & Immer
* **Ícones:** Lucide React
* **Micro-Frontend:** Module Federation (`@originjs/vite-plugin-federation`)
* **Estilização:** CSS puro com Variáveis CSS para theming.

---

## 🚀 Guia de Instalação e Execução

Para rodar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

* Node.js (versão 18 ou superior)
* npm (geralmente instalado com o Node.js)

### 1. Rodando a Aplicação Principal (SyncUp)

Esta é a aplicação principal com todas as funcionalidades de CRUD.

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITÓRIO>
    cd syncup-project-manager
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, como `5175`, se a 5173 estiver em uso).

### 2. Rodando a Prova de Conceito de Micro-Frontend

Para ver a página "Análise" funcionando, você precisa rodar um **segundo projeto** simultaneamente.

1.  **Clone ou crie o projeto `analytics-micro-app`:**
    * Este projeto deve estar em uma pasta separada, fora do `syncup-project-manager`.

2.  **Navegue até a pasta e instale as dependências:**
    ```bash
    cd analytics-micro-app
    npm install
    ```

3.  **Construa (Build) o micro-frontend:**
    * Este passo gera a pasta `dist` com os arquivos otimizados.
    ```bash
    npm run build
    ```

4.  **Inicie o servidor de preview em uma porta diferente:**
    ```bash
    npm run preview -- --port 5174
    ```

**Para testar a integração:**
* Garanta que os **dois terminais** estejam rodando (o `dev` do SyncUp e o `preview` do Analytics).
* Abra o SyncUp (`http://localhost:5173` ou `5175`).
* Faça o login e clique no item "Análise" na barra lateral. A página carregada virá diretamente do servidor rodando na porta `5174`.

## 📂 Estrutura do Projeto

```
/
├── public/                # Arquivos estáticos (ícones, manifesto PWA)
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── forms/         # Formulários de Projeto e Equipe
│   │   ├── micro-apps/    # Nossos "micro-frontends" simulados (Dashboard, Projetos, Equipe)
│   │   ├── shell/         # A arquitetura do "Application Shell" (Header, Sidebar)
│   │   └── ui/            # Componentes de UI puros (Card, Modal)
│   ├── pages/             # Componentes de página completos (Login)
│   ├── store/             # Nossas stores do Zustand (auth, data)
│   ├── utils/             # Funções utilitárias e dados mock
│   ├── App.jsx            # Componente raiz que decide entre Login/Shell
│   ├── index.jsx          # Ponto de entrada da aplicação React
│   └── service-worker.js  # Lógica do PWA
├── vite.config.js         # Configuração do Vite e Module Federation
└── README.md              # Este arquivo
```