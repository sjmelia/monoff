import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = path.join(root, "public", "icon.svg");
const outputDir = path.join(root, "public");
const sizes = [16, 32, 48, 96, 128];

async function main() {
  await Promise.all(
    sizes.map(size =>
      sharp(source)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `icon-${size}.png`))
    )
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
