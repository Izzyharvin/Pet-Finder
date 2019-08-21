module.exports = function(sequelize, DataTypes) {
  var Customers = sequelize.define("customers", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        isEmail: true
      }
    },
    number: DataTypes.STRING
  });
  return Customers;
};
