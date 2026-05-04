const cacheName = 'smartsales-v1';
// قمنا بإزالة الملفات التي قد لا تكون موجودة فعلياً بهذا المسار لتجنب فشل التثبيت
const staticAssets = [
  '/login',
  // إذا كان لديك ملفات CSS أو JS مخصصة، ضعي مساراتها هنا
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching shell assets');
      return cache.addAll(staticAssets).catch(err => console.warn('Some assets failed to cache', err));
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // إرجاع الملف من الذاكرة إذا وجد، وإلا طلبه من السيرفر
      return response || fetch(event.request);
    })
  );
});
