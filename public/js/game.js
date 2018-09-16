'use strict';

const game = document.getElementById('game');


function ajax(callback, method, path, body) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, path, true);
    xhr.withCredentials = true;

    if (body) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        callback(xhr);
    };

    if (body) {
        xhr.send(JSON.stringify(body));
    } else {
        xhr.send();
    }
}

function createMenuLink() {
    const menuLink = document.createElement('a');
    menuLink.href = menuLink.dataset.href = 'menu';

    menuLink.textContent = 'Back to main menu';

    return menuLink;
}

function createMenu() {
    const menuSection = document.createElement('section');
    menuSection.dataset.sectionName = 'menu';
    menuSection.id = 'mainMenu'

    const header = document.createElement('div');
    header.id = 'header';

    const logo = document.createElement('div');
    logo.id = 'logo';
    const logoHeader = document.createElement('h1');
    logoHeader.textContent = 'Yet Another Game';

    logo.appendChild(logoHeader);


    const main = document.createElement('div');
    main.id = 'main';
    const mainInner = document.createElement('div');

    main.appendChild(mainInner);

    const register = {
        sign_in: 'Sign in',
        sign_up: 'Sign up',
    };

    const titles = {
        new_game: 'New Game',
        leaders: 'Leaderboard',
        me: 'Profile'
    };


    Object.entries(register).forEach(function (elem) {
        const href = elem[0];
        const title = elem[1];

        const a = document.createElement('a');
        a.href = href;
        a.dataset.href = href;
        a.textContent = title;
        a.classList.add('header-button');

        header.appendChild(a);
    });

    Object.entries(titles).forEach(function (entry) {
        const href = entry[0];
        const title = entry[1];

        const a = document.createElement('a');
        a.href = href;
        a.dataset.href = href;
        a.textContent = title;
        a.classList.add('menu-button');

        mainInner.appendChild(a);
    });

    menuSection.appendChild(header);
    menuSection.appendChild(logo);
    menuSection.appendChild(main);

    game.appendChild(menuSection);
}

function createSignIn() {
    const signInSection = document.createElement('section');
    signInSection.dataset.sectionName = 'sign_in';

    const header = document.createElement('h1');
    header.textContent = 'Sign In';


    const form = document.createElement('form');

    const inputs = [
        {
            name: 'email',
            type: 'email',
            placeholder: 'Email'
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Password'
        },
        {
            name: 'submit',
            type: 'submit'
        }
    ];

    inputs.forEach(function (item) {
        const input = document.createElement('input');

        input.name = item.name;
        input.type = item.type;

        input.placeholder = item.placeholder;

        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    });

    signInSection.appendChild(header);
    signInSection.appendChild(form);
    signInSection.appendChild(createMenuLink());

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = form.elements['email'].value;
        const password = form.elements['password'].value;

        ajax(function (xhr) {
            game.innerHTML = '';
            createProfile();
        }, 'POST', '/login', {
            email: email,
            password: password
        });
    });

    game.appendChild(signInSection);
}

function createSignUp() {
    const signUpSection = document.createElement('section');
    signUpSection.dataset.sectionName = 'sign_in';

    const header = document.createElement('h1');
    header.textContent = 'Sign Up';


    const form = document.createElement('form');

    const inputs = [
        {
            name: 'email',
            type: 'email',
            placeholder: 'Email'
        },
        {
            name: 'age',
            type: 'number',
            placeholder: 'Your Age'
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Password'
        },
        {
            name: 'password_repeat',
            type: 'password',
            placeholder: 'Repeat Password'
        },
        {
            name: 'submit',
            type: 'submit'
        }
    ];

    inputs.forEach(function (item) {
        const input = document.createElement('input');

        input.name = item.name;
        input.type = item.type;

        input.placeholder = item.placeholder;

        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    });

    signUpSection.appendChild(header);
    signUpSection.appendChild(form);
    signUpSection.appendChild(createMenuLink());

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = form.elements['email'].value;
        const age = parseInt(form.elements['age'].value);
        const password = form.elements['password'].value;
        const password_repeat = form.elements['password_repeat'].value;
        //validation block

        if (password.length < 4) {

            if (document.getElementById('err') !== null) {
                const el = document.getElementById('err');
                el.parentNode.removeChild(el)
            }
            const err = document.createElement('div');
            err.setAttribute("id", "err");

            form.appendChild(err);

            const att = document.createElement('p');
            att.textContent = 'password must be at least 4 characters';
            //if(document.getElementById('att')==false;)
            err.appendChild(att);
            return;
        }
        if (age < 0) {
            if (document.getElementById('err') !== null) {
                const el = document.getElementById('err');
                el.parentNode.removeChild(el);
            }
            const err = document.createElement('div');
            err.setAttribute("id", "err")

            form.appendChild(err);
            const att2 = document.createElement('p');
            att2.textContent = 'age cannot be negative';
            err.appendChild(att2);
            return;
        }
        if (password !== password_repeat) {
            alert('Passwords is not equals');

            return;
        }

        ajax(function (xhr) {
            game.innerHTML = '';
            createProfile();
        }, 'POST', '/signup', {
            email: email,
            age: age,
            password: password
        });
    });

    game.appendChild(signUpSection);
}

