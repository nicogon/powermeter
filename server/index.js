let express = require("express");
let path = require("path");

let apiV1PublicRouter = require("./routes");
let app = express();

port = 8080;

app.set("view engine", "ejs");

app.use(
  "*",
  function(req, res, next) {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  function(req, res, next) {
    console.log("Request Type:", req.method);
    next();
  }
);

app.use(apiV1PublicRouter);

app.listen(port, function() {
  console.log("Listening on port " + port);
});
