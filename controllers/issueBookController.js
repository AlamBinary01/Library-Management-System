const mysql = require("mysql");

const connection =require("../config/config")
module.exports = {

    // admin Menu
    adminMenu: (req, res) => {
      res.render("adminmenu");
    },
issueBook: (req, res)=>{
    let data = {
        std_id: req.body.std_id, 
        std_email: req.body.std_email, 
        book_id: req.body.book_id, 
        book_name: req.body.book_name, 
        issuedate: req.body.issuedate,
    };
    let sql = "INSERT INTO ISSUEBOOK SET ?";
    connection.query(sql, data, (err, result)=>{
        if (err) throw err;
        res.redirect("/adminmenu"); 
    });
}, 
listIssueBooks: (req, res) => {
    const listSql = "SELECT COUNT(*) FROM  ISSUEBOOK";
    connection.query(listSql, function (err, result) {
        if (err) throw err;

        let dataCount = result[0]["COUNT(*)"];
        let pageNo = req.query.page ? req.query.page : 1;
        let dataPerPages = req.query.data ? req.query.data : 5;
        let startLimit = (pageNo - 1) * dataPerPages;
        let totalPages = Math.ceil(dataCount / dataPerPages);
        const Query = `SELECT * FROM fine LIMIT ${startLimit}, ${dataPerPages}`;
        connection.query(Query, function (err, result) {
          if (err) throw err;
          res.render("fine_index", {
            user: result,
            pages: totalPages,
            CurrentPage: pageNo,
            lastPage: totalPages,
            title: "Library Management System",  
        });
    });
  });
}
};

