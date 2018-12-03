const CACHE_NAME = "app_sw_v1"
// const cacheList = [
// 	"/",
// 	"./index.html",
// 	"/js/components/block/block.mjs",
// 	"/js/components/form/form.mjs",
// 	"/js/components/profile/profile.mjs",
// 	"/js/components/profile/profile.tmpl.js",
// 	"/js/components/profile/profile.tmpl.xml",
// 	"/js/components/scoreboard/scoreboard.mjs",
// 	"/js/components/scoreboard/scoreboard.tmpl.js",
// 	"/js/components/scoreboard/scoreboard.tmpl.xml",
// 	"/js/form-fields/sign_in.js",
// 	"/js/form-fields/sign_up.js",
// 	"/js/form-fields/update.js",
// 	"/js/modules/ajax.mjs",
// 	"/css/main.css",
// 	"/js/views/BaseView.js",
// 	"/js/views/GameView.js",
// 	"/js/views/LoginView.js",
// 	"/js/views/LogOutView.js",
// 	"/js/views/MenuView.js",
// 	"/js/views/PageView.js",
// 	"/js/views/ProfileView.js",
// 	"/js/views/ScoreBoardView.js",
// 	"/js/views/SignUpView.js",
// 	"/js/views/UpdateView.js",
// 	"/js/scripts/main.js",
// 	"/js/scripts/mediator.js",
// 	"/js/scripts/Router.js",
//     "/js/scripts/UsersService.js",
//     "/img/textures/1.png",
//     "/img/textures/2.png",
//     "/img/textures/3.png",
//     "/img/textures/4.png",
//     "/img/menu-back.png",
//     "/img/logout.png",
// ]
const cacheList = [
	"/",
	"/out/build.js",
	"/out/style.css",
	"/img/menu-back.png"
]

self.addEventListener("install", (event) =>{
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) =>
			{
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
