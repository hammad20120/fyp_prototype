const router = require('express').Router();
const Event = require('../models/Event');

const axios = require("axios");

router.post('/', (req, res) => {
  const newEvent = Event({ ...req.body });
  newEvent.save()
    .then(async function(result){
      
      await populatEventReward(result._id)
      return (result)
    })
    .then(function(result){
      res.send(result)
    })
    .catch((e) => res.send(e));
});

const populatEventReward = async (id) => {
  axios
    .post("http://localhost:8000/event/newevent", {"eventId": id})
    .then((response) => response)
    .catch((err) => err);
}

router.get('/', (req, res) => {
  Event.find()
    .then((users) => res.send(users))
    .catch((e) => res.send(e));
});

module.exports = router;
