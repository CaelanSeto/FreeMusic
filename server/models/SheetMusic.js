module.exports = (sequelize, DataTypes) => {
    const SheetMusic = sequelize.define("SheetMusic", {
      name: {
        type: DataTypes.STRING(260),
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      instruments: {
        type: DataTypes.STRING(400),
        allowNull: false
      }
    });

   SheetMusic.associate = (models) =>{
        SheetMusic.hasMany(models.Downloads, {
           onDelete: "cascade"
        });
    };
 
    return SheetMusic;
  };
  