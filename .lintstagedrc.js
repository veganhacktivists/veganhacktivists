const path = require('path');

const buildEslintCommand = (filenames) =>
  `lint --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{md,html,css,json,yml,yaml}': 'prettier --write',
};
