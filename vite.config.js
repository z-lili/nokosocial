import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// elementplus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// gzip压缩
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  // 配置打包公共路径,防止部署项目时发生资源路径访问错误的隐患，原是绝对路径，改为相对路径。
  base:'./',
  plugins: [
    vue(),
    // gzip压缩
    viteCompression(),
    // elementplus自动按需加载的配置
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build:{
    minify:'terser',
    terserOptions:{
      compress:{
        // 生产环境时移除console
        drop_console:true,
        drop_debugger:true,
      },
    },
    rollupOptions: {
      output: { // 配置输出文件夹
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    },
    css:{
      preprocessorOptions:{
        // 开启less Js运行时,通常未开启时是不能在js中导入less的
        less:{
          javascriptEnabled:true
        }
      }
    },
  },
  server: {
    proxy: {
      // 配置代理跨域
      // 选项写法
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})
