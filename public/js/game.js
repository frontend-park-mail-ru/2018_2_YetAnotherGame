"use strict"

import { AjaxModule } from "./modules/ajax.mjs"
import { Scoreboard } from "./components/scoreboard/scoreboard.mjs"
import { Profile } from "./components/profile/profile.mjs"
import { Block } from "./components/block/block.mjs"
import { Form } from "./components/form/form.mjs"

const AJAX = new AjaxModule

const signIn = window.signInFields
const signUp = window.signUpFields
const update = window.updateFields

// const server = "https://backend-yag.now.sh"
const server = "http://127.0.0.1:8000"
let scoreboardPage = 0

let user =
AJAX.doGet({
	callback(xhr) {
		xhr.responseText !== "" ? JSON.parse(xhr.responseText) : undefined
	},
	path: server+"/user/me",
})

const game = new Block(document.getElementById("game"))

/**
 * Создание ссылки "Back to main menu" для возврата в главное меню
 */
function createMenuLink() {
	const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")
	return menuLink
}

/**
 * Создание шапки с регистрацией, логином и выходом
 */
function createMenu() {
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
		profile: Block.Create("a", {"href": "me", "data-href": "me"}, ["header-button"]),
	}

	const titles = {
		new_game: Block.Create("a", {"href": "new_game", "data-href": "new_game"}, ["menu-button"], "New Game"),
		leaders: Block.Create("a", {"href": "leaders", "data-href": "leaders"}, ["menu-button"], "Scoreboard"),
		me: Block.Create("a", {"href": "me", "data-href": "me"}, ["menu-button"], "Profile"),
		update: Block.Create("a", {"href": "update", "data-href": "update"}, ["menu-button"], "Update"),
	}

	if (user === undefined) {
		header
			.append(register.sign_up)
			.append(register.sign_in)
	} else {
		register.profile.setText(`${user.username}`)
		header
			.append(register.log_out)
			.append(register.profile)
	}

	Object.entries(titles).forEach(function (elem) {
		mainInner.append(elem[1])
	})

	menuSection
		.append(header)
		.append(logo)
		.append(main)

	game.append(menuSection)
}

/**
 * Создание страницы входа в учетную запись пользователя
 */
function createSignIn() {

    const signInSection = Block.Create('section', {'data-section-name': 'sign_in'}, []);
    const header = Block.Create('h1', {}, [], 'Sign In');

    const form = new Form(signIn);

    signInSection
        .append(header)
        .append(createMenuLink())
        .append(form)

    form.onSubmit(
        function (formdata) {
            if (formdata.password.value.length < 4) {
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

            AJAX.doPost({
                callback() {
                    game.clear();
                    createProfile();
                },
                path: server+'/session',
                body: {
                    email: formdata.email.value,
                    password: formdata.password.value,
                },
            });
        }
    );

    game.append(signInSection);
}

/**
 * Создание формы регистрации нового пользователя
 */
function createSignUp() {

    const signUpSection = Block.Create('section', {'data-section-name': 'sign_up'}, []);
    const header = Block.Create('h1', {}, [], 'Sign Up');

    const form = new Form(signUp);

    signUpSection
        .append(header)
        .append(createMenuLink())
        .append(form);

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

            AJAX.doPost({
                callback(xhr) {
                    game.clear();
                    createProfile();
                },
                path: server+'/session/new',
                body: {
                    email: email,
                    username: username,
                    first_name: first_name,
                    last_name: last_name,
                    password: password,
                },
            });
        }
    );

    game.append(signUpSection);

}

/**
 * Выход из учетной записи
 */
function createLogOut() {
    AJAX.doDelete({
        callback() {
            game.clear();
            user = undefined;
            createMenu();
        },
        path: server+'/session',
        body: {},
    });
}

/**
 * Обновление данных учетной записи
 */
