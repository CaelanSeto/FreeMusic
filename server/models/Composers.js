module.exports = (sequelize, DataTypes) => {
    const Composers = sequelize.define("Composers", {
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      biography: {
        type: DataTypes.STRING(10000),
        allowNull: false,
      },
    });

    Composers.associate = (models) =>{
        Composers.hasMany(models.Pieces, {
           onDelete: "cascade"
        });
    };
 
    return Composers;
  };
  