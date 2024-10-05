import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
  optimizeDeps: {
    include: ['react-paginate'],
  },
  resolve: {
    alias: [
      { find: '@/', replacement: 'src/' },
      { find: '@components', replacement: '/src/components' },
      { find: '@config', replacement: '/src/config' },
      { find: '@context', replacement: '/src/context' },
      { find: '@data', replacement: '/src/data' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@locales', replacement: '/src/locales' },
      { find: '@mocks', replacement: '/src/mocks' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@services', replacement: '/src/services' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@theme', replacement: '/src/theme' },
    ],
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
});
