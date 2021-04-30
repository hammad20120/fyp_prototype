const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const EventRewards = mongoose.model('Event_reward', new mongoose.Schema({}), 'event_reward');
const SimilarProds = mongoose.model('SimilarProds', new mongoose.Schema({}), 'similar_products');

router.post('/', async (req, res) => {
  const newProduct = Product({ ...req.body });

  newProduct.data = { ...req.body };

  newProduct.save()
    .then(res.send(newProduct))
    .catch((e) => res.send(400, e));
});

router.get('/similar/:userid/:limit?/', async (req, res) => {
  const maxProd = await EventRewards.findOne({}).sort({ reward: -1 }).limit(1).lean()
    .exec()
    .catch((e) => res.send(400, e.message));

  const similarProd = await SimilarProds.findOne({ productId: maxProd.productId }).lean().exec();

  similarProd.similarProducts = similarProd.similarProducts.slice(0, req.query.limit);

  const prods = await Product.find({ sku: { $in: similarProd.similarProducts } }).lean().exec();
  console.log(similarProd, req.query);
  res.send(prods.map((p) => p.data));

  // const json = JSON.parse(JSON.stringify(maxP));
  //   SimilarProds.findOne({ productId: json.productId }, (err, prod) => {
  //     console.log(prod.similarProducts);
  //     res.send(prod);
  //   });
});

module.exports = router;
