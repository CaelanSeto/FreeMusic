module.exports = (sequelize, DataTypes) => {
    const Files = sequelize.define("Files", {
      title: {
        type: DataTypes.STRING(260),
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      uuid: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("recording", "sheetmusic"),
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

    Files.associate = (models) =>{
      Files.hasMany(models.Downloads, {
           onDelete: "cascade"
        });
    };
 
    return Files;
  };
  