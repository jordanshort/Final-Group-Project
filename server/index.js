const express = require('express')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , jwt = require('jsonwebtoken')
    , app = express()
    , tdCtrl = require('./taskDetailsController')
    , taskCtrl = require('./taskController');
app.use(bodyParser.json());
require('dotenv').config();
const { CONNECTION_STRING, AUTH0_CLIENT_SECRET, JWT_SECRET, SERVER_PORT } = process.env;

massive(CONNECTION_STRING).then(db => {
    console.log('DB connected')
    
    app.set('db', db);
});

//Auth login endpoints
app.post('/api/auth', (req, res, next) => {
    // console.log('req.token index.js: ', req.body)
    jwt.verify(req.body.token, AUTH0_CLIENT_SECRET, (err, decoded) => {
        let db = app.get('db');
        if (err) {
            console.log('Authorization failed', err);
            next(err);
        }
        let { given_name, family_name, email, sub } = decoded;
        db.checkForUser([sub]).then((resp) => {
            let user = resp[0];
            let id = '';
            if (!user) {
                db.createUser([given_name, family_name, email, sub]).then(resp => {
                    id = resp[0].userid;
                    let token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' })
                    console.log('token after create user: ', token)
                    res.status(200).send(token);
                });
            }
            else {
                id = user.id;
                let token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' })
                console.log('token if user exists: ', token)
                res.status(200).send(token);
            }
        })
    })
})

//task endpoints
app.get('/api/unscheduled', taskCtrl.getUnscheduled);
app.delete('/api/unscheduled/:taskid', taskCtrl.deleteUnscheduled)
app.get('/api/inprogress', taskCtrl.getInProgress);
app.delete('/api/inprogress/:taskid', taskCtrl.deleteOngoing);

//task details endpoints
app.post('/api/checklist/:taskid', tdCtrl.addCheckItem);
app.post('/api/comment/:taskid', tdCtrl.addComment);
app.put('/api/task/:taskid', tdCtrl.editTask);
app.post('/api/task', tdCtrl.addTask);


app.listen(SERVER_PORT, () => {
    console.log('Server is listening on port ' + SERVER_PORT);
});


