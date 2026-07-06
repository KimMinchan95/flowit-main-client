import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    sonarjs.configs.recommended,
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            eqeqeq: ['error', 'always'],
            'import/no-duplicates': 'error',
            'import/newline-after-import': ['warn', { count: 1 }],
            // import 순서는 Prettier(@ianvs/prettier-plugin-sort-imports)에서만 관리
            'import/order': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/consistent-type-imports': [
                'warn',
                {
                    prefer: 'type-imports',
                    disallowTypeAnnotations: true,
                    fixStyle: 'separate-type-imports',
                },
            ],
        },
    },
    eslintPluginPrettierRecommended,
    {
        rules: {
            // 포맷(import 순서 포함)은 Prettier CLI/확장으로만 검사
            'prettier/prettier': 'off',
        },
    },
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
