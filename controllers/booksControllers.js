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
         const admin = { username: login_name, password: login_pass };
         //const admin="123"
                req.session.admin = admin;
                console.log(req.session.admin);
                res.cookie("CurrentRole", "Admin");
          console.log(result);
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
    res.render("adminmenu");

  },
  addBook_title:(req,res)=>{
    res.render("book_add", {
      title: "Add Books",
    });
  },
  insertBook:(req,res)=>{
    let data = {
      book_id: req.body.book_id,
      book_name: req.body.book_name,
      author_name: req.body.author_name,
      department: req.body.department,
      rack_no: req.body.rack_no,
    };
    let sql = "INSERT INTO BOOK SET ?";
   connection.query(sql, data, (err, results) => {
      if (err) throw err;
      res.redirect("/adminmenu");
    });
  }
};
