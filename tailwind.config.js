const twColors = require('tailwindcss/colors');

const colors = {
  // Grays
  black: '#161919',
  white: twColors.white,
  grey: {
    DEFAULT: '#454545',
    dark: '#292929',
    darker: '#1D1D1D',
    light: '#B4B4B4',
    lighter: '#CACACA',
    background: '#E2E2E2',
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
    light: '#F171A4',
  },
  purple: {
    DEFAULT: '#7E3C96',
    dark: '#6B2D82',
  },
};

// Synonymous Colors (adds verbosity for spelling and ease of memory)
colors.gray = colors.grey;
colors.pink = colors.magenta;
colors.fuchsia = colors.magenta;

module.exports = {
  purge: {
    content: [
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
      /^bg-/,
      /^-?w-/,
      /^-?h-/,
      /^opacity-/,
      /^-?left-/,
      /^-?right-/,
      /^-?top-/,
      /^-?bottom-/,
      /^text-/,
      /^-?translate-/,
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        3: '3px',
      },
      zIndex: {
        '-10': '-10',
      },
      height: {
        'screen-60%': '60vh',
        160: '40rem',
      },
      minHeight: {
        'screen-header': '93vh',
        'screen-header-small': '93vh',
        'screen-60%': '60vh',
        'screen/2': '50vh',
      },
    },
    colors,
    fontFamily: {
      mono: ['Rajdhani', 'monospace'],
      sans: 'PT Sans',
      italic: 'Bitter',
    },
    boxShadow: {
      'fill-green': `inset 550px 0 0 0 ${colors.green.DEFAULT}`,
      'fill-pink': `inset 550px 0 0 0 ${colors.pink.DEFAULT}`,
      'fill-red': `inset 550px 0 0 0 ${colors.red.DEFAULT}`,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
