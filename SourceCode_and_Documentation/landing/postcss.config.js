const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');

const tailwindConfigPath = './tailwind.config.js';

const purgecssConfig = {
  content: ['./src/**/*.js', './src/styling/index.src.css'], // index.src.css for PurgeCSS to leave @apply and custom classes
  extractors: [
    {
      extractor: class {
        static extract(content) {
          return content.match(/[A-Za-z0-9-_:/%]+/g) || [];
        }
      },
      extensions: ['js', 'css']
    }
  ]
};

module.exports = ctx => ({
  plugins: [
    tailwindcss(tailwindConfigPath),
    autoprefixer,
    ctx.env === 'production' ? purgecss(purgecssConfig) : false // Run PurgeCSS only on production builds
  ]
});
