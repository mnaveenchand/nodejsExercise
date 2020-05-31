var DbConnection = require("./dbUtils");
var dbInstance = DbConnection.getDb();

function query_db(paramObj) {
  return new Promise((resolve, reject) => {
    //console.log("passedquery " + paramObj);
    dbInstance
      .collection("salesinvoice")
      .find(paramObj)
      .toArray(function (err, res) {
        if (err) reject(err);
        //console.log(res);
        resolve(res);
      });
  });
}

function deleteSalesOrder(orderObj) {
  return new Promise((resolve, reject) => {
    //console.log("passed Query: " + orderObj);
    dbInstance
      .collection("salesinvoice")
      .deleteMany(orderObj, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
  });
}

function findOrderFrequency() {
  return new Promise((resolve, reject) => {
    dbInstance
      .collection("salesinvoice")
      .aggregate([
        { $unwind: "$orderedItem" },
        { $sortByCount: "$orderedItem" },
      ])
      .toArray(function (err, result) {
        if (err) reject(err);
        //console.log(result);
        resolve(result);
      });
  });
}

module.exports = { query_db, deleteSalesOrder, findOrderFrequency };
