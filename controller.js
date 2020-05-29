const url = require("url");
const DB = require("./db");

// function to show all orders from a particular company or particular address
function getAllOrders(req, res) {
  const reqUrl = url.parse(req.url, true);
  if (reqUrl.query.customerAdress) {
    let params = { customerAdress: decodeURI(reqUrl.query.customerAdress) };
    DB.query_db(params)
      .then((data) => {
        res.statusCode = 200;
        res.setHeader("content-Type", "Application/json");
        res.end(JSON.stringify({ items: data }));
      })
      .catch((err) => {
        console.log(err);
        res.statusCode = 400;
        res.setHeader("content-Type", "Application/json");
        res.end(JSON.stringify({ message: "something went wornd" }));
      });
  } else if (reqUrl.query.companyName) {
    let params = { companyName: decodeURI(reqUrl.query.companyName) };
    DB.query_db(params)
      .then((data) => {
        res.statusCode = 200;
        res.setHeader("content-Type", "Application/json");
        res.end(JSON.stringify({ items: data }));
      })
      .catch((err) => {
        console.log(err);
        res.statusCode = 400;
        res.setHeader("content-Type", "Application/json");
        res.end(JSON.stringify({ message: "something went wornd" }));
      });
  } else {
    res.statusCode = 400;
    res.setHeader("content-Type", "Application/json");
    res.end(JSON.stringify({ Requiredfield: "customerName or companyName" }));
  }
}

//function to pass orderID to db
function deleteOrder(req, res) {
  const reqUrl = url.parse(req.url, true);
  if (reqUrl.query.orderId) {
    let params = { orderId: decodeURI(reqUrl.query.orderId) };
    DB.deleteSalesOrder(params)
      .then((data) => {
        console.log(data.deletedCount.toString().concat(" records Deleted"));
        data = data.deletedCount + " records Deleted";
        res.statusCode = 200;
        res.setHeader("content-Type", "Application/json");
        res.end(JSON.stringify({ success: data }));
      })
      .catch((err) => {
        console.log(err);
        res.statusCode = 400;
        res.setHeader("content-Type", "Application/json");
        res.end(JSON.stringify({ message: "something went wrong" }));
      });
  }
}

// function to retrive order items sorted by count
function getOrderFrequency(req, res) {
  DB.findOrderFrequency()
    .then((data) => {
      res.statusCode = 200;
      res.setHeader("content-Type", "Application/json");
      res.end(JSON.stringify({ items: data }));
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 400;
      res.setHeader("content-Type", "Application/json");
      res.end(JSON.stringify({ message: "something went wrong" }));
    });
}
module.exports = { getAllOrders, deleteOrder, getOrderFrequency };
