import PageView from "./PageView.js"
import Block from "../components/block/block.mjs"
import Form from "../components/form/form.mjs"
import AjaxModule from "../modules/ajax.mjs"
import mediator from "../scripts/mediator.js"

export default class UpdateView extends PageView {
	constructor (el) {
		super(el)
	}

    render() {
		this.el.clear()
		const updateSection = Block.Create("section", {"data-section-name": "update"}, ["form", "body__form"])
		const updateHeader = Block.Create("div", {}, ["headerFont"], "Update")
		// const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")
		const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "⬅")
		const update = window.updateFields
		const form = new Form(update)
		form.setAttribute({"id": "myForm", "name": "myForm", "enctype": "multipart/form-data", "method": "POST"})
		const label = Block.Create("label", {"for": "image"}, ["file_field"], "Выберите файл")

		updateSection
			.append(updateHeader)
			.append(form)
			.append(label)

		form.onSubmit(
			function (formdata) {
				mediator.emit("fetch-update", formdata)
			}
		)
		super.render({
			header:[menuLink],
			body:[updateSection],
		})
    }
}
