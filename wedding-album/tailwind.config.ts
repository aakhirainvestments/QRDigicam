import type { Config } from 'tailwindcss';

// Theme for this event (taken from the Rayaan & Qudsiyyah invite). Change these to re-skin:
//   paper = page background, leaf = main text, bloom = accent (buttons, links, countdown)
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f9efee', // invite blush
        leaf: '#4a2e2c', // deep maroon-brown body text
        bloom: '#a58238', // antique gold (darkened a touch so it's readable as text)
      },
      fontFamily: {
        script: ['"Pinyon Script"', 'Snell Roundhand', 'cursive'], // names / flourishes
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'], // spaced caps headings
        sans: ['Lora', 'Georgia', 'serif'], // small labels + buttons (invite has no sans)
        serif: ['Lora', 'Georgia', 'serif'], // body copy
      },
    },
  },
  plugins: [],
};

export default config;
