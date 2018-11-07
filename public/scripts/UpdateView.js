import Block from "../js/components/block/block.mjs"
import Form from "../js/components/form/form.mjs"
import BaseView from "./BaseView.js"
import AjaxModule from '../js/modules/ajax.mjs'

export default class UpdateView extends BaseView {
	constructor (el) {
		super(el);
	}

    render() {
		this.el.clear()

		const updateSection = Block.Create('section', {'data-section-name': 'update'}, []);
		const header = Block.Create('h1', {}, [], 'Update');
		const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")
		const update = window.updateFields

		const form = new Form(update);

		form.setAttribute({'id': 'myForm', 'name': 'myForm', 'enctype': 'multipart/form-data', 'method': 'POST'});

		updateSection
			.append(header)
			.append(menuLink)
			.append(form);

		form.onSubmit(
			function (formdata) {
				// const formData = new FormData(document.forms.myForm);
				mediator.emit("fetch-update", formdata)
				// AJAX.doPost({
				// 	path: '/upload',
				// 	body: formData,
				// })
				// 	.then((response) => {
				// 		if (response.status >= 300) {
				// 			throw response;
				// 		}
				// 		console.log("success");
				// 	})
				// 	.then(() => {
				// 		AJAX.doPost({
				// 			path: '/user/me',
				// 			body: {
				// 				email: formdata.email.value,
				// 				username: formdata.username.value,
				// 				first_name: formdata.first_name.value,
				// 				last_name: formdata.last_name.value,
				// 			},
				// 		})
				// 			.then((response) => {
				// 				if (response.status >= 300) {
				// 					throw response;
				// 				}
				// 				this.el.clear();
				// 				createProfile();
				// 			})
				// 			.catch((error) => {
				// 				console.error(error);
				// 			});
				// 	})
				// 	.catch((err) => {
				// 		console.log("error " + err.status);
				// 	})
			}
		);

		this.el.append(updateSection);
    }
}
