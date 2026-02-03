import { ApiSpec } from "../packages/api-test-dialect/index.js";

// Simulating a test run against a public placeholder API (JSONPlaceholder)
async function runExample() {
  try {
    console.log("--- Starting API Dialect Test Example ---");

    await ApiSpec.define("Get Single Post")
      .from("https://jsonplaceholder.typicode.com")
      .get("/posts/1")
      .shouldReturn(200)
      .matchingSchema({
        id: 1,
        userId: 1,
        title: "string",
        body: "string",
      })
      .run();

    await ApiSpec.define("Create New Post")
      .from("https://jsonplaceholder.typicode.com")
      .post("/posts", {
        title: "Purecore Test",
        body: "Building dialects is fun",
        userId: 1,
      })
      .shouldReturn(201)
      .run();

    console.log("--- All tests finished successfully ---");
  } catch (error) {
    // Error is already logged by the dialect
  }
}

runExample();
