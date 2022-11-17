const express = require("express");
const app = express();
const routes= require("./routers/book.routes");
const path = require("path");
const body_parser = require("body-parser");
const port = process.env.port | 3000;
app.use(express.static("public"));
// set view file
app.set("views", path.join(__dirname, "views"));//

// set view engine
app.set("view engine", "ejs");
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use(routes);

//server Listening
app.listen(port, () => {
  console.log("Server Listening on http://localhost:3000");
});
