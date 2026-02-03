import { ImperativeDialect } from "../src/index.js";

const { ensure, check, that, stub, initAll } = ImperativeDialect;

ensure("Sistema de Segurança e Compliance", () => {
  // Stubs de Infraestrutura
  const firewall = stub();
  const logger = stub();

  initAll(() => {
    // Configuração Hardened
    firewall.forceReturn({ allowed: true, threatLevel: 0 });
  });

  check("Deve bloquear conexões de IPs na blacklist", () => {
    const maliciousIp = "192.168.1.666";

    // Reconfigurando stub para este caso
    firewall.executes((ip: string) => {
      return ip === maliciousIp ? { allowed: false } : { allowed: true };
    });

    const access = firewall(maliciousIp);

    that(access.allowed).is(false);
    that(firewall).triggered();
    that(firewall).calledWith(maliciousIp);
  });

  check("Deve registrar auditoria para cada acesso", () => {
    logger("Acesso admin iniciado");

    that(logger).triggeredCount(1);
    that(logger).calledWith("Acesso admin iniciado");
  });
});

ensure("Validação Estrutural da API V2", () => {
  const apiResponse = {
    status: 200,
    data: {
      id: "uuid-1234",
      role: "admin",
      meta: { version: 2 },
    },
  };

  check("Payload deve conter metadados corretos", () => {
    that(apiResponse.status).is(200);
    that(apiResponse.data.role).is("admin");
    that(apiResponse.data.meta.version).is(2);
  });

  check("Campos obrigatórios devem existir", () => {
    that(apiResponse.data).isOk();
    that(apiResponse.data.id).matches(/^uuid-/);
  });
});
