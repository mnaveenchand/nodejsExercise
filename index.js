var mongodbutil = require("./utils/dbUtils");
const hostname = "127.0.0.1";
const port = 3000;
const csv = require("csv-parser");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;

const results = [];

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "schwarzIT";

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(function (err, client) {
  if (err) console.log(err);
  console.log("Connected correctly to server");

  const db = client.db(dbName);
  fs.createReadStream("salesorders.csv")
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
      db.collection("salesinvoice").createIndex({
        orderItem: 1,
        companyName: 1,
        customerAdress: 1,
        orderItem: -1,
      });
      db.collection("salesinvoice").insertMany(results, function (err, r) {
        if (err) console.log(err);
        console.log("inserted");
      });
    });
});

mongodbutil.connectToServer(function (err) {
  if (err) console.log(err);
  const server = require("./route.js"); // imports the routing file
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
