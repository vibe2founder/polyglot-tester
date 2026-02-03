import { ApiSpec } from "../packages/api-test-dialect/index.js";

/**
 * 🌐 Teste de Showcase do Dialeto de API
 * Mostrando todas as funcionalidades integradas:
 * - GET, POST, PUT, DELETE
 * - Headers customizados
 * - Validação de Status Code
 * - Validação de Schema (Nominal/Semântica)
 */

async function runShowcase() {
  const BASE_URL = "https://jsonplaceholder.typicode.com";

  console.log("\n--- 🚀 INICIANDO SHOWCASE DE FUNCIONALIDADES API ---");

  try {
    // 1. Teste GET Simples
    await ApiSpec.define("1. Buscar Post Único (GET)")
      .from(BASE_URL)
      .get("/posts/1")
      .shouldReturn(200)
      .matchingSchema({
        id: 1,
        userId: 1,
        title: "string",
        body: "string"
      })
      .run();

    // 2. Teste POST com Body e Header
    await ApiSpec.define("2. Criar Novo Recurso (POST)")
      .from(BASE_URL)
      .header("Content-Type", "application/json; charset=UTF-8")
      .header("X-Custom-Header", "PurecorePower")
      .post("/posts", {
        title: "Showcase Test",
        body: "Testando todas as features do dialeto",
        userId: 1
      })
      .shouldReturn(201)
      .run();

    // 3. Teste PUT (Atualização)
    await ApiSpec.define("3. Atualizar Recurso (PUT)")
      .from(BASE_URL)
      .put("/posts/1", {
        id: 1,
        title: "Título Atualizado",
        body: "Conteúdo atualizado via PUT",
        userId: 1
      })
      .shouldReturn(200)
      .run();

    // 4. Teste DELETE 
    await ApiSpec.define("4. Remover Recurso (DELETE)")
      .from(BASE_URL)
      .delete("/posts/1")
      .shouldReturn(200)
      .run();

    console.log("\n--- ✅ SHOWCASE FINALIZADO COM SUCESSO ---");
  } catch (err: any) {
    console.error("\n--- ❌ SHOWCASE FALHOU ---");
    // O erro já é logado pelo dialeto no .run()
  }
}

runShowcase();
