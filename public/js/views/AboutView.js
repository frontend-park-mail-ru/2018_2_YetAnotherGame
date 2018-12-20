import PageView from "./PageView.js"
import Block from "../components/block/block.mjs"
import mediator from "../scripts/mediator.js"

export default class AboutView extends PageView {
	constructor (el) {
		super(el)

        this.render()
	}

	show() {
		super.show()
	}

	render() {
        this.el.clear()

        const AboutHeader = Block.Create("div", {}, ["headerFont"], "About")
        const AboutBody = Block.Create("div", {}, ["table", "profile__table"])
        const About = Block.Create("div", {}, ["profile", "body__profile"])

        const description = Block.Create("div", {}, [],
         "HERE WILL BE DESCRIPTION"
        )
        AboutBody.append(description)

        const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "⬅")

        About
            .append(AboutHeader)
            .append(AboutBody)

        super.render({
            header: [menuLink],
            body: [About]
        })
    }
}
