import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const extensionDir = path.join(root, "dist", "chrome-mv3");
const screenshotsDir = path.join(root, "dist", "screenshots");
const fixturePath = path.join(root, "screenshots", "sample-page.html");
const newtabPath = path.join(extensionDir, "newtab.html");
const grayscalePath = path.join(extensionDir, "content-scripts", "grayscale.css");

/** @param {string} filePath */
function contentType(filePath) {
  if (filePath.endsWith(".html")) return "text/html; charset=utf-8";
  if (filePath.endsWith(".css")) return "text/css; charset=utf-8";
  if (filePath.endsWith(".js")) return "text/javascript; charset=utf-8";
  return "application/octet-stream";
}

/** @param {Map<string, string>} routes */
function createStaticServer(routes) {
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", "http://127.0.0.1");
      const relativePath = path.normalize(url.pathname).replace(/^(\.\.[/\\])+/, "");
      const extensionFilePath = path.join(extensionDir, relativePath);
      const filePath = routes.get(url.pathname)
        ?? (extensionFilePath.startsWith(extensionDir) && existsSync(extensionFilePath)
          ? extensionFilePath
          : undefined);

      if (!filePath) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, { "content-type": contentType(filePath) });
      response.end(await readFile(filePath));
    } catch (error) {
      response.writeHead(500);
      response.end(String(error));
    }
  });

  return new Promise(resolve => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        throw new Error("Could not start screenshot server");
      }
      resolve({ server, origin: `http://127.0.0.1:${address.port}` });
    });
  });
}

async function main() {
  await mkdir(screenshotsDir, { recursive: true });

  const routes = new Map([
    ["/sample-page.html", fixturePath],
    ["/newtab.html", newtabPath],
    ["/content-scripts/grayscale.css", grayscalePath]
  ]);

  const { server, origin } = await createStaticServer(routes);

  const browser = await chromium.launch();

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
    await page.goto(`${origin}/sample-page.html`);
    await page.addStyleTag({ path: grayscalePath });
    await page.screenshot({
      path: path.join(screenshotsDir, "sample-page-grayscale.png"),
      fullPage: true
    });

    await page.goto(`${origin}/newtab.html`);
    await page.waitForFunction(() => document.getElementById("time")?.textContent?.trim());
    await page.screenshot({
      path: path.join(screenshotsDir, "newtab-clock.png"),
      fullPage: true
    });
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
