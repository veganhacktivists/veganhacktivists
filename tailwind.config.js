const twColors = require('tailwindcss/colors');

const colors = {
  black: '#161919',
  grey: {
    DEFAULT: '#454545',
    dark: '#292929',
  },
  gray: {
    DEFAULT: '#454545',
    dark: '#292929',
  },

  white: twColors.white,

  green: { DEFAULT: '#64bc46', dark: '#58A345' },
  yellow: '#FFC709',
  orange: { DEFAULT: '#F7941D', dark: '#F15A3B' },
  strawberry: '#ED184A',
  fuchsia: '#ED2384',
  bubblegum: '#F171A2',
};

module.exports = {
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors,
    fontFamily: {
      mono: ['Rajdhani', 'monospace'],
      sans: 'PT Sans',
      italic: 'Bitter',
    },
    extend: {
      zIndex: {
        '-10': '-10',
      },
    },
    boxShadow: {
      'fill-green': `inset 350px 0 0 0 ${colors.green.DEFAULT}`,
      'fill-strawberry': `inset 350px 0 0 0 ${colors.strawberry}`,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
