# Changelog

All notable changes to this project will be documented in this file.

## [Release] v1.0.0

### What's Changed

- :rocket: **release**: Official v1.0.0 release.
- :wrench: **chore**: Optimized package size for npm by adding `files` field to `package.json` and creating `.npmignore`.
- :memo: **docs**: Standardized all dialect documentation (`api-api.md`, `api-matematico.md`, etc.).
- :art: **style**: Improved visual documentation tables.

## [Release] v0.4.1

### What's Changed

- :memo: **docs**: Added explicit "Running API Tests" section to README for clarity on execution steps.
- :sparkles: **feat**: Created `examples/showcase-api.spec.ts` demonstrating all API dialect features (GET, POST, PUT, DELETE, Headers, Schema).

## [0.4.0]

### What's Changed

- :recycle: **refactor**: Renomeado projeto para `@purecore/one-proof-4-all`.
- :bug: **fix**: Corrigidas extensões de importação ESM para `.js` em todo o projeto.
- :bug: **fix**: Implementado isolamento de estado no CLI entre arquivos de teste via `resetAtomicCore()`.
- :zap: **perf**: Melhorada a precisão do report do CLI com logs de caminho completo de suites.
- :label: **types**: Adicionada interface `AtomicMock` para resolver lints de Proxy dinâmico.

## [0.3.0]

### What's Changed

- :sparkles: **feat**: Criado o novo Dialeto de Testes de API (`@purecore/api-test-dialect`).
- :sparkles: **feat**: Implementado `@purecore/reqify` nativo/local utilizando Fetch API.
- :label: **types**: Adicionada tipagem semântica nominal para todos os parâmetros de rede em `types/api-types.ts`.
- :memo: **docs**: Adicionados READMEs detalhados para os novos pacotes e relatório técnico em `reports/`.
- :white_check_mark: **test**: Criado exemplo operacional em `examples/test-api.ts`.

## [0.2.0]

### What's Changed

- :rocket: **release**: Version bump to 0.2.0.
- :wrench: **chore**: Added `testall` as a CLI binary alias in `package.json`.
- :art: **style**: Standardized `readme.md` headings to sentence case (only first word capitalized).
- :sparkles: **feat**: Implemented `critica2.md` suggestions with visual proofs of coexistence and strategic sections for leadership.
- :zap: **perf**: Enhanced core engine with Deep Proxies for mocks, supporting automatic method mocking.
- :recycle: **refactor**: Implemented "Call Bubbling" in mocks to allow verifying object interactions via parent mocks.
- :bug: **fix**: Fixed `beforeAll` and `afterAll` hook execution in the test runner.
- :white_check_mark: **test**: Verified and fixed all examples, achieving 100% pass rate on the polyglot test suite.

## [0.1.0]

### What's Changed

- :memo: **docs**: Expanded README with detailed philosophies for each test dialect.
- :memo: **docs**: Added complete, realistic code examples for Math, Narrative, and Imperative dialects.
- :recycle: **refactor**: Updated `src/index.ts` to export dialect functions as top-level exports, simplifying imports.
- :wrench: **chore**: Standardized package naming in documentation to `@purecore/one-proof-4-all`.
- :art: **style**: Converted comparison table in README from HTML to Markdown for better portability.
- :sparkles: **feat**: Complete README restructure following podcast feedback:
  - Added "Cansado de Descrever?" hook connecting philosophy to practice
  - Added "Quick Start" section for 5-minute first test victory
  - Added visual dialect chooser flowchart
  - Added "A Dor Que Resolvemos" pain-point sections before each dialect
  - Moved advanced topics (Rosetta Table, Polyglot Mode) to the end
  - Added gradual adoption/migration guide
- :sparkles: **feat**: Complete CLI rewrite with Vitest-style output:
  - ANSI color palette (green/red/yellow/cyan)
  - Spinner animation during test execution
  - Per-file timer showing elapsed time
  - Grouped test results with indentation
  - Summary statistics (files, tests, duration)
  - Exit codes based on test results
- :sparkles: **feat**: README restructure following critica2.md podcast:
  - Visual proof of legacy coexistence (Jest + dialeto) at the very top
  - New "Por Que Adotar no Seu Time?" section for tech leads/managers
  - Progressive disclosure: API summaries in README, full docs linked separately
  - Created `/docs/api-imperativo.md`, `/docs/api-matematico.md`, `/docs/api-narrativo.md`
  - Reordered sections: Trust → Strategy → Quick Start → Choose Dialect
