/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contactdetail', {
    UserID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ContactDetailType: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ContactDetailContent: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'contactdetail'
  });
};
