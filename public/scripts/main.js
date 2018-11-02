import mediator from "./mediator.js";
import MenuView from './MenuView.js';
import LoginView from './LoginView.js';
import Router from './Router.js';
import ScoreBoardView from './ScoreBoardView.js';
import UsersService from './UsersService.js';
import Block from "../js/components/block/block.mjs"

mediator.on('fetch-users', function () {
	UsersService
		.FetchUsers()
		.then(function (users) {
			mediator.emit('users-loaded', users);
		})
		.catch(function (error) {
			console.error(error);
		});
});
mediator.on('user-login', function (formdata) {
	console.log(formdata)
	UsersService
		.Login(formdata)
		.then(function (users) {
			mediator.emit('user-logined',users);
		})
		.catch(function (error) {
			console.error(error);
		});
});
mediator.on('user-logined', function () {
console.log("kek")
	//window.location = "http://google.com";
});

const root = new Block(document.getElementById('game'));
const router = new Router(root);

router
	.register('/', MenuView)
	.register('/leaders', ScoreBoardView)
	.register('/sign_in', LoginView);
router.start();
