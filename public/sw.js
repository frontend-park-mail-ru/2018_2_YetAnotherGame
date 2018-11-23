const CACHE_NAME = 'app_sw_v1';
const cacheList = [
	'/',
	'/index.html',
	'/js/components/block/block.mjs',
	'/js/components/form/form.mjs',
	'/js/components/profile/profile.mjs',
	'/js/components/profile/profile.tmpl.js',
	'/js/components/profile/profile.tmpl.xml',
	'/js/components/scoreboard/scoreboard.mjs',
	'/js/components/scoreboard/scoreboard.tmpl.js',
	'/js/components/scoreboard/scoreboard.tmpl.xml',
	'/js/form-fields/sign_in.js',
	'/js/form-fields/sign_up.js',
	'/js/form-fields/update.js',
	'/js/modules/ajax.mjs',
	'/css/main.css',
	'/scripts/BaseView.js',
	'/scripts/GameView.js',
	'/scripts/LoginView.js',
	'/scripts/LogOutView.js',
	'/scripts/MenuView.js',
	'/scripts/PageView.js',
	'/scripts/ProfileView.js',
	'/scripts/ScoreBoardView.js',
	'/scripts/SignUpView.js',
	'/scripts/UpdateView.js',
	'/scripts/main.js',
	'/scripts/mediator.js',
	'/scripts/Router.js',
    '/scripts/UsersService.js',
    '/textures/1.png',
    '/textures/2.png',
    '/textures/3.png',
    '/textures/4.png',
    '/textures/menu-back.png',
    '/logout.png',
];

this.addEventListener('install', (event) =>
{
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then((cache) =>
			{
				return cache.addAll(cacheList);
			})
	);
});

this.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request)
			.then((cachedResponse) => {

				if (navigator.onLine) {
					return fetch(event.request);
				}

				if (cachedResponse) {
					return cachedResponse;
				}

				return fetch(event.request);
			})
			.catch((err) => {
				console.log(err.stack || err);
			})
	);
});
