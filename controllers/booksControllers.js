const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});
module.exports = {
  //Admin Login
  adminlogin_title: (req, res) => {
    res.render("login");
  },
  admin_login: (req, res) => {
    login_name = req.body.Username;
    login_pass = req.body.password;
    let sql =
      "select * from userdata where username = '" +
      login_name +
      "' and password = '" +
      login_pass +
      "';";
    connection.query(sql, function (error, result, fields) {
      if (error) {
        console.log(error);
      } else {
        if (result.length > 0) {
          login_email = result.email;
          console.log(result);
          res.redirect("/adminmenu");
        } else {
          console.log("Login Not Found");
          res.redirect("/registration");
        }
      }
    });
  },

  // admin Menu
  adminMenu: (req, res) => {
    res.render("adminmenu");
  },
  addBook_title: (req, res) => {
    res.render("book_add", {
      title: "Add Books",
    });
  },
  insertBook: (req, res) => {
    let data = {
      book_id: req.body.book_id,
      book_name: req.body.book_name,
      author_name: req.body.author_name,
      department: req.body.department,
      rack_no: req.body.rack_no,
    };
    let sql = "INSERT INTO BOOK SET ?";
    connection.query(sql, data, (err, results) => {
      if (err) throw err;
      res.redirect("/adminmenu");
    });
  },
  editBook: (req, res) => {
    const book_id = req.params.bookId;
    let sql = `SELECT * FROM BOOK WHERE book_id =${book_id}`;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.render("edit_book", {
        title: "Edit Books",
        user: results[0],
      });
    });
  },
  updateBook: (req, res) => {
    const book_id = req.body.book_id;
    let sql =
      "UPDATE BOOK SET book_id='" +
      req.body.book_id +
      " ', book_name='" +
      req.body.book_name +
      " ',author_name='" +
      req.body.author_name +
      " ',department='" +
      req.body.department +
      " ',rack_no='" +
      req.body.rack_no +
      " ' where book_id= " +
      book_id;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/adminmenu");
    });
  },
  delete: (req, res) => {
    const book_id = req.params.bookId;
    let sql = `DELETE FROM BOOK WHERE book_id =${book_id}`;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/");
    });
  },
  pagination: (req, res) => {
    const dataCountQuery = "SELECT COUNT(*) FROM book";
    connection.query(dataCountQuery, function (err, result) {
      if (err) throw err;

      let dataCount = result[0]["COUNT(*)"];
      let pageNo = req.query.page ? req.query.page : 1;
      let dataPerPages = req.query.data ? req.query.data : 5;
      let startLimit = (pageNo - 1) * dataPerPages;
      let totalPages = Math.ceil(dataCount / dataPerPages);
      const Query = `SELECT * FROM book LIMIT ${startLimit}, ${dataPerPages}`;
      connection.query(Query, function (err, result) {
        if (err) throw err;
        res.render("user_index", {
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
    res.render("search", {
      title: "Libarary Management System",
    });
  },
  searchBook: (req, res) => {
    console.log("search book");
    const username = req.body.sname;
    const dataCountQuery = `SELECT COUNT(*) FROM book where book_id = ${username}`;
    connection.query(dataCountQuery, function (err, result) {
      if (err) throw err;

      let dataCount = result[0]["COUNT(*)"];
      let pageNo = req.query.page ? req.query.page : 1;
      let dataPerPages = req.query.data ? req.query.data : 2;
      let startLimit = (pageNo - 1) * dataPerPages;
      let totalPages = Math.ceil(dataCount / dataPerPages);

      const Query = `SELECT * FROM book where book_id = ${username}`;
      connection.query(Query, function (err, result) {
        if (err) throw err;
        // res.send(result);
        console.log(result);
        res.render("search", {
          user: result,
          pages: totalPages,
          CurrentPage: pageNo,
          lastPage: totalPages,
          title: "Library Management System",
        });
      });
    });
  },
  filterBook: (req, res) => {
    const dataCountQuery = "SELECT COUNT(*) FROM book";
    connection.query(dataCountQuery, function (err, result) {
      if (err) throw err;

      let sorting = req.params.sorting;
      let dataCount = result[0]["COUNT(*)"];
      let pageNo = req.params.page ? req.params.page : 1;
      let dataPerPages = req.query.data ? req.query.data : 2;
      let startLimit = (pageNo - 1) * dataPerPages;
      let totalPages = Math.ceil(dataCount / dataPerPages);

      const Query = `SELECT * FROM book ORDER BY book_id ${sorting} LIMIT ${startLimit}, ${dataPerPages} `;
      connection.query(Query, function (err, result) {
        if (err) throw err;

        res.render("user_index", {
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
