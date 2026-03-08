# 🔬 @vibe2founder/tests2dialects

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zero Dependencies](https://img.shields.io/badge/Deps-Zero-00d4aa?logo=checkmarx&logoColor=white)](.)
[![License](https://img.shields.io/badge/License-MIT-purple)](LICENSE)
[![Bun](https://img.shields.io/badge/Runtime-Bun-f9f1e1?logo=bun&logoColor=black)](https://bun.sh)
[![Event Sourcing](https://img.shields.io/badge/Pattern-Event_Sourcing-ff6b6b)](.)
[![Proxy](https://img.shields.io/badge/Engine-ES6_Proxy-ffd93d)](.)

> *@vibe2founder/tests2dialects* — Adoção zero-risco! O framework que unifica diferentes dialetos de TDD e BDD num só lugar e em 1 só runner universal compatível com Jest e Bun!

[🔗 Veja o nosso CHANGELOG.md](CHANGELOG.md) para acompanhar as atualizações mais recentes.

---

## 🚀 Como Funciona

Por conta da segregação de times de uma empresa (Cientistas de Dados, DevOps, Produto, Desenvolvedores Node), unificar as nomenclaturas de "testes" é incômodo e doloroso.

O `tests2dialects` abraça o sistema permitindo multiplos _Dialetos_ no mesmo teste:
- 📐 **Matemático:** Axiomas e implicações, focado em provas puras (`axiom`, `proof`, `implies`);
- 📖 **Narrativo:** Contexto focado em regras de negócio para Produto (`intend`, `scenario`, `to_be`);
- 🛡️ **Imperativo:** Testagem estrita para Contratos e Infra (`ensure`, `verify`, `check`);
- 🌐 **API:** Declarações de testes para Requests.

```javascript
import { ensure, check, that, stub } from "@vibe2founder/one-spec-4-all";

ensure("Minhas Regras API - Dialeto Imperativo", () => {
  const api = stub();
  
  check("Criação de usuários correta", () => {
    that(api.statusCode).is(200);
  });
});
```

---

## 🛠️ Como foi feito

Nosso core foi elaborado na essência *Evidence-first*. Se um código gera bugs mascarados, não usamos! Todo o *mocking* gerado internamente não afunda dependências complexas. Nós empoderamos a ponte base do NodeJS e unificamos num mesmo namespace (`os4all`).

A compatibilidade cross-engine injeta no interpretador global asserções polimórficas. Rodando `bun test` ou rodando sob `npx jest`, as chamadas funcionam lado a lado (sendo o código legado totalmente suportado sem fricção e reescritas longas). 

- Os Eventos e Outputs são roteados centralmente mantendo os Relatórios unificados (One-Evidence-4-All). 

---

## 🧪 Como testar

A ferramenta conta com um runner próprio que delega ações ao motor preferido (Jest/Bun).

1. Exclusivo para testadores de WSL, certifique-se da tipagem.
2. Inicie via `npx one-spec-4-all` (ou alis `npx os4all` / `bun run os4all`) passando na raíz dos diretórios do seu código principal.
3. Não use abstrações mágicas! Seu teste deve criar stub seguro de banco e rotas declaratórias.

Para testar **o próprio módulo local**: navegue até o repósitorio raiz, use as regras bases de `$ wsl bun test`, garantindo os comportamentos determinísticos implementados na nossa suite.
