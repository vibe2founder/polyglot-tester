import { MathDialect } from "../src/index.js";

const { axiom, proof, implies, arbitrary } = MathDialect;

// --- Domain Logic: Financial Calculation ---
const calculateInterests = (principal: number, rate: number, time: number) => {
  return principal * Math.pow(1 + rate, time);
};

axiom("Teoria Financeira: Juros Compostos", () => {
  proof("O capital deve crescer exponencialmente", () => {
    const principal = 1000;
    const rate = 0.05; // 5%
    const time = 2; // anos

    const result = calculateInterests(principal, rate, time);
    // 1000 * (1.05)^2 = 1000 * 1.1025 = 1102.5

    implies(result).is(1102.5);
  });

  proof("Taxa zero implica em imutabilidade do capital", () => {
    const principal = 500;
    const result = calculateInterests(principal, 0, 10);

    implies(result).is(principal);
  });
});

axiom("Álgebra Booleana: Leis de De Morgan", () => {
  const A = true;
  const B = false;

  proof("A negação da disjunção é a conjunção das negações", () => {
    const lhs = !(A || B);
    const rhs = !A && !B;

    implies(lhs).is(rhs);
  });
});

axiom("Análise de Funções Recursivas", () => {
  const factorial = arbitrary();

  // Configurando comportamento axiomático
  factorial.derive((n: number): number => (n <= 1 ? 1 : n * factorial(n - 1)));

  proof("Fatorial de 5 converge para 120", () => {
    const res = factorial(5);
    implies(res).is(120);
  });
});
