const Book = require('../models/Book');

// @desc    Add a new book (admin only)
// @route   POST /api/books/add
// @access  Admin
exports.addBook = async (req, res) => {
    try {
        const { title, author, isbn } = req.body;

        if (!title || !author || !isbn) {
            return res.status(400).json({ message: 'Please provide title, author, and ISBN.' });
        }

        const existBook = await Book.findOne({ isbn });
        if (existBook) {
            return res.status(400).json({ message: 'A book with this ISBN already exists.' });
        }

        const book = await Book.create({ title, author, isbn });
        res.status(201).json({ message: 'Book added successfully.', book });
    } catch (error) {
        console.error('Add book error:', error.message);
        res.status(500).json({ message: 'Server error while adding the book.' });
    }
};

// @desc    Get all books
// @route   GET /api/books
// @access  Public
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ books });
    } catch (error) {
        console.error('Get all books error:', error.message);
        res.status(500).json({ message: 'Server error while fetching books.' });
    }
};

// @desc    Get single book by ID
// @route   GET /api/books/:id
// @access  Public
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }
        res.status(200).json({ book });
    } catch (error) {
        console.error('Get book by ID error:', error.message);
        res.status(500).json({ message: 'Server error while fetching the book.' });
    }
};

// @desc    Update book (admin only)
// @route   PUT /api/books/:id
// @access  Admin
exports.updateBook = async (req, res) => {
    try {
        const { title, author, isbn } = req.body;
        const bookUpdated = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, isbn },
            { new: true, runValidators: true }
        );

        if (!bookUpdated) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        res.status(200).json({ message: 'Book updated successfully.', book: bookUpdated });
    } catch (error) {
        console.error('Update book error:', error.message);
        res.status(500).json({ message: 'Server error while updating the book.' });
    }
};

// @desc    Delete book (admin only)
// @route   DELETE /api/books/:id
// @access  Admin
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found.' });
        }
        res.status(200).json({ message: 'Book deleted successfully.', book: deletedBook });
    } catch (error) {
        console.error('Delete book error:', error.message);
        res.status(500).json({ message: 'Server error while deleting the book.' });
    }
};
