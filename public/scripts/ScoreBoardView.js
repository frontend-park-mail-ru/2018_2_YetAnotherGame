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
        const header = Block.Create('h1', {}, [], 'Leaders')
        const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")
        const scoreBoardSection = Block.Create('div', {}, ["form__outline_disable"])
        scoreBoardSection.setInner(templateFunc(this.users))
        
        let lb = Block.Create("input", {"id": "lBtn", "type": "button", "value": "<-", }, [], "kek")
        let rb = Block.Create("input", {"id": "rBtn", "type": "button", "value": "->", }, [], "kek")
        let br = Block.Create("br")
        this.el
            .append(header)
            .append(scoreBoardSection)
            .append(lb)
            .append(rb)
            .append(br)
            .append(menuLink)

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