import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { rm } from "node:fs/promises";

const repo = "md-file-icons";
const resolve = (p) => fileURLToPath(new URL(p, import.meta.url));

/**
 * Two build targets, selected with `--mode`:
 *   vite build --mode lib   → dist/md-file-icons.css   (npm package artifact)
 *   vite build --mode site  → dist-site/               (GitHub Pages demo)
 */
export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    return {
      build: {
        outDir: "dist",
        emptyOutDir: true,
        cssMinify: "lightningcss",
        lib: {
          entry: resolve("./src/index.js"),
          formats: ["es"],
          fileName: () => "md-file-icons.js",
        },
      },
      plugins: [
        {
          name: "css-only",
          async closeBundle() {
            // The JS entry only exists to pull in the stylesheet.
            await rm(resolve("./dist/md-file-icons.js"), { force: true });
          },
        },
      ],
    };
  }

  return {
    root: "demo",
    base: mode === "site" ? `/${repo}/` : "/",
    build: {
      outDir: "../dist-site",
      emptyOutDir: true,
    },
  };
});
