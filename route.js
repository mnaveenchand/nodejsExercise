const http = require("http");
const url = require("url");

module.exports = http.createServer((req, res) => {
  var CONTROLLER = require("./controller.js"); // importing the main logic
  const reqUrl = url.parse(req.url, true);

  // GET endpoint
  if (reqUrl.pathname == "/orders" && req.method === "GET") {
    CONTROLLER.getAllOrders(req, res);
  } else if (reqUrl.pathname == "/orders" && req.method === "DELETE") {
    
    CONTROLLER.deleteOrder(req, res);
  } else if (reqUrl.pathname == "/get_order_freq" && req.method === "GET") {
    
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
