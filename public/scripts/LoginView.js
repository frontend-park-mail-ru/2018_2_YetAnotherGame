 import PageView from './PageView.js';
 import Block from "../js/components/block/block.mjs"
 import Form from "../js/components/form/form.mjs"
 import mediator from "./mediator.js"


export default class LoginView extends PageView {
	constructor (el) {
		super(el);
	}

	show() {
		super.show()
	}

	hide() {
		super.hide()
	}

	render () {
		this.el.clear()
		const signIn = window.signInFields
		const signinSection = Block.Create('div', {'data-section-name': 'sign_in'}, ["signin", "body__signin"]);
		const signinHeader = Block.Create('div', {}, ["headerFont"], 'Sign In');
		const vkLoginSection = Block.Create('div', {}, [], "Войти через: ")
		const vkLoginImg = Block.Create('img', {"src": "../vk-social-network-logo.png"})
		const vkLogin = Block.Create('a', {'href': 'https://oauth.vk.com/authorize?client_id=6752650&redirect_uri=http://127.0.0.1:8000/api/vkauth&scope=4194306'}, [])
		const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")

		vkLogin.append(vkLoginImg)
		const form = new Form(signIn);
		vkLoginSection.append(vkLogin)

		signinSection
			.append(signinHeader)
			.append(form)
			.append(vkLoginSection)

		super.render({
			header: [menuLink],
			body: [signinSection],
		})

		form.onSubmit(
			function (formdata) {
				if (formdata.password.value.length < 4) {
					if (document.getElementById('err') !== null) {
						const el = document.getElementById('err');
						el.parentNode.removeChild(el)
					}
					const err = Block.Create('div', {'id': 'err'}, []);
					form.append(err);
					const att = Block.Create('p', {}, [], 'password must be at least 4 characters');
					err.append(att);
					return;
				}
				mediator.emit("user-login", formdata);
		})
	}}

