const express = require("express");
const path = require("path");
const mysql = require("mysql");
const body_parser = require("body-parser");
const router= express.Router();

//connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});
connection.connect(function (error) {
  if (error) console.log(error);
  else console.log(" Poyon Oil");
});


//add books
router.get("/add", (req, res) => {
  res.render("book_add", {
    title: "Add Books",
  });
});
//save
router.post("/save", (req, res) => {
  let data = {
    book_id: req.body.book_id,
    book_name: req.body.book_name,
    author_name: req.body.author_name,
    department: req.body.department,
    rack_no: req.body.rack_no,
  };
  let sql = "INSERT INTO BOOK SET ?";
  let query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//editnp
router.get("/edit/:bookId", (req, res) => {
  const book_id = req.params.bookId;
  let sql = `SELECT * FROM BOOK WHERE book_id =${book_id}`;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.render("edit_book", {
      title: "Edit Books",
      user: results[0],
    });
  });
});

//update

router.post("/update", (req, res) => {
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
});

//delete
router.get("/delete/:bookId", (req, res) => {
  const book_id = req.params.bookId;
  let sql = `DELETE FROM BOOK WHERE book_id =${book_id}`;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//pagination
router.get("/", (req, res) => {
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
});

//search
router.get("/search", (req, res) => {
  res.render("search", {
    title: "Libarary Management System",
  });
});
router.post("/search", (req, res) => {
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
      res.render("search", {
        user: result,
        pages: totalPages,
        CurrentPage: pageNo,
        lastPage: totalPages,
        title: "Library Management System",
      });
    });
  });
});
//filtering
router.get("/Sorting/:sorting/:page", (req, res) => {
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
});

module.exports=router;