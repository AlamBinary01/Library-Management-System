const mysql = require("mysql");
const nodemailer = require("nodemailer");
const transporter = require("../nodeMailer/mail");
const path = require("path");
const { verificationcode } = require("./studentController");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

module.exports = {
  //Admin Login
  adminlogin_title: (req, res) => {
    res.sendFile(path.join(__dirname, "..", "L_admin", "admin_login.html"));
  },
  admin_signup: (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "L_admin", "admin_registration.html")
    );
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
          res.redirect("/adminmenu");
        } else {
          console.log("Login Not Found");
          res.sendFile(
            path.join(__dirname, "..", "L_admin", "admin_registration.html")
          );
        }
      }
    });
  },
  admin_logout: (req, res) => {
    req.session.admin = null;
    res.redirect("/");
  },
  admin_signupdata: (req, res) => {
    if (!req.file) console.log("File Not found");
    let username = req.body.Username;
    let email = req.body.email;
    let password = req.body.password;

    console.log(email);
    console.log(password);
    a_varification(email);
    //[username,email,password],
    connection.query(
      "INSERT INTO userdata(username,email,password) VALUES(?,?,?)",
      [username, email, password],
      (error, result) => {
        if (error) {
          console.log("Error");
          res.render("/adminlogin");
        } else {
          console.log("Data inserted");
          res.sendFile(
            path.join(__dirname, "..", "L_admin", "admin_verifycode.html")
          );
        }
      }
    );
  },
  // admin Menu
  adminMenu: (req, res) => {
    res.render("adminmenu");
  },
  addBook_title: (req, res) => {
    res.render("book_add", {
      title: "Add Books",
    });
  },
  insertBook: (req, res) => {
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
  },
  editBook: (req, res) => {
    const book_id = req.params.bookId;
    let sql = `SELECT * FROM BOOK WHERE book_id =${book_id}`;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.render("edit_book", {
        title: "Edit Books",
        user: results[0],
      });
    });
  },
  updateBook: (req, res) => {
    const book_id = req.body.book_id;
    let sql =
      "UPDATE BOOK SET book_id='" +
      req.body.book_id +
      " ', book_name='" +
      req.body.book_name +
      " ',author_name='" +
      req.body.author_name +
      " ',department='" +
      req.body.department +
      " ',rack_no='" +
      req.body.rack_no +
      " ' where book_id= " +
      book_id;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/adminmenu");
    });
  },
  delete: (req, res) => {
    const book_id = req.params.bookId;
    let sql = `DELETE FROM BOOK WHERE book_id =${book_id}`;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/adminmenu");
    });
  },
  pagination: (req, res) => {
    const dataCountQuery = "SELECT COUNT(*) FROM book";
    connection.query(dataCountQuery, function (err, result) {
      if (err) console.log(err);

      let dataCount = result[0]["COUNT(*)"];
      let pageNo = req.query.page ? req.query.page : 1;
      let dataPerPages = req.query.data ? req.query.data : 5;
      let startLimit = (pageNo - 1) * dataPerPages;
      let totalPages = Math.ceil(dataCount / dataPerPages);
      const Query = `SELECT * FROM book LIMIT ${startLimit}, ${dataPerPages}`;
      connection.query(Query, function (err, result) {
        if (err) throw err;
        res.render("user_index", {
          user: result,
          pages: totalPages,
          CurrentPage: pageNo,
          lastPage: totalPages,
          title: "Library Management System",
        });
      });
    });
  },
  search_title: (req, res) => {
    console.log("title searched");
    res.render("search", {
      title: "Libarary Management System",
    });
  },
  searchBook: (req, res) => {
    const username = req.body.sname;
    const dataCountQuery = `SELECT COUNT(*) FROM book where book_id = ${username}`;
    connection.query(dataCountQuery, function (err, result) {
      if (err) throw err;

      let dataCount = result[0]["COUNT(*)"];
      let pageNo = req.query.page ? req.query.page : 1;
      let dataPerPages = req.query.data ? req.query.data : 2;
      let startLimit = (pageNo - 1) * dataPerPages;
      let totalPages = Math.ceil(dataCount / dataPerPages);

      const Query = `SELECT * FROM book where book_id = ${username}`;
      connection.query(Query, function (err, result) {
        if (err) throw err;
        // res.send(result);
        console.log(result);
        res.render("search", {
          user: result,
          pages: totalPages,
          CurrentPage: pageNo,
          lastPage: totalPages,
          title: "Library Management System",
        });
      });
    });
  },
  filterBook: (req, res) => {
    const dataCountQuery = "SELECT COUNT(*) FROM book";
    connection.query(dataCountQuery, function (err, result) {
      if (err) throw err;

      let sorting = req.params.sorting;
      let dataCount = result[0]["COUNT(*)"];
      let pageNo = req.params.page ? req.params.page : 1;
      let dataPerPages = req.query.data ? req.query.data : 2;
      let startLimit = (pageNo - 1) * dataPerPages;
      let totalPages = Math.ceil(dataCount / dataPerPages);

      const Query = `SELECT * FROM book ORDER BY book_id ${sorting} LIMIT ${startLimit}, ${dataPerPages} `;
      connection.query(Query, function (err, result) {
        if (err) throw err;

        res.render("user_index", {
          user: result,
          pages: totalPages,
          CurrentPage: pageNo,
          lastPage: totalPages,
          title: "Library Management System",
        });
      });
    });
  },
  admin_verification_code: (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "L_admin", "admin_verifycode.html")
    );
  },
  admin_verificode: (req, res) => {
    let code = req.body.code;
    if (code == admin_verificationcode) {
      console.log("Code is correct");
      res.redirect("/adminlogin");
    } else {
      res.redirect("/adminverifycode");
    }
  },
  admin_forgetpassword: (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "L_admin", "admin_forgetpassword.html")
    );
  },
  admin_forgetverificationcode: (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "L_admin", "admin_verifycode.html")
    );
  },
  admin_forgetverificationdata: (req, res) => {
    let code = req.body.code;
    if (code == admin_verificationcode) {
      console.log("code is correct");
      res.redirect("/adminupdatepassword");
    } else {
      res.redirect("/adminforgetverificationcode");
    }
  },
  admin_forgetpassworddata: (req, res) => {
    let name = req.body.Username;
    let email = req.body.email;
    username = name;
    let query =
      "select * from userdata where username='" +
      name +
      "' and email='" +
      email +
      "';";

    console.log(query);
    connection.query(query, function (error, result, fildl) {
      if (error) console.log(error);
      else {
        if (result.length > 0) {
          admin_verificationcode = admin_generateCode();
          var mailOption = {
            from: "hase271002@gmail.com",
            to: email,
            subject: "Your Verification Code",
            html: "Your verification Code is :" + admin_verificationcode,
          };
          transporter.sendMail(mailOption, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("I am in Verification");
            }
          });
          res.redirect("/adminforgetverificationcode");
        } else {
          console.log("Login not Found");
          res.redirect("/adminsignup");
        }
      }
    });
  },
  admin_updatePasswordfile: (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "L_admin", "admin_updatepassword.html")
    );
  },
  admin_updatepassworddata: (req, res) => {
    let pass = req.body.password;
    let query =
      "update userdata set password='" +
      pass +
      "'where username='" +
      username +
      "';";
    console.log(query);
    connection.query(query, (error, result) => {
      if (error) {
        console.log(error);
        res.redirect("/public/index.html");
      } else {
        console.log("Data Update");
        res.render("login");
      }
    });
  },
  showTotalAdmin: (req, res) => {
    const query = `SELECT * FORM  userdata`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      res.render("adminmenu", {
        user: result,
      });
    });
  },

  /// Issue Book GET function
  issuebook: (req, res) => {
    res.render("issue_book");
  },
  // Issue Book POST function
  insertissuebook: (req, res) => {
    let fullname = req.body.name_;
    let username = req.body.u_id;
    let email = req.body.email_;
    let phonenumber = req.body.phone_;
    let bookname = req.body.book_name;
    let issuedate = req.body.Issue_date;
    let duedate = req.body.due_date;
    let department = req.body.department;

    connection.query(
      " INSERT INTO ISSUEBOOK ( fullname , username, email, phonenumber, bookname, issuedate, duedate, department )VALUES(?,?,?,?,?,?,?,?)",
      [
        fullname,
        username,
        email,
        phonenumber,
        bookname,
        issuedate,
        duedate,
        department,
      ],
      (err, result) => {
        if (err) console.log(err);
        else {
          var mailOption = {
            from: "hase271002@gmail.com",
            to: email,
            subject: "Your Issued Book Detail",
            html:
              "<h1>Welcome to Alam Library </h1><br>Book Name:" +
              bookname +
              "<br> Issue Date" +
              issuedate +
              "<br>Due Date " +
              duedate +
              "Thanks",
          };
          transporter.sendMail(mailOption, function (error, info) {
            if (error) console.log(error);
            else console.log("Successfully Mail");
          });
        }
        res.redirect("/adminmenu");
      }
    );
  },
  //rerun book function
  returnBook: (req, res) => {
    res.render("returnBook");
  },
  //issued book detail
  issuebookdetail:(req,res)=>{
    const query=`SELECT * FROM ISSUEBOOK `;
    connection.query(query,function(err,result){
      res.render("issuebookDetails",{
        user:result,
        title:"All Issued Booked"
      })
    })
  },
  searchissueddetails:(req,res)=>{
    const username=req.body.sname;
    const query=`SELECT count(*) FROM issuebook WHERE fullname = ${username}`;
    connection.query(query,function(err,result){
      if(err) throw err;
      res.render("issuebookDetails",{
        user:result,
        title:"Issued Book Details"
      })
    })
  },

  showTotalAdmindetail:(req,res)=>{
    const Query=`SELECT *FROM userdata`;
    connection.query(Query,function(err,result){
      res.render("adminMenu",{
        user:result,
        title:"Library"
      })
    })
  }
};

let admin_verificationcode = admin_generateCode();
function admin_generateCode() {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

function a_varification(email) {
  var mailOption = {
    from: "hase271002@gmail.com",
    to: email,
    subject: " Verification Code is:",
    html:
      "Hello Please Enter this Code to Verify Your Code:" +
      admin_verificationcode,
  };

  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      throw error;
    } else {
      console.log("I am in verification");
    }
  });
  return true;
}
