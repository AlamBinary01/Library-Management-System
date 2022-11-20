const express = require("express");
const connection = require("../config/config");
const nodemailer = require("nodemailer");
// const cookieParser = require("cookie-parser");
// const session = require('express-session');
const bookController = require("../controllers/booksControllers");
const router = express.Router();
const Auth = require("../middleware/auth");
//const Auth = require("C:\Users\alich\OneDrive\Documents\GitHub\Library-Management-System/middleware/auth.js");


//admin logout
router.get("/logout", (req, res) => {
  req.session.admin = null;
  req.cookies.CurrentRole = "";
  res.sendFile(__dirname, +"/index.html");
});
//Routes
router.route("/adminlogin").get(bookController.adminlogin_title);
router.route("/adminlogin").post(bookController.admin_login);

router.route("/adminmenu").get(bookController.adminMenu);

router.route("/adminmenu/add").get(bookController.addBook_title);
router.route("/adminmenu/add").post(bookController.insertBook);

router.route("/adminmenu/edit/:bookId").get(bookController.editBook);
router.route("/adminmenu/edit").post(bookController.updateBook);

router.route("/adminmenu/delete/:bookId").get(bookController.delete);


 router.route("/adminmenu/search").get((req,res)=>{res.render("search")});
router.route("/adminmennu/search").post(bookController.searchBook);
router.route("/adminmenu/Sorting/:sorting/:page").get(bookController.filterBook);
// router.get("/adminmenu",Auth,  bookController.adminMenu);
// router.route("/adminlogin/add",Auth).get(bookController.addBook_title);
// router.route("/adminlogin/add",Auth).post(bookController.insertBook);
// router.route("adminmenu/allBook").get(bookController.AllData);




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
            "Your Username is:" + name + " Your Code is:" + result[0].password,
        };
        transporter.sendMail(mailOption, function (error, info) {
          if (error) console.log(error);
          else console.log("Email has been sent,", info.response);
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
