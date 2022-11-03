const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const book = require("../controllers/books.controllers");
const publicPath = path.join(__dirname, "../public");
router.use(express.static(publicPath));

router.get("/", (req, res) => {
  res.sendFile(publicPath);
});
//add
router.get("/add", book.add_g);

//insert
//router.post("/search", book.insertBook_p);
router.get("/edit/:bookId", book.showUpdateBook_g);
router.post("/update", book.updateBook_p);
router.get("delete/:bookId", book.deleteBook_g);
router.get("/search", book.searchBook_p);
router.post("/search", book.searchBook_p);
router.get("/api", book.apiData);

module.exports=router
