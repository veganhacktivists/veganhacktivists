const path = require('path');

/**
 *
 * @param {string[]} absolutePaths
 */
const buildEslintCommand = (absolutePaths) => {
  const cwd = process.cwd();
  const relativePaths = absolutePaths.map((file) => path.relative(cwd, file));

  return `pnpm next lint --fix ${relativePaths
    .map((path) => `--file ${path}`)
    .join(' ')}`;
};

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{md,html,css,json,yml,yaml}': 'pnpm prettier --write',
};
