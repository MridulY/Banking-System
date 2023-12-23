const Customer = require("../models/customerModel");
const uuid = require('uuid');

exports.customerAddController = async (req, res) => {
    // console.log(req.body);
    const accNo = uuid.v4();
    const { name,address,dob, email, currentBal,phone,imgUrl,gender } = req.body;
    const customer = new Customer({
      name: name,
      email: email,
      address:address,
      accNo:accNo,
      dob:dob,
      currentBal: currentBal,
      phone:phone,
      imgUrl:imgUrl,
      gender:gender
    });
  
    await customer.save();
    res.render('addCustomerModal');
  };