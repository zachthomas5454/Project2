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
    allowNull:true
    },
    timeScore: {
      type:DataTypes.TIME,
      allowNull: true
    },
    clickScore: {
      type: DataTypes.INTEGER,
      allowNull:true
    }
  });
  return User;
};
