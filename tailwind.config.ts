import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        primaryColor: '#E30303',
        secondaryColorSlate: '#EDEBF6',
        menuAndFooterColor: '#EDEBF6',
        dividerColor: '#463980',
        textColor: '#1F1F1F',
      },
      borderColor: {
        primary: '#6E82FE',
        secondary: '#EDEBF6',
      },
    },
  },
  plugins: [],
};
export default config;
