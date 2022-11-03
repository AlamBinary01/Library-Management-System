const mysql = require("mysql");

//connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});
connection.connect(function (error) {
  if (error) console.log(error);
  else console.log(" Poyon Oil");
});

module.exports= connection