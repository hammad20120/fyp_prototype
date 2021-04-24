const router = require('express').Router();
const Product = require('../models/Product');

router.post("/", (req, res) => {
    console.log(req.body);
    const newProduct = Product({... req.body})
    newProduct.save()
    .then(res.send(newProduct))
})

module.exports = router