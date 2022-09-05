const express = require('express');
const router = express.Router();
const client = require('../app/controlelers/client.controleler');
const employe = require('../app/controlelers/employees.controler');

router.post('/signup', function (req, res) {

    client.addClient(req.body, function (err, user) {
        if (err) {
            res.status(404);
            res.json({
                error: "cilient not created"
            })
        } else {
            res.json(user)
        }
    })
});

router.post('/login', function (req, res) {
    client.loginClient(req.body, function (err, loggedClient, token = '') {
        if (err) {
            res.status(404);
            res.json({
                error: 'Client not logged'
            })
        } else if (token) {
            res.json({ success: true, user: loggedClient, jwt: token })
        } else {
            res.json({ success: false, message: 'username or password do not match' })
        }
    })
});

router.get('/:id', function (req, res) {
    client.getClient(req.params.id, function (err, user) {
        if (err) {
            res.status(404);
            res.json({
                error: 'User not found'
            })
        } else {
            res.json(user)
        }
    })
});
module.exports = router;