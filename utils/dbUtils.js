const MongoClient = require("mongodb").MongoClient;
const urlMongo = "mongodb://localhost:27017/";

var _db;

module.exports = {
  connectToServer: (callback) =>{
    MongoClient.connect(urlMongo,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }, function (err, client) {
      _db = client.db("schwarzIT");
      return callback(err);
    });
  },
  
  getDb:  () => {
    return _db;
  },
};