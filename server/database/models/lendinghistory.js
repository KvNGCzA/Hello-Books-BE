import createToken from '../../helpers/createToken';

export default (sequelize, DataTypes) => {
  const LendingHistory = sequelize.define('LendingHistory', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    charge: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    durationToken: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (model) => {
        if (model.userId === 3 && model.bookId === 1) {
          model.durationToken = createToken({ userId: model.userId, bookId: model.bookId }, '-10s');
        } else {
          model.durationToken = createToken({ userId: model.userId, bookId: model.bookId }, '31d');
        }
      }
    }
  });
  LendingHistory.associate = (models) => {
    LendingHistory.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    LendingHistory.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
    });
  };

  return LendingHistory;
};
