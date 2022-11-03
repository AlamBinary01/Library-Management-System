const connection = require("../config/configs");

const add_g = (req, res) => {
  res.render("book_add", {
    title: "Add Books",
  });
};

const insertBook_p = (req, res) => {
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
    res.redirect("search");
  });
};

const showUpdateBook_g = (req, res) => {
  const book_id = req.params.bookId;
  let sql = `SELECT * FROM BOOK WHERE book_id =${book_id}`;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.render("edit_book", {
      title: "Edit Books",
      user: results[0],
    });
  });
};

const updateBook_p = (req, res) => {
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
    res.redirect("/");
  });
};

const deleteBook_g = (req, res) => {
  const book_id = req.params.bookId;
  let sql = `DELETE FROM BOOK WHERE book_id =${book_id}`;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
};

const SearchTitle = (req, res) => {
  res.render("search", {
    title: "Library Management",
  });
};

const searchBook_p = (req, res) => {
  // const username = req.body.sname;
  // const dataCountQuery = `SELECT COUNT(*) FROM book where book_id = ${username}`;
  const dataCountQuery = `SELECT COUNT(*) FROM book`;
  connection.query(dataCountQuery, function (err, result) {
    if (err) throw err;

    let dataCount = result[0]["COUNT(*)"];
    let pageNo = req.query.page ? req.query.page : 1;
    let dataPerPages = req.query.data ? req.query.data : 2;
    let startLimit = (pageNo - 1) * dataPerPages;
    let totalPages = Math.ceil(dataCount / dataPerPages);

    // const Query = `SELECT * FROM book where book_id = ${username}`;
    const Query = `SELECT * FROM book LIMIT ${startLimit}, ${dataPerPages}`;
    connection.query(Query, function (err, result) {
      if (err) throw err;
      res.render("search", {
        title: "Library Management",
        user: result,
        pages: totalPages,
        CurrentPage: pageNo,
        lastPage: totalPages,
      });
    });
  });
};
const apiData = (req, res) => {
  let sql = `SELECT * FROM BOOK`;
  connection.query(sql, (err, results) => {
    if (!err) res.status(201).json(results);
  });
};

module.exports = {
  add_g,
  insertBook_p,
  showUpdateBook_g,
  updateBook_p,
  deleteBook_g,
  searchBook_p,
  SearchTitle,
  apiData,
};
