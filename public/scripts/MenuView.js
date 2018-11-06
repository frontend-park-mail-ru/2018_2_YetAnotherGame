import BaseView from './BaseView.js';
import Block from "../js/components/block/block.mjs"
import Form from "../js/components/form/form.mjs"

export default class MenuView extends BaseView {
	constructor (el) {
		super(el);
	}

	render () {
        this.el.clear();
		const menuSection = Block.Create("section", {"data-section-name": "menu", "id": "mainMenu"}, [])
        const header = Block.Create("div", {"id": "header"}, ["background_white"])
        const logo = Block.Create("div", {"id": "logo"}, [])
        const logoHeader = Block.Create("h1", {}, [], "Yet Another Game")

        logo.append(logoHeader)

        const main = Block.Create("div", {"id": "main"}, [])
        const mainInner = Block.Create("div", {}, [])

        main.append(mainInner)

        const register = {
            sign_in: Block.Create("a", {"href": "sign_in", "data-href": "sign_in"}, ["header-button"], "Sign in"),
            sign_up: Block.Create("a", {"href": "sign_up", "data-href": "sign_up"}, ["header-button"], "Sign up"),
            log_out: Block.Create("a", {"href": "log_out", "data-href": "log_out"}, ["header-button"], "Log out"),
            profile: Block.Create("a", {"href": "me", "data-href": "me"}, ["header-button"],),
        }

        const titles = {
            new_game: Block.Create("a", {"href": "new_game", "data-href": "new_game"}, ["menu-button", "disabled"], "New Game"),
            leaders: Block.Create("a", {"href": "leaders", "data-href": "leaders"}, ["menu-button"], "Scoreboard"),
            me: Block.Create("a", {"href": "me", "data-href": "me"}, ["menu-button"], "Profile"),
            update: Block.Create("a", {"href": "update", "data-href": "update"}, ["menu-button"], "Update"),
        }
        const mult = Block.Create('h1', {}, [], 'Test multiplayer');
        if (typeof user === "undefined") {
            header
				.append(register.profile)
                .append(register.sign_up)
                .append(register.sign_in)

            mainInner
                .append(titles.new_game)
                .append(titles.leaders)

        } else {
            register.profile.setText(`${user.username}`)
            header
                .append(register.log_out)
                .append(register.profile)

            Object.entries(titles).forEach(function (elem) {
                mainInner.append(elem[1])
            })
        }


//const Block = window.Block;
// вот здесь надо сделать поле ввода и кнопку отправить, при нажатии на которую выполняется код ниже
// а в поле ввода вводится юзернейм

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
            .append(logo)
            .append(main)
            .append(mult)

        this.el.append(menuSection).append(wsSection);
    }
}
