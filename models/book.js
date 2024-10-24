const{ default: mongoose,mongo }= require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BookSchema = new Schema({
    bname: String,
    description: String,
    
});
const Book = mongoose.model("Book",BookSchema);
module.exports = Book;