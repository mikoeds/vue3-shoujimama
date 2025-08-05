import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import parserTsEslint from "@typescript-eslint/parser";
import { createRequire } from "node:module"; // 关键点：引入 createRequire

// 关键点：创建 require 函数
const require = createRequire(import.meta.url);
const autoImportConfig = require("./.eslintrc-auto-import.json");
/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  {
    ignores: [
      "src/assets/font/**/*.js" // 忽略 src/assets/font下的js文件。//以后三方的js文件不需要检查，可以配置在这里
    ]
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...autoImportConfig.globals // 合并自动导入的全局变量
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    rules: {
      // "auto-import/no-unresolved": "error"
      ...autoImportConfig.rules
    },
    settings: {
      // "auto-import/resolvers": ["element-plus", "vue", "node"],
      "import/parsers": {
        [parserTsEslint]: [".ts", ".tsx", ".vue"]
      }
      // "import/resolver": {
      //   typescript: {}
      // }
    }
  }
];
