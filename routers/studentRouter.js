const express = require("express");
 const router= express.Router();
const connection = require("../config/config");
const nodemailer = require("nodemailer");
const studentController=require("../controllers/studentController");
const multer=require("multer");
const auth_student=require("../middleware/auth")
const app=express();
const { application } = require("express");


const upload=multer({


    storage:multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null,"uploads");
        },
        filename:function(req,file,cb)
        {
        cb(null,file.originalname)
        }
    })
    })

router.route("/studentDashboard").get(studentController.studentDashboard);
 router.route("/studentlogin").get(studentController.student_login);
 router.route("/studentlogin").post(studentController.login_data);
 router.route("/studentsignup").get(studentController.student_signup);
 router.route("/studentsignup").post(upload.single("imageFile"),studentController.signup_data);
 router.route("/verifycode").get(studentController.verificationcode);
router.route("/verifycode").post(studentController.verifycode);
router.route("/forgetpasswordstudent").get(studentController.forgetpassword);
router.route("/forgetpasswordstudent").post(studentController.forgetpassworddata);
router.route("/viewbookstudent").get(auth_student,studentController.viewbookstudentfile);
router.route("/bookrating").get(auth_student,studentController.viewdetailfile);
router.route("/bookrating").post(auth_student,studentController.studentbookrating);
router.route("/viewstudentpost").get(auth_student,studentController.viewstudentpost);
router.route("/postdetail").get(auth_student,studentController.viewdetailpost);
router.route("/addcomment").post(auth_student,studentController.addcomment);
router.route("/addreplycomment").post(auth_student,studentController.addreplycomment);
router.route("/viewstudentfine").get(auth_student,studentController.finefile);
router.route("/studentprofile").get(auth_student,studentController.profilefile);
router.route("/editstudent").get(auth_student,studentController.editstudentfile);
router.route("/editstudent").post(auth_student,studentController.editstudentdata);


router.route("/forgetverificationcode").get(studentController.forgetverificationcode);
router.route("/forgetverificationcode").post(studentController.forgetverificationdata);
router.route("/updatepasswordstudent").get(studentController.updatepasswordfile);
router.route("/updatepasswordstudent").post(studentController.updatepassworddata);

module.exports = router;
