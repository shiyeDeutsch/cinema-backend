let express = require('express')
let loginBL = require('../models/loginBL')
const usersBL = require('../models/usersBL')

let router = express.Router();

router.route('/').post(async (req, resp, next) => {
    let user = await loginBL.login(req.body)
    return resp.json(user);
})

// var express = require('express');
// // const  loginBL  = require('../models/loginBL');
// const usersBL = require('../models/usersBL')
// const loginBL = require('../models/loginBL')

// var router = express.Router();


router.get('/', async function (req, res, next) {

    let usersData = await usersBL.getAllUsers();
    return res.json(usersData)

});

router.get('/add', async function (req, res, next) {
    if (req.session.admin) {
        // await usersBL.createNewUser(req.body)
        res.render('addUser', { name: req.session.name, admin: req.session.admin })
    }
    else {
        res.redirect('/menu')
    }
});

router.post('/addReq', async function (req, res, next) {
    if (req.session.admin) {
        let status = await usersBL.createNewUser(req.body)
    }

    res.redirect('/menu')
});

router.get('/singUp', async function (req, res, next) {
    res.render('singUp')
});
router.post('/singUpReq', async function (req, res, next) {
    let status = await usersBL.singUp(req.body)
    let login = await loginBL.login(req.body)
    req.session.valid = status.valid;
    req.session.userId = login.id;
    req.session.name = login.name;
    req.session.permissions = status.permissionsData
    res.redirect('/menu');
});
router.get('/edit/:id', async function (req, res, next) {
    if (req.session.admin) {
        let userData = await usersBL.getUser(req.params.id)
        // res.send(userData)
        res.render('editUser', { name: req.session.name, admin: req.session.admin, userData: userData })
    }
    else {
        res.redirect('/menu');
    }
});
router.post('/update/:id', async function (req, res, next) {
    if (req.session.admin) {
        let status = await usersBL.updateUser(req.params.id, req.body)

        res.redirect('/userManagement')
    }
    else {
        res.redirect('/menu');
    }
});
router.get('/dalete/:id', async function (req, res, next) {
    if (req.session.admin) {
        let status = await usersBL.dateteUser(req.params.id, req.body)

        res.redirect('/userManagement')
    }
    else {
        res.redirect('/menu');
    }
});

module.exports = router;