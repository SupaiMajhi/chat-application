/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "davyGray": "#495057",
        'lightslategray': "#7A7F9A",
        'ghostwhite': "#f7f7ff",
        'onyx': '#343A40',
        'white': "#ffffff",
        'mediumslateblue': '#7269ef',
        'hoverBtnColor': '#5A4FCF',
        'lightbluegray': '#dfe7f1',
      },
    },
  },
  plugins: [
    daisyui,
  ],
}