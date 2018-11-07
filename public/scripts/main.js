import mediator from "./mediator.js";
import MenuView from './MenuView.js';
import LoginView from './LoginView.js';
import GameView from './GameView.js';
import Router from './Router.js';
import ScoreBoardView from './ScoreBoardView.js';
import UsersService from './UsersService.js';
import ProfileView from './ProfileView.js';
import Block from "../js/components/block/block.mjs"
import SignUpView from "./SignUpView.js";

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

mediator.on('fetch-profile', function () {
	UsersService
		.FetchProfile()
		.then(function (profile) {
			mediator.emit('profile-loaded', profile);
		})
		.catch(function (error) {
			console.log(error);
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
	router.open("/user/me")
	//window.location = "http://127.0.0.1:3000";
});

mediator.on('user-register', function(formdata) {
	console.log(formdata)
    UsersService
        .Register(formdata)
        .then(function (response) {

            if (response.status<300){
                //debugger
                mediator.emit('user-registered');
				}
            else{//debugger
                //console.log("error")
				}
        })
        .catch(function (error) {
            //console.error(error);
        });
})
mediator.on('user-register', function (formdata) {
    //debugger
    mediator.emit('user-logined', formdata)
    router.open("/user/me")
    //window.location = "http://127.0.0.1:3000";
});

mediator.on('user-logouted', function() {
	router.open("/")
});

const root = new Block(document.getElementById('game'));
const router = new Router(root);

router
	.register('/', MenuView)
	.register('/leaders', ScoreBoardView)
	.register('/sign_in', LoginView)
	.register('/sign_up', SignUpView)
    .register('/new_game', GameView)
	.register('/user/me', ProfileView);
router.start();
