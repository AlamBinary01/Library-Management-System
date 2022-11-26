let username;
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

  studentDashboard:(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'student', 'student_dashboard.html'))
  },
  student_signup: (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'student', 'student_signup.html'))
  },


  viewbookstudentfile:(req,res)=>{
    const dataCountQuery = "SELECT COUNT(*) FROM book";
            con.query(dataCountQuery, function(err,result){
                if(err) throw err;
        
                let dataCount = result[0]["COUNT(*)"];
                let pageNo = req.query.page ? req.query.page : 1;
                let dataPerPages = req.query.data ? req.query.data : 3;
                let startLimit = (pageNo - 1) * dataPerPages;
                let totalPages = Math.ceil(dataCount/dataPerPages);
        
                // console.log(dataCount, "\n", pageNo, "\n",dataPerPages, "\n",startLimit, "\n",totalPages, "\n");
        
                const Query = `SELECT * FROM book LIMIT ${startLimit}, ${dataPerPages}`;
                con.query(Query, function(err,result){

// if(!err){
//     res.status(201.json)
// }

                    if(err) throw err;
                    // res.send(result);
                    res.render( "viewbookstudent", 
                         {
                            dataa: result,
                            pages: totalPages,
                            CurrentPage: pageNo,
                            lastPage: totalPages
                         }
                    );
                })
            });
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
},

forgetpassword:(req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'student', 'forgetpassword.html'))
},

forgetverificationcode:(req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'student', 'forgetverificationcode.html'))
},

forgetverificationdata:(req,res)=>{
  let code =req.body.code;
  if(code==verificationcode){
  console.log("code is correct");
  res.redirect("/updatepasswordstudent");
  }
  
  else{
      res.redirect("/forgetverificationcode");
  }
},

forgetpassworddata:(req,res)=>{
  let name=req.body.username;
  let email=req.body.email;
  username=name;
  // console.log(name);
  // console.log(pass);
  
  let query="select * from student where username = '"+name+"' and email = '"+email+"';"
  console.log(query);
      con.query(query,function(error,result,fields){
          if(error){
  console.log("Error");
          }
          
          else{
          if(result.length>0){
verificationcode=generateCode();
              var mailOption={
                  from:"alishafa0376@gmail.com",
                  to:email,
                  subject:"Verification Code",
                  html:"Your Verification Password is:"+verificationcode
              }
              
              transporter.sendMail(mailOption,function(error,info){
                  if(error){ throw error;}
                  else{ 
                      console.log("I am in verification");
              }
              })

  res.redirect("/forgetverificationcode");
          }
          else{
              console.log("Login Not Found");
              res.redirect("/studentsignup");
          }
  
      }
      })
},


updatepasswordfile:(req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'student', 'updatestudentpassword.html'))
},

updatepassworddata:(req,res)=>{
  let pass=req.body.password;
  let query="update student set password = '"+pass+"' where username = '"+username+"';";
  console.log(query);
  con.query(query,(error,result)=>{
    if(error){
        console.log("Error");
       res.redirect("/welcome");
    }
    else{

        console.log("Data Update");
        res.redirect("/studentlogin");    }
}) 
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
      subject:'<h1> Verification Code </h1>',
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

