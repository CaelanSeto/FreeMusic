module.exports = (sequelize, DataTypes) => {
    const Downloads = sequelize.define("Downloads", {
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    });
 
    return Downloads;
  };
  