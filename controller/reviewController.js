const Review = require('../models/Review');

// @desc    Add a review to a book
// @route   POST /api/reviews/addReview
// @access  User
exports.addReview = async (req, res) => {
    try {
        const { book, rating, comment } = req.body;

        if (!book || !rating) {
            return res.status(400).json({ message: 'Book ID and rating are required.' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
        }

        const existingReview = await Review.findOne({ book, user: req.user._id });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this book.' });
        }

        const review = await Review.create({
            book,
            user: req.user._id,
            rating,
            comment
        });

        res.status(201).json({ message: 'Review added successfully.', review });
    } catch (error) {
        console.error('Add review error:', error.message);
        res.status(500).json({ message: 'Server error while adding the review.' });
    }
};

// @desc    Get all reviews for a book
// @route   GET /api/reviews/:bookId
// @access  Public
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ book: req.params.bookId })
            .populate('user', 'name');
        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Get reviews error:', error.message);
        res.status(500).json({ message: 'Server error while fetching reviews.' });
    }
};

// @desc    Update a review (by owner only)
// @route   PUT /api/reviews/:id
// @access  User
exports.updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this review.' });
        }

        if (rating) review.rating = rating;
        if (comment) review.comment = comment;

        await review.save();

        res.status(200).json({ message: 'Review updated successfully.', review });
    } catch (error) {
        console.error('Update review error:', error.message);
        res.status(500).json({ message: 'Server error while updating the review.' });
    }
};

// @desc    Delete a review (by owner only)
// @route   DELETE /api/reviews/:id
// @access  User
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!review) {
            return res.status(404).json({ message: 'Review not found or you are not authorized.' });
        }
        res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (error) {
        console.error('Delete review error:', error.message);
        res.status(500).json({ message: 'Server error while deleting the review.' });
    }
};
