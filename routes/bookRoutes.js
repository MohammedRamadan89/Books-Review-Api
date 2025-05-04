const express = require('express');
const router = express.Router();
const { addBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controller/bookController');
const { protect } = require('../middlewares/authMiddleware');
const { onlyAdmin } = require('../middlewares/roleMiddleware');

// Add a new book (only accessible to admins)
router.post('/add', protect, onlyAdmin('admin'), addBook);

// Get all books (public)
router.get('/', getAllBooks);

// Get a single book by ID (public)
router.get('/:id', getBookById);

// Update book details (only accessible to admins)
router.put('/:id', protect, onlyAdmin('admin'), updateBook);

// Delete a book (only accessible to admins)
router.delete('/:id', protect, onlyAdmin('admin'), deleteBook);

module.exports = router;
