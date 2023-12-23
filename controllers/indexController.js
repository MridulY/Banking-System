const Customer = require("../models/customerModel");

exports.indexController = (req, res) => {
  Customer.find()
    .sort("name")
    .then(customers => {
      res.render("index", { customers });
    })
    .catch(err => {
      res.status(500).send("Internal Server Error");
    });
};
