const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { addReview, getReviews, updateReview, deleteReview } = require('../controller/reviewController');

// Add a new review (user must be logged in)
router.post('/addReview', protect, addReview);

// Get all reviews for a specific book (public)
router.get('/:bookId', getReviews);

// Update a review (only by review owner)
router.put('/:id', protect, updateReview);

// Delete a review (only by review owner)
router.delete('/:id', protect, deleteReview);

module.exports = router;
