import Block from "../js/components/block/block.mjs"
import Form from "../js/components/form/form.mjs"
import BaseView from "./BaseView.js"
import AjaxModule from '../js/modules/ajax.mjs'
import mediator from './mediator.js'

export default class UpdateView extends BaseView {
	constructor (el) {
		super(el);
	}
    render() {
		this.el.clear()
		const updateSection = Block.Create('section', {'data-section-name': 'update'}, ["form__outline_disable"]);
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
				mediator.emit("fetch-update", formdata)
			}
		);
		this.el.append(updateSection);
    }
}
