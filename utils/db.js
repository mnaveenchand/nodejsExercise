var DbConnection = require("./dbUtils");
var dbInstance = DbConnection.getDb();

function query_db(paramObj) {
  return new Promise((resolve, reject) => {
    dbInstance
      .collection("salesinvoice")
      .find(paramObj).limit(20)
      .toArray((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
}

function deleteSalesOrder(orderObj) {
  return new Promise((resolve, reject) => {
    dbInstance
      .collection("salesinvoice")
      .deleteMany(orderObj, (err, result) => {
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
        { $limit: 10 },
      ])
      .toArray((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
  });
}

module.exports = { query_db, deleteSalesOrder, findOrderFrequency };
