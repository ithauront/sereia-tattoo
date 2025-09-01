import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier' // <= ADICIONE
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist', 'build', 'coverage', 'node_modules'],
  },

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier, // mantém para desativar regras de formatação conflitantes
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      prettier, // <= ADICIONE
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      // ==== Torna divergências do Prettier ERROS ESLint (vai sublinhar) ====
      'prettier/prettier': [
        'error',
        {
          // espelha seu .prettierrc, para evitar qualquer ambiguidade
          semi: false,
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
          // opcional, se quiser explicitar indentação:
          tabWidth: 2,
          useTabs: false,
        },
      ],

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
      'no-shadow': [
        'error',
        {
          builtinGlobals: false,
          hoist: 'all',
          allow: ['top'],
        },
      ],
      'id-denylist': ['error', 'sb', 'event'],
      'id-length': [
        'error',
        {
          min: 2,
          properties: 'never',
          exceptions: ['$', '_', 'i', 'j', 'a', 'b', 'x', 'y'],
        },
      ],
      'no-confusing-arrow': [
        'error',
        {
          allowParens: true,
        },
      ],
      'no-param-reassign': ['error'],
      'no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1, 2, 10],
          ignoreArrayIndexes: true,
          detectObjects: false,
        },
      ],
      'new-cap': ['error'],
      'template-curly-spacing': ['error', 'never'],
      'object-shorthand': ['error', 'always'],
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            minProperties: 1,
          },
          ObjectPattern: {
            multiline: true,
          },
        },
      ],
      'no-restricted-globals': ['error', 'escape', 'unescape', 'event', 'top'],
      'no-restricted-imports': [
        'error',
        {
          name: 'lodash',
          message: "Please import from 'utils' instead.",
        },
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: '{react,react-dom/**}',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'sort-imports': 'off',
      'no-return-await': 'off',
      'no-useless-return': 'off',
      'prefer-rest-params': 'off',
      'class-methods-use-this': 'off',
    },
  },
)
