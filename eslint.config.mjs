import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    // .open-next/ holds the bundled Worker: a few multi-megabyte generated JS
    // files. Linting them exhausts the V8 heap and takes the whole run down with
    // an OOM, which reads like an unrelated lint crash rather than "you linted
    // your build output". .wrangler/ is local wrangler state. Neither is source.
    ignores: [
      ".open-next/**",
      ".wrangler/**",
      ".next/**",
      "src/generated/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
