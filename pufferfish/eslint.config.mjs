import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
        ],
    },
    {
        rules: {
            // Disable TypeScript strict rules for WebGL/animation components
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "warn",

            // Disable prefer-const for variables that might be reassigned in complex logic
            "prefer-const": "off",

            // Disable React hooks exhaustive deps for complex WebGL/animation components
            "react-hooks/exhaustive-deps": "off",

            // Allow img elements (can be changed to warn if you want to be reminded)
            "@next/next/no-img-element": "off",
        },
    },
];

export default eslintConfig;
