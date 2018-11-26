import Block from "../components/block/block.mjs"
import Form from "../components/form/form.mjs"
import mediator from "../scripts/mediator.js"
import PageView from "./PageView.js"

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
        const check = document.getElementsByName("password")[0]
        const check2 = document.getElementsByName("password_repeat")[0]
        check.addEventListener("keyup", () => {
            if (check.value.length < 4) {
                check.setAttribute("class", "error")
                if (document.getElementById("err") !== null) {
                    const el = document.getElementById("err")
                    el.parentNode.removeChild(el)
                }
                const err = Block.Create("div", {"id": "err"}, [])
                form.append(err)
                const att = Block.Create("p", {}, ["err-msg"], "password must be at least 4 characters")
                err.append(att)
            }
            else {
                check.setAttribute("class", "ok")
                const el = document.getElementById("err")
                el.parentNode.removeChild(el)
            }
        })
        check2.addEventListener("keyup", ()=>{
            if(check2.value!==check.value){
                if (document.getElementById("err") !== null) {
                    const el = document.getElementById("err")
                    el.parentNode.removeChild(el)
                }
                check2.setAttribute("class", "error")
                const err = Block.Create("div", {"id": "err"}, [])
                form.append(err)
                const att = Block.Create("p", {}, ["err-msg"], "password must be equal")
                err.append(att)
            }
            else{
                check2.setAttribute("class", "ok")
                const el = document.getElementById("err")
                console.log(el)
                el.parentNode.removeChild(el)
            }
        })
		form.onSubmit(
			function (formdata) {
				mediator.emit("user-register", formdata)
            })
    }
}
