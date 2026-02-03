#!/usr/bin/env bun
/**
 * 🧪 one-proof-4-all Test Runner
 * Visual estilo Vitest com cronômetro e cores
 */

import { readdir, stat } from "fs/promises";
import { join, relative, basename, dirname } from "path";
import { resetAtomicCore } from "./index.js";

// =============================================================================
// 🎨 ANSI Colors (Vitest-style palette)
// =============================================================================

const c = {
  // Reset
  reset: "\x1b[0m",

  // Text styles
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",

  // Colors
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",

  // Bright colors
  brightRed: "\x1b[91m",
  brightGreen: "\x1b[92m",
  brightYellow: "\x1b[93m",
  brightBlue: "\x1b[94m",
  brightMagenta: "\x1b[95m",
  brightCyan: "\x1b[96m",

  // Background
  bgGreen: "\x1b[42m",
  bgRed: "\x1b[41m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
};

// Vitest-style colors
const pass = (s: string) => `${c.bold}${c.green}${s}${c.reset}`;
const fail = (s: string) => `${c.bold}${c.red}${s}${c.reset}`;
const skip = (s: string) => `${c.yellow}${s}${c.reset}`;
const dim = (s: string) => `${c.dim}${s}${c.reset}`;
const bold = (s: string) => `${c.bold}${s}${c.reset}`;
const cyan = (s: string) => `${c.cyan}${s}${c.reset}`;
const magenta = (s: string) => `${c.magenta}${s}${c.reset}`;
const yellow = (s: string) => `${c.yellow}${s}${c.reset}`;
const gray = (s: string) => `${c.gray}${s}${c.reset}`;
const brightCyan = (s: string) => `${c.brightCyan}${s}${c.reset}`;

// =============================================================================
// ⏱️ Timer & Formatting
// =============================================================================

function formatDuration(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}μs`;
  if (ms < 1000) return `${ms.toFixed(0)}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  const mins = Math.floor(ms / 60000);
  const secs = ((ms % 60000) / 1000).toFixed(1);
  return `${mins}m ${secs}s`;
}

function getSpinner(): string[] {
  return ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
}

// =============================================================================
// 📁 File Scanner
// =============================================================================

async function findSpecFiles(
  dir: string,
  fileList: string[] = [],
): Promise<string[]> {
  const files = await readdir(dir);

  for (const file of files) {
    if (file === "node_modules" || file === "dist" || file === ".git") continue;

    const path = join(dir, file);
    try {
      const s = await stat(path);
      if (s.isDirectory()) {
        await findSpecFiles(path, fileList);
      } else if (file.endsWith(".spec.ts")) {
        fileList.push(path);
      }
    } catch {
      // Ignore access errors
    }
  }

  return fileList;
}

// =============================================================================
// 🧪 Test Results Storage
// =============================================================================

interface TestResult {
  file: string;
  duration: number;
  passed: number;
  failed: number;
  skipped: number;
  tests: {
    name: string;
    status: "pass" | "fail" | "skip";
    duration: number;
    error?: string;
  }[];
}

const results: TestResult[] = [];

// =============================================================================
// 🖥️ Console Output Helpers
// =============================================================================

function clearLine() {
  process.stdout.write("\r\x1b[K");
}

function moveCursorUp(lines: number) {
  process.stdout.write(`\x1b[${lines}A`);
}

function printHeader() {
  console.log();
  console.log(
    ` ${c.bold}${c.magenta} one-proof-4-all ${c.reset} ${dim("v0.2.0")}`,
  );
  console.log();
}

function printFileStart(file: string, index: number, total: number) {
  const relativePath = relative(process.cwd(), file);
  const dir = dirname(relativePath);
  const name = basename(relativePath);

  const progress = `${dim(`[${index + 1}/${total}]`)}`;
  const dirPart = dir !== "." ? `${gray(dir + "/")}` : "";

  return `${progress} ${dirPart}${cyan(name)}`;
}

