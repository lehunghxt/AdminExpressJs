const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require('method-override')
const { randomBytes } = require("crypto");
require("dotenv").config();
const CheckUserPerMission = require('./Helpers/checkPermission');
const {CurrentUser} = require('./Helpers/CurrentUser');

const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const option = {
    etag : true,
    maxAge : 3600000,
    redirect : true,
    setHeaders : function(res, path, stat){
        res.set({
            'x-timestamp' : Date.now(),
        });
    }
}
global.__basedir = path.join(__dirname, 'public');
app.use(express.static(path.join(__dirname, 'public'), option));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
//OVERRIDE METHOD
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
//===================================================

app.use(cookieParser("secret"));
//app.use(session({cookie: { maxAge: 60000 }}));
const oneDay = 1000 * 60 * 60 * 24;
app.use(
    session({
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false,
    })
);
app.use(flash());

app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");
var hbs = exphbs.create({});
// register new function
const helper = require("./helperexpresshandlebar");
hbs.handlebars.registerHelper("pagination", helper.pagination);
hbs.handlebars.registerHelper("sequenNumber", helper.sequenNumber);
hbs.handlebars.registerHelper("compareString", helper.compareString);
hbs.handlebars.registerHelper("handleGender", helper.handleGender);
hbs.handlebars.registerHelper("showTitle", helper.showTitle);
hbs.handlebars.registerHelper("validateErr", helper.validateErr);
hbs.handlebars.registerHelper("validateErrClass", helper.validateErrClass);

app.use(async function (req, res, next) {
    if (req.session.csrf === undefined) {
        req.session.csrf = randomBytes(100).toString("base64");
    }
    if (req.session.CurrentUser) {
        const id = req.session.CurrentUser._id;
        const dataCurrentUser = await CurrentUser(id);
        app.locals.CurrentUser = dataCurrentUser;
        req.session.CurrentUser = dataCurrentUser;
        app.locals.UserCan = new CheckUserPerMission(
            dataCurrentUser.userType.Roles.split(",")
        );
        global.CurrentUser = dataCurrentUser;
    }
    next();
});

//ROUTE
const userRoute = require("./server/routes/userRoute");
const postRoute = require("./server/routes/postRoute");
const roleRoute = require("./server/routes/roleRoute");
const userTypeRoute = require("./server/routes/userTypeRoute");
const roleGroupRoute = require("./server/routes/roleGroupRoute");
const defaultRoute = require("./server/routes/defaultRoute");
//MIDDLEWARE
const { isLogged } = require("./server/middleware/index");
app.use("/", defaultRoute);
app.use("/user", isLogged, userRoute);
app.use("/post", isLogged, postRoute);
app.use("/role", isLogged, roleRoute);
app.use("/user-type", isLogged, userTypeRoute);
app.use("/role-group", isLogged, roleGroupRoute);

app.get("/403", isLogged, (req, res) => {
  res.render("default/403");
});
app.get("/404", isLogged, (req, res) => {
  res.render("default/404");
});

app.get("*", isLogged, function (req, res) {
  res.render("default/404");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
