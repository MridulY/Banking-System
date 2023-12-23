const moment = require("moment");
const Customer = require("../models/customerModel");

exports.customerDisplayController = async (req, res) => {
  try {
    const id = req.params.id;

    const customerData = await Customer.findOne({ accNo: id }).exec();

    if (customerData) {
      const createdAt = moment(customerData.createdAt).format("lll");
      const modifiedAt = moment(customerData.updatedAt).format("lll");
      const dob = moment(customerData.dob).format("ll");

      const allCustomers = await Customer.find({ accNo: { $ne: id } }).exec();

      res.render("customer", {
        allCustomers,
        customerData,
        createdAt,
        modifiedAt,
        dob,
      });
    } else {
      res.json({ message: "Customer not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!" });
  }
};
