const express = require("express");
const app = express();
const path = require("path");
const routes = require("../routes/homepage.routes");
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "/public");

app.set("view engine", "ejs");
app.use(express.static(publicPath));

app.use("/",routes);
app.listen(port, () => {
  console.log("listening to the server on http://localhost:3000");
});
