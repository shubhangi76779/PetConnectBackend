const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getReviewsByPet); // ✅ this must match the exported function
router.post('/', reviewController.createReview);

module.exports = router;
