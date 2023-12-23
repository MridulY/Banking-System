var createError = require('http-errors');
var express = require('express');
var path = require('path');
const ejs = require("ejs");
const cors = require("cors");
const mongoose = require('mongoose');

require("dotenv").config();

const DB_USERNAME=process.env.DB_USERNAME;
const DB_PASSWORD=process.env.DB_PASSWORD;
const PORT = 3000;
const { indexController } = require("./controllers/indexController");
const {
  customerDisplayController,
} = require("./controllers/customerDisplayController");
const {
  customerAddController,
} = require("./controllers/customerAddController");
const { addFundsController } = require("./controllers/addFundsController");
const { withdrawController } = require("./controllers/withdrawController");
const {
  displayTransactionsController,
} = require("./controllers/displayTransactionsController");
const {
  transferFundsController,
} = require("./controllers/transferFundsController");


var app = express();

// view engine setup
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const connection = mongoose.connect(
  // "mongodb://localhost:27017/banking-system",

  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.rlhrfxy.mongodb.net/banking-system?retryWrites=true&w=majority`
);
//console.log(connection);

connection
  .then((response) => {
    console.log("Database has been connected!");
    app.listen(PORT, () => {
      console.log(`Server running on Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


// catch 404 and forward to error handler

app.get("/", indexController);
app.get("/customers/:id", customerDisplayController);
app.get("/customers/:id/transactions", displayTransactionsController);
app.post("/customers/:id/addFunds", addFundsController);
app.post("/customers/:id/withdrawFunds", withdrawController);

app.post("/customers/:id/transferFunds", transferFundsController);

app.post("/customers", customerAddController);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
