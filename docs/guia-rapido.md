🚀 Seu Guia de Início Rápido para o one-proof-4-all

Introdução: Cansado de "Descrever" Quando Você Quer "Provar"?

O one-proof-4-all nasce de uma frustração comum no mundo dos testes: usar o mesmo vocabulário para problemas fundamentalmente diferentes. Afinal, a linguagem importa. Ela molda o pensamento. A ferramenta padrão (describe, it, should) é excelente para descrever comportamentos, mas e quando você está provando um teorema matemático ou verificando a conformidade com um contrato de API?

Este framework oferece diferentes "dialetos" porque entende que testar um algoritmo de criptografia é uma tarefa fundamentalmente diferente de testar um fluxo de login de usuário. Ele oferece o vocabulário certo para cada trabalho.

One Runner to Rule Them All.

Esta abordagem é construída sobre uma filosofia fundamental que garante que a adoção da ferramenta seja suave e incremental, sem descartar seu trabalho existente.

A "Filosofia Aditiva": Seu Conhecimento Está Seguro

Uma das maiores barreiras para adotar uma nova ferramenta é o medo de ter que "jogar tudo fora e começar de novo". O one-proof-4-all foi projetado com o princípio oposto em mente.

O Que É a Filosofia Aditiva?

A Filosofia Aditiva significa que o one-proof-4-all funciona como um superset (superconjunto) do Jest. Ele não nega o passado; ele o expande. Se você tem milhares de testes escritos com a sintaxe padrão do Jest (describe, it), não precisa reescrever uma única linha. O framework entende nativamente o seu código legado.

Essa filosofia se manifesta em três benefícios principais:

- Seu código legado continua funcionando: Testes antigos que usam describe e it rodam nativamente no executor do one-proof-4-all. Seu conhecimento e seu código continuam 100% válidos.
- Você não precisa aprender tudo: A ideia não é que cada desenvolvedor se torne fluente em todos os dialetos. A proposta é a Especialização por Contexto: um cientista de dados pode usar apenas o dialeto Matemático, enquanto um engenheiro de backend foca no Imperativo. O framework é poliglota; você não precisa ser.
- Um único executor de testes: Unifique seu ciclo de vida de desenvolvimento e implantação. Um único comando npm test executa tanto os testes legados quanto os modernos, otimizando seu pipeline de CI/CD e consolidando todos os resultados em um único relatório autoritativo.

Agora que você entende a filosofia, vamos colocar a mão na massa e ver como é fácil começar.

Mão na Massa: Seu Primeiro Teste em 5 Minutos

Vamos rodar um teste real para ver o framework em ação antes de mergulharmos nos detalhes de cada dialeto.

Quick Start: Escrevendo um Teste Imperativo

Siga estes três passos simples para escrever e executar seu primeiro teste.

1. Instale o pacote: Abra seu terminal e execute o seguinte comando para adicionar o one-proof-4-all ao seu projeto.
2. Crie o arquivo api.spec.ts: Crie um novo arquivo de teste e cole o código abaixo. Este exemplo usa o dialeto Imperativo para garantir o comportamento de uma API.
3. Execute o teste: Volte ao seu terminal e rode o executor do one-proof-4-all.

Pronto! Você acabou de rodar seu primeiro teste com o dialeto Imperativo. Agora, vamos explorar os diferentes dialetos para que você possa escolher o ideal para seus próprios projetos.

Escolhendo Seu Dialeto: Qual é o Ideal para Você?

Lembre-se: você não precisa aprender os três dialetos. A ideia é escolher aquele que melhor se encaixa no problema que você está resolvendo e ignorar o resto. Este fluxograma pode ajudar na sua decisão:

