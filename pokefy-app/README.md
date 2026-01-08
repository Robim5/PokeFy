# PokeFy - E-Commerce Híbrido

## Descrição do Projeto

O **PokeFy** é uma aplicação web de comércio eletrónico híbrido desenvolvida em React que combina produtos de duas fontes distintas: uma API externa para produtos comuns (eletrónica, moda, joalharia) e dados locais para produtos temáticos de Pokémon (jogos, peluches, roupa temática, DLC).

Este projeto foi desenvolvido no âmbito da disciplina de Programação Web, representando uma implementação moderna de um e-commerce responsivo com funcionalidades completas de carrinho de compras, gestão de temas, suporte multilingue e experiência de utilizador otimizada.

---

## API Escolhida e Endpoints Utilizados

### API Externa: FakeStore API
**URL Base:** `https://fakestoreapi.com`

#### Endpoint Utilizado:
- **GET `/products`** - Obter todos os produtos
  - **Descrição:** Retorna uma lista completa de produtos com informações de título, preço, categoria, imagem, descrição e avaliação.
  - **Resposta:** Array de objetos JSON contendo produtos de categorias como electronics, jewelery, men's clothing e women's clothing.
  - **Implementação:** Utilizado em `src/utils/api.js` na função `fetchCommonProducts()`.

### Dados Locais: Produtos Pokémon
Os produtos Pokémon são geridos localmente através do ficheiro `src/utils/pokemonData.js`, contendo:
- **38 jogos Pokémon** (desde Blue/Red até Scarlet/Violet e Legends Z-A)
- **3 pacotes DLC** (Sword & Shield, Scarlet & Violet, Legends Z-A)
- **52 peluches** de diferentes Pokémon
- **33 Roupas** temáticas
- Categorias organizadas: games, dlc, plush, socks, tops, bottom

## Instruções de Instalação e Execução

