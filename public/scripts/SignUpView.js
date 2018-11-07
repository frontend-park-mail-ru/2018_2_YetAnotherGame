import BaseView from './BaseView.js';
import Block from "../js/components/block/block.mjs";
import Form from "../js/components/form/form.mjs";
import mediator from "./mediator.js";
import AjaxModule from '../js/modules/ajax.mjs'

export default class SignUpView extends BaseView {
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
		const signUpSection = Block.Create('section', {'data-section-name': 'sign_up'}, []);
		const header = Block.Create('h1', {}, [], 'Sign Up');
		const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")
		const form = new Form(signUp);

		signUpSection
			.append(header)
			.append(menuLink)
			.append(form)

        this.el.append(signUpSection);   

        const check = document.getElementsByName("password")[0]

        const check2 = document.getElementsByName("password_repeat")[0]
        check.addEventListener("keyup", () => {
            if (check.value.length < 4) {
                check.setAttribute("class", "error")
                if (document.getElementById('err') !== null) {
                    const el = document.getElementById('err');
                    el.parentNode.removeChild(el)
                }
    
                const err = Block.Create('div', {'id': 'err'}, []);
                form.append(err);
    
                const att = Block.Create('p', {}, [], 'password must be at least 4 characters');
                err.append(att);
            }
            else {
                check.setAttribute("class", "ok")
                const er = document.getElementById('err');
                er.parentNode.removeChild(er)
            }
    
        });
        check2.addEventListener("keyup", ()=>{
    
            if(check2.value!==check.value){
                if (document.getElementById('err') !== null) {
                    const el = document.getElementById('err');
                    el.parentNode.removeChild(el)
                }
                check2.setAttribute("class", "error")
                const err = Block.Create('div', {'id': 'err'}, []);
                form.append(err);
    
                const att = Block.Create('p', {}, [], 'password must be equal');
                err.append(att);
            }
            else{
                check2.setAttribute("class", "ok")
                const el = document.getElementById('err');
                console.log(el)
                el.parentNode.removeChild(el)
            }
    
        });
        
    
        form.onSubmit(
            function (formdata) {
                const email = formdata.email.value;
                const username = formdata.username.value;
                const first_name = formdata.first_name.value;
                const last_name = formdata.last_name.value;
                const password = formdata.password.value;
                const password_repeat = formdata.password_repeat.value;
    
                if (password.length < 4) {
                    if (document.getElementById('err') !== null) {
                        const el = document.getElementById('err');
                        el.parentNode.removeChild(el)
                    }
    
                    const err = Block.Create('div', {'id': 'err'}, []);
                    form.append(err);
    
                    const att = Block.Create('p', {}, [], 'password must be at least 4 characters');
                    err.append(att);
    
                    return;
                }
    
                if (password !== password_repeat) {
                    alert('Passwords is not equals');
                    return;
                }
    
                AjaxModule.doPost({
                    path: '/session/new',
                    body: {
                        email: email,
                        username: username,
                        first_name: first_name,
                        last_name: last_name,
                        password: password,
                    },
                })
                    .then((response) => {
                        if (response.status >= 300) {
                            throw response;
                        }
                        this.el.clear();
                        
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        );
    
        this.el.append(signUpSection);
    }
}