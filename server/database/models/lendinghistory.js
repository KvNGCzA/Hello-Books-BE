import createToken from '../../helpers/createToken';

export default (sequelize, DataTypes) => {
  const LendingHistory = sequelize.define('LendingHistory', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    charge: DataTypes.INTEGER,
    durationToken: DataTypes.STRING,
    duration: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: (model) => {
        if (model.userId === 3 && model.bookId === 1) {
          model.durationToken = createToken({ userId: model.userId, bookId: model.bookId }, '-10s');
        } else if (model.userId === 11 && model.bookId === 3) {
          model.durationToken = createToken({ userId: model.userId, bookId: model.bookId }, '-1s');
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
