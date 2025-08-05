import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    vueSetupExtend(),
    AutoImport({
      imports: [
        "vue",
        "vue-router", // 自动导入路由相关
        {
          "element-plus": ["ElMessage"] // 显式声明需要自动导入的 API
        }
      ],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon"
        })
      ],
      dts: "./auto-imports.d.ts", // 生成类型声明文件
      eslintrc: {
        enabled: true, // 生成 eslint 配置
        filepath: "./.eslintrc-auto-import.json", // 生成 eslint 配置
        globalsPropValue: true
      }
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ["ep"]
        }),
        ElementPlusResolver()
      ],
      dirs: [
        // 只自动导入node_modules和non-components目录
        "node_modules",
        "src/non-components"
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    },
    extensions: [".ts", ".vue", ".js"]
  },

})
