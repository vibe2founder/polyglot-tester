# 🌐 Dialeto de API - API Completa

> **Filosofia:** Design by Contract e Fluent Interface.
>
> **Vibe:** Declarativa, Precisa, Conectada.
>
> **Ideal para:** Backend Engineers, QA Automation, validação de contratos, testes de integração e microserviços.

## Estrutura

| Função                 | Descrição                                  | Equivalente Supertest/Axios         |
| :----------------------- | :------------------------------------------- | :---------------------------------- |
| `ApiSpec.define(name)` | Inicia a definição de um novo teste de API | `describe` / `it`               |
| `.from(url)`           | Define a URL base para a requisição        | `request(app)` / `axios.create` |
| `.get(path)`           | Configura uma requisição GET               | `.get(path)`                      |
| `.post(path, body)`    | Configura uma requisição POST com corpo    | `.post(path).send(body)`          |
| `.put(path, body)`     | Configura uma requisição PUT com corpo     | `.put(path).send(body)`           |
| `.delete(path)`        | Configura uma requisição DELETE            | `.delete(path)`                   |
| `.method(verb, path)`  | Define um método HTTP arbitrário           | `.request({method, url})`         |

## Configuração da Requisição

| Função              | Descrição                                   | Equivalente                             |
| :-------------------- | :-------------------------------------------- | :-------------------------------------- |
| `.header(key, val)` | Adiciona um cabeçalho à requisição        | `.set(key, val)`                      |
| `.withBody(body)`   | Define ou sobrescreve o corpo da requisição | `.send(body)`                         |
| `.withAuth(token)`  | Atalho para Header Authorization Bearer       | `.set('Authorization', 'Bearer ...')` |

## Asserções

| Função                           | Descrição                                                  | Equivalente Jest/Chai                      |
| :----------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------- |
| `.shouldReturn(status)`                        | Verifica o Status Code HTTP retornado                        | `expect(res.status).toBe(status)`        |
| `.matchingSchema(schema)`                      | Valida se a resposta corresponde ao schema (tipagem nominal) | `expect(res.body).toMatchSchema(schema)` |

## Execução

| Função   | Descrição                              | O que faz                                                        |
| :--------- | :--------------------------------------- | :--------------------------------------------------------------- |
| `.run()` | Executa a requisição e as validações | Dispara o fetch, valida status, valida schema e loga o resultado |

## Exemplo Completo

```typescript
import { ApiSpec } from "@purecore/one-proof-4-all";

// Definindo o teste de forma fluída e declarativa
await ApiSpec.define("Ciclo de Vida do Usuário")
  .from("https://api.empresa.com/v1")
  
  // Passo 1: Criar Usuário
  .post("/users", {
    name: "Antigravity",
    email: "ag@purecore.codes",
    role: "admin"
  })
  .header("X-Project-ID", "one-proof-4-all")
  .shouldReturn(201)
  .matchingSchema({
    id: "number",
    name: "string",
    createdAt: "string"
  })
  .run();

// Passo 2: Validar se o usuário existe
await ApiSpec.define("Buscar Usuário Criado")
  .from("https://api.empresa.com/v1")
  .get("/users/1")
  .shouldReturn(200)
  .run();

// Passo 3: Remover Usuário
await ApiSpec.define("Remover Usuário")
  .from("https://api.empresa.com/v1")
  .delete("/users/1")
  .shouldReturn(204)
  .run();
```

## Quando Usar

- ✅ Testes de integração de APIs REST.
- ✅ Verificação de contratos e schemas de resposta.
- ✅ Validação de Status Codes HTTP.
- ✅ Cenários que dependem de rede real ou mocks de rede.
- ✅ Testes E2E de backend.

## Quando NÃO Usar

- ❌ Testes unitários de funções puras → Use o [Dialeto Matemático](./api-matematico.md)
- ❌ Fluxos de UI complexas ou Narrativas de negócio → Use o [Dialeto Narrativo](./api-narrativo.md)
- ❌ Lógica de negócios interna sem I/O direto → Use o [Dialeto Imperativo](./api-imperativo.md)
