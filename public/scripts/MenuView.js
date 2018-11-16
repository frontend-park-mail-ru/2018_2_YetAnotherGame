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
		const menuSection = Block.Create("section", {"data-section-name": "menuPage", "id": "mainMenu"}, ["MenuPage"])
        const header = Block.Create("div", {"id": "header"}, ["header"])
        const title = Block.Create("div", {"id": "title"}, ["menu__title"])
        const titleHeader = Block.Create("h1", {}, [], "STARSHIP")
        title.append(titleHeader)
		const menu = Block.Create("section", {"data-section-name": "menu", "id": "mainMenu"}, ["menu"])
        const qwe = Block.Create("div", {"data-section-name": "qwe",}, ["qwe"])
        
        const menuInner = Block.Create("div", {}, [])
        menu.append(title)
        menu.append(menuInner)
        const register = {
            sign_in: Block.Create("a", {"href": "sign_in", "data-href": "sign_in"}, ["menu__smallButton"], "Sign in"),
            sign_up: Block.Create("a", {"href": "sign_up", "data-href": "sign_up"}, ["menu__smallButton"], "Sign up"),
            log_out: Block.Create("a", {"href": "log_out", "data-href": "log_out"}, ["header__button"], "Log out"),
            profile: Block.Create("a", {"href": "users/me", "data-href": "users/me"}, ["header__button"],),
        }
        const titles = {
            new_game: Block.Create("a", {"href": "new_game", "data-href": "new_game"}, ["menu__button"], "New Game"),
            leaders: Block.Create("a", {"href": "leaders", "data-href": "leaders"}, ["menu__button"], "Scoreboard"),
            me: Block.Create("a", {"href": "users/me", "data-href": "users/me"}, ["menu__button"], "Profile"),
            update: Block.Create("a", {"href": "update", "data-href": "update"}, ["menu__button"], "Update"),
        }
        qwe
            .append(register.sign_in)
            .append(register.sign_up)
        // const mult = Block.Create('h1', {}, [], 'Test multiplayer');
        if (typeof this.data === undefined || this.data == null) {
            menuInner
            .append(titles.new_game)
            .append(titles.leaders)
            .append(qwe)
        } else {
            register.profile.setText(`${this.data.username}`)
            header
                .append(register.log_out)
                .append(register.profile)
            titles.new_game.deleteClass("button_disable")
            Object.entries(titles).forEach(function (elem) {
                menuInner.append(elem[1])
            })
        }
        const wsFields = window.Ws
        const wsSection = Block.Create('section', {'data-section-name': 'wsSection'}, []);
        const form = new Form(wsFields);
        wsSection
            .append(form)
        form.onSubmit(
            function(formdata) {
                const address = ['https', 'https:'].includes(location.protocol) ?
                    `wss://127.0.0.1:9090/ws` :
                    `ws://127.0.0.1:9090/ws`;
                let ws = new WebSocket(address);
                console.log(`WebSocket on address ${address} opened`);
                ws.onopen = function() {
                    ws.send(JSON.stringify({
                        "type": "newPlayer",
                        "payload": {
                            "username": `${formdata.name.value}`
                        }
                    }));
                }
            }
        )
        menuSection
            .append(header)
            .append(menu)
            // .append(mult)
        this.el.append(menuSection).append(wsSection);
    }
}
