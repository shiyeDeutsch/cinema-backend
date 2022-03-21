const express = require('express')
const router = express.Router()
const personBL = require('../models/pesonBL')
router.route('/')
    .get(async (req, resp) => {
        try {
            let pers = await personBL.getPersons()
            console.log(pers)
            return resp.json(pers)
        }
        catch (err) {
            console.log(pers)

            return resp.json(err);
        }
    })

router.route('/:id')
    .get(async (req, resp) => {
        let id = req.params.id;
        let per = await personBL.getPerson(id)
        return resp.json(per)
    })

router.route('/')
    .post(async (req, resp) => {
        let user = req.body;
        let status = await personBL.addPerson(user)
        return resp.json(status);
    })

router.route('/:id')
    .put(async (req, resp) => {
        let user = req.body;
        let id = req.params.id;
        let status = await personBL.updatePerson(id, user)
        return resp.json(status)
    })

router.route('/:id')
    .delete(async (req, resp) => {
        let id = req.params.id;
        let status = await personBL.deletePerson(id)
        return resp.json(status)
    })


module.exports = router;