┌─────────────────────────────────────────┐
│ O que você está testando? │
└───────────────────┬─────────────────────┘
│
┌───────────────────────────────┼───────────────────────────────┐
│ │ │
▼ ▼ ▼
┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│ Algoritmos puros, │ │ Fluxos de usuário, │ │ APIs, contratos, │
│ cálculos, regras │ │ regras de negócio │ │ integrações, │
│ matemáticas? │ │ legíveis por PMs? │ │ conformidade? │
└──────────┬───────────┘ └──────────┬───────────┘ └──────────┬───────────┘
│ │ │
▼ ▼ ▼
┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│ 📐 MATEMÁTICO │ │ 📖 NARRATIVO │ │ 🛡️ IMPERATIVO │
│ axiom, proof, implies│ │ intend, scenario, to │ │ ensure, check, that │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘

As seções a seguir são projetadas para ser o seu guia. Para cada dialeto, vamos diagnosticar um ponto de dor específico comum no desenvolvimento de software, apresentar a solução linguística oferecida pelo one-proof-4-all e fornecer um tutorial prático. Preste muita atenção à seção "A Dor" — se ela ressoar com você, você provavelmente encontrou o seu dialeto.

O Dialeto Matemático (📐 MathDialect)

A Dor: Quando "should" soa informal demais

Imagine que você está testando uma função de criptografia pura ou um cálculo financeiro complexo. A sintaxe padrão de teste te força a escrever algo assim:

describe("SHA-256", () => {
it("should produce a valid hash", () => { ... });
});

Isso soa fraco e inadequado. Você não está "descrevendo um comportamento que deveria acontecer"; você está provando uma verdade matemática universal. A linguagem da ferramenta não reflete o rigor do seu código.

A Solução: Escrevendo Provas Axiomáticas

Com o dialeto Matemático, você escreve provas axiomáticas, usando um vocabulário que espelha a lógica formal. A linguagem agora reflete o que você está realmente fazendo: provar. Este não é apenas um teste; é uma prova axiomática formal, refletindo a vibe científica e imutável do código que valida.

import { axiom, proof, implies } from "@purecore/one-proof-4-all";

axiom("Teoria de Hash SHA-256", () => {
proof("Hash de string vazia converge para constante conhecida", () => {
const sha256 = (str: string) => "e3b0c44..."; // Função de exemplo
implies(sha256("")).is("e3b0c44...");
});
});

Ideal para: Cientistas de dados, engenheiros de algoritmos, bibliotecas de utilitários, cálculos financeiros.

Seu Primeiro Teste Matemático

1. Crie o arquivo calculo.spec.ts: Crie um novo arquivo de teste para abrigar suas provas matemáticas.
2. Escreva sua prova: Cole o código abaixo. Ele prova duas verdades sobre uma função de juros compostos.
3. Execute e veja a mágica: Rode o executor novamente. Ele encontrará e executará todos os seus arquivos de teste, incluindo o novo.

Este dialeto é perfeito para garantir a correção de algoritmos. A seguir, veremos um dialeto focado em comunicação e regras de negócio.

O Dialeto Narrativo (📖 NarrativeDialect)

A Dor: Quando seu PM não consegue ler seus testes

As regras de negócio cruciais do seu sistema estão validadas, mas estão escondidas dentro de testes técnicos que só os desenvolvedores entendem.

it("should return 403", () => { ... });

Para um Gerente de Produto (PM) ou Designer, isso é indecifrável. Cria-se uma barreira entre o time de produto e a engenharia, onde a confiança substitui a validação explícita.

A Solução: Testes como Documentação Viva

O dialeto Narrativo transforma o teste em uma história legível por humanos. Ele serve como um contrato vivo entre produto e engenharia. Agora, seu PM pode ler o teste e entender exatamente qual regra de negócio está sendo validada. Este código lê como uma história, cumprindo a vibe fluida, humana e descritiva do Behavior-Driven Development.

import { scenario, to } from "@purecore/one-proof-4-all";

scenario("Usuário sem permissão tenta acessar o painel de Admin", () => {
const response = { status: 403 }; // Resposta de exemplo
to(response.status).be(403);
});

