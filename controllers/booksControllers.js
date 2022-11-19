const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});
module.exports = {
  //Admin Login
  adminlogin_title: (req, res) => {
    res.render("login");
  },
  admin_login: (req, res) => {
    login_name = req.body.Username;
    login_pass = req.body.password;
    let sql =
      "select * from userdata where username = '" +
      login_name +
      "' and password = '" +
      login_pass +
      "';";
    connection.query(sql, function (error, result, fields) {
      if (error) {
        console.log(error);
      } else {
        if (result.length > 0) {
          login_email = result.email;
          res.redirect("/adminmenu")
        } else {
          console.log("Login Not Found");
          res.redirect("/registration");
        }
      }
    });
  },

  // admin Menu
  adminMenu:(req,res)=>{
    res.redirect("/adminmenu");

  }
};
