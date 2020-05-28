var http = require("http");
var formidable = require("formidable");
var mv = require("mv");
const URL = require("url");

const csv = require("csv-parser");
const fs = require("fs");
const results = [];

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "questaxtestdb";

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use connect method to connect to the Server
client.connect(function (err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);
  fs.createReadStream("sales.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      // Insert multiple documents
      db.collection("salesinvoice").insertMany(results, function (err, r) {
        assert.equal(null, err);
      });
    });
});

http
  .createServer((request, response) => {
    let parsedURL = URL.parse(request.url, true);
    let path = parsedURL.pathname;
    let qs = parsedURL.query;
    path = path.replace(/^\/+|\/+$/g, "");
    console.log(parsedURL.pathname);
    let mongoQuery = JSON.parse(JSON.stringify(qs));
    console.log(mongoQuery);
    if (
      request.method === "GET" &&
      parsedURL.pathname === "/allorders/company/"
    ) {
      //show all orders from a particular company
      query_db(mongoQuery).then((res, err) => {
        console.log(res);
        response.end(res);
      });
    } else if (
      request.method === "GET" &&
      request.pathname === "/allorders/address/"
    ) {
      // show all orders to a particular address
      let data = query_db({ customerAdress: qs.customerAdress });
      response.end(JSON.stringify(data));
    } else if (
      request.method === "DELETE" &&
      request.pathname === "/orders/del_order/"
    ) {
      // delete a particular order given an OrderId
      db.collection("salesinvoice").findOneAndDelete(
        { orderId: qs.orderId },
        function (err, r) {
          assert.equal(null, err);
          assert.ok(r.value.b == null);
        }
      );
      response.end(`${orderId} has been deleted`);
    } else if (
      request.method === "GET" &&
      request.pathname === "/allorders/order_freq_desc"
    ) {
      // display how often each item has been ordered, in descending order
      db.collection("salesinvoice")
        .distinctAndCount("orderedItem")
        .toArray(function (err, result) {
          if (err) throw err;
          response.end(JSON.stringify(result));
        });
    } else {
      result = {};
      response.write(JSON.stringify(result));
    }
    console.log("server runner on port 8080");
  })
  .listen(8080);

async function query_db(paramObj) {
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;
      console.log("passedquery " + JSON.stringify(paramObj));
      var dbo = db.db(dbName);
      dbo
        .collection("salesinvoice")
        .find(JSON.stringify(paramObj))
        .toArray(function (err, result) {
          if (err) throw err;
          //console.log(result);
          return result;
          db.close();
        });
    }
  );
}
