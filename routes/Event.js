const router = require('express').Router();
const Event = require('../models/Event');

router.post("/", (req, res) => {
    const newEvent = Event({... req.body})
    newEvent.save()
    .then(res.send(newEvent))
    .catch(e => res.send(e))
})

router.get("/", (req, res) => {
    Event.find()
    .then(users => res.send(users))
    .catch(e => res.send(e))
})

module.exports = router