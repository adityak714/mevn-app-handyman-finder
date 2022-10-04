var express = require("express");
var mongoose = require("mongoose");
var morgan = require("morgan");
var path = require("path");
var cors = require("cors");
var history = require("connect-history-api-fallback");

const ClientController = require("./src/API/Controllers/ClientController");
const HandymanController = require("./src/API/Controllers/HandymanController");
const RequestController = require("./src/API/Controllers/RequestController");
const ReviewController = require("./src/API/Controllers/ReviewController");
const AuthController = require("./src/API/Controllers/AuthController");

// Create Express app
var app = express();

// Variables
var mongoURI =
  process.env.MONGODB_URI ||
  "mongodb+srv://oscareinagus:3tXWisPEbcijWIB4@cluster0.ynhyrmr.mongodb.net/test";
var port = process.env.PORT || 3000;

app.listen(port, function (err) {
  if (err) throw err;
  console.log(`Express server listening on port ${port}, in ${env} mode`);
  console.log(`Backend: http://localhost:${port}/api/`);
  console.log(`Frontend (production): http://localhost:${port}/`);
});

// Connect to MongoDB
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
      console.error(err.stack);
      process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
  }
);

// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan("dev"));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options("*", cors());
app.use(cors());

// Import routes
app.get("/api", function (req, res) {
  res.json({ message: "Welcome to your DIT342 backend ExpressJS project!" });
});
app.route("/api/handymen").all(HandymanController);
app.route("/api/handymen/:id").all(HandymanController);
//New routes
app.route("/api/clients/:id/reviews").all(ClientController);
app.route("/api/clients").all(ClientController);
app.route("/api/clients/:id").all(ClientController);
app.route("/api/requests").all(RequestController);
app.route("/api/requests/:id").all(RequestController);
app.route("/api/reviews").all(ReviewController);
app.route("/api/reviews/:id").all(ReviewController);
app.route("/api/handymen/:id/reviews").all(HandymanController);
app.route("/api/handymen/:id/requests").all(HandymanController);
app.route("/api/clients/:id/requests").all(ClientController);
app.route("/api/clients/:id/requests/:rq_id").all(ClientController);
app.route("/api/handymen/:id/requests/:rq_id").all(HandymanController);
app.route("/api/auth/signin").all(AuthController)
app.route("/api/client").all(AuthController);
//app.route("/api/handymen/:h_id/reviews/:r_id").all(HandymanController);

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use("/api/*", function (req, res) {
  res.status(404).json({ message: "Not Found" });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + "/..");
var client = path.join(root, "client", "dist");
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get("env");
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  console.error(err.stack);
  var err_res = {
    message: err.message,
    error: {},
  };
  if (env === "development") {
    // Return sensitive stack trace only in dev mode
    err_res["error"] = err.stack;
  }
  res.status(err.status || 500);
  res.json(err_res);
});

module.exports = app;
