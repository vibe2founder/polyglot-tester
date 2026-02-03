# 📐 Dialeto Matemático - API Completa

> **Filosofia:** Lógica Formal e Programação Funcional.
>
> **Vibe:** Científica, Imutável, Axiomática.
>
> **Ideal para:** Cientistas de dados, engenheiros de algoritmos, bibliotecas de utilitários, cálculos financeiros.

## Estrutura

| Função            | Descrição                                | Equivalente Jest |
| ----------------- | ---------------------------------------- | ---------------- |
| `axiom(name, fn)` | Define um grupo de verdades fundamentais | `describe`       |
| `proof(name, fn)` | Uma prova individual de um caso          | `test` / `it`    |
| `lemma(name, fn)` | Uma prova auxiliar (menor)               | `test` / `it`    |

## Asserções

| Função                            | Descrição                           | Equivalente Jest                         |
| --------------------------------- | ----------------------------------- | ---------------------------------------- |
| `implies(val).is(expected)`       | "O valor implica ser..."            | `expect(val).toBe(expected)`             |
| `implies(val).wasEvaluated()`     | Verifica se a função foi computada  | `expect(val).toHaveBeenCalled()`         |
| `implies(val).appliedTo(args)`    | Verifica os argumentos da aplicação | `expect(val).toHaveBeenCalledWith(args)` |
| `implies(val).evaluated(n).times` | Frequência de avaliação             | `expect(val).toHaveBeenCalledTimes(n)`   |
| `implies(val).matches(regex)`     | Corresponde a um padrão             | `expect(val).toMatch(regex)`             |

## Mocks

| Função                 | Descrição                                | Equivalente Jest          |
| ---------------------- | ---------------------------------------- | ------------------------- |
| `arbitrary()`          | Cria uma função genérica para teste      | `jest.fn()`               |
| `lambda()`             | Alias para arbitrary                     | `jest.fn()`               |
| `monitor(obj, method)` | Monitora uma função existente            | `jest.spyOn(obj, method)` |
| `f.yields(val)`        | Define o resultado produzido pela função | `mockReturnValue(val)`    |
| `f.mapsTo(val)`        | Alias para yields                        | `mockReturnValue(val)`    |
| `f.convergesTo(val)`   | Define o resultado assíncrono (limite)   | `mockResolvedValue(val)`  |
| `f.derive(fn)`         | Define a implementação lógica            | `mockImplementation(fn)`  |

## Lifecycle

| Função          | Descrição                           | Equivalente Jest |
| --------------- | ----------------------------------- | ---------------- |
| `postulate(fn)` | Define premissas iniciais globais   | `beforeAll(fn)`  |
| `setup(fn)`     | Alias para postulate                | `beforeAll(fn)`  |
| `given(fn)`     | "Dado que..." (antes de cada prova) | `beforeEach(fn)` |
| `conclude(fn)`  | Conclusões finais / limpeza         | `afterAll(fn)`   |

## Exemplo Completo

```javascript
import {
  axiom,
  proof,
  lemma,
  implies,
  arbitrary,
  monitor,
  postulate,
  given,
  conclude,
} from "@purecore/one-proof-4-all";

axiom("Teoria de Juros Compostos", () => {
  let calcInterest;
  let applyTax;
  const logger = arbitrary();

  postulate(() => {
    // Premissas globais para todos os teoremas deste axioma
    console.log("Estabelecendo premissas...");
  });

  given(() => {
    // Definimos as funções puras a serem testadas a cada ciclo
    calcInterest = (p, r, t) => Math.floor(p * Math.pow(1 + r, t));
    applyTax = (subtotal, rate) =>
      Math.round(subtotal * (1 + rate) * 100) / 100;
  });

  proof("Capital de 1000 a 5% por 2 anos implica montante de 1102", () => {
    const result = calcInterest(1000, 0.05, 2);
    implies(result).is(1102);
  });

  proof("Taxa zero implica preservação do capital", () => {
    const result = calcInterest(500, 0, 10);
    implies(result).is(500);
  });

  proof("Desconto de 100% anula o preço", () => {
    const calcDiscount = (price, percent) => price - price * (percent / 100);
    implies(calcDiscount(500, 100)).is(0);
  });

  lemma("Imposto de 10% sobre R$100 resulta em R$110", () => {
    implies(applyTax(100, 0.1)).is(110);
  });

  proof("Logger arbitrário registra cálculo", () => {
    logger.yields(true);
    logger("calc_start");

    implies(logger).wasEvaluated();
    implies(logger).appliedTo("calc_start");
  });

  conclude(() => {
    console.log("Teoremas provados com sucesso.");
  });
});

axiom("Teoria de Fibonacci", () => {
  const fib = arbitrary();

  given(() => {
    // Definição recursiva de Fibonacci
    fib.derive((n) => (n <= 1 ? n : fib(n - 1) + fib(n - 2)));
  });

  proof("Fibonacci(0) implica 0", () => {
    implies(fib(0)).is(0);
  });

  proof("Fibonacci(1) implica 1", () => {
    implies(fib(1)).is(1);
  });

  proof("Fibonacci(10) implica 55", () => {
    implies(fib(10)).is(55);
  });
});
```

## Quando Usar

- ✅ Algoritmos matemáticos puros
- ✅ Funções de criptografia
- ✅ Cálculos financeiros
- ✅ Regras de negócio determinísticas
- ✅ Bibliotecas de utilitários

## Quando NÃO Usar

- ❌ Integrações de API com contratos → Use o [Dialeto Imperativo](./api-imperativo.md)
- ❌ Fluxos de usuário legíveis por PMs → Use o [Dialeto Narrativo](./api-narrativo.md)
