import BaseView from "./BaseView.js";
import mediator from "./mediator.js";
import Block from "../js/components/block/block.mjs";
import AjaxModule from "../js/modules/ajax.mjs"

const templateFunc = window.fest[ 'js/components/scoreboard/scoreboard.tmpl' ];

export default class ScoreBoardView extends BaseView {
    constructor(el) {
		super(el);
		this.pageNumber = 0;

        this.users = null;
        this.canNext = false;

		mediator.on('users-loaded', this.setUsers.bind(this));
    }

    show() {
        super.show();

        this.fetchUsers();
    }

    fetchUsers() {
        mediator.emit("fetch-users");
    }

    setUsers (users) {
        this.users = users.Scoreboard.Users;
        this.canNext = users.CanNext;
		this.render();
	}

    render() {
        this.el.clear();

		if (!this.users) {
			this.renderLoading();
		} else {
			this.renderScoreboard();
		}
    }

    renderLoading () {
		const loading = Block.Create('strong', {}, []);
		loading.setText('Loading');
		this.el.append(loading);
	}

    renderScoreboard() {
        const MenuPage = Block.Create("section", {"data-section-name": "menuPage", "id": "mainMenu"}, ["MenuPage"])
        const MenuHeader = Block.Create("div", {"id": "MenuHeader"}, ["MenuPage__header"])
        const MenuBody = Block.Create("div", {"id": "MenuBody"}, ["MenuPage__body"])
        const MenuFooter = Block.Create("div", {"id": "MenuFooter"}, ["MenuPage__footer"])
        const BodyTable = Block.Create("div", {"id":"BodyTable"}, ["table"])
        const TableHeader = Block.Create("div", {}, ["table", "table__header", "leaders"], "Leaders")
		const TableBody = Block.Create("section", {"data-section-name": "menu", "id": "TableBody"}, ["table","table__body"])
        const TableFooter = Block.Create("div", {"data-section-name": "TableFooter",}, ["table", "table__footer"])
        const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")
        let num = this.pageNumber + 1
        let numDiv = Block.Create("span", {}, ["button__pagination"], num)
        let lb = Block.Create("button", {"id": "lBtn", "type": "button", "value":"<-"}, ["button__pagination", "text_center"], "<-")
        let rb = Block.Create("button", {"id": "rBtn", "type": "button", "value":"->"}, ["button__pagination", "text_center"], "->")
        let br = Block.Create("br")
        MenuHeader.append(menuLink)
        TableBody.setInner(templateFunc(this.users))
        TableFooter
            .append(lb)
            .append(numDiv)
            .append(rb)
            .append(br)
    
        BodyTable
            .append(TableHeader)
            .append(TableBody)
            .append(TableFooter)
        
        MenuBody.append(BodyTable)

        MenuPage
            .append(MenuHeader)
            .append(MenuBody)
            .append(MenuFooter)
    
        this.el.append(MenuPage)

        const rBtnActive = document.getElementById('rBtn')
		rBtnActive.addEventListener('click', this.nextPage.bind(this))
        const lBtnActive = document.getElementById('lBtn')
        lBtnActive.addEventListener('click', this.prevPage.bind(this))

        if (!this.canNext) {
            rBtnActive.disabled = true
		} else if (this.pageNumber <= 0) {
			lBtnActive.disabled = true
		} else {
			lBtnActive.disabled = false
			rBtnActive.disabled = false
        }
    }

    nextPage() {
        this.pageNumber++
        AjaxModule.doGet({
            path: `/leaders?page=${this.pageNumber}`
        }).then((res) => res.text())
        .then(res => {
            res = JSON.parse(res)
            this.setUsers(res)
        })
    }

    prevPage() {
        this.pageNumber--
        AjaxModule.doGet({
            path: `/leaders?page=${this.pageNumber}`
        }).then((res) => res.text())
        .then(res => {
            res = JSON.parse(res)
            this.setUsers(res)
        })    
    }

}