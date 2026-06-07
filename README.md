# Pokédex TypeScript Lite

## Sobre o projeto

O **Pokédex TypeScript Lite** é uma aplicação back-end simples, feita em **Node.js com TypeScript**, executada pelo terminal. O sistema consulta Pokémon na **PokeAPI**, transforma a resposta externa em um objeto simplificado e permite salvar Pokémon em um catálogo local no arquivo `pc_box.json`.

## Objetivo

Praticar os principais conceitos do Módulo 01:

- Node.js;
- JavaScript no back-end;
- TypeScript;
- interfaces;
- funções tipadas;
- arrays;
- objetos;
- JSON;
- métodos de array;
- classes;
- modificadores de acesso;
- async/await;
- fetch;
- try/catch;
- organização em camadas;
- GitHub;
- GitFlow;
- Kanban.

## Tecnologias utilizadas

- Node.js
- TypeScript
- TSX
- PokeAPI
- Git
- GitHub

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm
- Git

## Como instalar

Clone o repositório:

```bash
git clone https://github.com/ptrjr/pokedex-typescript-lite-sctec.git
```

Acesse a pasta do projeto:

```bash
cd pokedex-typescript-lite-sctec
```

Instale as dependências:

```bash
npm install
```

## Como executar

Execute o projeto pelo terminal:

```bash
npm run start
```

Também é possível usar:

```bash
npm run dev
```

Para compilar o TypeScript:

```bash
npm run build
```

Para executar o JavaScript compilado:

```bash
npm run preview
```

## Estrutura do projeto

```text
pokedex-typescript-lite/
│
├── src/
│   ├── main.ts
│   │
│   ├── controllers/
│   │   └── TerminalController.ts
│   │
│   ├── services/
│   │   ├── PokeApiService.ts
│   │   └── BoxService.ts
│   │
│   ├── models/
│   │   ├── Pokemon.ts
│   │   └── CustomErrors.ts
│   │
│   └── utils/
│       └── textFormatters.ts
│
├── pc_box.json
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Explicação dos arquivos

### `src/main.ts`

Ponto de entrada da aplicação. Instancia os serviços, injeta as dependências no controller e inicia o menu principal.

### `src/controllers/TerminalController.ts`

Camada responsável pela interação com o usuário no terminal. Exibe o menu, lê as opções digitadas e chama os serviços corretos.

### `src/services/PokeApiService.ts`

Camada responsável por consultar a PokeAPI usando `fetch`, `async/await` e `try/catch`. Também transforma o retorno da API em um objeto simplificado.

### `src/services/BoxService.ts`

Camada responsável pelo catálogo local. Adiciona, lista, remove e salva Pokémon no arquivo `pc_box.json` usando `node:fs/promises`.

### `src/models/Pokemon.ts`

Contém as interfaces `PokemonResumo` e `PokemonApiResponse`, usadas para tipar os dados internos e a resposta da API.

### `src/models/CustomErrors.ts`

Contém classes de erro customizadas que estendem `Error`.

### `src/utils/textFormatters.ts`

Contém funções utilitárias puras para normalizar texto, formatar exibição e calcular informações do catálogo.

## Funcionalidades

- Buscar Pokémon por nome ou ID;
- Consultar dados na PokeAPI;
- Tratar erro de Pokémon inexistente;
- Transformar resposta da API em objeto simplificado;
- Mapear tipos, altura, peso, HP, ataque e defesa;
- Adicionar Pokémon ao catálogo local;
- Impedir Pokémon duplicado pelo ID;
- Listar catálogo;
- Remover Pokémon por ID;
- Salvar catálogo no arquivo `pc_box.json`;
- Exibir mensagens claras no terminal.

## Menu da aplicação

Ao executar `npm run start`, o sistema exibe:

```text
Menu:
1 - Buscar Pokémon e adicionar ao catálogo
2 - Listar catálogo
3 - Remover Pokémon por ID
4 - Executar demonstração automática
0 - Sair
```

## Exemplos de execução

### Busca válida

Entrada testada:

```text
pikachu
```

Saída esperada:

```text
[OK] Pokémon encontrado: pikachu
[OK] pikachu adicionado ao catálogo.
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 | Ataque: 55 | Defesa: 40
```

### Busca por ID

Entrada testada:

```text
25
```

Saída esperada:

```text
[OK] Pokémon encontrado: pikachu
```

### Busca inválida

Entrada testada:

```text
pokemon-inexistente
```

Saída esperada:

```text
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

