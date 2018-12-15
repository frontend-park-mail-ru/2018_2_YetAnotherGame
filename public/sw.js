const CACHE_NAME = "app_sw_v1"
const cacheList = [
	"/",
	"/new_game",
	"/leaders",
	"/sign_in",
	"/sign_up",
	"/out/build.js",
	"/out/style.css",
	"/out/public/img/menu-back.png",
	"/out/public/img/textures/1.png",
	"/out/public/img/textures/2.png",
	"/out/public/img/textures/3.png",
]

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) => {
				return cache.addAll(cacheList)
			})
	)
})

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.match(event.request)
			.then((cachedResponse) => {
				if (navigator.onLine) {
					return fetch(event.request)
				}
				if (cachedResponse) {
					return cachedResponse
				}
				return fetch(event.request)
			})
			.catch((err) => {
				console.log(err.stack || err)
			})
	)
})
