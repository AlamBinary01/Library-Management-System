const express = require("express");
const path = require("path");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
const bookController=require("../controllers/booksControllers")
const router = express.Router();
router.route("/adminlogin").get(bookController.adminlogin_title);
router.route("/adminlogin").post(bookController.admin_login);
//connection


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

//add books
router.get("/add", (req, res) => {
  res.render("book_add", {
    title: "Add Books",
  });
});
//save
router.post("/save", (req, res) => {
  let data = {
    book_id: req.body.book_id,
    book_name: req.body.book_name,
    author_name: req.body.author_name,
    department: req.body.department,
    rack_no: req.body.rack_no,
  };
  let sql = "INSERT INTO BOOK SET ?";
  let query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//editnp
router.get("/edit/:bookId", (req, res) => {
  const book_id = req.params.bookId;
  let sql = `SELECT * FROM BOOK WHERE book_id =${book_id}`;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.render("edit_book", {
      title: "Edit Books",
      user: results[0],
    });
  });
});

//update

router.post("/update", (req, res) => {
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
    res.redirect("/");
  });
});

//delete
router.get("/delete/:bookId", (req, res) => {
  const book_id = req.params.bookId;
  let sql = `DELETE FROM BOOK WHERE book_id =${book_id}`;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//pagination
router.get("/", (req, res) => {
  const dataCountQuery = "SELECT COUNT(*) FROM book";
  connection.query(dataCountQuery, function (err, result) {
    if (err) throw err;

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
});

//search
router.get("/search", (req, res) => {
  res.render("search", {
    title: "Libarary Management System",
  });
});
router.post("/search", (req, res) => {
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
      res.render("search", {
        user: result,
        pages: totalPages,
        CurrentPage: pageNo,
        lastPage: totalPages,
        title: "Library Management System",
      });
    });
  });
});
//filtering
router.get("/Sorting/:sorting/:page", (req, res) => {
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
});

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "hase271002@gmail.com",
    pass: "eshfzdgfepgrxaio",
  },
});

router.get("/forgetpassword", (req, res) => {
  res.render("forget_pass");
});
router.post("/forgetpassword", (req, res) => {
  let name = req.body.Username;
  let email = req.body.email;

  let query =
    "Select * from userdata where username='" +
    name +
    "' and email='" +
    email +
    "';";
  //console.log(query);
  connection.query(query, function (error, result, fields) {
    if (error) console.log(error);
    else {
      if (result.length > 0) {
        var mailOption = {
          from: "hase271002@gmail.com",
          to: email,
          subject: "Yours Verification Code is:",
          html:
            "Your Username is:" +
            name +
            " Your Code is:" +
            result[0].password,
        };
        transporter.sendMail(mailOption, function (error, info) {
          if (error) console.log(error);
          else console.log("Email has been sent,",info.response);
        });
        res.redirect("/");
      } else {
        alert("Login Not Found");
        res.redirect("registration");
      }
    }
  });
});

///////////Verification////////////////////////
function generateCode() {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

function verify(emial) {
 let verificationcode = generateCode();
  var mailOption = {
    from: "alambinary01@gmail.com",
    to: email,
    subject: "Verification Code",
    html:
      "Hello Please Enter this Code to Verify Your Code:" + verificationcode,
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

router.get("/verify", (req, res) => {
  res.redirect("verify");
});

router.post("/verify", (req, res) => {
  let code = req.body.code;
  if (code == verificationcode) {
    console.log("code is correct");
    res.redirect("/");
  } else {
    res.redirect("/verify");
  }
});
////////////Registration///////////
router.get("/registration", (req, res) => {
  res.render("registration");
});

router.post("/registration", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  connection.query(
    "INSERT INTO userdata(name,email,pass) VALUES(?,?,?)",
    [username, email, password],
    (error, result) => {
      if (error) {
        console.log("Error");
        res.redirect("/welcome");
      } else {
        console.log("Data inserted");
        verify(email);
        res.redirect("/verify");
      }
    }
  );
});
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//////////////////Admin Login?////////////////////
router.get("adminMenu", (req, res) => {
  res.render("add");
});


module.exports = router;