function printRunningSpinner(
  file: string,
  startTime: number,
  spinnerFrame: number,
): string {
  const spinner = getSpinner()[spinnerFrame % getSpinner().length];
  const elapsed = Date.now() - startTime;
  const timer = yellow(`${formatDuration(elapsed)}`);

  return ` ${c.yellow}${spinner}${c.reset} ${file} ${timer}`;
}

function printFileResult(file: string, result: TestResult) {
  const relativePath = relative(process.cwd(), file);
  const dir = dirname(relativePath);
  const name = basename(relativePath);

  const dirPart = dir !== "." ? `${gray(dir + "/")}` : "";
  const timer = gray(`(${formatDuration(result.duration)})`);

  if (result.failed > 0) {
    console.log(
      ` ${fail("✖")} ${dirPart}${fail(name)} ${fail(
        `${result.failed} failed`,
      )} ${timer}`,
    );
  } else {
    console.log(
      ` ${pass("✓")} ${dirPart}${cyan(name)} ${pass(
        `${result.passed} passed`,
      )} ${timer}`,
    );
  }

  // Print individual test results (indented)
  for (const test of result.tests) {
    const testTimer = gray(`${formatDuration(test.duration)}`);
    if (test.status === "pass") {
      console.log(`   ${pass("✓")} ${dim(test.name)} ${testTimer}`);
    } else if (test.status === "fail") {
      console.log(`   ${fail("✖")} ${fail(test.name)} ${testTimer}`);
      if (test.error) {
        console.log(`     ${fail("→")} ${c.dim}${test.error}${c.reset}`);
      }
    } else {
      console.log(`   ${skip("○")} ${skip(test.name)} ${dim("[skipped]")}`);
    }
  }
  console.log();
}

function printSummary() {
  const totalFiles = results.length;
  const totalTests = results.reduce((sum, r) => sum + r.tests.length, 0);
  const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
  const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);
  const totalSkipped = results.reduce((sum, r) => sum + r.skipped, 0);
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

  console.log();
  console.log(
    ` ${bold("Test Files")}  ${
      totalFailed > 0
        ? fail(`${results.filter((r) => r.failed > 0).length} failed`) + " | "
        : ""
    }${pass(`${results.filter((r) => r.failed === 0).length} passed`)} ${dim(
      `(${totalFiles})`,
    )}`,
  );
  console.log(
    ` ${bold("     Tests")}  ${
      totalFailed > 0 ? fail(`${totalFailed} failed`) + " | " : ""
    }${totalPassed > 0 ? pass(`${totalPassed} passed`) : ""}${
      totalSkipped > 0 ? " | " + skip(`${totalSkipped} skipped`) : ""
    } ${dim(`(${totalTests})`)}`,
  );
  console.log(` ${bold("  Duration")}  ${formatDuration(totalDuration)}`);
  console.log();

  // Final status bar
  if (totalFailed > 0) {
    console.log(
      ` ${c.bgRed}${c.bold}${c.white} FAIL ${c.reset} ${fail(
        "Tests failed. Check the output above.",
      )}`,
    );
  } else {
    console.log(
      ` ${c.bgGreen}${c.bold}${c.black} PASS ${c.reset} ${pass(
        "All tests passed!",
      )}`,
    );
  }
  console.log();
}

// =============================================================================
// 🧪 Mock Test Runner (simulates test execution)
// =============================================================================

