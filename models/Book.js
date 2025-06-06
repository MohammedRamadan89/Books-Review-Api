const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , "Book title is required"],
        trim : true,
    },
    author : {
        type : String,
        required : [true , "Author name is required"],
        trim : true
    },
    isbn : {
        type : String,
        required : [true , "ISBN is required"],
        unique : true
    }
},{
    timestamps : true
})

const Book = mongoose.model('Book' , bookSchema)


module.exports = Book