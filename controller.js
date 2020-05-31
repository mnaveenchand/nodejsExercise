const url = require("url");
const DB = require("./utils/db");

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
        //console.log(err);
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
        //console.log(err);
        res.statusCode = 400;
        res.setHeader("content-Type", "Application/json");
        res.end(JSON.stringify({ message: "something went wrong" }));
      });
  }
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
        //console.log(err);
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

function fileUpload(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = `F:/Development/NodePractice/CodeChallenges/${files.filetoupload.name}`;
    mv(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write("File uploaded and updated database!");
      res.end();
    });
  });
}

module.exports = { getAllOrders, deleteOrder, getOrderFrequency, fileUpload };
