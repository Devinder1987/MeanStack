const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(session({ secret: "Your secret key" }));

let Users = [
    {
        id: 'dsuthwal',
        password: 'Devi@123'
    },
    {
        id: 'dsuthwal1',
        password: 'Devi@1231'
    }
];

router.get('/', function (req, res) {
    res.send('signup');
});

router.post('/', function (req, res) {
    if (!req.body.id || !req.body.password) {
        res.status("400");
        res.send("Invalid details!");
    } else {
        Users.filter(function (user) {
            if (user.id === req.body.id) {
                res.send('200', {
                    message: "User Already Exists! Login or choose another user id"
                });
            }
        });
        const newUser = { id: req.body.id, password: req.body.password };
        Users.push(newUser);
        req.session.user = newUser;
        res.send('/protected_page');
    }
});

module.exports = router;