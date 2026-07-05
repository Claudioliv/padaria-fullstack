# padaria-fullstack
# 🥖 Pães & Doces Cia - Cardápio Digital & E-commerce Full-Stack

Interface moderna, fluida e totalmente responsiva desenvolvida para um sistema de padaria e confeitaria. O projeto integra uma experiência rica no frontend com um banco de dados relacional populado via API.

---

## 🚀 Funcionalidades Principais

* **Busca Inteligente:** Lógica em JavaScript puro para filtragem dinâmica por digitação, tratando acentuações e espaços em branco.
* **Filtros por Categorias:** Botões dinâmicos que segmentam o cardápio em tempo real (Pães, Doces, Bebidas).
* **Hover States e Modais de Detalhes:** Cards com animação de profundidade e aproximação ao passar o mouse, abrindo uma mini-página interna com informações detalhadas do produto.
* **Carrinho de Compras Completo:** Sidebar lateral para controle de quantidade (adicionar/remover) e botão lixeira para exclusão total do item com recálculo automático de valor.
* **Navegação Sticky:** Menu superior fixo no topo com efeito translúcido (*glassmorphism*) para melhor usabilidade durante a rolagem.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
* **React.js** (Componentização e gerenciamento de estados)
* **Tailwind CSS v4** (Estilização utilitária e animações)
* **React Icons / Lucide** (Ícones vetoriais modernos)
* **Vite** (Ferramental de build rápido)

### Backend & Banco de Dados
* **Node.js** (Ambiente de execução)
* **Express** (Criação da API REST e rotas)
* **MySQL** (Banco de dados relacional)
* **CORS** (Gerenciamento de permissões de requisições)

---

## 📂 Estrutura do Projeto

```text
padaria-fullstack/
├── backend/          # Servidor Node.js & Conexão com o Banco
│   ├── server.js
│   └── package.json
├── frontend/         # Aplicação React & Tailwind
│   ├── src/
│   │   ├── components/  # CardProduto, etc.
│   │   └── App.jsx      # Estado global e Sidebar
│   └── package.json
└── README.md



