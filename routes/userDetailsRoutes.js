const express = require('express');
const router = express.Router();
const { UserDetails } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, connectedPet } = req.body;

    const user = await UserDetails.create({
      name,
      email,
      phone,
      address,
      connectedPet
    });

    res.status(201).json({ message: 'Details submitted!', user });
  } catch (error) {
    console.error('Error saving user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
