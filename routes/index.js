var express = require('express');
var router = express.Router();
const Book = require("../models/book.js");
const mongoose = require('mongoose');
/* GET home page. */
router.get('/', async function(req, res, next) {
  
  try{
    const books = await Book.find();
    res.render('index', { title: 'Books', BookList : books })
    
  }catch(error){
    console.log("Error!!!");
    return null;
  }
   //go to views-->index.ejs and show that
});

router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Adding BookList' });
});

router.post('/save', async function(req,res,next){
  try{
    const newBook = new Book(req.body);
    await newBook.save();
    console.log("Book saved!!",newBook);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/")});
  

  
router.post('/delete/:id', async function (req, res, next) {
  const bookId = req.params.id;
  console.log("Attempting to delete book with ID:", bookId);
  
  try {
      // Convert the string ID to ObjectId
      const result = await Book.deleteOne({ _id: new ObjectId(bookId) });
      console.log("Book deleted successfully:", result);
      res.redirect('/');
  } catch (error) {
      console.error("Error deleting the book:", error);
      res.status(500).send("Error deleting the book.");
  }
});
// const post = await bookSchema.findById(myId);
// post.comments[0].deleteOne();
// await post.save();
router.get('/edit/:id',async function(req, res, next) {
  try{
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    res.render('edit',{book});
  }catch(err){
    console.log(err);
  }
});

// Update an existing book by ID
// Route to update book details
router.post('/update/:id', async function(req, res, next) {
  try {
    const bookId = req.params.id;
    const updatedData = req.body; // Get the updated data from the form
    await Book.findByIdAndUpdate(bookId, updatedData, { new: true }); // Update the book
    res.redirect("/"); // Redirect to the home page after updating
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating book.");
  }
});




module.exports = router;
