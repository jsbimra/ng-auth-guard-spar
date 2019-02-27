
// import express from 'express';
// import jwt from 'jsonwebtoken';

// equivalent of older: const express = require('express')
// import * as express from 'express';
const express = require("express");
const fs = require('fs');

const _ = require("lodash");
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');

const expressJwt = require('express-jwt');

//Default needs
const users = [
    {
        id: 1,
        name: 'admin',
        password: 'admin'
    },
    {
        id: 2,
        name: 'jat',
        password: 'jat'
    },
    {
        id: 3,
        name: 'morrie',
        password: 'morrie'
    }
];


//Express code start 
const app = express();
const port = 3000;
const routes = express.Router();

routes.get('/', (req, res) => res.send({ hello: 'world' }));

let validUser = false;

//HANDLE LOGIN GET AND POST REQUEST 
routes.get('/checkuser', (req, res) => {
    console.log('SERVER:Login GET request object', req.body);
    users.map(user => {
        if (user.name === req.body.username) {
            res.send({ valid: true, id: user.id, status: 'Valid user!' });
        }
        else {
            res.send({ valid: false, status: 'GET: Wrong user!' });
        }
    });
});

routes.post('/login', (req, res) => {
    console.log('SERVER:Login POST request object', req.body);

    let name = '';
    if (req.body.username && req.body.password) {
        name = req.body.username;
    }

    //getting user object by name
    const user = users[_.findIndex(users, { name: name })];

    if (!user) {
        res.status(401).json({ message: 'POST: no such user found!' })
    }

    if (req.body.password === user.password) {
        const payload =  {id: user.id, token: "dummytokenvalue"};
        const token = 'GENERATE_TOKEN_HERE_WITH_PRIVATE_KEY_AND_WITH_SIGN_OPTION';

        res.json({
            message: 'ok',
            token,
            expiresIn: 'setjwtexpiretime'
        });

    } else {
        res.status(401).json({ message: 'POST: password doesn\'t match' })
    }
});

// Handle POST requests that come in formatted as JSON
app.use(express.json());

// Put after the express.json() call
app.use('/', routes);

// start our server on port 4201
app.listen(port, 'localhost', function () {
    console.log(`Server now listening on: ${port}`);
});

// const app = express();

// //fisrt get resquest 
// app.get('/home', (req, res) => {
//     res.send('Hello user, welcome to my app world!');
// });


// app.listen(port, () => console.log(`Your application is listening on port ${port}`));