<p align="center">
  <img src="./logo.png" alt="one-spec-4-all" width="200"/>
</p>

<h1 align="center">One Proof 4 All</h1>

<p align="center">
  <strong>One Runner to Rule Them All</strong>
</p>

<p align="center">
  A polyglot testing framework that adds specialized dialects to existing test suites without requiring rewrites. Zero-risk adoption with Jest compatibility.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#dialects">Dialects</a> •
  <a href="#documentation">Documentation</a>
</p>

---

## 🎯 Features

- **Zero Risk Adoption**: Your legacy code continues working unchanged
- **Polyglot Approach**: Multiple specialized dialects for different domains
- **Jest Compatible**: Runs alongside existing Jest tests in the same suite
- **Four Specialized Dialects**:
  - 📐 **Mathematical**: For algorithms, calculations, and mathematical proofs
  - 📖 **Narrative**: For business rules readable by product managers
  - 🛡️ **Imperative**: For API contracts and integration testing
  - 🌐 **API Testing**: For declarative API contract validation

## 🚀 Installation

```bash
npm install @purecore/one-spec-4-all
```

## ⚡ Quick Start

Create a test file `api.spec.ts`:

```javascript
import { ensure, check, that, stub } from "@purecore/one-spec-4-all";

ensure("My User API", () => {
  const api = stub();
  api.forceReturn({ status: 200, id: "user_123" });

  check("User creation returns 200 OK", () => {
    const response = api.createUser({ name: "John" });

    that(response.status).is(200);
    that(response.id).matches(/^user_\w+$/);
  });
});
```

Run your tests:

```bash
npx one-spec-4-all
# or aliases:
npx os4all
npx 1spec
npx testall
```

## 🧭 Which Dialect Is Right for You?

You don't need to learn all four. Choose what fits your domain:

```
                          ┌─────────────────────────────────────────┐
                          │   What are you testing?                  │
                          └───────────────────┬─────────────────────┘
                                              │
              ┌───────────────────────────────┼───────────────────────────────┐
              │                               │                               │
              ▼                               ▼                               ▼
   ┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
   │ Pure algorithms,     │      │ User flows, business │      │ APIs, contracts,     │
   │ calculations,        │      │ rules readable by    │      │ integrations,        │
   │ mathematical rules?  │      │ product managers?    │      │ compliance?          │
   └──────────┬───────────┘      └──────────┬───────────┘      └──────────┬───────────┘
              │                               │                               │
              ▼                               ▼                               ▼
   ┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
   │ 📐 MATHEMATICAL      │      │ 📖 NARRATIVE         │      │ 🛡️ IMPERATIVE        │
   │ axiom, proof, implies│      │ intend, scenario, to │      │ ensure, check, that  │
   └──────────────────────┘      └──────────────────────┘      └──────────────────────┘
                                                │
                                                ▼
                                ┌──────────────────────────────┐
                                │ Backend services, QA teams?  │
                                └─────────────┬────────────────┘
                                              ▼
                                ┌──────────────────────────────┐
                                │ 🌐 API TESTING               │
                                │ ApiSpec.define().post()      │
                                └──────────────────────────────┘
```

## 📐 Mathematical Dialect

Perfect for scientists and mathematicians proving pure functions.

### Example
```javascript
import { axiom, proof, implies } from "@purecore/one-spec-4-all";

axiom("SHA-256 Hash Theory", () => {
  proof("Empty string hash converges to known constant", () => {
    implies(sha256("")).is("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
  });
  
  proof("Hash is deterministic", () => {
    const input = "hello world";
    implies(sha256(input)).is(sha256(input));
  });
});
```

### Key Functions
- `axiom(name, fn)` - Group of truths
- `proof(name, fn)` - Individual proof
- `implies(val).is(x)` - Logical implication
- `arbitrary()` - Generic function
- `postulate(fn)` - Global premises
- `given(fn)` - "Given that..."

> 📚 [Complete Mathematical API Documentation](./docs/api-matematico.md)

## 📖 Narrative Dialect

Designed for teams with product managers who need to validate business rules.

### Example
```javascript
import { intend, scenario, to, standIn } from "@purecore/one-spec-4-all";

intend("User Permission Journey", () => {
  const userService = standIn();
  
  background(() => {
    userService.setup({
      permissions: ["read", "write"]
    });
  });

  scenario("Unauthorized user tries to access admin panel", () => {
    const response = userService.accessAdminPanel("guest_user");
    to(response.status).be(403);
    to(response.message).be("Access denied");
  });

  scenario("Authorized user accesses dashboard", () => {
    const response = userService.accessDashboard("admin_user");
    to(response.status).be(200);
    to(response.data).toBeDefined();
  });
});
```

