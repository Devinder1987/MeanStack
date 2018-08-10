const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const api = require('./server/routes/api');
const session = require('./server/routes/session');
const signup = require('./server/routes/authentication');

const port = 3000;

const app = express();
 
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());
app.use('/api', api);
app.use('/session', session);
app.use('/signup', signup);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'dist/ngApp/index.html'));
});

app.listen(port, function () {
    console.log("Server is running on localhost:" + port);
});