import { defineConfig, transformWithEsbuild, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import viteJsconfigPaths from 'vite-jsconfig-paths';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'REACT_APP_');
  return {
    base: './',
    plugins: [
      react(),
      viteJsconfigPaths(),
      eslint({
        failOnError: false,
      }),
      svgr({
        svgrOptions: {
          exportType: 'named',
          ref: true,
          svgo: true,
          titleProp: true,
        },
        include: '**/*.svg',
        exclude: ['**/node_modules/**', 'src/stories/**'],
      }),

      {
        name: 'treat-js-files-as-jsx',
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/)) return null;

          // Use the exposed transform from vite, instead of directly
          // transforming with esbuild
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic',
          });
        },
      },
    ],
    envPrefix: 'REACT_APP_',
    server: {
      open: true,
      port: 3000,
      host: true,
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    define: {
      'process.env': env,
    },
    publicDir: './public',
    build: {
      outDir: './build',
    },
  };
});
