export default function manifest() {
  return {
    name: 'Garlic and Ginger - Spicy Recipes',
    short_name: 'G&G Recipes',
    description: 'Bold, spicy recipes featuring garlic and ginger from cuisines around the world',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ff6b6b',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
