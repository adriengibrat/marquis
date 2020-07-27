import typescript from '@rollup/plugin-typescript';
import unpkg from 'rollup-plugin-unpkg';
import dev from 'rollup-plugin-dev';

export default {
  input: './src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    typescript(),
    unpkg(),
    dev({ dirs: ['.', 'dist'] }),
  ]
};
