module.exports = {
  globDirectory: './',
  globPatterns: [
    '**/*.{html,css,js,json,png,jpg,jpeg,webp,svg,ico}'
  ],
  globIgnores: [
    'node_modules/**/*',
    'docs/**/*',
    'servidor-ssr*/**/*',
    'workbox-config.js',
    'package*.json'
  ],
  swDest: 'sw.js',
  clientsClaim: true,
  skipWaiting: true
};