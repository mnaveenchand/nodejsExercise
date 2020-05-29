const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
// Database Name

const dbName = "questaxtestdb";

// function to read queried results from db
function query_db(paramObj) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err, db) {
        if (err) throw err;
        console.log("passedquery " + paramObj);
        var dbo = db.db(dbName);
        dbo
          .collection("salesinvoice")
          .find(paramObj)
          .toArray(function (err, result) {
            if (err) reject(err);
            //console.log(result);
            // return result;
            db.close();
            resolve(result);
          });
      }
    );
  });
}
// db query to delete with orderId
function deleteSalesOrder(orderObj) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err, db) {
        if (err) throw err;
        console.log("passedquery " + orderObj);
        var dbo = db.db(dbName);
        dbo
          .collection("salesinvoice")
          .deleteMany(orderObj, function (err, result) {
            if (err) reject(err);
            db.close();
            resolve(result);
          });
      }
    );
  });
}
// db query to get recors, how often each item has been ordered
function findOrderFrequency() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo
          .collection("salesinvoice")
          .aggregate([
            { $unwind: "$orderedItem" },
            { $sortByCount: "$orderedItem" },
          ])
          .toArray(function (err, result) {
            if (err) reject(err);
            db.close();
            console.log(result);
            resolve(result);
          });
      }
    );
  });
}

module.exports = { query_db, deleteSalesOrder, findOrderFrequency };
