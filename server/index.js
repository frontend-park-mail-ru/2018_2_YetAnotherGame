"use strict"

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const multer = require('multer');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', './public')));
app.use(body.json());
app.use(cookie());


const port = process.env.PORT || 3000

app.listen(port, function () {
	console.log(`Server listening port ${port}`)
})

let users = {
	"1": {
		email: "a@a",
		first_name: "f1",
		last_name: "l1",
		username: "u1",
		password: "qwerty",
		score: 5
	},

	"2": {
		email: "wfwfw@corp.mail.ru",
		first_name: "f2",
		last_name: "l2",
		username: "u2",
		password: "password2",
		score: 15
	},
	"3": {
		email: "wfnjyj@corp.mail.ru",
		first_name: "f3",
		last_name: "l3",
		username: "u3",
		password: "password3",
		score: 7
	},
	"4": {
		email: "feefe@corp.mail.ru",
		first_name: "f4",
		last_name: "l4",
		username: "u4",
		password: "password4",
		score: 1
	},
	"5": {
		email: "f355fe@corp.mail.ru",
		first_name: "f45",
		last_name: "l4",
		username: "u4",
		password: "password4",
		score: 16
	},
	"6": {
		email: "fe35e@corp.mail.ru",
		first_name: "5f4",
		last_name: "l4",
		username: "u4",
		password: "password4",
		score: 17
	},
}

const ids = {}
const avatars = {}


function slice(obj, start, end) {
	let sliced = {}
	sliced["len"] = obj.length
	let i = 0
	for (let k in obj) {
		if (i >= start && i < end)
			sliced[k] = obj[k]

		i++
	}

	return Object.values(sliced)
}

app.post("/signup", function (req, res) {

	const password = req.body.password
	const email = req.body.email
	const username = req.body.username
	const first_name = req.body.first_name
	const last_name = req.body.last_name

	if (
		!password || !email || !first_name || !last_name || !username ||
        !password.match(/^\S{4,}$/) ||
        !email.match(/@/)
	) {
		return res.status(400).json({error: "Не валидные данные пользователя"})
	}
	if (ids[email]) {
		return res.status(400).json({error: "Пользователь уже существует"})
	}

	const id = uuid()
	const user = {email, first_name, last_name, username, password, score: 0}
	ids[email] = id
	users[id] = user

	res.cookie("sessionid", id, {expires: new Date(Date.now() + 1000 * 60 * 10)})

	res.status(201).json({id})
})


app.post("/login", function (req, res) {
	const password = req.body.password
	const email = req.body.email
	const user_id = ids[email]
	if (!password || !email) {
		return res.status(400).json({error: "Не указан E-Mail или пароль"})
	}
	if (!users[user_id] || users[user_id].password !== password) {
		return res.status(400).json({error: "Не верный E-Mail и/или пароль"})
	}

	ids[email] = user_id

	res.cookie("sessionid", user_id, {expires: new Date(Date.now() + 1000 * 60 * 10)})
	res.status(201).json({id})
})


app.post("/update", function (req, res) {
	const user_id = req.cookies["sessionid"]

	const email = req.body.email
	const username = req.body.username
	const first_name = req.body.first_name
	const last_name = req.body.last_name
	const img = req.body.image

	if (
		!email ||
        !email.match(/@/)
	) {
		return res.status(400).json({error: "Не валидные данные пользователя"})
	}
	if (!users[user_id]) {
		return res.status(400).json({error: "Пользователя не существует"})
	}

	const user = users[user_id]
	user["email"] = email
	user["username"] = username
	user["first_name"] = first_name
	user["last_name"] = last_name

	users[user_id] = user

	avatars[user_id] = img

	res.status(201).json(user[user_id])
})

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../public/uploads');
    },
    filename: function (req, file, callback) {
        const fileName = req.body.email + file.originalname;
        callback(null, fileName);
    }
})

const upload = multer({storage: storage}).single('image');

app.post('/upload', function(req, res) {
    upload(req, res, function(err) {
		if (req.file) {
			const src = '../uploads/' + req.file.filename;
			avatars[req.body.email] = src;
		}
        // console.log('>>>>', avatars);
        if (err) {
            return res.end("Error uploading file");
        } else {
            res.end("File uploaded");
        }
    });
});

app.get('/me', function (req, res) {
    const id = req.cookies['sessionid'];

    if (!users[id]) {
        return res.status(401).end();
    }

    users[id].score += 1;

    let body = users[id];
    if (avatars[users[id].email]) {
        body.avatar = avatars[users[id].email];
    }
    // console.log(body);

    res.json(body);
});


app.get("/users", function (req, res) {
	const scorelist = Object.values(users)
		.map(user => {
			return {
				username: user.username,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				score: user.score,
			}
		})

	res.json(scorelist)
})


app.get("/users/:id", function (req, res) {
	const scorelist = Object.values(users)
		.filter(user => user.username === req.params.id)
		.map(user => {
			return {
				username: user.username,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				score: user.score,
			}
		})

	res.json(scorelist)
})


app.get("/leaders", function (req, res) {
	const numPage = req.query.numPage
	const length = Object.values(users).length
	const scorelist = Object.values(users)
		.sort((l, r) => r.score - l.score)
		.map(user => {
			return {
				username: user.username,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				score: user.score,
			}
		})

	res.json(scorelist, length, numPage)
})


app.get("/ids", function (req, res) {
	res.json(ids)
})


app.post("/logout", function (req, res) {
	const id = req.cookies["sessionid"]
	res.cookie("sessionid", id, {expires: new Date(Date.now())})
	res.json({user: id})
})
