import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const customPrefixes = ['a-box', 'a-sphere', 'a-cylinder', 'a-plane', 'a-text', 'nft-image', 'nft-marker', 'a-scene', 'a-camera', 'a-entity', 'a-assets'];

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customPrefixes.some(prefix => tag.startsWith(prefix))
      }
    }
  })],
  build: {
    outDir: '../client' // This will put the build output in D:\Gautam\AF-JS\dist
  }
})
