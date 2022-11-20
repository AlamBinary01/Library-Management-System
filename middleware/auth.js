const auth = (req, res, next) => {
    if (!req.session.admin) {
      
        return res.redirect("/adminlogin");
    }
    
    next();
};

module.exports=auth;