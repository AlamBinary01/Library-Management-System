const express = require("express");
// const app= express();
const connection = require("../config/config");
const nodemailer = require("nodemailer");
// const cookieParser = require("cookie-parser");
// const session = require('express-session');
const bookController = require("../controllers/booksControllers");
const router = express.Router();
const Auth=require("../middleware/auth")


//RoutesO
router.route("/adminlogin").get(bookController.adminlogin_title);
router.route("/adminlogin").post(bookController.admin_login);
// admin Sign Up
router.route("/adminsignup").get(bookController.admin_signup);
router.route("/adminsignup").post(bookController.admin_signupdata);
router.route("/adminmenu").get(Auth,bookController.adminMenu);
router.route("/adminmenu/add").get(Auth,bookController.addBook_title);
router.route("/adminmenu/add").post(Auth,bookController.insertBook);
router.route("/adminmenu/edit/:bookId").get(Auth,bookController.editBook);
router.route("/adminmenu/edit").post(Auth,bookController.updateBook);
router.route("/adminmenu/delete/:bookId").get(Auth,bookController.delete);
router.route("/adminmenu/crud").get(Auth,bookController.pagination);
 router.route("/adminmenu/search").get((req,res)=>{res.render("search")});
router.route("/adminmenu/search").post(Auth,bookController.searchBook);
router.route("/adminmenu/Sorting/:sorting/:page").get(Auth,bookController.filterBook);
router.route("/adminverifycode").get(bookController.admin_verification_code);
router.route("/adminverifycode").post(bookController.admin_verificode);
//forget password admin
router.route("/adminforgetpassword").get(bookController.admin_forgetpassword);
router.route("/adminforgetpassword").post(bookController.admin_forgetpassworddata);
//admin forget verification code
router.route("/adminforgetverificationcode").get(bookController.admin_forgetverificationcode);
router.route("/adminforgetverificationcode").post(bookController.admin_forgetverificationdata);

// admin update password
router.route("/adminupdatepassword").get(bookController.admin_updatePasswordfile);
router.route("/adminupdatepassword").post(bookController.admin_updatepassworddata);
//Issue book router
router.route("/adminmenu/issueBook").get(bookController.issuebook);
router.route("/adminmenu/issueBook").post(bookController.insertissuebook);
//Issued book Details
router.route("/adminmenu/issuebookdetails").get(bookController.issuebookdetail);
//search issued book details
router.route("/adminmenu/issuedbookdetail").post(bookController.searchissueddetails);
//Return Book router
router.route("/adminmenu/returnbook").get(bookController.returnBook);
//show total admin details
//router.route("/adminmenu/details").post(bookController.showTotalAdmin);
//admon logout
router.route("/adminmenu/logout").get(bookController.admin_logout);
///Admin Post
router.route("/adminpost").get(bookController.adminpostfile);
router.route("/adminpost").post(bookController.adminpostdata);



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



module.exports = router;
