import { defineConfig } from "vitest/config";
import * as path from "node:path";

export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@prisma": path.resolve(__dirname, "src/utils/prisma.ts"),
    },
  },
});
