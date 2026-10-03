import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default defineConfig([
  { files: ['**/*.js'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.js'], plugins: { js }, extends: ['js/recommended'] },
  ...pluginVue.configs['flat/essential'],
]);
