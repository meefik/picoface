import terser from '@rollup/plugin-terser';

const { NODE_ENV = 'production' } = process.env;

export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/picoface.umd.js',
    format: 'umd',
    name: 'PicoFace',
  }, {
    file: 'dist/picoface.esm.js',
    format: 'esm',
  }],
  plugins: NODE_ENV === 'production' ? [terser()] : [],
};