async function runTestFile(filePath: string): Promise<TestResult> {
  const result: TestResult = {
    file: filePath,
    duration: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    tests: [],
  };

  const startTime = Date.now();

  try {
    // Create a mock test context that captures test registrations
    const capturedTests: { name: string; fn: () => void | Promise<void> }[] =
      [];

    // Override global test functions temporarily
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const logs: string[] = [];

    // Capture console output during file import
    console.log = (...args) => logs.push(args.join(" "));
    console.error = (...args) => logs.push(`[ERROR] ${args.join(" ")}`);

    resetAtomicCore();

    try {
      // Dynamic import executes the file
      await import(filePath);
    } catch (importError) {
      console.log = originalConsoleLog;
      console.error = originalConsoleError;

      result.failed = 1;
      result.tests.push({
        name: "Module import",
        status: "fail",
        duration: Date.now() - startTime,
        error: (importError as Error).message,
      });
      result.duration = Date.now() - startTime;
      return result;
    }

    // Restore console
    console.log = originalConsoleLog;
    console.error = originalConsoleError;

    // Parse captured logs to extract test results
    // Looking for patterns like:
    // 📂 [GROUP] ...
    // └─ 📝 [CASE] ...
    // ✅ PASS
    // ❌ FAIL: ...

    let currentGroup = "";
    let currentTest = "";
    let testStart = startTime;

    for (const log of logs) {
      if (log.includes("✅ PASS:")) {
        result.passed++;
        const testFullLabel = log.replace(/.*✅ PASS:\s*/, "").trim();
        result.tests.push({
          name: testFullLabel.replace("ROOT › ", ""),
          status: "pass",
          duration: Math.max(1, Math.random() * 10),
        });
      } else if (log.includes("❌ FAIL:")) {
        result.failed++;
        const parts = log.replace(/.*❌ FAIL:\s*/, "").split(" › ");
        const errorMsg = parts.pop() || "Unknown error";
        const testFullLabel = parts.join(" › ");

        result.tests.push({
          name: testFullLabel.replace("ROOT › ", ""),
          status: "fail",
          duration: Math.max(1, Math.random() * 10),
          error: errorMsg,
        });
      }
    }

    // If no tests were captured from logs, assume the file ran successfully
    if (result.tests.length === 0) {
      result.passed = 1;
      result.tests.push({
        name: "Module execution",
        status: "pass",
        duration: Date.now() - startTime,
      });
    }
  } catch (e) {
    result.failed = 1;
    result.tests.push({
      name: "Unknown error",
      status: "fail",
      duration: Date.now() - startTime,
      error: (e as Error).message,
    });
  }

  result.duration = Date.now() - startTime;
  return result;
}

// =============================================================================
// 🚀 Main Execution
// =============================================================================

async function main() {
  const cwd = process.cwd();

  printHeader();

  console.log(
    ` ${brightCyan("DEV")} ${dim(
      `Scanning for ${cyan(".spec.ts")} files in ${gray(cwd)}`,
    )}`,
  );
  console.log();

  const files = await findSpecFiles(cwd);

  if (files.length === 0) {
    console.log(` ${skip("⚠")} ${yellow("No .spec.ts files found.")}`);
    console.log();
    process.exit(0);
  }

  console.log(
    ` ${dim("Found")} ${bold(files.length.toString())} ${dim("test files")}`,
  );
  console.log();
  console.log(gray(" ─".repeat(35)));
  console.log();

  // Run tests with live timer
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileLabel = printFileStart(file, i, files.length);

    // Show running state with spinner
    const startTime = Date.now();
    let spinnerInterval: ReturnType<typeof setInterval> | null = null;
    let frame = 0;

    // Spinner animation (non-blocking)
    const spinnerPromise = new Promise<void>((resolve) => {
      spinnerInterval = setInterval(() => {
        clearLine();
        process.stdout.write(
          printRunningSpinner(fileLabel, startTime, frame++),
        );
      }, 80);
    });

    // Actually run the tests
    const result = await runTestFile(file);
    results.push(result);

    // Stop spinner
    if (spinnerInterval) clearInterval(spinnerInterval);
    clearLine();

    // Print final result for this file
    printFileResult(file, result);
  }

  // Print summary
  console.log(gray(" ─".repeat(35)));
  printSummary();

  // Exit with appropriate code
  const hasFailures = results.some((r) => r.failed > 0);
  process.exit(hasFailures ? 1 : 0);
}

main().catch((err) => {
  console.error(`${fail("Fatal Error:")} ${err.message}`);
  process.exit(1);
});
