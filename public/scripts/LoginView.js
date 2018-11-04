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
		const signInSection = Block.Create('section', {'data-section-name': 'sign_in'}, []);
		const header = Block.Create('h1', {}, [], 'Sign In');
		const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")
		const form = new Form(signIn);

		signInSection
			.append(header)
			.append(menuLink)
			.append(form)

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
				// 	AJAX.doPost({
				// 		path: '/session',
				// 		body: {
				// 			email: formdata.email.value,
				// 			password: formdata.password.value,
				// 		},
				// 	})
				// 		.then(response => {
				// 			if (response.status >= 300) {
				// 				throw response;
				// 			}
				// 			game.clear();
				// 			createProfile();
				// 		})
				// 		.catch(error => {
				// 			console.error(error);
				// 		});
				// }
			})
		this.el.append(signInSection);
	}}