### Duplicidade

Entrada testada:

```text
adicionar pikachu duas vezes
```

Saída esperada:

```text
[AVISO] pikachu já está no catálogo.
```

### Listagem

Entrada testada:

```text
opção 2 do menu
```

Saída esperada:

```text
Catálogo atual:
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 | Ataque: 55 | Defesa: 40
[INFO] Todos possuem nome válido? Sim
[INFO] Peso total do catálogo: 60
```

### Remoção

Entrada testada:

```text
remover ID 25
```

Saída esperada:

```text
[OK] Pokémon removido do catálogo: #25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 | Ataque: 55 | Defesa: 40
```

## Conceitos aplicados

### TypeScript

O projeto usa tipagem em variáveis, parâmetros, retornos de funções, interfaces, classes e métodos.

### Interface `PokemonResumo`

Representa o Pokémon simplificado usado dentro do sistema:

- `id`;
- `nome`;
- `tipos`;
- `altura`;
- `peso`;
- `hp`;
- `ataque`;
- `defesa`.

### Interface `PokemonApiResponse`

Representa apenas os campos necessários da resposta da PokeAPI, sem mapear todo o JSON retornado.

### Fetch e async/await

A classe `PokeApiService` usa `fetch` para buscar Pokémon por nome ou ID e `async/await` para aguardar a resposta da API.

### Tratamento de erros

A busca usa `try/catch`. Quando o Pokémon não existe, o sistema exibe uma mensagem de erro e retorna `null`, sem quebrar a aplicação.

### Métodos de array utilizados

O projeto usa mais de 3 métodos de array:

- `map`: transformar tipos da API em lista de nomes;
- `find`: localizar stats e Pokémon pelo ID;
- `some`: verificar duplicidade;
- `filter`: remover Pokémon;
- `forEach`: listar Pokémon;
- `every`: validar se todos possuem nome;
- `reduce`: calcular peso total do catálogo.

### Classe `BoxService`

A classe `BoxService` possui:

- atributo privado `pokemons`;
- construtor com caminho do arquivo JSON;
- método `carregar`;
- método `adicionar`;
- método `listar`;
- método `remover`;
- método privado `salvar`.

## Organização do Kanban

Link do Kanban:

```text
https://trello.com/invite/b/6a257299b030999ef5d66782/ATTI0dedc1873013ff1103cbcc02da7f67c88D9C8AFC/pokedex-typescript-lite
```

Colunas mínimas sugeridas:

- Backlog;
- A Fazer;
- Em Andamento;
- Concluído.

Tarefas sugeridas:

- Criar repositório no GitHub;
- Configurar projeto Node com TypeScript;
- Criar package.json;
- Criar tsconfig.json;
- Criar src/main.ts;
- Criar interface PokemonResumo;
- Criar interface PokemonApiResponse;
- Criar serviço da PokeAPI;
- Usar fetch para consultar a PokeAPI;
- Tratar erro de Pokémon inexistente;
- Mapear resposta da API;
- Criar classe BoxService;
- Criar método adicionar;
- Bloquear Pokémon duplicado;
- Criar método listar;
- Criar método remover;
- Usar métodos de array;
- Testar fluxo no terminal;
- Atualizar README.md;
- Enviar links no AVA.

## Branches utilizadas

Para projeto individual:

- `main`
- `develop`
- `feat/pokedex`
- `docs/readme`

## Sugestão de commits semânticos

```bash
git add .
git commit -m "feat: configura projeto com typescript"

git add .
git commit -m "feat: cria interfaces de pokemon"

git add .
git commit -m "feat: implementa busca na pokeapi"

git add .
git commit -m "feat: cria catalogo local com json"

git add .
git commit -m "docs: atualiza readme com instrucoes"
```

## Melhorias futuras

- Criar filtros por tipo de Pokémon;
- Criar ordenação por peso, altura ou ataque;
- Criar testes automatizados;
- Criar uma API própria com Express;
- Criar interface web no futuro.
