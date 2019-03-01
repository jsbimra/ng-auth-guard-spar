//express related
const express = require("express");
const bodyparser = require('body-parser');
const path = require("path");
const fs = require('fs');

//Token related
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

//Common
const _ = require("lodash");


//App start 
const app = express();
const port = 3000;
const routes = express.Router();

//Normalizing the path for windows environment
var normalPath = path.normalize(__dirname);

//Keys
const RSA_PRIVATE_KEY = fs.readFileSync(normalPath + '/private.pem', 'utf8');
const RSA_PUBLIC_KEY = fs.readFileSync(normalPath + '/public.pem', 'utf8');

// Handle POST requests that come in formatted as JSON
app.use(express.json());

// Put after the express.json() call
app.use('/', routes);

//not working due to: need to set right key path in format
// const checkIfAuthenticated = expressJwt({
//     secret: jwksRsa.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksUri: "https://angularuniv-security-course.auth0.com/.well-known/jwks.json"
//     }),
//     algorithms: ['RS256']
// });

const checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY
}); 

//Dummy users
const users = [
    {
        id: 1,
        name: 'admin',
        password: 'admin',
        role: 'admin'
    },
    {
        id: 2,
        name: 'jat',
        password: 'jat',
        role: 'user'
    },
    {
        id: 3,
        name: 'india',
        password: 'india',
        role: 'user'
    }
];

const readAllUsers = (req, res) => res.json(['All users arrays object to return ']);

//Routes
routes.get('/', (req, res) => res.send({ hello: 'api is up and running!' }));

routes.get('/users', checkIfAuthenticated, readAllUsers);

routes.get('/secretTest', checkIfAuthenticated,
    (req, res) => {
        console.log('reached to secret test API');
        res.status(200).json({
            message: 'secret tested out successfully!'
        })
    },
    err => console.error(new Error('secret issue ' + err))
);

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
        console.log(' userId ', user.id);

        const jwtBearerToken = jwt.sign({ role: user.role }, RSA_PRIVATE_KEY, {
            algorithm: "RS256",
            expiresIn: 180,
        });

        res.status(200).json({
            message: 'ok',
            token: jwtBearerToken,
            expiresIn: jwt.decode(jwtBearerToken).exp
        });

    } else {
        res.status(401).json({ message: 'POST: password doesn\'t match' })
    }
});

// start our server on port 3000
app.listen(port, 'localhost', function () {
    console.log(`Server now listening on: ${port}`);
});