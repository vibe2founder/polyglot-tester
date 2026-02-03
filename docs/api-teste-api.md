# 🌐 Dialeto de Testes de API - API Completa

> **Filosofia:** Fluent Interface e Contratos de API.
>
> **Vibe:** Declarativa, Precisa, Conectada.
>
> **Ideal para:** Backend Engineers, QA Automation, validação de contratos, testes de integração.

## Estrutura

| Função | Descrição | Equivalente Supertest/Axios |
| :--- | :--- | :--- |
| `ApiSpec.define(name)` | Inicia a definição de um novo teste de API | `describe` / `it` |
| `.from(url)` | Define a URL base para a requisição | `request(app)` / `axios.create` |
| `.get(path)` | Configura uma requisição GET | `.get(path)` |
| `.post(path, body)` | Configura uma requisição POST com corpo | `.post(path).send(body)` |
| `.put(path, body)` | Configura uma requisição PUT com corpo | `.put(path).send(body)` |
| `.delete(path)` | Configura uma requisição DELETE | `.delete(path)` |
| `.header(key, val)` | Adiciona um cabeçalho à requisição | `.set(key, val)` |

## Asserções

| Função | Descrição | Equivalente Jest/Chai |
| :--- | :--- | :--- |
| `.shouldReturn(status)` | Verifica o Status Code HTTP retornado | `expect(res.status).toBe(status)` |
| `.matchingSchema(schema)` | Valida se a resposta corresponde ao schema | `expect(res.body).toMatchSchema(schema)` |

## Execução

| Função | Descrição | O que faz |
| :--- | :--- | :--- |
| `.run()` | Executa a requisição e as validações | Dispara o fetch, valida e loga o resultado |

## Exemplo Completo

```typescript
import { ApiSpec } from "@purecore/one-proof-4-all/packages/api-test-dialect";

// Definindo o teste de forma fluída
await ApiSpec.define("Criar um novo usuário")
  .from("https://api.minha-empresa.com/v1")
  .post("/users", {
    name: "João Silva",
    email: "joao@exemplo.com",
    role: "admin"
  })
  .header("Authorization", "Bearer token-secreto")
  .shouldReturn(201)
  .matchingSchema({
    id: "number",
    name: "string",
    createdAt: "string"
  })
  .run();

await ApiSpec.define("Buscar usuário recém-criado")
  .from("https://api.minha-empresa.com/v1")
  .get("/users/123")
  .shouldReturn(200)
  .run();
```

## Quando Usar

- ✅ Testes de integração de APIs REST
- ✅ Verificação de contratos e schemas de resposta
- ✅ Validação de Status Codes HTTP
- ✅ Cenários que dependem de rede real ou mocks de rede
- ✅ Testes E2E de backend

## Quando NÃO Usar

- ❌ Testes unitários de funções puras → Use o [Dialeto Matemático](./api-matematico.md)
- ❌ Fluxos de UI complexos → Use o [Dialeto Narrativo](./api-narrativo.md)
- ❌ Lógica de negócios interna sem I/O → Use o [Dialeto Imperativo](./api-imperativo.md)
