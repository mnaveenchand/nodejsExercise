const http = require("http");
const url = require("url");

module.exports = http.createServer((req, res) => {
  var CONTROLLER = require("./controller.js"); // importing the main logic
  const reqUrl = url.parse(req.url, true);

  // GET endpoint show all orders
  if (reqUrl.pathname == "/orders" && req.method === "GET") {
    console.log("Request type: " + req.method + " Endpoint: " + req.url);
    CONTROLLER.getAllOrders(req, res);
  }
  // DELETE endpoint to delete a particular order given an OrderId
  else if (reqUrl.pathname == "/orders" && req.method === "DELETE") {
    console.log("Request type: " + req.method + " Endpoint: " + req.url);
    CONTROLLER.deleteOrder(req, res);
  }
  //GET endpoint to display how often each item has been ordered, in descending order
  else if (reqUrl.pathname == "/get_order_freq" && req.method === "GET") {
    console.log("Request type: " + req.method + " Endpoint: " + req.url);
    CONTROLLER.getOrderFrequency(req, res);
  }
  // invalid URL
  else {
    console.log("Request type: " + req.method + " Endpoint: " + req.url);
    res.statusCode = 404;
    res.setHeader("content-Type", "Application/json");
    res.end(JSON.stringify({ message: "Url not found" }));
  }
});
