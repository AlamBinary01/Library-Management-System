const auth = (req, res, next) => {
    if (!req.session.admin) {
      
        return res.redirect("/adminlogin");
    }
    
    next();
};
const auth_student = (req, res, next) => {
    if (!req.session.admin) {
      
        return res.redirect("/studentlogin");
    }
    
    next();
};

module.exports=auth;
module.exports=auth_student;