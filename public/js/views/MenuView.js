import PageView from "./PageView.js"
import Block from "../components/block/block.mjs"
import mediator from "../scripts/mediator.js"

export default class MenuView extends PageView {
	constructor (el) {
        super(el)
        this.hasProfile = false
        mediator.on("profile-loaded", ()=>{
            this.hasProfile = true
        })
        mediator.on("user-logout", () => {
            this.hasProfile = false
        })
    }

    show() {
        super.show()
    }

	render () {
        this.el.clear()
        console.log(this.data)
        const BodyTable = Block.Create("div", {"id":"BodyTable"}, ["table"])
        const TableHeader = Block.Create("div", {}, ["table", "headerFont"], "STARSHIP")
		const TableBody = Block.Create("section", {"data-section-name": "menu", "id": "TableBody"}, ["table","table__body"])
        const TableFooter = Block.Create("div", {"data-section-name": "TableFooter",}, ["table", "table__footer"])
        const titles = {
            new_game: Block.Create("a", {"href": "new_game", "data-href": "new_game"}, ["button"], "New Game"),
			mult_game: Block.Create("a", {"href": "mult", "data-href": "mult"}, ["button"], "Multiplayer"),
            leaders: Block.Create("a", {"href": "leaders", "data-href": "leaders"}, ["button"], "Scoreboard"),
            me: Block.Create("a", {"href": "users/me", "data-href": "users/me"}, ["button"], "Profile"),
            update: Block.Create("a", {"href": "update", "data-href": "update"}, ["button"], "Update"),
        }
        if (this.hasProfile === false) {
            TableBody
                .append(titles.new_game)
                .append(titles.leaders)
        } else {
            Object.entries(titles).forEach(function (elem) {
                TableBody.append(elem[1])
            })
        }
        BodyTable
            .append(TableHeader)
            .append(TableBody)
            .append(TableFooter)

        super.render({
            body: [BodyTable],
        })
    }
}
