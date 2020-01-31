module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10]
    }
    },
    avatar: {
    type: DataTypes.BLOB,
    allowNull:false
    }
  });
  return User;
};
