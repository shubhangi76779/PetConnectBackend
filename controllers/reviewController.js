// const { Review } = require('../models');

const { Review, User, Pet } = require('../models');

exports.getReviewsByPet = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: User, attributes: ['name'] },
        { model: Pet, attributes: ['name', 'age'] }
      ]
    });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};


exports.createReview = async (req, res) => {
  try {
    const { petId, userId, rating, comment } = req.body;
    const review = await Review.create({ petId, userId, rating, comment });
    res.status(201).json({ message: "Review created", review });
  } catch (error) {
    res.status(500).json({ message: "Failed to create review", error: error.message });
  }
};
