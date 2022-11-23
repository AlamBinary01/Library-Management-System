const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

module.exports = {

  // admin Menu
  adminMenu: (req, res) => {
    res.render("adminmenu");
  },
  addFine: (req, res) => {
    res.render("addFine", {
      title: "Insert new Fine Record",
    });
  },
  insertFine: (req, res) => {
    let data = {
      stu_id: req.body.stu_id,
      stu_name: req.body.stu_name,
      fine_type: req.body.fine_type,
      amount: req.body.amount,
    };
    let sql = "INSERT INTO FINE SET ?";
    connection.query(sql, data, (err, results) => {
      if (err) throw err;
      res.redirect("/adminmenu");
    });
  },
  editFine: (req, res) => {
    const stu_id = req.params.stu_Id;
    let sql = `SELECT * FROM FINE WHERE book_id =${stu_id}`;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.render("updateFine", {
        title: "Edit Fine Record",
        user: results[0],
      });
    });
  },
  updateFine: (req, res) => {
    const stu_id = req.body.stu_id;
    let sql =
      "UPDATE FINE SET stu_id='" +
      req.body.stu_id +
      " ', stu_name='" +
      req.body.stu_name +
      " ',fine_type='" +
      req.body.fine_type +
      " ',amount='" +
      req.body.amount +
      " ' where book_id= " +
      stu_id;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/adminmenu");
    });
  },
  delete: (req, res) => {
    const stu_id = req.params.stu_id;
    let sql = `DELETE FROM BOOK WHERE book_id =${stu_id}`;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/");
    });
  },
  pagination: (req, res) => {
    const dataCountQuery = "SELECT COUNT(*) FROM fine";
    connection.query(dataCountQuery, function (err, result) {
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
  },
  search_title: (req, res) => {
    console.log("title searched");
    res.render("searchFine", {
      title: "Libarary Management System",
    });
  },
  searchFine: (req, res) => {
    console.log("searching fine");
    const username = req.body.sname;  //sname  //std_id
    const dataCountQuery = `SELECT COUNT(*) FROM fine where stu_id = ${username}`; //sname  //std_id
    connection.query(dataCountQuery, function (err, result) {
      if (err) throw err;

      let dataCount = result[0]["COUNT(*)"];
      let pageNo = req.query.page ? req.query.page : 1;
      let dataPerPages = req.query.data ? req.query.data : 2;
      let startLimit = (pageNo - 1) * dataPerPages;
      let totalPages = Math.ceil(dataCount / dataPerPages);

      const Query = `SELECT * FROM fine where stu_id = ${username}`;
      connection.query(Query, function (err, result) {
        if (err) throw err;
        // res.send(result);
        console.log(result);
        res.render("searchFine", {
          user: result,
          pages: totalPages,
          CurrentPage: pageNo,
          lastPage: totalPages,
          title: "Library Management System",
        });
      });
    });
  },


  filterFine: (req, res) => {
    const dataCountQuery = "SELECT COUNT(*) FROM fine";
    connection.query(dataCountQuery, function (err, result) {
      if (err) throw err;

      let sorting = req.params.sorting;
      let dataCount = result[0]["COUNT(*)"];
      let pageNo = req.params.page ? req.params.page : 1;
      let dataPerPages = req.query.data ? req.query.data : 2;
      let startLimit = (pageNo - 1) * dataPerPages;
      let totalPages = Math.ceil(dataCount / dataPerPages);

      const Query = `SELECT * FROM fine ORDER BY stu_id ${sorting} LIMIT ${startLimit}, ${dataPerPages} `;
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
  },
 
};
