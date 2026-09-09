import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";
import { createServer } from "node:net";
import test from "node:test";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

async function reservePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert.notEqual(address, null);
  assert.equal(typeof address, "object");
  const port = address.port;
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  return port;
}

async function waitForDocument(url, child, output) {
  const deadline = Date.now() + 25_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Next.js dev server exited early (${child.exitCode}).\n${output.join("")}`);
    }
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for ${url}.\n${output.join("")}`);
}

async function stopServer(child) {
  if (child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([
    once(child, "exit"),
    new Promise((resolve) => setTimeout(resolve, 3_000)),
  ]);
  if (child.exitCode === null) child.kill("SIGKILL");
}

test("localized documents expose matching html, metadata, and home behavior", { timeout: 35_000 }, async (t) => {
  const port = await reservePort();
  const output = [];
  const child = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", String(port)],
    { cwd: projectRoot, stdio: ["ignore", "pipe", "pipe"] },
  );
  child.stdout.on("data", (chunk) => output.push(chunk.toString()));
  child.stderr.on("data", (chunk) => output.push(chunk.toString()));
  t.after(() => stopServer(child));

  const response = await waitForDocument(`http://127.0.0.1:${port}/en/programs/study`, child, output);
  const html = await response.text();

  assert.match(html, /<html[^>]*\blang="en"/i);
  assert.match(html, /<meta[^>]*\bproperty="og:locale"[^>]*\bcontent="en_US"[^>]*>/i);

  const englishHomeResponse = await fetch(`http://127.0.0.1:${port}/en`);
  assert.equal(englishHomeResponse.status, 200);
  const englishHome = await englishHomeResponse.text();
  assert.match(englishHome, /<meta name="description" content="SNU SemiCon is a Seoul National University community that learns, builds, and connects through semiconductor technology\."/i);
  assert.match(englishHome, /aria-label="Switch to dark mode"/i);
  assert.match(englishHome, /aria-label="Open menu"/i);
  assert.match(englishHome, /aria-label="Program filters"/i);
  assert.match(englishHome, /aria-label="View details for Jeju Technical Workshop"/i);
  assert.match(englishHome, /aria-label="Search news"/i);
  assert.match(englishHome, /href="\/en\/programs\/study"/i);
  assert.match(englishHome, /Circuit Design and Process &amp; Device run in parallel Friday 16:00–18:00 and Saturday 11:00–13:00\./i);

  const koreanHomeResponse = await fetch(`http://127.0.0.1:${port}/ko`);
  assert.equal(koreanHomeResponse.status, 200);
  const koreanHome = await koreanHomeResponse.text();
  assert.match(koreanHome, /<html[^>]*\blang="ko"/i);
  assert.match(koreanHome, /<meta[^>]*\bproperty="og:locale"[^>]*\bcontent="ko_KR"[^>]*>/i);
  assert.match(koreanHome, /<meta name="description" content="서울대학교 반도체 학회 SNU SemiCon\. 배우고, 만들고, 연결하며 반도체의 내일을 설계합니다\."/i);
});
