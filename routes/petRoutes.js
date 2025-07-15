const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// router.post('/', petController.createPet);
router.get('/', petController.getPets);

module.exports = router;
