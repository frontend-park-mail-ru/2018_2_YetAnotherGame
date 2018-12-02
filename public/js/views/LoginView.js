 import PageView from "./PageView.js"
 import Block from "../components/block/block.mjs"
 import Form from "../components/form/form.mjs"
 import mediator from "../scripts/mediator.js"
 import "../form-fields/sign_in.js"

export default class LoginView extends PageView {
	constructor (el) {
		super(el)
	}

	show() {
		super.show()
	}

	hide() {
		super.hide()
	}

	render () {
		this.el.clear()
		const signIn = window.signInFields
		const signinSection = Block.Create("div", {"data-section-name": "sign_in"}, ["form", "body__form"])
		const signinHeader = Block.Create("div", {}, ["headerFont"], "Sign In")
		const vkLoginSection = Block.Create("div", {}, ["vk", "form__vk"], "Войти через: ")
		const vkLoginImg = Block.Create("img", {"src": "../../img/vk.png"}, ["vk-logo"])
		const vkLogin = Block.Create("a", {"href": "https://oauth.vk.com/authorize?client_id=6752650&redirect_uri=http://127.0.0.1:8000/api/vkauth&scope=4194306"}, [])
		// const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")
        const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "⬅")

		vkLogin.setInner("<br>")
		vkLogin.append(vkLoginImg)
		const form = new Form(signIn)
        form.setAttribute({"id": "form"})
		vkLoginSection.append(vkLogin)

		signinSection
			.append(signinHeader)
			.append(form)
			.append(vkLoginSection)

		super.render({
			header: [menuLink],
			body: [signinSection],
		})

        let isValid = false
        const check = document.getElementsByName("password")[0]
        check.addEventListener("keyup", () => {
            const el = document.getElementById("err")
            if (check.value.length < 4) {
                check.setAttribute("class", "error")
                if (el !== null) {
                    el.parentNode.removeChild(el)
                }
                const err = Block.Create("div", {"id": "err"}, [])
                form.append(err)
                const att = Block.Create("p", {}, ["err-msg"], "password must be at least 4 characters")
                err.append(att)
                isValid = false
            } else {
                check.setAttribute("class", "ok")
                const el = document.getElementById("err")
                el.parentNode.removeChild(el)
                isValid = true
            }
        })

        form.onSubmit(
			function (formdata) {
                if (isValid) {
                    mediator.emit("user-login", formdata)
                }
		})
	}}
