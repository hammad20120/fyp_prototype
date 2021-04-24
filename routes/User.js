const router = require('express').Router();
const User = require('../models/User');

router.post("/", (req, res) => {
    console.log(req.body);
    const newUser = User({... req.body})
    newUser.save()
    .then(res.send(newUser))
})

module.exports = router