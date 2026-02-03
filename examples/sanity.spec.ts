import {
  MathDialect,
  NarrativeDialect,
  ImperativeDialect,
} from "../src/index.js";

console.log("---------------------------------------------------");
console.log("🚀 INICIANDO TEST SUITE POLIGLOTA TEMPLATE");
console.log("---------------------------------------------------");

// 1. Teste Matemático
const { axiom, proof, implies, arbitrary } = MathDialect;

axiom("Teoria dos Conjuntos (Dialeto Matemático)", () => {
  const f = arbitrary();
  f.yields(10); // Configuração usando nome matemático

  proof("f deve mapear para 10", () => {
    const res = f();
    implies(res).is(10);
    implies(f).wasEvaluated();
  });
});

// 2. Teste Narrativo
const { intend, detail, to, standIn } = NarrativeDialect;

intend("Autenticação de Usuário (Dialeto Narrativo)", () => {
  const login = standIn();
  login.respondsWith(true); // Configuração narrativa

  detail("login bem sucedido", () => {
    login("user", "pass");
    to(login).received("user", "pass");
    to(login).wasCalled();
  });
});

// 3. Teste Imperativo
const { ensure, check, that, stub } = ImperativeDialect;

ensure("Serviço de Pagamento (Dialeto Imperativo)", () => {
  const api = stub();
  api.forceReturn(200); // Configuração imperativa

  check("status da API é 200", () => {
    const status = api();
    that(status).is(200);
    that(api).triggeredCount(1);
  });
});

console.log("\n---------------------------------------------------");
console.log("🏁 FIM DA EXECUÇÃO");
