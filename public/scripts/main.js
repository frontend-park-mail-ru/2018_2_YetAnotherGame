import mediator from "./mediator.js";
import MenuView from './MenuView.js';
import LoginView from './LoginView.js';
import GameView from './GameView.js';
import MultView from './MultView.js';
import Router from './Router.js';
import ScoreBoardView from './ScoreBoardView.js';
import UsersService from './UsersService.js';
import ProfileView from './ProfileView.js';
import Block from "../js/components/block/block.mjs"
import SignUpView from "./SignUpView.js";
import UpdateView from "./UpdateView.js";
import LogOutView from "./LogOutView.js";

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
				mediator.emit('user-logined');
			} else {//debugger
				console.log("error")
			}
		})
		.catch(function (error) {
			//console.error(error);
		});
});

mediator.on('user-logined', function () {
	router.open("/user/me")
});

mediator.on('user-register', function(formdata) {
	console.log(formdata)
    UsersService
        .Register(formdata)
        .then(function (response) {
            if (true){ // КОСТЫЛЬ!!!!
                mediator.emit('user-registered');
			} else {//debugger
                //console.log("error")
			}
        })
        .catch(function (error) {
		});
})
mediator.on('user-registered', function (formdata) {
	mediator.emit('user-logined')
});

mediator.on('user-logouted', function() {
	router.open("/")
});

mediator.on('logout', function() {
	UsersService
		.LogOut()
		.then(function(){
			mediator.emit('user-logouted')
		})
})

mediator.on('fetch-update', function (formdata) {
	console.log(formdata)
	UsersService
		.FetchUpdate(formdata)
		.then(() => {
			mediator.emit('fetch-profile')
			router.open('/user/me')
		})
})

const root = new Block(document.getElementById('game'));
const router = new Router(root);

router
	.register('/', MenuView)
	.register('/leaders', ScoreBoardView)
	.register('/sign_in', LoginView)
	.register('/sign_up', SignUpView)
	.register('/log_out', LogOutView)
    .register('/new_game', GameView)
	.register('/user/me', ProfileView)
	.register('/update', UpdateView)
	.register('/mult', MultView)
router.start();
