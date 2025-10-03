# SyncUp - Gerenciador de Projetos (Arquitetura de Micro-Frontends) 🚀

**SyncUp** é uma moderna aplicação web de gerenciamento de projetos, desenvolvida como um case de estudo completo sobre arquiteturas de software avançadas para o front-end. Este repositório está estruturado como um **Monorepo**, contendo a aplicação principal (Shell) e um Micro-Frontend independente (Página de Análise).

![Screenshot da POC de Micro-Frontend](https://i.imgur.com/wOQZ8hU.png)

## ✨ Arquitetura e Funcionalidades

Este projeto demonstra o domínio sobre os seguintes conceitos de engenharia de software:

1.  **Arquitetura de Application Shell:** O projeto `syncup-project-manager` funciona como o "Shell", responsável pelo layout, navegação e estado global.
2.  **Gerenciamento de Estado Global com Zustand:** O estado da aplicação (autenticação, dados) é gerenciado de forma centralizada e eficiente com Zustand.
3.  **Simulação de Autenticação OAuth 2.0:** O fluxo de login simula o retorno bem-sucedido de um provedor de identidade corporativo.
4.  **Progressive Web App (PWA):** A aplicação principal é 100% instalável no desktop ou em dispositivos móveis.
5.  **CRUD com Persistência Local:** Todas as funcionalidades de Criar, Ler, Atualizar e Excluir para Projetos e Equipes são salvas no Local Storage.
6.  **Micro-Frontends com Module Federation:** A aplicação `analytics-micro-app` é um projeto Vite/React completamente separado que é carregado dinamicamente pelo Shell em tempo de execução, demonstrando uma arquitetura de Micro-Frontend "real".

## 🛠️ Tecnologias Utilizadas

* **Framework:** React 18
* **Build Tool:** Vite
* **Gerenciamento de Estado:** Zustand & Immer
* **Micro-Frontend:** Module Federation (`@originjs/vite-plugin-federation`)
* **Estilização:** CSS puro com Variáveis CSS.

---

## 🚀 Guia de Instalação e Execução Completa

Para rodar este projeto e ver a integração dos Micro-Frontends, você precisa iniciar os dois servidores simultaneamente.

### Pré-requisitos

* Node.js (versão 18 ou superior)
* npm

### Estrutura de Pastas

Este repositório é um Monorepo. A estrutura de pacotes é a seguinte:
```
/packages/
├── /syncup-project-manager/   (O App Shell Principal)
└── /analytics-micro-app/      (O Micro-Frontend Remoto)
```

### Passo 1: Iniciar o Micro-Frontend Remoto (`analytics-micro-app`)

Este servidor precisa ser iniciado primeiro, pois ele "oferece" o componente para o app principal.

1.  Abra um **Terminal 1**.
2.  Navegue até a pasta do micro-frontend:
    ```bash
    cd packages/analytics-micro-app
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  **Construa (Build)** o projeto:
    ```bash
    npm run build
    ```
5.  **Inicie o servidor de preview** em uma porta específica (ex: 5174):
    ```bash
    npm run preview -- --port 5174
    ```
6.  Deixe este terminal rodando.

### Passo 2: Iniciar a Aplicação Principal (`syncup-project-manager`)

Este é o nosso aplicativo principal que o usuário irá interagir.

1.  Abra um **Terminal 2** (um novo terminal, separado do primeiro).
2.  Navegue até a pasta da aplicação principal:
    ```bash
    cd packages/syncup-project-manager
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173` (ou outra porta, como `5175`).

### Passo 3: Testando a Integração

* Com os **dois terminais rodando**, acesse a URL do `syncup-project-manager` no seu navegador (ex: `http://localhost:5173`).
* Faça o login na aplicação.
* Clique no item **"Análise"** na barra de navegação lateral.
* A página de análise será carregada, demonstrando que o app principal conseguiu buscar e renderizar com sucesso um componente de um projeto totalmente independente que está rodando em outra porta.