### Key Functions
- `intend(name, fn)` / `story(name, fn)` - Intent/story
- `scenario(name, fn)` / `detail(name, fn)` - Scenario
- `to(val).be(x)` - Expectation
- `standIn()` / `dummy()` - Stand-in
- `background(fn)` - Context
- `before(fn)` - Before each scene

> 📚 [Complete Narrative API Documentation](./docs/api-narrativo.md)

## 🛡️ Imperative Dialect

For backend developers testing API contracts and integrations.

### Example
```javascript
import { ensure, verify, that, stub, initAll, reset } from "@purecore/one-spec-4-all";

let api;

initAll(() => {
  api = stub();
});

reset(() => {
  api.reset();
});

ensure("PCI-DSS Gateway Compliance v4", () => {
  verify("Sensitive data never travels in plain text", () => {
    const payload = api.processPayment({ card: "1234" });
    that(payload).matches(/^encrypted:/);
  });

  verify("All transactions are logged", () => {
    api.processTransaction({ amount: 100 });
    that(api.getTransactionLog()).toHaveLength(1);
  });
});
```

### Key Functions
- `ensure(name, fn)` - Ensure a requirement
- `check(name, fn)` / `verify(name, fn)` - Point check
- `that(val).is(x)` - Assertion
- `stub()` / `mock()` - Create mock
- `initAll(fn)` - Initial setup
- `reset(fn)` - Reset per test
- `spy()` - Monitor calls
- `disposeAll(fn)` - Cleanup

> 📚 [Complete Imperative API Documentation](./docs/api-imperativo.md)

## 🌐 API Testing Dialect

Specialized for backend services and QA teams testing microservices.

### Example
```javascript
import { ApiSpec } from "@purecore/one-spec-4-all";

const userSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" }
  },
  required: ["id", "name", "email"]
};

await ApiSpec.define("Create User")
  .from("https://api.example.com")
  .post("/users", { 
    name: "John Doe",
    email: "john@example.com" 
  })
  .shouldReturn(201)
  .matchingSchema(userSchema)
  .run();

await ApiSpec.define("Get User")
  .from("https://api.example.com")
  .get("/users/user_123")
  .shouldReturn(200)
  .matchingSchema(userSchema)
  .run();
```

### Key Functions
- `ApiSpec.define(name)` - Define the test
- `.from(url)` - Set base URL
- `.get()` / `.post()` / `.put()` / `.delete()` - HTTP actions
- `.shouldReturn(code)` - Status validation
- `.matchingSchema(schema)` - Contract validation
- `.withHeaders(headers)` - Set headers
- `.withAuth(token)` - Authentication
- `.timeout(ms)` - Set timeout

> 📚 [Complete API Testing Documentation](./docs/api-teste-api.md)

### 🏃 Running API Tests

1. **Create a file** ending in `.spec.ts` (e.g., `api.spec.ts`)
2. **Import** the dialect:
   ```typescript
   import { ApiSpec } from "@purecore/one-spec-4-all";
   ```
3. **Define and run** your test (supports Top-Level Await):
   ```typescript
   await ApiSpec.define("Health Check")
     .from("http://localhost:3000")
     .get("/health")
     .shouldReturn(200)
     .run();
   ```
4. **Execute** using the CLI:
   ```bash
   npx one-spec-4-all
   # or with bun
   bun run os4all
   ```

## 🎭 Polyglot Example: Shopping Cart

Using multiple dialects in the same project:

```javascript
// 📐 MATHEMATICAL: Price calculations (pure logic)
import { axiom, proof, implies } from "@purecore/one-spec-4-all";

axiom("Price Calculation Theory", () => {
  proof("10% discount on $100 equals $90", () => {
    implies(calcDiscount(100, 10)).is(90);
  });
  
  proof("Tax calculation is additive", () => {
    const base = 100;
    const discounted = calcDiscount(base, 10);
    const withTax = addTax(discounted, 5);
    implies(withTax).is(94.5);
  });
});

// 📖 NARRATIVE: User journey (PM readable)
import { intend, scenario, to } from "@purecore/one-spec-4-all";

intend("User Shopping Journey", () => {
  scenario("User adds product to cart", () => {
    const cart = shoppingCart.addProduct(product);
    to(cart.items).toHaveLength(1);
    to(cart.total).be(29.99);
  });
  
  scenario("User applies coupon code", () => {
    const cart = shoppingCart.applyCoupon("SAVE10");
    to(cart.discount).be(10);
    to(cart.finalTotal).be(26.99);
  });
});

// 🛡️ IMPERATIVE: Payment gateway integration (strict contract)
import { ensure, check, that } from "@purecore/one-spec-4-all";

ensure("Payment Gateway v2.1 Compliance", () => {
  check("Transaction returns status 200", () => {
    const response = paymentGateway.process({
      amount: 26.99,
      card: "**** **** **** 1234"
    });
    that(response.status).is(200);
    that(response.transactionId).matches(/^txn_[a-zA-Z0-9]+$/);
  });
  
  check("Failed transactions return proper error codes", () => {
    const response = paymentGateway.process({
      amount: 26.99,
      card: "invalid_card"
    });
    that(response.status).is(400);
    that(response.errorCode).is("INVALID_CARD");
  });
});
```

