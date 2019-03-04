/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contact', {
    UserID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Title: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    BirthDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    IsFavorite: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'contact'
  });
};
