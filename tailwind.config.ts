import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        worksans: ['work_sans', 'sans-serif']
      },

      colors: {
        primaryColor: '#E30303',
        greenDisable: '#2B8049', 
        primary: '#463880',
        secondaryColorSlate: '#EDEBF6',
        menuAndFooterColor: '#EDEBF6',
        dividerColor: '#463980',
        textColor: '#1F1F1F',
        btnReportsColorUncategorized: 'rgba(224, 0, 52, 0.2)',
        btnReportsColorCategorized: 'rgba(25, 154, 70, 0.2)',
      },
      borderColor: {
        primary: '#6E82FE',
        secondary: '#EDEBF6',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
