import { NarrativeDialect } from "../src/index.js";

const { intend, detail, to, standIn, background, before } = NarrativeDialect;

intend("Jornada de Compra do Usuário", () => {
  // Atores (Mocks)
  const cart = standIn();
  const paymentGateway = standIn();
  const notificationService = standIn();

  before(() => {
    // Limpa estado para cada cena
    cart.clear();
    paymentGateway.clear();
    notificationService.clear();
  });

  background(() => {
    // Contexto: Carrinho tem itens e gateway está online
    cart.getTotal.respondsWith(150.0); // Especifica o método
    paymentGateway.process.respondsWith(true); // Especifica o método
  });

  detail("O cliente finaliza a compra com sucesso", () => {
    // Ação: Usuário clica em 'Checkout'
    const total = cart.getTotal();
    const success = paymentGateway.process(total);

    if (success) {
      notificationService.sendEmail("Compra aprovada!");
    }

    // Expectativas narrativas
    to(cart).wasCalled();
    to(paymentGateway).uploaded(total); // Alias mental para 'received'
    to(notificationService).received("Compra aprovada!");
  });

  detail("O sistema deve lidar com falha no pagamento", () => {
    // Mudança de enredo: Gateway recusa
    paymentGateway.process.respondsWith(false);

    const success = paymentGateway.process(100);

    to(success).be(false);
    to(notificationService).not.wasCalled();
  });
});

intend("Onboarding de Novos Membros", () => {
  const database = standIn();

  detail("Deve criar perfil padrão ao registrar", () => {
    const newUser = { name: "Alice", email: "alice@wonder.land" };

    // Simula o registro
    database.save(newUser);

    to(database).received(newUser);
  });
});