> 📁 [See complete polyglot example](./examples/polyglot-shopping-cart.spec.ts)

## 📚 Complete Documentation

### Core Documentation
- [📚 Quick Start Guide](./docs/guia-rapido.md) - Comprehensive getting started guide
- [📄 Whitepaper](./docs/whitepaper.md) - Detailed technical overview and philosophy
- [💡 4 Ideas Document](./docs/4-ideias.md) - Original concept ideas

### API References
- [📐 Mathematical Dialect API](./docs/api-matematico.md)
- [📖 Narrative Dialect API](./docs/api-narrativo.md)
- [🛡️ Imperative Dialect API](./docs/api-imperativo.md)
- [🌐 API Testing Dialect API](./docs/api-teste-api.md)

### Examples
- [📐 Mathematical Example](./examples/math.spec.ts)
- [📖 Narrative Example](./examples/narrative.spec.ts)
- [🛡️ Imperative Example](./examples/imperative.spec.ts)
- [🎭 Polyglot Shopping Cart](./examples/polyglot-shopping-cart.spec.ts)
- [🧪 Sanity Tests](./examples/sanity.spec.ts)
- [🌐 API Testing Example](./examples/test-api.ts)

## 🔄 Jest Compatibility

Your existing Jest tests continue working unchanged:

```javascript
// ✅ Your legacy Jest code - UNTOUCHED
describe("Login Module (Legacy)", () => {
  it("should validate password", () => {
    expect(validate("123")).toBe(true);
  });
});

// ✅ New feature with new dialect - COMPLEMENTARY
import { axiom, implies } from "@purecore/one-spec-4-all";

axiom("New SHA-256 Cryptography", () => {
  implies(hash("123")).matches(/^[a-f0-9]{64}$/);
});
```

**Single `npm test` command runs both. Same report. Same coverage. No rewrite needed.**

## 📊 Why Adopt in Your Team?

### 💰 Communication ROI

| Problem | Solution with one-spec-4-all |
|---------|------------------------------|
| PMs can't read tests | Narrative dialect produces **readable specifications** |
| Meetings to validate rules | Tests become **approvable documentation** |
| Ambiguity between product and engineering | **Common language** eliminates rework |

**Result:** Fewer meetings, shorter validation cycles, fewer bugs reaching production.

### ⚡ Team Efficiency

| Situation | Benefit |
|-----------|---------|
| Onboarding data scientists | Learn only `MathDialect`, not entire ecosystem |
| Backend devs focused | Use only `ImperativeDialect` for contracts |
| Domain specialization | Each member produces more, faster |

**Result:** Training in days, not weeks. Immediate contribution.

### 🛡️ Code Health (Zero Risk)

| Fear | Reality |
|------|---------|
| "I'll have to rewrite 5,000 tests" | ❌ **False.** Jest runs natively |
| "Another dependency to maintain" | Incremental integration, not big-bang |
| "What if it fails mid-project?" | Adopt in 1 new file. Evaluate. Expand if liked |

**Result:** Immediate improvement without technical debt. Trivial rollback if needed.

## 🏃 Running Tests

```bash
# Run all specs
npx one-spec-4-all

# Watch mode
npx one-spec-4-all --watch

# Specific file
npx one-spec-4-all src/**/*.spec.ts

# With coverage
npx one-spec-4-all --coverage
```

## 📦 Package Structure

```
@purecore/one-spec-4-all/
├── src/
│   ├── index.ts          # Main entry point
│   └── cli.ts            # CLI runner
├── docs/                 # Documentation
├── examples/             # Example specifications
├── packages/
│   ├── api-test-dialect/ # API testing package
│   └── reqify/          # HTTP utilities
└── types/
    └── api-types.ts     # TypeScript definitions
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Cogfulness Ethical License (CEL) v1.0

## 🙏 Acknowledgments

- Inspired by the need for domain-specific testing languages
- Built with ❤️ for diverse development teams
- Special thanks to all contributors and early adopters

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/suissa">suissAI</a>
</p>