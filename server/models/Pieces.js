module.exports = (sequelize, DataTypes) => {
    const Pieces = sequelize.define("Pieces", {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      }
    });

    Pieces.associate = (models) =>{
        Pieces.hasMany(models.Files, {
           onDelete: "cascade"
        });
    };
 
    return Pieces;
  };
  