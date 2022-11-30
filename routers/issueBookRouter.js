const express = require("express");
const connection = require("../config/config");
const nodemailer = require("nodemailer");
const router = express.Router();
const Auth=require("../middleware/auth");
const issueBookController = require("../controllers/issueBookController");


router.route("/adminmenu").get(Auth,issueBookController.adminMenu);

router.route("/adminmenu/issueBook").post(Auth,issueBookController.issueBook);

module.exports = router;