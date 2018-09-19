'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});

const users = {

    '1': {
        email: 'sdfv@corp.mail.ru',
        first_name: 'f1',
        last_name: 'l1',
        username: 'u1',
        password: 'password1',
        score: 5
    },

    '2': {
        email: 'wfwfw@corp.mail.ru',
        first_name: 'f2',
        last_name: 'l2',
        username: 'u2',
        password: 'password2',
        score: 15
    },
    '3': {
        email: 'wfnjyj@corp.mail.ru',
        first_name: 'f3',
        last_name: 'l3',
        username: 'u3',
        password: 'password3',
        score: 7
    },
    '4': {
        email: 'feefe@corp.mail.ru',
        first_name: 'f4',
        last_name: 'l4',
        username: 'u4',
        password: 'password4',
        score: 1
    },
    '5': {
        email: 'f355fe@corp.mail.ru',
        first_name: 'f45',
        last_name: 'l4',
        username: 'u4',
        password: 'password4',
        score: 16
    },
    '6': {
        email: 'fe35e@corp.mail.ru',
        first_name: '5f4',
        last_name: 'l4',
        username: 'u4',
        password: 'password4',
        score: 17
    },
};
const ids = {};

function slice(obj, start, end) {

    let sliced = {};
    sliced['len']= obj.length;
    let i = 0;
    for (let k in obj) {
        if (i >= start && i < end)
            sliced[k] = obj[k];

        i++;
    }

    return Object.values(sliced);
}


app.get('/me', function (req, res) {
    const id = req.cookies['sessionid'];
    const username = ids[id];
    if (!username || !users[username]) {
        return res.status(401).end();
    }

    users[username].score += 1;

    res.json(users[username]);
});
app.get('/users', function (req, res) {
    const scorelist = Object.values(users)
        .map(user => {
            return {
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                score: user.score,
            }
        });

    res.json(scorelist);
});
app.get('/users/:id', function (req, res) {
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
        });

    res.json(scorelist);
});
app.get('/leaders', function (req, res) {
    let limit = Object.keys(users).length
    let offset = 0

    if (req.query.limit) {
        limit = parseInt(req.query.limit);

    }
    if (req.query.offset) {
        offset = parseInt(req.query.offset);
    }
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
        });


    res.json(slice(scorelist, offset, limit + offset));


});