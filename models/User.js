module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9]{10,11}$/  // This expects exactly 10 digits, no spaces or leading zero
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['owner', 'adopter']]
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Pet, { foreignKey: 'ownerId', as: 'Pets' });
    User.hasMany(models.Message, { foreignKey: 'senderId', as: 'SentMessages' });
    User.hasMany(models.Review, { foreignKey: 'userId' });
  };

  return User;
};
