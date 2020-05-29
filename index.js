const http = require("http");
const csv = require("csv-parser");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const results = [];

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "questaxtestdb";

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const hostname = "127.0.0.1";
const port = 3000;

client.connect(function (err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);
  fs.createReadStream("sales.csv")
    .pipe(csv())
    .on("data", (data) => {
      let obj = {};
      Object.keys(data).forEach((key) => {
        obj[key.trim()] = data[key].trim();
      });
      results.push(obj);
    })
    .on("end", () => {
      // Insert multiple documents
      db.collection("salesinvoice").insertMany(results, function (err, r) {
        assert.equal(null, err);
        console.log("inserted");
      });
    });
});
const server = require("./route.js"); // imports the routing file

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
