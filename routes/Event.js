const router = require('express').Router();
const Event = require('../models/Event');

router.post("/", (req, res) => {
    console.log(req.body);
    const newEvent = Event({... req.body})
    newEvent.save()
    .then(res.send(newEvent))
})

module.exports = router