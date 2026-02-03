/**
 * 🛒 Shopping Cart - Exemplo Poliglota
 *
 * Este arquivo demonstra como usar os 3 dialetos de forma semântica e coerente
 * para testar diferentes camadas de uma mesma funcionalidade: um carrinho de compras.
 *
 * - 📐 Matemático: Testa a lógica PURA de cálculo (descontos, totais)
 * - 📖 Narrativo: Testa a JORNADA do usuário (adicionar, remover, finalizar)
 * - 🛡️ Imperativo: Testa a INTEGRAÇÃO com API (gateway de pagamento)
 */

import {
  // 📐 Matemático - para lógica pura
  axiom,
  proof,
  implies,
  arbitrary,
  given,
  // 📖 Narrativo - para jornada do usuário
  intend,
  scenario,
  to,
  standIn,
  background,
  // 🛡️ Imperativo - para integração de sistema
  ensure,
  check,
  that,
  stub,
  initAll,
  reset,
  clear,
} from "../src/index.js";

// =============================================================================
// 📐 CAMADA MATEMÁTICA: Lógica Pura de Preços
// =============================================================================
// Aqui provamos verdades universais sobre cálculos financeiros.
// Não há dependências externas, não há estado. Apenas matemática.

axiom("Teoria de Cálculo de Preços", () => {
  let calcDiscount: (price: number, percent: number) => number;
  let calcTotal: (items: { price: number; qty: number }[]) => number;
  let applyTax: (subtotal: number, rate: number) => number;

  given(() => {
    // Funções puras - determinísticas, sem side effects
    calcDiscount = (price, percent) => price - price * (percent / 100);
    calcTotal = (items) => items.reduce((sum, i) => sum + i.price * i.qty, 0);
    applyTax = (subtotal, rate) =>
      Math.round(subtotal * (1 + rate) * 100) / 100;
  });

  proof("Desconto de 10% em R$100 implica R$90", () => {
    implies(calcDiscount(100, 10)).is(90);
  });

  proof("Desconto de 0% preserva o valor original", () => {
    implies(calcDiscount(250, 0)).is(250);
  });

  proof("Desconto de 100% anula o preço", () => {
    implies(calcDiscount(500, 100)).is(0);
  });

  proof("Total de carrinho vazio converge para zero", () => {
    implies(calcTotal([])).is(0);
  });

  proof("Total de 3 itens a R$10 cada (qty=2) implica R$60", () => {
    const items = [
      { price: 10, qty: 2 },
      { price: 10, qty: 2 },
      { price: 10, qty: 2 },
    ];
    implies(calcTotal(items)).is(60);
  });

  proof("Imposto de 10% sobre R$100 resulta em R$110", () => {
    implies(applyTax(100, 0.1)).is(110);
  });
});

// =============================================================================
// 📖 CAMADA NARRATIVA: Jornada do Usuário
// =============================================================================
// Aqui contamos histórias que o PM pode ler e entender.
// Descrevemos a experiência do usuário em linguagem natural.

intend("Jornada de Compra do Usuário", () => {
  const cart = standIn(); // Dublê do serviço de carrinho
  const user = standIn(); // Dublê do usuário

  background(() => {
    // Preparação do cenário
    cart.respondsWith({ items: [], total: 0 });
    user.respondsWith({ name: "João", loggedIn: true });
  });

  scenario("Usuário adiciona primeiro produto ao carrinho", () => {
    cart.add({ name: "Camiseta", price: 49.9 });
    cart.respondsWith({
      items: [{ name: "Camiseta", price: 49.9 }],
      total: 49.9,
    });

    to(cart).wasCalled();
    to(cart.items).have("length");
  });

  scenario("Usuário aplica cupom de desconto", () => {
    const coupon = standIn();
    coupon.respondsWith({ valid: true, discount: 15 });

    // Link the mock logic for the purpose of this example
    cart.applyCoupon.actsLike(() => coupon("DESCONTO15"));

    cart.applyCoupon("DESCONTO15");
    cart.respondsWith({ total: 42.42 }); // 49.9 - 15%

    to(coupon).wasCalled();
    to(cart.total).be(42.42);
  });

  scenario("Usuário remove item e carrinho fica vazio", () => {
    cart.remove("Camiseta");
    cart.respondsWith({ items: [], total: 0 });

    to(cart.items).have("length");
    to(cart.total).be(0);
  });

  scenario("Usuário não logado tenta finalizar compra", () => {
    user.respondsWith({ loggedIn: false });
    const checkout = standIn();
    checkout.respondsWith({ error: "LOGIN_REQUIRED", status: 401 });

    to(checkout.status).be(401);
  });
});

// =============================================================================
// 🛡️ CAMADA IMPERATIVA: Integração com Gateway de Pagamento
// =============================================================================
// Aqui verificamos contratos rígidos com sistemas externos.
// A linguagem é autoritária: ensure, verify, check.

ensure("Conformidade com Gateway de Pagamento v2.1", () => {
  const paymentGateway = stub();
  const transactionLogger = stub();

  initAll(() => {
    // Setup de infraestrutura
    paymentGateway.process.forceReturn({
      status: 200,
      transactionId: "tx_abc123",
      timestamp: "2026-01-01T00:00:00Z",
    });
    transactionLogger.log.forceReturn(true);
  });

  reset(() => {
    // Limpa estado entre testes para garantir contagens precisas
    paymentGateway.clear();
    transactionLogger.clear();
  });

  check("Transação bem-sucedida retorna status 200", () => {
    const response = paymentGateway.process({
      amount: 99.9,
      currency: "BRL",
      cardToken: "tok_visa_xxxx",
    });

    that(response.status).is(200);
    that(response.transactionId).matches(/^tx_[a-z0-9]+$/);
  });

  check("TransactionId segue padrão RFC do contrato", () => {
    const response = paymentGateway.process({ amount: 50 });

    // Validação rigorosa do formato do ID
    that(response.transactionId).matches(/^tx_[a-z0-9]{6,}$/);
    that(response.timestamp).matches(/^\d{4}-\d{2}-\d{2}T/);
  });

  check("Toda transação deve ser logada para auditoria", () => {
    paymentGateway.process({ amount: 100 });
    transactionLogger.log({ event: "PAYMENT_PROCESSED" });

    that(transactionLogger).triggered();
    that(transactionLogger).calledWith({ event: "PAYMENT_PROCESSED" });
  });

  check("Gateway deve ser acionado exatamente uma vez por request", () => {
    paymentGateway.process({ amount: 100 });
    that(paymentGateway).triggeredCount(1);
  });
});

// =============================================================================
// 🎭 RESUMO: Por que usar os 3 dialetos?
// =============================================================================
//
// | Camada       | Dialeto     | Por quê?                                     |
// |--------------|-------------|----------------------------------------------|
// | Cálculos     | Matemático  | Provas de verdades universais, sem estado    |
// | UX/Jornada   | Narrativo   | Documentação viva legível por PMs            |
// | Integração   | Imperativo  | Contratos rígidos, conformidade, auditoria   |
//
// Cada dialeto expressa a NATUREZA do problema que está resolvendo.
// A linguagem do teste espelha a linguagem do domínio.
