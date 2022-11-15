const mysql = require("mysql");
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


//pagination
function Pagination (req,res){
  const dataCountQuery = "SELECT COUNT(*) FROM book";
  connection.query(dataCountQuery, function (err, result) {
    if (err) throw err;

    let dataCount = result[0]["COUNT(*)"];
    let pageNo = req.query.page ? req.query.page : 1;
    let dataPerPages = req.query.data ? req.query.data : 3;
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
}


exports.addBook=(req,res)=>{
    res.render("book_add", {
        title: "Add Books",
      });
      Pagination();
}
// //save
exports.insertBook=(req,res)=>{
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
}
//edit
exports.editBook=(req,res)=>{
    const book_id = req.params.bookId;
    let sql = `SELECT * FROM BOOK WHERE book_id =${book_id}`;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.render("edit_book", {
        title: "Edit Books",
        user: results[0],
      });
    });
}

//update
exports.update=(req,res)=>{
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
}


//delete

exports.delete=(req,res)=>{
    const book_id = req.params.bookId;
    let sql = `DELETE FROM BOOK WHERE book_id =${book_id}`;
    let query = connection.query(sql, (err, results) => {
      if (err) throw err;
      res.redirect("/");
    }); 
}

exports.search=(req,res)=>{
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
}

exports.filter=(req,res)=>{
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
}