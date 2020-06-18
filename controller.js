const url = require("url");
const DB = require("./utils/db");

function getAllOrders(req, res) {
  const reqUrl = url.parse(req.url, true);
  let params = {};
  if (reqUrl.query.customerAdress) {
    params = { customerAdress: decodeURI(reqUrl.query.customerAdress) };
  } else if (reqUrl.query.companyName) {
    params = { companyName: decodeURI(reqUrl.query.companyName) };
  }
   DB.query_db(params)
     .then((data) => {
       res.statusCode = 200;
       res.setHeader("content-Type", "Application/json");
       res.end(JSON.stringify({ items: data }));
     })
     .catch((err) => {
       res.statusCode = 400;
       res.setHeader("content-Type", "Application/json");
       res.end(JSON.stringify({ message: "something went wrong" }));
     });
}

function deleteOrder(req, res) {
  const reqUrl = url.parse(req.url, true);
  if (reqUrl.query.orderId) {
    let params = { orderId: decodeURI(reqUrl.query.orderId) };
    DB.deleteSalesOrder(params)
      .then((data) => {
        data = data.deletedCount + " record Deleted";
        res.statusCode = 200;
        res.setHeader("content-Type", "Application/json");
        res.end(JSON.stringify({ success: data }));
      })
      .catch((err) => {
        res.statusCode = 400;
        res.setHeader("content-Type", "Application/json");
        res.end(JSON.stringify({ message: "something went wrong" }));
      });
  }
}

function getOrderFrequency(req, res) {
  DB.findOrderFrequency()
    .then((data) => {
      res.statusCode = 200;
      res.setHeader("content-Type", "Application/json");
      res.end(JSON.stringify({ items: data }));
    })
    .catch((err) => {
      //console.log(err);
      res.statusCode = 400;
      res.setHeader("content-Type", "Application/json");
      res.end(JSON.stringify({ message: "something went wrong" }));
    });
}


module.exports = { getAllOrders, deleteOrder, getOrderFrequency };
