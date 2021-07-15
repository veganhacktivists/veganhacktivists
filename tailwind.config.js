const twColors = require('tailwindcss/colors');

const colors = {
  // Grays
  black: '#161919',
  white: twColors.white,
  grey: {
    DEFAULT: '#454545',
    dark: '#292929',
    light: '#CACACA',
  },
  // Colors
  green: {
    DEFAULT: '#64BC46',
    dark: '#57A446',
    light: '#B3D44C',
  },
  yellow: {
    DEFAULT: '#FFC709',
    dark: '#FCB215',
    light: '#FFD766',
  },
  yellow_orange: {
    DEFAULT: '#F7941D',
    dark: '#F57E20',
    light: '#FCB215',
  },
  orange: {
    DEFAULT: '#F15A3B',
    dark: '#DF3E2C',
    light: '#F57E20',
  },
  red: {
    DEFAULT: '#ED184A',
    dark: '#D11E45',
  },
  magenta: {
    DEFAULT: '#ED2384',
    dark: '#D31579',
    light: 'F171A4',
  },
  purple: {
    DEFAULT: '#7E3C96',
    dark: '#6B2D82',
  },
};

// Synonymous Colors (adds verbosity for spelling and ease of memory)
colors.grey = colors.gray;
colors.pink = colors.magenta;
colors.fuchsia = colors.magenta;

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