### Pré-requisitos
- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn** (gestor de pacotes)

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/Robim5/PokeFy.git
cd PokeFy/pokefy-app
```

### Passo 2: Instalar Dependências
```bash
npm install
```

### Passo 3: Executar o Servidor de Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

### Passo 4: Construir para Produção (Opcional)
```bash
npm run build
```

Os ficheiros otimizados serão gerados na pasta `dist/`.

### Passo 5: Pré-visualizar Build de Produção
```bash
npm run preview
```

---

## Lista de Funcionalidades Implementadas

### Interface e Experiência de Utilizador
- **Tema Claro/Escuro**: Sistema de alternância entre temas com persistência em `localStorage`
- **Responsividade Completa**: Layout adaptável para dispositivos móveis, tablets e desktops
- **Overlay de Boas-Vindas**: Ecrã inicial interativo que apresenta o projeto
- **Música de Fundo**: Reprodução automática de música ambiente em loop (Hip Shop.mp3) após interação do utilizador
- **Animações Suaves**: Transições e efeitos visuais para melhorar a experiência

### Internacionalização
- **Suporte Multilingue**: Português de Portugal e Francês
- **Alternância Dinâmica**: Troca de idioma em tempo real sem recarregar a página
- **Contexto de Idioma**: Sistema de traduções centralizado em `src/utils/translations.js`

### Sistema de Carrinho de Compras
- **Adicionar ao Carrinho**: Produtos da API e dados locais
- **Gestão de Quantidades**: Incrementar, decrementar e remover produtos
- **Persistência de Dados**: Carrinho mantido em `localStorage`
- **Cálculo Automático**: Total dinâmico baseado em quantidades e preços
- **Notificações Toast**: Feedback visual para ações do utilizador (adicionar, remover, limpar)
- **Sidebar Modal**: Carrinho acessível através de um painel lateral

### Gestão de Produtos
- **Duas Categorias Principais**:
  - **Pokémon**: Jogos, DLC, peluches, roupa temática
  - **Produtos Comuns**: Eletrónica, joalharia, moda masculina e feminina
- **Sistema de Categorias Dinâmico**: Carrossel de categorias com scroll horizontal
- **Pesquisa em Tempo Real**: Campo de busca que filtra produtos instantaneamente
- **Ordenação Múltipla**: 
  - Alfabética (A-Z)
  - Preço crescente
  - Preço decrescente
- **Página de Detalhes**: Visualização completa de produto individual com informações detalhadas

### Navegação e Rotas
- **React Router**: Navegação SPA com duas rotas principais
  - `/` - Página inicial com todos os produtos
  - `/product/:id` - Página de detalhes do produto
- **Links Dinâmicos**: Navegação fluida entre páginas

### Componentes Modais e Popups
- **InfoPopup**: Informações sobre o projeto, motivação e tecnologias
- **AuthorPopup**: Créditos e informações dos autores
- **Cart Modal**: Painel lateral para visualização do carrinho

### Recursos Multimédia
- **Áudio de Fundo**: Música ambiente que toca automaticamente em loop
- **Imagens Otimizadas**: Todos os recursos visuais organizados por categoria em `public/assets/`

### Arquitetura e Boas Práticas
- **Context API**: Gestão de estado global para tema, idioma e carrinho
- **Custom Hooks**: `useTheme`, `useLanguage` para lógica reutilizável
- **Componentes Modulares**: Separação clara de responsabilidades
- **Código Comentado**: Documentação inline em português para facilitar manutenção
- **Estrutura de Pastas Organizada**:
  ```
  src/
  ├── components/    # Componentes reutilizáveis
  ├── context/       # Contextos React
  ├── hooks/         # Custom hooks
  ├── pages/         # Páginas da aplicação
  └── utils/         # Utilitários e dados
  ```

---

### Funcionalidades Técnicas
- **Vite**: Build tool moderno para desenvolvimento rápido
- **React 19**: Utilização da versão mais recente do React
- **React Icons**: Biblioteca de ícones consistente
- **React Toastify**: Sistema de notificações elegante
- **CSS Variables**: Tematização através de variáveis CSS customizadas
- **LocalStorage**: Persistência de preferências do utilizador


## Tecnologias Utilizadas

|   Tecnologia    |   Versão   |                    Propósito               |
|-----------------|------------|--------------------------------------------|
| React           | 19.2.0     | Framework principal                        |
| React Router DOM| 7.11.0     | Gestão de rotas                            |
| Vite            | 7.2.4      | Build tool e servidor de desenvolvimento   |
| React Icons     | 5.5.0      | Biblioteca de ícones                       |
| React Toastify  | 11.0.5     | Notificações toast                         |
| ESLint          | 9.39.1     | Linting e qualidade de código              |

---

## Estrutura do Projeto

```
pokefy-app/
├── public/
│   └── assets/           # Recursos estáticos
│       ├── autores/      # Fotos dos autores
│       ├── bottom/       # Roupa inferior
│       ├── dlc/          # Imagens de DLC
│       ├── games/        # Capas de jogos
│       ├── musica/       # Música de fundo (Hip Shop.mp3)
│       ├── plush/        # Imagens de peluches
│       ├── socks/        # Meias temáticas
│       └── tops/         # Roupa superior
├── src/
│   ├── components/       # Componentes React
│   │   ├── AuthorPopup.jsx
│   │   ├── Cart.jsx
│   │   ├── CategoryCarousel.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── InfoPopup.jsx
│   │   ├── Modal.jsx
│   │   ├── ProductCard.jsx
│   │   └── WelcomeOverlay.jsx
│   ├── context/          # Contextos React
│   │   ├── CartContext.jsx
│   │   ├── LanguageContext.jsx
│   │   ├── LanguageContextValue.js
│   │   └── ThemeContext.jsx
│   ├── hooks/            # Custom hooks
│   │   ├── useLanguage.js
│   │   └── useTheme.js
│   ├── pages/            # Páginas
│   │   ├── Home.jsx
│   │   └── ProductDetails.jsx
│   ├── utils/            # Utilitários
│   │   ├── api.js        # Chamadas à API
│   │   ├── pokemonData.js # Dados Pokémon
│   │   └── translations.js # Traduções
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Ponto de entrada
│   └── index.css         # Estilos globais
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Objetivos Pedagógicos Alcançados

- ✅ Integração de API REST externa
- ✅ Gestão de estado com Context API
- ✅ Roteamento com React Router
- ✅ Persistência de dados com localStorage
- ✅ Design responsivo e acessível
- ✅ Componentização e reutilização de código
- ✅ Internacionalização (i18n)
- ✅ Tematização dinâmica
- ✅ Boas práticas de desenvolvimento React

---

## Autores

Este projeto foi desenvolvido com dedicação e paixão por Pokémon pelos estudantes Fábio e Bruno da disciplina de Programação Web - Front-End.

---

## Notas Adicionais

### Porquê Pokémon?
Durante toda a disciplina, Pokémon tornou-se uma tradição nos nossos projetos. Decidimos que este último trabalho não poderia ser diferente. Combinamos a componente séria do e-commerce com a diversão e criatividade do universo Pokémon.

### Porquê Francês?
O suporte ao idioma francês representa um sonho partilhado pela equipa de um dia trabalhar ou viver em França. Este projeto é um pequeno passo nessa direção, permitindo-nos praticar o idioma enquanto desenvolvemos competências técnicas.

### Música de Fundo
A inclusão de música ambiente (Hip Shop.mp3) é uma característica que adoramos implementar nos nossos projetos. Acreditamos que adiciona um elemento divertido e imersivo à experiência do utilizador, tornando a navegação mais agradável.

---

## Licença

Este projeto foi desenvolvido para fins educacionais no âmbito da disciplina de Programação Web - Front-End no IPMAIA.

---

## Agradecimentos

Agradecemos à nossa professora pela orientação ao longo da disciplina e pela oportunidade de desenvolver este projeto que combina aprendizagem técnica com a nossa paixão por Pokémon.

---

**Desenvolvido com ❤️ e ☕ | 2026**
