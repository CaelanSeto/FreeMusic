module.exports = (sequelize, DataTypes) => {
    const Admins = sequelize.define("Admins", {
      email: {
        type: DataTypes.STRING(360),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });

 
    return Admins;
  };
  