// public/service-worker.js

self.addEventListener('install', event => {
  console.log('[Obravisor] Service Worker instalado');
  self.skipWaiting(); // ativa imediatamente
});

self.addEventListener('activate', event => {
  console.log('[Obravisor] Service Worker ativado');
});

self.addEventListener('fetch', event => {
  // Aqui você pode adicionar lógica de cache, se quiser
});
