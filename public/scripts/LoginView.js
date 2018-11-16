 import BaseView from './BaseView.js';
 import Block from "../js/components/block/block.mjs"
 import Form from "../js/components/form/form.mjs"
 import mediator from "./mediator.js"


export default class LoginView extends BaseView {
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
		const signInSection = Block.Create('section', {'data-section-name': 'sign_in'}, ["form__outline_disable", "form"]);
		const header = Block.Create('h1', {}, [], 'Sign In');
		const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")
		const vkLoginSection = Block.Create('div', {}, [], "Войти через: ")
		const vkLoginImg = Block.Create('img', {"src": "../vk-social-network-logo.png"})
		const vkLogin = Block.Create('a', {'href': 'https://oauth.vk.com/authorize?client_id=6752650&redirect_uri=http://127.0.0.1:8000/api/vkauth&scope=4194306'}, [])
		vkLogin.append(vkLoginImg)
		const form = new Form(signIn);
		vkLoginSection.append(vkLogin)

		signInSection
			.append(header)
			.append(menuLink)
			.append(form)
			.append(vkLoginSection)

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
		this.el.append(signInSection);
	}}

