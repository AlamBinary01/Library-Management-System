const express = require("express");
const app = express();
const routes = require("./routers/book");
const student_routes=require("./routers/studentRouter");
const path = require("path");
const body_parser = require("body-parser");
const port = process.env.port | 3000;

app.use(express.static("public"));
// set view file
app.set("views", path.join(__dirname, "views")); //
const cookieParser = require("cookie-parser");
const session = require('express-session');
//const app=express();
app.use(cookieParser());

// //Cookies
app.use(
    session({
        secret: "Web ki assignment",
        resave: false,
        saveUninitialized: true,
        cookie: { path: "/", httpOnly: true, secure: false, maxAge: 1 * 60 * 60 * 1000 },//session will expire after 1 hour
    })
);




// set view engine
app.set("view engine", "ejs");
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use(routes);
app.use(student_routes);

//server Listening
app.listen(port, () => {
  console.log("Server Listening on http://localhost:3000");
});
