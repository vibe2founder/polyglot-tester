# @purecore/api-test-dialect

Dialeto fluído para testes de API seguindo o padrão **One Proof for All**.

[Link para o CHANGELOG](../../CHANGELOG.md)

## Como foi feito
Este dialeto foi construído utilizando o padrão **Fluent Interface**, permitindo que a definição do teste flua como uma frase. O núcleo utiliza a implementação local do `@purecore/reqify` para realizar as chamadas HTTP, garantindo zero dependências externas pesadas (como Axios ou Supertest).

A validação de schema foi implementada nativamente para comparar as chaves e os tipos básicos dos campos da resposta, mantendo o motor de teste leve e rápido.

## Como funciona
O dialeto organiza o teste em quatro fases principais:
1. **Definição**: `ApiSpec.define("nome")`
2. **Contexto (Given)**: `.from("URL")`
3. **Ação (When)**: `.get()`, `.post()`, `.put()`, `.delete()`
4. **Asserção (Then)**: `.shouldReturn(status)`, `.matchingSchema(schema)`

Ao chamar `.run()`, o dialeto executa a requisição, valida os resultados e emite logs coloridos para o terminal.

## Como testar
1. Certifique-se de ter o Bun instalado no WSL.
2. Execute o exemplo:
```bash
wsl bun run examples/test-api.ts
```

## Fontes de Informação
- [Everything as Code Philosophy](https://github.com/purecore/eac)
- [Fluent Interface Pattern](https://en.wikipedia.org/wiki/Fluent_interface)
