/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        cream: '#F2EBDF',
        'input-border': '#E2DAC9',
        placeholder: '#A39C8C',
        ink: '#2B2B28',
        navy: '#1C2333',
        muted: '#7C7364',
        divider: '#DCD3C0',
        'divider-label': '#8F8878',
        danger: '#DC2626',
        'login-green': '#33482B',
        'register-slate': '#2D3748',
      },
    },
  },
  plugins: [],
};
