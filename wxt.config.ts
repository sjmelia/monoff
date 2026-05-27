import { defineConfig } from "wxt";

export default defineConfig({
  srcDir: "src",
  outDir: "dist",
  manifestVersion: 3,
  manifest: ({ browser }) => ({
    name: "Monoff",
    description: "Render web pages in grayscale",
    action: {
      default_title: "Grayscale Mode"
    },
    browser_specific_settings: browser === "firefox"
      ? {
          gecko: {
            id: "monoff@arrayofbytes.com",
            data_collection_permissions: {
              required: ["none"]
            }
          }
        }
      : undefined
  }),
  hooks: {
    "build:manifestGenerated": (_, manifest) => {
      manifest.content_scripts ??= [];
      manifest.content_scripts.push({
        matches: ["<all_urls>"],
        css: ["content-scripts/grayscale.css"],
        run_at: "document_start"
      });
    }
  }
});
