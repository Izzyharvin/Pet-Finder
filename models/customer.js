module.exports = function(sequelize, DataTypes) {
  var Customers = sequelize.define("customers", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: DataTypes.STRING
  });
  return Customers;
};
