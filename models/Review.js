module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    petId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.STRING
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Pet, { foreignKey: 'petId' });
    Review.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Review;
};
