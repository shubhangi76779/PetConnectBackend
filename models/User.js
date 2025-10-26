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
      allowNull: false,
      validate: {
        is: {
          args: /^\+?[1-9][0-9]{7,14}$/,
          msg: 'Phone number must be in valid format (10-15 digits, optional plus sign, no spaces or hyphens)',
        },
      },
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
