import PageView from "./PageView.js"
import mediator from "../scripts/mediator.js"
import Block from "../components/block/block.mjs"
import AjaxModule from "../modules/ajax.mjs"

// import boardTmpl from "../components/scoreboard/scoreboard.tmpl.xml"
import "../components/scoreboard/scoreboard.tmpl.js"
const templateFunc = window.fest["js/components/scoreboard/scoreboard.tmpl"]

export default class ScoreBoardView extends PageView {
    constructor(el) {
		super(el)
		this.pageNumber = 0

        this.users = null
        this.canNext = false

		mediator.on("users-loaded", this.setUsers.bind(this))
    }

    show() {
        super.show()

        this.fetchUsers()
    }

    fetchUsers() {
        mediator.emit("fetch-users")
    }

    setUsers (users) {
        this.users = users.Scoreboard.Users
        this.canNext = users.CanNext
		this.render()
	}

    render() {
        this.el.clear()

		if (!this.users) {
			this.renderLoading()
		} else {
			this.renderScoreboard()
		}
    }

    renderLoading () {
		const loading = Block.Create("strong", {}, [])
		loading.setText("Loading")
		this.el.append(loading)
	}

    renderScoreboard() {
        const BodyTable = Block.Create("div", {"id":"BodyTable"}, ["table"])
        const TableHeader = Block.Create("div", {}, ["table", "headerFont"], "Leaders")
		const TableBody = Block.Create("section", {"data-section-name": "menu", "id": "TableBody"}, ["table","table__body"])
        const TableFooter = Block.Create("div", {"data-section-name": "TableFooter",}, ["table", "table__footer"])
        const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "⬅")
        let num = this.pageNumber + 1
        let numDiv = Block.Create("div", {}, ["numPage", "pagination__numPage"], num)
        let lb = Block.Create("button", {"id": "lBtn", "type": "button", "value":"<-"}, ["button__pagination", "button__pagination_left", "text_center"], "⇦")
        let rb = Block.Create("button", {"id": "rBtn", "type": "button", "value":"->"}, ["button__pagination","button__pagination_right", "text_center"], "⇨")
        let br = Block.Create("br")

        TableBody.setInner(templateFunc(this.users))
        // const fest = require('fest');
        // const data = this.users
        // TableBody.setInner(fest.render(boardTmpl, data))

        TableFooter
            .append(lb)
            .append(numDiv)
            .append(rb)
            .append(br)

        BodyTable
            .append(TableHeader)
            .append(TableBody)
            .append(TableFooter)

        super.render({
			header: [menuLink],
			body: [BodyTable],
		})

        const rBtnActive = document.getElementById("rBtn")
		rBtnActive.addEventListener("click", this.nextPage.bind(this))
        const lBtnActive = document.getElementById("lBtn")
        lBtnActive.addEventListener("click", this.prevPage.bind(this))

        if (!this.canNext) {
            rBtnActive.disabled = true
            rb.addClasses(["button_disable"])
		}
        if (this.pageNumber <= 0) {
			lBtnActive.disabled = true
            lb.addClasses(["button_disable"])
		}
        if (this.canNext && this.pageNumber > 0) {
        	lBtnActive.disabled = false
        	rBtnActive.disabled = false
        }
    }

    nextPage() {
        this.pageNumber++
        AjaxModule.doGet({
            path: `/leaders?page=${this.pageNumber}`
        })
        .then((res) => res.json())
        .then((res) => {
            this.setUsers(res)
        })
    }

    prevPage() {
        this.pageNumber--
        AjaxModule.doGet({
            path: `/leaders?page=${this.pageNumber}`
        })
        .then((res) => res.json())
        .then(res => {
            this.setUsers(res)
        })
    }

}
