const router = require("express").Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");

const EventRewards = mongoose.model(
  "Event_reward",
  new mongoose.Schema({}),
  "event_reward"
);
const SimilarProds = mongoose.model(
  "SimilarProds",
  new mongoose.Schema({}),
  "similar_products"
);

const axios = require("axios");
const { response } = require("express");

router.post("/", async (req, res) => {
  const promises = [];
  for (const prod of req.body) {
    let newProd = Product({ ...prod });
    newProd.data = { ...prod };
    promises.push(
      new Promise((resolve) => {
        newProd.save().then((resp) => resolve());
      })
    );
  }

  Promise.all(promises).then((products) => {
    res.send("Completed");
    catProducts();
  });

  // await Product.create(req.body)
  //   .then((response) => {
  //     catProducts();
  //     res.send(response);
  //   })
  //   .catch((error) => res.send(error));
});

const catProducts = async () => {
  axios
    .post("http://localhost:8000/product/categorize")
    .then((response) => response)
    .catch((err) => err);
};
// router.get('/categorizeProducts', async (req, res) => {
//   axios.post('http://localhost:8000/product/categorize', req.products)
//   .then((response) => response)
//   .catch(err => err)
// });

const getRecomProducts = async (id, limit) => {
  return axios
    .get(`http://localhost:8000/product/recommend/${id}`, {
      params: {
        limit: limit,
      },
    })
    .then((response) => {
      this.response = response.data;
      return this.response;
    })
    .catch((err) => {
      return err.response;
    });
};

router.get("/similar/:userid/", async (req, res) => {
  getRecomProducts(req.params.userid, req.query.limit).then(async (data) => {

    if(data.status == 404){
      res.send(null)
      return
    }

    const prods = await Product.find({
      sku: { $in: data.productIds },
    })
      .lean()
      .exec()
      .catch((e) => res.send(400, e.message));

    res.send(prods.map((p) => p.data));
  });
});

// router.get("/similar/:userid/:limit?/", async (req, res) => {
//   let maxProd = await EventRewards.findOne({"userId": req.params.userid})
//     .sort({ reward: -1 })
//     .limit(1)
//     .lean()
//     .exec()
//     .catch((e) => res.send(400, e.message));

//   if (!maxProd) {
//     res.send(null)
//     return
//   }

//   const similarProd = await SimilarProds.findOne({
//     productId: maxProd.productId,
//   })
//     .lean()
//     .exec()
//     .catch((e) => res.send(400, e.message));

//   similarProd.similarProducts = similarProd.similarProducts.slice(
//     0,
//     req.query.limit
//   );

//   const prods = await Product.find({
//     sku: { $in: similarProd.similarProducts },
//   })
//     .lean()
//     .exec()
//     .catch((e) => res.send(400, e.message));
//   console.log(similarProd, req.query);
//   res.send(prods.map((p) => p.data));

//   // const json = JSON.parse(JSON.stringify(maxP));
//   //   SimilarProds.findOne({ productId: json.productId }, (err, prod) => {
//   //     console.log(prod.similarProducts);
//   //     res.send(prod);
//   //   });
// });

module.exports = router;