function createLeaderboard(users) {
    const leaderboardSection = document.createElement('section');
    leaderboardSection.dataset.sectionName = 'leaderboard';

    const header = document.createElement('h1');
    header.textContent = 'Leaders';

    leaderboardSection.appendChild(header);
    leaderboardSection.appendChild(createMenuLink());
    leaderboardSection.appendChild(document.createElement('br'));

    if (users) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = `
		<tr>
			<th>Email</th>
			<th>Age</th>
			<th>Score</th>
		</th>
		`;
        const tbody = document.createElement('tbody');

        table.appendChild(thead);
        table.appendChild(tbody);
        table.border = 1;
        table.cellSpacing = table.cellPadding = 0;

        users.forEach(function (user) {
            const email = user.email;
            const age = user.age;
            const score = user.score;

            const tr = document.createElement('tr');
            const tdEmail = document.createElement('td');
            const tdAge = document.createElement('td');
            const tdScore = document.createElement('td');

            tdEmail.textContent = email;
            tdAge.textContent = age;
            tdScore.textContent = score;

            tr.appendChild(tdEmail);
            tr.appendChild(tdAge);
            tr.appendChild(tdScore);

            tbody.appendChild(tr);

            leaderboardSection.appendChild(table);
        });
    } else {
        const em = document.createElement('em');
        em.textContent = 'Loading';
        leaderboardSection.appendChild(em);

        ajax(function (xhr) {
            const users = JSON.parse(xhr.responseText);
            game.innerHTML = '';
            createLeaderboard(users);
        }, 'GET', '/users');
    }

    game.appendChild(leaderboardSection);
}

function createProfile(me) {
    const profileSection = document.createElement('section');
    profileSection.dataset.sectionName = 'profile';

    const header = document.createElement('h1');
    header.textContent = 'Profile';

    profileSection.appendChild(header);
    profileSection.appendChild(createMenuLink());

    if (me) {
        const p = document.createElement('p');

        const div1 = document.createElement('div');
        div1.textContent = `Email ${me.email}`;
        const div2 = document.createElement('div');
        div2.textContent = `Age ${me.age}`;
        const div3 = document.createElement('div');
        div3.textContent = `Score ${me.score}`;

        p.appendChild(div1);
        p.appendChild(div3);
        p.appendChild(div3);

        profileSection.appendChild(p);
    } else {
        ajax(function (xhr) {
            if (!xhr.responseText) {
                alert('Unauthorized');
                game.innerHTML = '';
                createMenu();
                return;
            }

            const user = JSON.parse(xhr.responseText);
            game.innerHTML = '';
            createProfile(user);
        }, 'GET', '/me');
    }

    game.appendChild(profileSection);
}

const pages = {
    menu: createMenu,
    sign_in: createSignIn,
    sign_up: createSignUp,
    leaders: createLeaderboard,
    me: createProfile
};

createMenu();

game.addEventListener('click', function (event) {
    if (!(event.target instanceof HTMLAnchorElement)) {
        return;
    }

    event.preventDefault();
    const link = event.target;

    console.log({
        href: link.href,
        dataHref: link.dataset.href
    });

    game.innerHTML = '';

    pages[link.dataset.href]();
});
