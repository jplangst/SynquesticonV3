import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import nodePolyfills from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
//export default defineConfig({
//  plugins: [react()],
//})

export default defineConfig({
  // Other rules...
  resolve: {
    alias: {
      //mqtt: 'mqtt/dist/mqtt.js',
    }
  },
  optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
              NodeGlobalsPolyfillPlugin({
                buffer: true,
                process: true,
              }),
            ],
        }
    },
    build: {
      rollupOptions: {
        // Enable rollup polyfills plugin
        // used during production bundling
        plugins: [react(),nodePolyfills()],
      },
  },
});