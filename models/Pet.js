module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    age: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
  });

  Pet.associate = (models) => {
    Pet.hasMany(models.Review, { foreignKey: 'petId' });
  };

  return Pet;
};
