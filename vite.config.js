import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { BASE_URL } from './src/config/constants';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: `${BASE_URL}/`,
});