function createUpdate() {
    if (user === undefined) {
        AJAX.doGet({
            callback(xhr) {
                if (!xhr.responseText) {
                    alert('Unauthorized');
                    game.clear();
                    createMenu();
                    return;
                }
                user = JSON.parse(xhr.responseText);
                game.clear();
            },
            path: server+'/user/me',
        });
        return;
    }

    const updateSection = Block.Create('section', {'data-section-name': 'update'}, []);
    const header = Block.Create('h1', {}, [], 'Update');

    const form = new Form(update);

    form.setAttribute({'id': 'myForm', 'name': 'myForm', 'enctype': 'multipart/form-data', 'method': 'POST'});

    updateSection
        .append(header)
        .append(createMenuLink())
        .append(form);

    form.onSubmit(
        function (formdata) {
            const formData = new FormData(document.forms.myForm);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/upload', true);
            xhr.onload = xhr.onerror = function() {
                if (this.status == 200) {
                    console.log("success");
                } else {
                    console.log("error " + this.status);
                }
            }
            xhr.send(formData);

            AJAX.doPost({
    			callback(xhr) {
                    game.clear();
                    createProfile();
    			},
    			path: server+'/user/me',
                body: {
                    email: formdata.email.value,
                    username: formdata.username.value,
                    first_name: formdata.first_name.value,
                    last_name: formdata.last_name.value,
                }
    		});
        }
    );

    game.append(updateSection);

}

/**
 * Создание страницы профиля
 * @param {*} me Объект пользователя
 */
function createProfile(me) {
    const profileSection = Block.Create('section', {'data-section-name': 'profile'}, []);
    const header = Block.Create('h1', {}, [], 'Profile');
	const profile_block = Block.Create('p', {}, []);

    profileSection
        .append(header)
        .append(createMenuLink())
        .append(profile_block)

    if (me) {
		const profile = new Profile({el: profile_block})
		profile.data = me
		profile.render()
    } else {
        AJAX.doGet({
            callback(xhr) {
                if (!xhr.responseText) {
					alert("Unauthorized")
					game.clear()
					createMenu();
					return;
                }
                /*const*/ user = JSON.parse(xhr.responseText);
                game.clear();
                createProfile(user);
            },
            path: server+'/user/me',
        });
    }
    game.append(profileSection);
}

/**
 * Создание доски лидеров
 * @param {array} users Массив пользователей для страницы
 * @param {Number} scoreboardPage Номер страницы
 * @param {nubmer} CountOfStrings количество строк в таблице
 */
function createScoreboard(users, scoreboardPage = 0) {
	const scoreboardSection = Block.Create("section", {"data-section-name": "scoreboard"}, [])
	const header = Block.Create("h1", {}, [], "Leaders")
	const tableWrapper = Block.Create("div", {}, [])
	let canNext = false
    
	scoreboardSection
		.append(header)
		.append(createMenuLink())
		.append(Block.Create("br", {}, []))
        .append(tableWrapper)

	if (!users) {
		scoreboardSection.append(Block.Create("em", {}, [], "Loading"))

		AJAX.doGet({
			callback(xhr) {
				const response = JSON.parse(xhr.responseText)
                canNext = response[response.length-1]
                const users = response.slice(0,response.length-1)

                game.clear()
                createScoreboard(users, scoreboardPage)
			},
			path: server+`/user?numPage=${scoreboardPage}`,
		})
	} else {
		const scoreboard = new Scoreboard({el: tableWrapper})
        scoreboard.data = users
        scoreboard.render()

        let lb = Block.Create("input", {"id": "lBtn", "type": "button", "value": "<-", }, [], "kek")
        let rb = Block.Create("input", {"id": "rBtn", "type": "button", "value": "->", }, [], "kek")

		scoreboardSection
            .append(lb)
            .append(rb)

        game.append(scoreboardSection)
        document.getElementById('rBtn').addEventListener('click', nextPage)
		document.getElementById('lBtn').addEventListener('click', prevPage)
		const lBtn = document.getElementById("lBtn")
		const rBtn = document.getElementById("rBtn")
		document.getElementById('back_button').addEventListener('click', scoreboardStartPage)
		if (scoreboardPage === 0 && lBtn !== null) {
			lBtn.disabled = true
		} else if (users) {
			if (!canNext) {
				rBtn.disabled = true
			}
		} else {
			if (lBtn !== null || rBtn !== null) {
				lBtn.disabled = false
				rBtn.disabled = false
			}
		}
    }
}

function nextPage() {
    scoreboardPage++
    createScoreboard(undefined ,scoreboardPage)
}

function prevPage() {
    scoreboardPage--
    createScoreboard(undefined ,scoreboardPage)
}

function scoreboardStartPage() {
	scoreboardPage = 0
}

const pages = {
	menu: createMenu,
	sign_in: createSignIn,
	sign_up: createSignUp,
	log_out: createLogOut,
	leaders: createScoreboard,
	me: createProfile,
	update: createUpdate
}

createMenu()

game.on("click", function (event) {
	if (!(event.target instanceof HTMLAnchorElement)) {
		return
	}

	event.preventDefault()
	const link = event.target
	game.clear()
	pages[link.dataset.href]()
})
