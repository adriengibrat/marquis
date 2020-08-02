import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
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
    resolve(),
    commonjs({ include: /node_modules/ }),
    unpkg(),
    typescript(),
    dev({ dirs: ['.', 'dist'] }),
  ]
};
