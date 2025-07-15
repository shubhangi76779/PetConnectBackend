const UserDetail = require('../models/UserDetail');

exports.createUserDetail = async (req, res) => {
  try {
    const detail = await UserDetail.create(req.body);
    res.status(201).json({ message: "User detail saved", detail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving details" });
  }
};
