// Handles messaging between users

exports.sendMessage = (req, res) => {
    // In a real app, save message data to the database
    res.json({ message: "Message sent" });
  };
  