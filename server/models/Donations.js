module.exports = (sequelize, DataTypes) => {
    const Donations = sequelize.define("Donations", {
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      operationId: {
        type: DataTypes.STRING(200),
        allowNull: true
      }
    });
 
    return Donations;
  };
  