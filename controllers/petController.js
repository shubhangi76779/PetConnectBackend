// CRUD operations for pet profiles

exports.createPet = (req, res) => {
    // Save pet info to the database (placeholder)
    res.json({ message: "Pet profile created" });
  };
  
  exports.getPets = (req, res) => {
    res.json({
      pets: [
        {
          id: 1,
          name: "Buddy",
          breed: "Golden Retriever",
          age: 2,
          description: "Friendly and loves people",
          imageFile: "golden.jpg"
        },
        {
          id: 2,
          name: "Max",
          breed: "German Shepherd",
          age: 4,
          description: "Smart and loyal",
          imageFile: "German-Shepherd.jpg"
        }
      ]
    });
  };
  
  