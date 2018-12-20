import mediator from "./scripts/mediator.js"
import Router from "./scripts/Router.js"
import UsersService from "./scripts/UsersService.js"
import MenuView from "./views/MenuView.js"
import LoginView from "./views/LoginView.js"
import GameView from "./views/GameView.js"
import ScoreBoardView from "./views/ScoreBoardView.js"
import ProfileView from "./views/ProfileView.js"
import SignUpView from "./views/SignUpView.js"
import UpdateView from "./views/UpdateView.js"
import LogOutView from "./views/LogOutView.js"
import MultView from './views/MultView.js'
import AboutView from './views/AboutView.js'

import Block from "./components/block/block.mjs"
import "./form-fields/chat.js"
import "../css/main.scss"

if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/sw.js", { scope: "/" })
		.then((registration) => {
			console.log("SW registration OK:", registration)
		})
		.catch((err) => {
			console.log("SW registration FAIL:", err)
		})
}

mediator.on("fetch-users", function () {
	UsersService
		.FetchUsers()
		.then(function (users) {
			mediator.emit("users-loaded", users)
		})
		.catch(function (error) {
			console.error(error)
		})
})

mediator.on("fetch-profile", function () {
	UsersService
		.FetchProfile()
		.then(function (profile) {
			mediator.emit("profile-loaded", profile)
		})
		.catch(function (error) {
			console.log(error)
		})
})

mediator.on("user-login", function (formdata) {
	console.log(formdata)
	UsersService
		.Login(formdata)
		.then(function (response) {
			if (response.status >= 300) {
				throw response
			}
			mediator.emit("user-logined")
		})
		.catch(function (error) {
			const err = document.getElementById("err-text")
			if (!err) {
				const form = new Block(document.getElementById("form"))
				const errText = Block.Create("p", {"id": "err-text"}, ["err-msg"], "Please, check correctness of writing of the email and password.")
				form.append(errText)
			}
			console.error(error)
		})
})

mediator.on("user-logined", function () {
	router.open("/users/me")
})

mediator.on("user-register", function(formdata) {
	console.log(formdata)
    UsersService
        .Register(formdata)
        .then(function () {
            mediator.emit("user-registered")
        })
})
mediator.on("user-registered", function (formdata) {
	mediator.emit("user-logined")
})

mediator.on("user-logouted", function() {
	router.open("/")
})

mediator.on("logout", function() {
	UsersService
		.LogOut()
		.then(function(){
			mediator.emit("user-logouted")
		})
})

mediator.on("fetch-update", function (formdata) {
	console.log(formdata)
	UsersService
		.FetchUpdate(formdata)
		.then((res) => {
			mediator.emit("fetch-profile")
		})
		.then(() => {
			router.open("/users/me")
		})
		.catch((err) => {
			console.error(err)
		})
})

const root = new Block(document.getElementById("game"))
const router = new Router(root)

router
	.register("/", MenuView)
	.register("/leaders", ScoreBoardView)
	.register("/sign_in", LoginView)
	.register("/sign_up", SignUpView)
	.register("/log_out", LogOutView)
    .register("/new_game", GameView)
	.register("/users/me", ProfileView)
	.register("/users/update", UpdateView)
	.register('/mult', MultView)
	.register('/about', AboutView)
router.start()
