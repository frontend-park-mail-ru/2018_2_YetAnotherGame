import mediator from "./mediator.js";
import MenuView from './MenuView.js';
import LoginView from './LoginView.js';
import Router from './Router.js';
import ScoreBoardView from './ScoreBoardView.js';
import UsersService from './UsersService.js';
import ProfileView from './ProfileView.js';
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
		.then(function (response) {

			if (response.status<300){
				//debugger
			mediator.emit('user-logined');}
			else{//debugger
				console.log("error")}
		})
		.catch(function (error) {
			//console.error(error);
		});
});
mediator.on('user-logined', function () {
	//debugger
	const profile = new ProfileView()
	//window.location = "http://127.0.0.1:3000";
});

const root = new Block(document.getElementById('game'));
const router = new Router(root);

router
	.register('/', MenuView)
	.register('/leaders', ScoreBoardView)
	.register('/sign_in', LoginView)
	.register('/me', ProfileView);
router.start();
