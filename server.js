// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express        = require("express");
var path           = require("path");
var bodyParser     = require("body-parser");
var cookieParser   = require("cookie-parser");
var expressHbs     = require("express-handlebars");
var session        = require("express-session");
var passport       = require("passport");
var flash          = require("connect-flash");
var validator      = require("express-validator");
var SequelizeStore = require("connect-session-sequelize")(session.Store);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");
require("./associations")(db);
require("./config/passport");

var adminDepartments = require("./routes/admin/department");
var adminProfessors = require("./routes/admin/professor");
var adminStudents = require("./routes/admin/student");
var adminStats = require("./routes/admin/stats");
var professor = require("./routes/professor/professor");
var student = require("./routes/student/student");
var dashboard = require("./routes/dashboard");
var api = require("./routes/api");
var index = require("./routes/index");

var sessionStore = new SequelizeStore({
    db: db.sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 3 * 3600 * 1000
});

app.engine(".hbs", expressHbs({
    defaultLayout: "layout",
    extname: ".hbs"
}));
app.set("view engine", "hbs");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

sessionStore.sync();

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

// Routes ======================================================
app.use("/dashboard/admin/departments", adminDepartments);
app.use("/dashboard/admin/professors", adminProfessors);
app.use("/dashboard/admin/students", adminStudents);
app.use("/dashboard/admin/stats", adminStats);
app.use("/dashboard/professor", professor);
app.use("/dashboard/student", student);
app.use("/dashboard", dashboard);
app.use("/api", api);
app.use("/", index);


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

