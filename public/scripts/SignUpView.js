import BaseView from './BaseView.js';
import Block from "../js/components/block/block.mjs";
import Form from "../js/components/form/form.mjs";
import mediator from "./mediator.js";

export default class SignUpView extends BaseView {
    constructor(el) {
        super(el)
    }

    show() {
        super.show()
    }

    hide() {
        super.hide()
    }

    render() {
        this.el.clear()
        const signUp = window.signUpFields
		const signUpSection = Block.Create('section', {'data-section-name': 'sign_up'}, []);
		const header = Block.Create('h1', {}, [], 'Sign Up');
		const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")
		const form = new Form(signUp);

		signUpSection
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
				mediator.emit("user-register", formdata);
     
            })
            this.el.append(signUpSection)
    }
}