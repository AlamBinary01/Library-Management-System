const hello=require("../data/database")

module.exports = {
  //Admin Login
  adminlogin_title:(req,res)=>{
    res.render("login")
  },
  admin_login: (req, res) => {
    login_name = req.body.Username;
    login_pass = req.body.password;
  
    // console.log(name);
    // console.log(pass);
  
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
          res.redirect("/");
        } else {
          console.log("Login Not Found");
          res.redirect("/registration");
        }
      }
    });
  },

  
};