Ideal para: Designers, Product Managers, times ágeis, testes de fluxos de usuário (User Journeys).

Seu Primeiro Teste Narrativo

1. Crie o arquivo auth.spec.ts: Crie um novo arquivo para descrever os fluxos de usuário do seu sistema.
2. Escreva seu cenário: Cole o código abaixo, que descreve um cenário de login bem-sucedido.
3. Execute e valide a história: Rode o executor de testes para garantir que seu cenário está funcionando como esperado.

Enquanto o Narrativo foca em clareza e comunicação, o próximo dialeto foca em rigor e conformidade técnica.

O Dialeto Imperativo (🛡️ ImperativeDialect)

A Dor: Quando "should" soa frágil demais

Você está testando a integração com um gateway de pagamento ou validando a conformidade com uma especificação de API com implicações legais. Num contexto de conformidade, should não é apenas uma sugestão; é um passivo. Representa uma falha semântica em impor um contrato não negociável.

describe("Payment Gateway", () => {
it("should return 200", () => { ... });
});

Você precisa de uma linguagem que imponha respeito e autoridade, garantindo que um contrato técnico está sendo cumprido.

A Solução: Garantindo Contratos com Autoridade

O dialeto Imperativo usa palavras de comando: Ensure, Verify, That. Essa linguagem muda completamente o peso do teste, tratando-o como um conjunto de verificações de conformidade. O vocabulário impositivo reforça a vibe técnica e rigorosa do Design by Contract, não deixando espaço para ambiguidades.

import { ensure, verify, that } from "@purecore/one-proof-4-all";

ensure("Conformidade com Contrato PCI-DSS v4", () => {
verify("Dados sensíveis nunca trafegam em texto plano", () => {
const payload = "encrypted:a1b2c3d4"; // Payload de exemplo
that(payload).matches(/^encrypted:/);
});
});

Ideal para: Engenheiros de backend, DevOps, validação de APIs, drivers de banco de dados, conformidade (compliance).

Seu Primeiro Teste Imperativo

1. Revisite o arquivo api.spec.ts: Você já escreveu seu primeiro teste imperativo na seção "Quick Start"! Vamos apenas revisá-lo para entender melhor suas partes.
2. Entenda as partes: Aqui está o código novamente, com explicações sobre o papel de cada palavra-chave.
3. Execute e garanta a conformidade: Rode o executor mais uma vez para ver todos os seus testes de todos os dialetos passando juntos.

Conclusão: Adotando o one-proof-4-all Gradualmente

A mensagem mais importante é que você não precisa parar tudo e reescrever seus testes existentes. Graças à Filosofia Aditiva, o one-proof-4-all coexiste perfeitamente com o Jest.

O código abaixo, com um teste legado e um teste novo no mesmo arquivo, é 100% válido e será executado pelo mesmo comando. Observe que este arquivo é 100% válido e executável pelo one-proof-4-all.

// ✅ Legado: Ninguém precisa mexer nisso
describe("Módulo de Login (Legacy)", () => {
it("deve validar senha", () => {
expect(validar("123")).toBe(true);
});
});

// ✅ Novo: Feature nova com dialeto novo
import { axiom, implies } from 'one-proof-4-all-tester';

axiom("Nova Criptografia SHA-256", () => {
implies(hash("123")).matches(/^[a-f0-9]{64}$/);
});

O one-proof-4-all não veio para substituir o que já funciona. Ele veio para dar o vocabulário certo para cada tarefa, tornando seus testes mais expressivos, precisos e valiosos. É uma ferramenta de adição, não de substituição, projetada para evoluir com você e sua equipe.

Próximos Passos: Para uma referência completa de todos os comandos e suas equivalências com o Jest, consulte a Tabela Rosetta (Comparativo Geral) na documentação principal do projeto. Ela é uma ferramenta fantástica para traduzir mentalmente os conceitos que você já conhece.
