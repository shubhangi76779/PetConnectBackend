module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER
  });

  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: 'senderId', as: 'Sender' });
    Message.belongsTo(models.User, { foreignKey: 'receiverId', as: 'Receiver' });
  };

  return Message;
};
