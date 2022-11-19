const transporter= require("../nodeMailer/mail")

module.exports={
    authentication:(req,res,next)=>{
        if(!req.session.admin){
            return res.redirect("/login");
        }
        next();
    },
    noauthentication:(req,res,next)=>{
        if (req.cookies.CurrentRole == "Admin" && req.session.admin) {
            return res.redirect("/adminmenu");
        }
        else if (req.cookies.CurrentRole == "User" && req.session.user) {
            return res.redirect("/");
        }
        next();
    }
}
 

