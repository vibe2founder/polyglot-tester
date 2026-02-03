import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  BookOpen, 
  Calculator, 
  Send, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  Code2,
  FileCode2,
  Cpu
} from 'lucide-react';

const DialectCard = ({ icon: Icon, title, description, colorClass, active, onClick }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`p-6 cursor-pointer glass-card border-2 transition-all duration-300 ${
      active ? colorClass : 'border-white/5 opacity-60 hover:opacity-100'
    }`}
  >
    <div className="flex items-center gap-4 mb-3">
      <div className={`p-2 rounded-lg ${active ? 'bg-white/10' : ''}`}>
        <Icon className={`w-6 h-6 ${active ? 'text-inherit' : 'text-white/40'}`} />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <p className="text-sm text-white/60 leading-relaxed">{description}</p>
  </motion.div>
);

const CodeBlock = ({ code, language }: { code: string; language: string }) => (
  <div className="relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-math/20 to-apispec/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
    <div className="relative bg-black/40 border border-white/10 rounded-xl p-6 font-mono text-sm overflow-x-auto">
      <div className="flex gap-2 mb-4 border-b border-white/5 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="ml-4 text-white/30 text-xs italic">{language}</span>
      </div>
      <pre className="text-white/80 leading-relaxed">{code}</pre>
    </div>
  </div>
);

function App() {
  const [activeDialect, setActiveDialect] = useState('math');

  const dialects = [
    {
      id: 'math',
      icon: Calculator,
      title: 'Mathematical',
      description: 'Perfect for algorithms, pure logic, and complex data processing. Prove your code, don\'t just test it.',
      colorClass: 'border-math text-math-light',
      keywords: ['axiom', 'proof', 'implies', 'postulate'],
      code: `axiom("Number Theory", () => {
  const fib = arbitrary();
  fib.derive((n) => n <= 1 ? n : fib(n-1) + fib(n-2));

  proof("Fibonacci(2) implies 1", () => {
    implies(fib(2)).is(1);
  });
});`
    },
    {
      id: 'narrative',
      icon: BookOpen,
      title: 'Narrative',
      description: 'Ideal for user journeys and business rules. Readable by PMs and stakeholders. Your tests are your documentation.',
      colorClass: 'border-narrative text-narrative-light',
      keywords: ['intend', 'scenario', 'to', 'story'],
      code: `intend("User Checkout Journey", () => {
  scenario("User without permission tries to access admin", () => {
    to(response.status).be(403);
  });
});`
    },
    {
      id: 'imperative',
      icon: ShieldCheck,
      title: 'Imperative',
      description: 'Best for API contracts and system compliance. Assertive language for strict requirements.',
      colorClass: 'border-imperative text-imperative-light',
      keywords: ['ensure', 'check', 'that', 'verify'],
      code: `ensure("PCI-DSS v4 Compliance", () => {
    verify("Sensitive data is never in plain text", () => {
      that(payload).matches(/^encrypted:/);
    });
});`
    },
    {
      id: 'apispec',
      icon: Send,
      title: 'API Spec',
      description: 'Declarative API testing. Validate contracts and schemas with fluid, readable syntax.',
      colorClass: 'border-apispec text-apispec-light',
      keywords: ['define', 'post', 'shouldReturn', 'matchingSchema'],
      code: `await ApiSpec.define("Create User")
  .from("https://api.example.com")
  .post("/users", { name: "John" })
  .shouldReturn(201)
  .matchingSchema(userSchema)
  .run();`
    }
  ];

  const currentDialect = dialects.find(d => d.id === activeDialect)!;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-20 pb-32 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-math/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-apispec/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white/70 mb-8">
              <Zap className="w-4 h-4 mr-2 text-amber-400" />
              The Future of Polyglot Testing
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              One Proof <span className="gradient-text">4 All.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              One Runner to Rule Them All. Decouple your execution logic from
              semantics. Speak the language of the problem you are solving.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-2 group">
                Get Started{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                View Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Philosophy Section */}
      <section className="py-24 px-4 bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Zero Risk. <span className="text-white/40">Total Freedom.</span>
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Your legacy Jest code remains untouched. <b>one-proof-4-all</b>{" "}
                is an additive framework. Keep your existing tests and start
                adding new ones using the dialect that fits best.
              </p>

              <div className="space-y-6">
                {[
                  { icon: CheckCircle2, text: "Runs natively alongside Jest" },
                  {
                    icon: CheckCircle2,
                    text: "No rewrite required for existing tests",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Unify your whole team's testing language",
                  },
                ].map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <item.icon className="w-5 h-5 text-narrative" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-black/60 p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Terminal className="w-6 h-6 text-math" />
                Polyglot Runner
              </h3>
              <p className="text-white/40 mb-6 font-mono text-sm">
                // coexist in the same file
              </p>
              <div className="space-y-4 opacity-80 scale-95 group-hover:scale-100 transition-transform duration-500">
                <div className="p-4 bg-white/5 rounded-xl border-l-4 border-white/20 text-xs font-mono">
                  <span className="text-white/40">// Standard Jest</span>
                  <div className="mt-1">
                    <span className="text-purple-400">describe</span>(
                    <span className="text-amber-200">"Legacy Login"</span>, ()
                    =&gt; {" { ... } "})
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border-l-4 border-narrative text-xs font-mono">
                  <span className="text-narrative/60">// One Proof 4 All</span>
                  <div className="mt-1">
                    <span className="text-narrative-light">intend</span>(
                    <span className="text-amber-200">"New Auth Flow"</span>, ()
                    =&gt; {" { ... } "})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dialects Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">
            Choose Your <span className="gradient-text">Dialect.</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
            Don't learn everything. Just pick what fits your domain and ignore
            the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {dialects.map((d) => (
            <DialectCard
              key={d.id}
              {...d}
              active={activeDialect === d.id}
              onClick={() => setActiveDialect(d.id)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDialect}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="glass-card p-12 border-white/10">
              <div className="flex items-center gap-4 mb-6 text-2xl font-bold">
                <currentDialect.icon
                  className={`w-8 h-8 ${currentDialect.colorClass.split(" ")[1]}`}
                />
                {currentDialect.title} Dialect
              </div>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                {currentDialect.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentDialect.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-md bg-white/5 text-white/50 font-mono text-xs"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
            <CodeBlock code={currentDialect.code} language="typescript" />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Why Section */}
      <section className="py-32 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Engineered for Teams</h2>
            <p className="text-white/40">
              Bridging the gap between engineering, product, and science.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "Data Scientists",
                desc: "Use mathematical proofs for algorithms without wrestling with UI-focused testing frameworks.",
              },
              {
                icon: FileCode2,
                title: "Architects",
                desc: "Enforce API contracts and strict compliance with imperative dialects that mean business.",
              },
              {
                icon: Code2,
                title: "PMs & QAs",
                desc: "Narrative specs that read like English. Verification becomes a collaborative process.",
              },
            ].map((feature, i) => (
              <div key={i} className="p-8 glass-card">
                <feature.icon className="w-10 h-10 mb-6 text-white/80" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-white/10 text-center">
        <h2 className="text-3xl font-black mb-8 italic">
          One Proof <span className="gradient-text">4 All.</span>
        </h2>
        <p className="text-white/30 text-sm mb-8">
          © 2026 Purecore Canonical. Built for the era of agentic coding.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="#"
            className="text-white/50 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-white/50 hover:text-white transition-colors"
          >
            Documentation
          </a>
          <a
            href="#"
            className="text-white/50 hover:text-white transition-colors"
          >
            Changelog
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
