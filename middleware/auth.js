const auth = (req, res, next) => {
    if (!req.session.admin) {
        console.log("going to admin login");
        return res.redirect("/adminlogin");
    }
    console.log("going to next");
    next();
};

module.exports=auth;