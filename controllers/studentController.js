let username;
let std_id;
let global_login_name;
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
  
  studentfeedbackfile:(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'student', 'feedback.html'))

  },

  studentfeedbackdata:(req,res)=>{
    let query="insert into feedback (name,email,message)values('"+req.body.name+"','"+req.body.email+"','"+req.body.message+"');";
con.query(query,(err,result)=>{
  if(err) throw err;
  res.redirect("/studentdashboard");
})

  },

  editstudentdata:(req,res)=>{
let query="update student  set name='"+req.body.name+"',username='"+req.body.username+"',email='"+req.body.email+"',phonenumber='"+req.body.phonenumber+"',password='"+req.body.password+"',qualification='"+req.body.qualification+"',age='"+req.body.age+"' where std_id='"+std_id+"';";
console.log(query);

con.query(query,(err,result)=>{
  if (err) throw err;
  else{
    res.redirect("/studentDashboard");
  }
})  
},


  editstudentfile:(req,res)=>{
let query="select * from student where std_id='"+std_id+"';";
con.query(query,(err,result)=>{
if (err) throw err;
res.render("editstudent",{dataa:result})
})
  },

  studentbookrating:(req,res)=>{
    // console.log("i am in student book rating")
const star=parseInt(req.body.star_input);
const feedback=req.body.feedback;

/////////////////Retrive data from Table/////////////////

let new_query="select * from book_rating where book_id ='"+req.query.book_id+"';"
con.query(new_query,(err,result1)=>{
if (err) throw err;
console.log(new_query);


// New query for update book rating table


let updated_query;
if(star==1){
  updated_query="update book_rating  set star1='"+(parseInt(result1[0].star1)+1)+"' where book_id ='"+req.query.book_id+"'";
  }
  else if(star==2){
    updated_query="update book_rating  set star2='"+(parseInt(result1[0].star2)+1)+"' where book_id ='"+req.query.book_id+"'";
    }
    else if(star==3){
      updated_query="update book_rating  set star3='"+(parseInt(result1[0].star3)+1)+"' where book_id ='"+req.query.book_id+"'";
      }
      else if(star==4){
        updated_query="update book_rating  set star4='"+(parseInt(result1[0].star4)+1)+"' where book_id ='"+req.query.book_id+"'";
        }
        else if(star==5){
          updated_query="update book_rating  set star5='"+(parseInt(result1[0].star5)+1)+"' where book_id ='"+req.query.book_id+"'";
          }
console.log(updated_query);
          con.query(updated_query,(err,res)=>{
            if (err) throw err;
            // console.log(new_query);
            })





}) //end of 1st query 

//////////Query for get data and calculate rating

let new_query1="select * from book_rating where book_id ='"+req.query.book_id+"'";
con.query(new_query1,(err,res)=>{
if (err) throw err;
console.log(new_query1);
let total_people=parseInt(res[0].star1)+parseInt(res[0].star2)+parseInt(res[0].star3)+parseInt(res[0].star4)+parseInt(res[0].star5);
let total_star=(parseInt(res[0].star1)*1)+(parseInt(res[0].star2)*2)+(parseInt(res[0].star3)*3)+(parseInt(res[0].star4)*4)+(parseInt(res[0].star5)*5);
let updated_star=total_star/total_people;

//query to update stars in book table

let new_query="update book  set  stars ='"+updated_star+"' where book_id ='"+req.query.book_id+"';"
con.query(new_query,(err,res)=>{
if (err) throw err;
console.log(new_query);
})

new_query="insert into book_feedback(book_id,username,feedback) values('"+req.query.book_id+"','"+global_login_name+"','"+feedback+"')";
con.query(new_query,(err,res)=>{
  if (err) throw err;
  console.log(new_query);
  })


})
 /////////////////////UPDATE QUERY END //////////////////////////////////



res.redirect('/bookrating?book_id='+req.query.book_id);



  },

  viewstudentpost:(req,res)=>{
    
    const dataCountQuery = "SELECT COUNT(*) FROM post";
    con.query(dataCountQuery, function(err,result){
        if(err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 3;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount/dataPerPages);

        // console.log(dataCount, "\n", pageNo, "\n",dataPerPages, "\n",startLimit, "\n",totalPages, "\n");

        const Query = `SELECT * FROM post LIMIT ${startLimit}, ${dataPerPages}`;
        con.query(Query, function(err,result){

// if(!err){
//     res.status(201.json)
// }

            if(err) throw err;
            // res.send(result);
            res.render( "viewpost", 
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

finefile:(req,res)=>{
let query="select * from fine where std_id='"+std_id+"';"
console.log(query);
// let res;
con.query(query,(err,result)=>{
  if (err) {throw err;}
 else{
  console.log(result);
  res.render("studentfine",{dataa:result});
 }
})

},


  addcomment:(req,res)=>{
let query="insert into comments(post_id,username,comment)values('"+req.query.id+"','"+global_login_name+"','"+req.body.comment+"')";
con.query(query,(err,result_comment)=>{
  if (err) throw err;
  // data:{post_data}
  //  res.render("postdetail",{dataa:result,comments:result_comment});
  
})
res.redirect("/postdetail?id="+req.query.id);
  },

  addreplycomment:(req,res)=>{
let query="insert into replycomment (commentid,username,reply)values('"+req.query.reply_id+"','"+global_login_name+"','"+req.body.reply+"')";
con.query(query,(err,result_comment)=>{
  if (err) throw err;
  // data:{post_data}
  // console.log(replycomments);
  res.redirect("/postdetail?id="+req.query.id);

})  
},

  viewdetailpost:(req,res)=>{
    let query="select * from post where id ='"+req.query.id+"'";
    let comment="select * from comments where post_id='"+req.query.id+"'";
    let reply="select * from replycomment";

    con.query(reply,(err,replycomments)=>{
      if (err) throw err;
    con.query(query,(err,result)=>{
      if (err) throw err;
      // res.render("book_detail",{dataa:result});
      con.query(comment,(err,result_comment)=>{
        if (err) throw err;
        // data:{post_data}
        console.log(replycomments);
         res.render("postdetail",{dataa:result,comments:result_comment,reply:replycomments});
      })
    })
  })
  },

  viewdetailfile:(req,res)=>{
let query="select * from book where book_id ='"+req.query.book_id+"'";
con.query(query,(err,result)=>{
  if (err) throw err;
  res.render("book_detail",{dataa:result});
})
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
global_login_name=login_name;
     login_pass=req.body.password;
    std_id=req.body.std_id;
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
              console.log(result);
              std_id=result[0].std_id;
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


profilefile:(req,res)=>{
  let query="select * from student where std_id = '"+std_id+"';"
  con.query(query,(error,result)=>{
    if(error){
        console.log("Error");
 
    }
    else{
      res.render("studentprofile",{dataa:result});

    }
}) 

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

              ///////////Comment

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

