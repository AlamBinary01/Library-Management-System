const express = require("express");
// const app= express();
const connection = require("../config/config");
const nodemailer = require("nodemailer");
const FineController = require("../controllers/fineControllers");
const router = express.Router();
const Auth=require("../middleware/auth")


router.route("/adminmenu").get(Auth,FineController.adminMenu);

router.route("/adminmenu/addFine").get(Auth,FineController.addFine);
router.route("/adminmenu/addFine").post(Auth,FineController.insertFine);
router.route("/adminmenu/editFine/:stu_Id").get(Auth,FineController.editFine);
router.route("/adminmenu/editFine").post(Auth,FineController.updateFine);
router.route("/adminmenu/deleteFine/:stu_Id").get(Auth,FineController.deleteFine);
router.route("/adminmenu/listFine").get(Auth,FineController.listFine);
router.route("/adminmenu/searchFine").get((req,res)=>{res.render("searchFine")});
router.route("/adminmennu/searchFine").post(Auth,FineController.searchFine);
router.route("/adminmenu/Sorting/:sorting/:page").get(Auth,FineController.filterOnFine);

module.exports = router;
