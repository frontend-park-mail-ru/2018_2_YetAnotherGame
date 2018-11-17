import BaseView from './BaseView.js';
import Block from "../js/components/block/block.mjs"
import Form from "../js/components/form/form.mjs"
import mediator from "./mediator.js";

export default class MenuView extends BaseView {
	constructor (el) {
		super(el);
        this.data=null
        mediator.on("profile-loaded", this.setData.bind(this))
    }

    show() {
        this.fetchProfile()
        this.el.show()
		if (typeof this.data === undefined || this.data == null) {
			this.render()
		}
    }

    fetchProfile() {
        mediator.emit("fetch-profile")
    }

    setData(data) {
        this.data = data
        this.render()
    }

	render () {
        this.el.clear();
        console.log(this.data)
		const MenuPage = Block.Create("section", {"data-section-name": "menuPage", "id": "mainMenu"}, ["MenuPage"])
        const MenuHeader = Block.Create("div", {"id": "MenuHeader"}, ["MenuPage__header"])
        const MenuBody = Block.Create("div", {"id": "MenuBody"}, ["MenuPage__body"])
        const MenuFooter = Block.Create("div", {"id": "MenuFooter"}, ["MenuPage__footer"])
        const BodyTable = Block.Create("div", {"id":"BodyTable"}, ["table"])
        const TableHeader = Block.Create("div", {}, ["table", "table__header"], "STARSHIP")
		const TableBody = Block.Create("section", {"data-section-name": "menu", "id": "TableBody"}, ["table","table__body"])
        const TableFooter = Block.Create("div", {"data-section-name": "TableFooter",}, ["table", "table__footer"])
        const register = {
            sign_in: Block.Create("a", {"href": "sign_in", "data-href": "sign_in"}, ["button_small"], "Sign in"),
            sign_up: Block.Create("a", {"href": "sign_up", "data-href": "sign_up"}, ["button_small"], "Sign up"),
            log_out: Block.Create("a", {"href": "log_out", "data-href": "log_out"}, ["button_small"], "Log out"),
            profile: Block.Create("a", {"href": "users/me", "data-href": "users/me"}, ["button_small"],),
        }
        const titles = {
            new_game: Block.Create("a", {"href": "new_game", "data-href": "new_game"}, ["button"], "New Game"),
            leaders: Block.Create("a", {"href": "leaders", "data-href": "leaders"}, ["button"], "Scoreboard"),
            me: Block.Create("a", {"href": "users/me", "data-href": "users/me"}, ["button"], "Profile"),
            update: Block.Create("a", {"href": "update", "data-href": "update"}, ["button"], "Update"),
        }
        if (typeof this.data === undefined || this.data == null) {
            titles.new_game.addClasses(["button_disable"])
            TableBody
                .append(titles.new_game)
                .append(titles.leaders)
            TableFooter
                .append(register.sign_in)
                .append(register.sign_up)
        } else {
            register.profile.setText(`${this.data.username}`)
            MenuHeader
                .append(register.log_out)
                .append(register.profile)
            titles.new_game.deleteClass("button_disable")
            Object.entries(titles).forEach(function (elem) {
                TableBody.append(elem[1])
            })
        }
        BodyTable
            .append(TableHeader)
            .append(TableBody)
            .append(TableFooter)
        MenuBody
            .append(BodyTable)

        // const wsFields = window.Ws
        // const wsSection = Block.Create('section', {'data-section-name': 'wsSection'}, []);
        // const form = new Form(wsFields);
        // wsSection
        //     .append(form)
        // form.onSubmit(
        //     function(formdata) {
        //         const address = ['https', 'https:'].includes(location.protocol) ?
        //             `wss://127.0.0.1:9090/ws` :
        //             `ws://127.0.0.1:9090/ws`;
        //         let ws = new WebSocket(address);
        //         console.log(`WebSocket on address ${address} opened`);
        //         ws.onopen = function() {
        //             ws.send(JSON.stringify({
        //                 "type": "newPlayer",
        //                 "payload": {
        //                     "username": `${formdata.name.value}`
        //                 }
        //             }));
        //         }
        //     }
        // )
        MenuPage
            .append(MenuHeader)
            .append(MenuBody)
            .append(MenuFooter)
            // .append(mult)
        this.el.append(MenuPage)//.append(wsSection);
    }
}
