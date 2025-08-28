# TaskManagerWeb

## Descrição
Aplicação web para gerenciamento de tarefas, projetos e usuários, construída com Angular e Angular Material. Possui autenticação JWT, integração com API REST, formulários dinâmicos e interface moderna.

## Requisitos
- Node.js 18+
- Angular CLI
- Backend .NET (API rodando em http://localhost:5105)

## Instalação
1. Clone o repositório:
   ```sh
   git clone https://github.com/igorcabral01/TaskManagerWeb.git
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```

## Executando o projeto
1. Inicie o backend .NET (API deve estar rodando em http://localhost:5105)
2. Inicie o frontend Angular:
   ```sh
   ng serve
   ```
3. Acesse no navegador: [http://localhost:4200](http://localhost:4200)

## Funcionalidades
- Login com autenticação JWT
- Criação e edição de tarefas
- Dropdowns dinâmicos para usuários e projetos
- Proteção de rotas
- Integração com API REST
- Interface responsiva com Angular Material

## Estrutura de pastas
- `src/app/Inicio/` - Componentes principais (formulário de tarefa, página inicial)
- `src/app/Login/` - Autenticação
- `src/app/` - Configurações, rotas, enums

## Observações
- Certifique-se que a API está rodando antes de iniciar o frontend.
- As datas são enviadas no padrão ISO 8601 para compatibilidade com DateTime no backend.
- Para dúvidas ou problemas, consulte os logs do navegador e do backend.

## Autor
Igor Cabral

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
