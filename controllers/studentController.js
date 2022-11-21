let verificationcode=generateCode();
const nodemailer= require('nodemailer');
var  transporter= nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:587,
  secure:false,
  requireTLS:true,
  auth:{
      user:"alishafa0376@gmail.com",
      pass:"ttugjrkymvtfygqp"
  }
});
path = require('path');
const { verify } = require('crypto');
const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});



module.exports={
     student_login: (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'student', 'student_login.html'))
   
  },

  student_signup: (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'student', 'student_signup.html'))
  },

  login_data: (req,res)=>{
    login_name=req.body.username;
     login_pass=req.body.password;
    
    // console.log(name);
    // console.log(pass);
    
    let query="select * from Student where username = '"+login_name+"' and password = '"+login_pass+"';"
    console.log(query);
        con.query(query,function(error,result,fields){
            if(error){
    console.log("Error");
            }
            
            else{
            if(result.length>0){
              const admin = { username: login_name, password: login_pass };
              //const admin="123"
                     req.session.admin = admin;
                     console.log(req.session.admin);
                     res.cookie("CurrentRole", "Student");
               res.sendFile(path.join(__dirname, '..', 'student', 'student_dashboard.html'))

            }
            else{
                console.log("Login Not Found");
                res.sendFile(path.join(__dirname, '..', 'student', 'student_signup.html'))

            }
    
        }
        })
  },

signup_data:(req,res)=>{
  if(!req.file){
    console.log("File Not Found");
}
//res.sendFile(__dirname+"/Registration.html");
let name_=req.body.name_;
let username=req.body.username;
let email=req.body.email;
let password=req.body.password;
let phone=req.body.phone;
let age=req.body.age;
let qualification=req.body.qualification;
let file_name=req.file.originalname;
console.log(email);
verification(email);
//[username,email,password],
con.query('INSERT INTO student(name,username,email,phonenumber,password,qualification,age,image) VALUES(?,?,?,?,?,?,?,?)',[name_,username,email,phone,password,qualification,age,file_name],(error,result)=>{
    if(error){
        console.log("Error");
       res.redirect("/welcome");
    }
    else{

        console.log("Data inserted");
        res.sendFile(path.join(__dirname, '..', 'student', 'verify_code.html'));
    }
}) 
},

verificationcode:(req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'student', 'verify_code.html'))
},

verifycode:(req,res)=>{
  let code =req.body.code;
  if(code==verificationcode){
  console.log("code is correct");
  res.redirect("/studentlogin");
  }
  
  else{
      res.redirect("/verifycode");
  }
}


}

function generateCode() {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

function verification(email){
  //verificationcode=generateCode();
  //verificationcode=generateCode();
  //verificationcode=generateCode();
  var mailOption={
      from:"alishafa0376@gmail.com",
      to:email,
      subject:"Verification Code",
      html:"Hello Please Enter this Code to Verify Your Code:"+verificationcode
  }
  
  transporter.sendMail(mailOption,function(error,info){
      if(error){ throw error;}
      else{ 
          console.log("I am in verification");
  }
})
return true;

}

