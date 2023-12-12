if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport"); // authentication
const { initializingPassport } = require("./passportConfig");
const MongoStore = require("connect-mongo");

const mongoose = require("mongoose");

const userRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    // origin: ["http://localhost:3000",],
    origin: [
      "http://localhost:19000",
      "http://192.168.18.60:19000",
      "http://172.20.10.2:19000",
    ],

    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    name: "finSess",
    secret: process.env.TOKEN_SECRET || "IAMCASTUDENT",
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION,
    }),
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
initializingPassport(passport);
app.use(passport.session());

// api routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {}),
  (req, res) => {
    // res.json({ access_token: "GENERATED_ACCESS_TOKEN" });
    res.redirect(`${process.env.CLIENT_BASE_URL}/`);
    // if (req["user"]) {
    //   return res.redirect(`${process.env.CLIENT_BASE_URL}/dashboard`);
    // }
    // return res.redirect(`${process.env.CLIENT_BASE_URL}/user`);
  }
);
app.use("/api/user", userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

const db = process.env.MONGO_CONNECTION;
mongoose.connect(db, (err) => {
  if (err) console.log(err);
});

var debug = require("debug")("tyre-project:server");
var http = require("http");

var port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

var server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
