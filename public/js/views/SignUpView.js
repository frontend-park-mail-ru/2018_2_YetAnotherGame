import Block from "../components/block/block.mjs"
import Form from "../components/form/form.mjs"
import mediator from "../scripts/mediator.js"
import PageView from "./PageView.js"
import "../form-fields/sign_up.js"

export default class SignUpView extends PageView {
    constructor(el) {
        super(el)
    }

    show() {
        super.show()
    }

    hide() {
        super.hide()
    }

    render() {
        this.el.clear()
        const signUp = window.signUpFields
		const signupSection = Block.Create("section", {"data-section-name": "sign_up"}, ["form", "body__form"])
		const signupHeader = Block.Create("div", {}, ["headerFont"], "Sign Up")
        // const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")
        const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "⬅")
		const form = new Form(signUp)
        signupSection
            .append(signupHeader)
            .append(form)

        super.render({
            header:[menuLink],
            body:[signupSection],
        })

        let isValidPsw = false
        const checkPsw = document.getElementsByName("password")[0]
        checkPsw.addEventListener("keyup", () => {
            if (checkPsw.value.length < 4) {
                checkPsw.setAttribute("class", "error")
                if (document.getElementById("err") !== null) {
                    const el = document.getElementById("err")
                    el.parentNode.removeChild(el)
                }
                const err = Block.Create("div", {"id": "err"}, [])
                form.append(err)
                const att = Block.Create("p", {}, ["err-msg"], "password must be at least 4 characters")
                err.append(att)
                isValidPsw = false
            } else {
                checkPsw.setAttribute("class", "ok")
                if (document.getElementById("err") !== null) {
                    const el = document.getElementById("err")
                    el.parentNode.removeChild(el)
                }
                isValidPsw = true
            }
        })

        let isValidPswRep = false
        const checkPswRepeap = document.getElementsByName("password_repeat")[0]
        // TODO: ПОМЕНЯТЬ СОБЫТИЕ "mousemove"
        checkPswRepeap.addEventListener("mousemove", () => {
            if(checkPswRepeap.value !== checkPsw.value){
                if (document.getElementById("err2") !== null) {
                    const el = document.getElementById("err2")
                    el.parentNode.removeChild(el)
                }
                checkPswRepeap.setAttribute("class", "error")
                const err = Block.Create("div", {"id": "err2"}, [])
                form.append(err)
                const att = Block.Create("p", {}, ["err-msg"], "password must be equal")
                err.append(att)
                isValidPswRep = false
            } else {
                checkPswRepeap.setAttribute("class", "ok")
                if (document.getElementById("err2") !== null) {
                    const el = document.getElementById("err2")
                    el.parentNode.removeChild(el)
                }
                isValidPswRep = true
            }
        })

		form.onSubmit(
			function (formdata) {
                if (isValidPsw && isValidPswRep) {
                    mediator.emit("user-register", formdata)
                }
            })
    }
}
