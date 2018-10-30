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
        this.users = users.Users;
        this.canNext = users.canNext;
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
        this.el.setInner(templateFunc(this.users))
        let lb = Block.Create("input", {"id": "lBtn", "type": "button", "value": "<-", }, [], "kek")
        let rb = Block.Create("input", {"id": "rBtn", "type": "button", "value": "->", }, [], "kek")
        this.el
        .append(lb)
		.append(rb)
		const rBtnActive = document.getElementById('rBtn')
		rBtnActive.addEventListener('click', this.nextPage)
        const lBtnActive = document.getElementById('lBtn')
        lBtnActive.addEventListener('click', this.prevPage)
        if (!this.canNext) {
            rBtnActive.disable = true
		} else if (this.pageNumber === 0) {
			lBtnActive.disable = true
		} else {
			lBtnActive.disable = false
			rBtnActive.disable = false
        }
    }

    nextPage() {
        this.pageNumber++
        AjaxModule.doGet({
            path: `/leaders?page=${pageNumber}`
        }).then((res) => res.text())
        .then(res => {
            JSON.parse(res)
        }).then(this.setUsers.bind(this))
    }

    prevPage() {
        mediator.emit('fetch-prev-page')
    }

}