const mysql = require("mysql");

const connection = require("../config/config")

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
      std_id: req.body.std_id,
      std_name: req.body.std_name,
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
    let sql = `SELECT * FROM FINE WHERE std_id =${stu_id}`;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.render("updateFine", {
        title: "Edit Fine Record",
        user: results[0],
      });
    });
  },
  updateFine: (req, res) => {
    const std_id = req.body.std_id;
    let sql =
      "UPDATE FINE SET stu_id='" +
      req.body.std_id +
      " ', stu_name='" +
      req.body.stu_name +
      " ',fine_type='" +
      req.body.fine_type +
      " ',amount='" +
      req.body.amount +
      " ' where std_id= " +
      std_id;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/adminmenu");
    });
  },
  deleteFine: (req, res) => {
    const stu_id = req.params.std_id;
    let sql = `DELETE FROM FINE WHERE std_id =${stu_id}`;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/");
    });
  },
  listFine: (req, res) => {
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
    // const username = req.body.sname;  //sname  //std_id
    const std_id = req.body.sname;
    const dataCountQuery = `SELECT * FROM fine where std_id = ${std_id}`; //sname  //std_id
    connection.query(dataCountQuery, function (err, result) {
      if (err) throw err;

      let dataCount = result[0]["COUNT(*)"];
      let pageNo = req.query.page ? req.query.page : 1;
      let dataPerPages = req.query.data ? req.query.data : 2;
      let startLimit = (pageNo - 1) * dataPerPages;
      let totalPages = Math.ceil(dataCount / dataPerPages);

      const Query = `SELECT * FROM fine where std_id = ${std_id}`;
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


  filterOnFine: (req, res) => {
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
