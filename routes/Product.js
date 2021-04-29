const router = require('express').Router();
const Product = require('../models/Product');

router.post("/", (req, res) => {
    const newProduct = Product({ ...req.body })

    newProduct.save()
        .then(res.send(newProduct))
        .catch((e) => res.send(400, e))

})

module.exports = router